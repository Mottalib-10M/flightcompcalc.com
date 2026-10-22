/**
 * Moteur des trois régimes : CE 261 (avant et après le règlement (UE) 2026/2202), UK261 et APPR canadien.
 * Fonctions pures, sans réseau. Toutes les valeurs viennent de src/data/params-2026.json.
 */
import P from '../../data/params-2026.json';

export type Zone = 'eu' | 'eea' | 'ch' | 'gb' | 'ca' | 'xx';
/** [iata, nom, ville, pays, lat, lon, zone, rang] */
export type AirportRow = [string, string, string, string, number, number, Zone, number];
export interface Airport { iata: string; name: string; city: string; country: string; lat: number; lon: number; zone: Zone }
export const toAirport = (r: AirportRow): Airport => ({ iata: r[0], name: r[1], city: r[2], country: r[3], lat: r[4], lon: r[5], zone: r[6] });

/** Pavillon de la compagnie qui opère le vol (licence d'exploitation). */
export type Carrier = 'eu' | 'gb' | 'ca' | 'other';
export type EventKind = 'delay' | 'cancel' | 'denied';
/** Cause annoncée par la compagnie. */
export type Cause = 'airline' | 'technical' | 'crew-strike' | 'weather' | 'atc' | 'airport-strike' | 'security' | 'medical' | 'unknown';
export type ApprSize = 'large' | 'small';
export type ApprCategory = 'control' | 'safety' | 'outside';
export type RegimeId = 'eu261' | 'eu2027' | 'uk261' | 'appr';

export interface FlightInput {
  from: Airport; to: Airport; carrier: Carrier; event: EventKind;
  /** Retard à l'arrivée à la destination finale, en minutes (pour une annulation ou un refus : arrivée du vol de remplacement). */
  arrivalDelayMin: number;
  /** Date du vol prévu, AAAA-MM-JJ. */
  flightDate: string;
  cause: Cause;
  /** Annulation : préavis reçu, en jours avant le départ prévu. */
  noticeDays?: number;
  /** Annulation ou refus : un réacheminement a été accepté (sinon remboursement du billet). */
  rerouted?: boolean;
  /** Réacheminement : départ avancé de tant de minutes par rapport à l'horaire d'origine. */
  departEarlierMin?: number;
  apprSize?: ApprSize;
  /** Classement de la cause au sens de l'APPR ; déduit de `cause` s'il est absent. */
  apprCategory?: ApprCategory;
  /** APPR : billet remboursé au lieu d'un réacheminement. */
  refunded?: boolean;
}

export type Status = 'owed' | 'likely-exempt' | 'none' | 'out-of-scope';
export interface RegimeResult {
  id: RegimeId; applies: boolean; scopeRule: string;
  status: Status; amount: number; fullAmount: number; currency: 'EUR' | 'GBP' | 'CAD';
  band: number | null; reduction: number; rule: string;
}
export interface FlightResult { distanceKm: number; intra: boolean; regimes: RegimeResult[]; best: RegimeResult | null }

const R = 6371;
const rad = (d: number) => (d * Math.PI) / 180;
/** Distance orthodromique (méthode de la route du grand cercle, art. 7 § 4 du règlement 261/2004), sphère de 6 371 km. */
export function greatCircleKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const dLat = rad(b.lat - a.lat), dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Espace où s'applique le règlement 261/2004 : Union (régions ultrapériphériques comprises), EEE et Suisse. */
export const inEuArea = (z: Zone) => z === 'eu' || z === 'eea' || z === 'ch';

/** Tranche de distance : 0 = 1 500 km ou moins, 1 = 1 500 à 3 500 km (ou intracommunautaire de plus de 1 500 km), 2 = au-delà. */
export function band(km: number, intraEu: boolean): number {
  const [b1, b2] = P.eu261.bands_km;
  if (km <= b1) return 0;
  if (intraEu || km <= b2) return 1;
  return 2;
}
export function bandUk(km: number): number {
  const [b1, b2] = P.uk261.bands_km;
  return km <= b1 ? 0 : km <= b2 ? 1 : 2;
}

export function euScope(from: Airport, to: Airport, carrier: Carrier): string | null {
  if (inEuArea(from.zone)) return 'departure-eu';
  if (inEuArea(to.zone) && carrier === 'eu') return 'arrival-eu-carrier';
  return null;
}
export function ukScope(from: Airport, to: Airport, carrier: Carrier): string | null {
  if (from.zone === 'gb') return 'departure-uk';
  if (to.zone === 'gb' && (carrier === 'gb' || carrier === 'eu')) return 'arrival-uk-uk-or-eu-carrier';
  if (to.zone === 'eu' && carrier === 'gb') return 'arrival-eu-uk-carrier';
  return null;
}
export function apprScope(from: Airport, to: Airport): string | null {
  if (from.zone === 'ca' && to.zone === 'ca') return 'within-canada';
  if (from.zone === 'ca') return 'from-canada';
  if (to.zone === 'ca') return 'to-canada';
  return null;
}

