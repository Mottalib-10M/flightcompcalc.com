import { describe, it, expect } from 'vitest';
import rows from '../src/data/airports.json';
import { compute, greatCircleKm, toAirport, deadlines, band, type AirportRow, type FlightInput } from '../src/lib/engine/flight';
import { railRefund } from '../src/lib/engine/rail';

const A = (c: string) => { const r = (rows as AirportRow[]).find((x) => x[0] === c); if (!r) throw new Error(c); return toAirport(r); };
const base = (o: Partial<FlightInput>): FlightInput => ({ from: A('FRA'), to: A('PMI'), carrier: 'eu', event: 'delay', arrivalDelayMin: 200, flightDate: '2026-08-10', cause: 'technical', ...o });
const get = (r: ReturnType<typeof compute>, id: string) => r.regimes.find((x) => x.id === id)!;

describe('distance', () => {
  it('FRA-JFK about 6200 km', () => { const d = greatCircleKm(A('FRA'), A('JFK')); expect(d).toBeGreaterThan(6150); expect(d).toBeLessThan(6250); });
  it('bands', () => { expect(band(1500, false)).toBe(0); expect(band(1501, true)).toBe(1); expect(band(3600, true)).toBe(1); expect(band(3600, false)).toBe(2); });
});

describe('EU261 current', () => {
  it('FRA-PMI 3h20 = 400 (1100 km? no) ', () => { const r = compute(base({})); expect(get(r, 'eu261').status).toBe('owed'); expect(get(r, 'eu261').amount).toBe(r.distanceKm <= 1500 ? 250 : 400); });
  it('2h59 nothing, 3h00 owed', () => {
    expect(get(compute(base({ arrivalDelayMin: 179 })), 'eu261').status).toBe('none');
    expect(get(compute(base({ arrivalDelayMin: 180 })), 'eu261').status).toBe('owed');
  });
  it('FRA-JFK 3h30 = 300 reduced, 4h = 600', () => {
    expect(get(compute(base({ to: A('JFK'), arrivalDelayMin: 210 })), 'eu261').amount).toBe(300);
    expect(get(compute(base({ to: A('JFK'), arrivalDelayMin: 240 })), 'eu261').amount).toBe(600);
  });
  it('FRA-LPA intra-EU over 3500 = 400', () => { const r = compute(base({ to: A('LPA') })); expect(get(r, 'eu261').amount).toBe(400); });
  it('JFK-FRA on non-EU carrier out of scope', () => { const r = compute(base({ from: A('JFK'), to: A('FRA'), carrier: 'other' })); expect(r.regimes.length).toBe(0); });
  it('weather likely exempt', () => { expect(get(compute(base({ cause: 'weather' })), 'eu261').status).toBe('likely-exempt'); });
  it('cancel 14 days notice none', () => { expect(get(compute(base({ event: 'cancel', noticeDays: 15 })), 'eu261').status).toBe('none'); });
  it('cancel 3 days, reroute close none', () => { expect(get(compute(base({ event: 'cancel', noticeDays: 3, departEarlierMin: 30, arrivalDelayMin: 90 })), 'eu261').status).toBe('none'); });
  it('denied boarding owed despite weather', () => { expect(get(compute(base({ event: 'denied', cause: 'weather', arrivalDelayMin: 400 })), 'eu261').status).toBe('owed'); });
});

describe('EU 2026/2202 from 2027-10-23', () => {
  it('exactly 3h no longer enough', () => {
    const r = compute(base({ flightDate: '2027-10-23', arrivalDelayMin: 180 }));
    expect(get(r, 'eu2027').status).toBe('none');
    expect(get(compute(base({ flightDate: '2027-10-23', arrivalDelayMin: 181 })), 'eu2027').status).toBe('owed');
  });
  it('day before still old regime', () => { expect(compute(base({ flightDate: '2027-10-22' })).regimes[0].id).toBe('eu261'); });
  it('long haul 4h exactly reduced', () => { expect(get(compute(base({ flightDate: '2028-01-05', to: A('JFK'), arrivalDelayMin: 240 })), 'eu2027').amount).toBe(300); });
  it('deadline 9 months', () => { expect(deadlines('eu2027', '2028-01-31')[0].date).toBe('2028-10-31'); });
});

describe('UK261', () => {
  it('LHR-JFK 5h = 520 GBP', () => { const r = get(compute(base({ from: A('LHR'), to: A('JFK'), carrier: 'other', arrivalDelayMin: 300 })), 'uk261'); expect(r.amount).toBe(520); expect(r.currency).toBe('GBP'); });
  it('LHR-JFK 3h30 = 260', () => { expect(get(compute(base({ from: A('LHR'), to: A('JFK'), carrier: 'gb', arrivalDelayMin: 210 })), 'uk261').amount).toBe(260); });
  it('CDG-LHR both regimes', () => { const r = compute(base({ from: A('CDG'), to: A('LHR'), carrier: 'eu' })); expect(r.regimes.map((x) => x.id).sort()).toEqual(['eu261', 'uk261']); });
  it('deadline 6 years', () => { expect(deadlines('uk261', '2026-05-01')[0].date).toBe('2032-05-01'); });
});

describe('APPR', () => {
  it('YYZ-YVR large 6h = 700', () => { expect(get(compute(base({ from: A('YYZ'), to: A('YVR'), carrier: 'ca', cause: 'airline', arrivalDelayMin: 360 })), 'appr').amount).toBe(700); });
  it('small 9h = 500', () => { expect(get(compute(base({ from: A('YYZ'), to: A('YVR'), carrier: 'ca', cause: 'airline', apprSize: 'small', arrivalDelayMin: 540 })), 'appr').amount).toBe(500); });
  it('technical = safety nothing', () => { expect(get(compute(base({ from: A('YYZ'), to: A('YVR'), carrier: 'ca', cause: 'technical' })), 'appr').status).toBe('none'); });
  it('denied 2400', () => { expect(get(compute(base({ from: A('YUL'), to: A('CDG'), carrier: 'ca', event: 'denied', cause: 'airline', arrivalDelayMin: 600 })), 'appr').amount).toBe(2400); });
  it('YUL-CDG: EU261 does not apply on Canadian carrier inbound', () => { const r = compute(base({ from: A('YUL'), to: A('CDG'), carrier: 'ca' })); expect(r.regimes.map((x) => x.id)).toEqual(['appr']); });
  it('deadline one year', () => { expect(deadlines('appr', '2026-03-10')[0].date).toBe('2027-03-09'); });
});

describe('rail', () => {
  it('50 € ticket, 75 min = 12.50', () => { expect(railRefund({ fare: 50, delayMin: 75 }).amount).toBe(12.5); });
  it('10 € ticket 65 min = 0 (under 4 €)', () => { expect(railRefund({ fare: 10, delayMin: 65 }).amount).toBe(0); });
  it('120 min = 50 %', () => { expect(railRefund({ fare: 80, delayMin: 120 }).amount).toBe(40); });
});

describe('DE limitation', () => { it('end of year + 3', () => { expect(deadlines('eu261', '2026-03-05')[0].date).toBe('2029-12-31'); }); });