/** Les causes que le droit européen et britannique tiennent en général pour des circonstances extraordinaires. */
const EXTRAORDINARY: Cause[] = ['weather', 'atc', 'airport-strike', 'security', 'medical'];
/** Classement APPR par défaut : la grève du personnel de la compagnie est « hors de son contrôle » (art. 10(1)(j)). */
export function apprCategoryOf(c: Cause): ApprCategory {
  if (c === 'airline' || c === 'unknown') return 'control';
  if (c === 'technical') return 'safety';
  return 'outside';
}

const euRegime = (date: string): 'eu261' | 'eu2027' => (date >= P.eu261_2027.applies_from ? 'eu2027' : 'eu261');

function euLike(id: 'eu261' | 'eu2027' | 'uk261', inp: FlightInput, km: number, intra: boolean, scope: string): RegimeResult {
  const uk = id === 'uk261';
  const amounts = uk ? P.uk261.amounts : id === 'eu2027' ? P.eu261_2027.amounts : P.eu261.amounts;
  const b = uk ? bandUk(km) : band(km, intra);
  const full = amounts[b];
  const currency = uk ? 'GBP' : 'EUR';
  const base: RegimeResult = { id, applies: true, scopeRule: scope, status: 'none', amount: 0, fullAmount: full, currency, band: b, reduction: 0, rule: '' };
  const d = Math.max(0, inp.arrivalDelayMin);
  const extraordinary = EXTRAORDINARY.includes(inp.cause);
  const limits = uk ? P.uk261.reroute_reduction_limits_minutes : P.eu261.reroute_reduction_limits_minutes;

  if (inp.event === 'delay') {
    const reached = id === 'eu2027' ? d > P.eu261_2027.delay_strictly_over_minutes : d >= (uk ? P.uk261.delay_min_minutes : P.eu261.delay_min_minutes);
    if (!reached) return { ...base, rule: id === 'eu2027' ? 'delay-not-over-3h' : 'delay-under-3h' };
    let red = 0;
    if (b === 2) {
      if (id === 'eu2027' ? d <= P.eu261_2027.band3_reduction_up_to_minutes : d < (uk ? P.uk261.delay_reduction_band3_under_minutes : P.eu261.delay_reduction_band3_under_minutes)) red = 0.5;
    }
    return { ...base, status: extraordinary ? 'likely-exempt' : 'owed', amount: full * (1 - red), reduction: red, rule: red ? 'delay-band3-reduced' : 'delay-3h' };
  }

  if (inp.event === 'cancel') {
    const notice = inp.noticeDays ?? 0;
    const early = Math.max(0, inp.departEarlierMin ?? 0);
    const rerouted = inp.rerouted ?? true;
    if (id === 'eu2027') {
      const N = P.eu261_2027;
      if (notice >= N.cancel_notice_full_days) return { ...base, rule: 'cancel-notice-14' };
      if (rerouted && early <= N.cancel_reroute.depart_earlier_max_min && d < N.cancel_reroute.arrive_later_max_min) return { ...base, rule: 'cancel-reroute-close' };
      let red = 0;
      if (rerouted) {
        if (b === 2 && d <= N.band3_reduction_up_to_minutes) red = 0.5;
        // Art. 7 § 3 : départ avancé de plus d'une heure, le vol de remplacement étant pris.
        if (early > 60 && early < 120) red = Math.max(red, 0.5);
        else if (early >= 120 && early < 180) red = Math.max(red, 0.25);
      }
      return { ...base, status: extraordinary ? 'likely-exempt' : 'owed', amount: full * (1 - red), reduction: red, rule: red ? 'cancel-reduced' : 'cancel' };
    }
    const E = P.eu261;
    if (notice >= E.cancel_notice_full_days) return { ...base, rule: 'cancel-notice-14' };
    if (rerouted && notice >= E.cancel_notice_mid_days && early <= E.cancel_mid_reroute.depart_earlier_max_min && d < E.cancel_mid_reroute.arrive_later_max_min) return { ...base, rule: 'cancel-reroute-close-7-14' };
    if (rerouted && notice < E.cancel_notice_mid_days && early <= E.cancel_short_reroute.depart_earlier_max_min && d < E.cancel_short_reroute.arrive_later_max_min) return { ...base, rule: 'cancel-reroute-close-7' };
    const red = rerouted && d <= limits[b] ? 0.5 : 0;
    return { ...base, status: extraordinary ? 'likely-exempt' : 'owed', amount: full * (1 - red), reduction: red, rule: red ? 'cancel-reduced' : 'cancel' };
  }

  // Refus d'embarquement contre son gré : pas de défense par circonstances extraordinaires.
  let red = 0;
  if (inp.rerouted ?? true) {
    if (id === 'eu2027') { if (b === 2 && d <= P.eu261_2027.band3_reduction_up_to_minutes) red = 0.5; }
    else if (d <= limits[b]) red = 0.5;
  }
  return { ...base, status: 'owed', amount: full * (1 - red), reduction: red, rule: red ? 'denied-reduced' : 'denied' };
}

export function appr(inp: FlightInput, scope: string): RegimeResult {
  const A = P.appr;
  const size: ApprSize = inp.apprSize ?? 'large';
  const cat = inp.apprCategory ?? apprCategoryOf(inp.cause);
  const h = Math.max(0, inp.arrivalDelayMin) / 60;
  const base: RegimeResult = { id: 'appr', applies: true, scopeRule: scope, status: 'none', amount: 0, fullAmount: 0, currency: 'CAD', band: null, reduction: 0, rule: '' };
  if (inp.event === 'denied') {
    if (cat !== 'control') return { ...base, rule: `denied-${cat}` };
    const [h6, h9] = A.denied_boarding.hours;
    const i = h < h6 ? 0 : h < h9 ? 1 : 2;
    const amt = A.denied_boarding.amounts[i];
    return { ...base, status: 'owed', amount: amt, fullAmount: amt, band: i, rule: 'denied' };
  }
  if (cat !== 'control') return { ...base, rule: `${inp.event}-${cat}` };
  if (inp.event === 'cancel' && (inp.noticeDays ?? 0) > A.notice_days) return { ...base, rule: 'notice-over-14' };
  if (inp.refunded) {
    const amt = A.refund_instead[size];
    return { ...base, status: 'owed', amount: amt, fullAmount: amt, rule: 'refund' };
  }
  const [h3, h6, h9] = A.delay.hours;
  if (h < h3) return { ...base, rule: 'under-3h' };
  const i = h < h6 ? 0 : h < h9 ? 1 : 2;
  const amt = A.delay[size][i];
  return { ...base, status: 'owed', amount: amt, fullAmount: amt, band: i, rule: `${inp.event}-${size}` };
}

export function compute(inp: FlightInput): FlightResult {
  const km = greatCircleKm(inp.from, inp.to);
  const intra = inEuArea(inp.from.zone) && inEuArea(inp.to.zone);
  const out: RegimeResult[] = [];
  const eu = euScope(inp.from, inp.to, inp.carrier);
  if (eu) out.push(euLike(euRegime(inp.flightDate), inp, km, intra, eu));
  const uk = ukScope(inp.from, inp.to, inp.carrier);
  if (uk) out.push(euLike('uk261', inp, km, intra, uk));
  const ca = apprScope(inp.from, inp.to);
  if (ca) out.push(appr(inp, ca));
  const owed = out.filter((r) => r.status === 'owed');
  const pick = (owed.length ? owed : out).slice().sort((a, b) => b.amount - a.amount)[0] ?? null;
  return { distanceKm: km, intra, regimes: out, best: pick };
}

/** Date limite pour réclamer (AAAA-MM-JJ). */
export function deadlines(id: RegimeId, flightDate: string): { kind: string; date: string }[] {
  const [y, m, d] = flightDate.split('-').map(Number);
  const iso = (dt: Date) => dt.toISOString().slice(0, 10);
  const addMonths = (n: number) => { const t = new Date(Date.UTC(y, m - 1 + n, d)); if (t.getUTCDate() !== d) t.setUTCDate(0); return iso(t); };
  if (id === 'appr') return [{ kind: 'appr-request', date: iso(new Date(Date.UTC(y + 1, m - 1, d - 1))) }];
  if (id === 'uk261') return [
    { kind: 'uk-england-wales', date: iso(new Date(Date.UTC(y + P.uk261.limitation_years_england_wales, m - 1, d))) },
    { kind: 'uk-scotland', date: iso(new Date(Date.UTC(y + P.uk261.limitation_years_scotland, m - 1, d))) },
  ];
  const de = { kind: 'de-limitation', date: `${y + P.de_limitation.years}-12-31` };
  if (id === 'eu2027') return [{ kind: 'eu2027-request', date: addMonths(P.eu261_2027.claim_window_months) }, de];
  return [de];
}

export const SDR = P.sdr;
/** Plafond de la Convention de Montréal converti au cours du FMI publié dans params (date jointe). */
export function sdrTo(sdr: number, cur: 'EUR' | 'GBP' | 'CAD'): number {
  return sdr * (cur === 'EUR' ? P.sdr.eur : cur === 'GBP' ? P.sdr.gbp : P.sdr.cad);
}
