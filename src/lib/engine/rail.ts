/** Fahrgastrechte Bahn : Verordnung (EU) 2021/782, Art. 19, et règles DB (params-2026.json, bloc rail_de). */
import P from '../../data/params-2026.json';

export type Season = 'none' | 'fern2' | 'fern1' | 'nah2' | 'nah1' | 'bc100_2' | 'bc100_1';
export interface RailInput { fare: number; delayMin: number; season?: Season; delays?: number }
export interface RailResult { pct: number; amount: number; belowMin: boolean; rule: string }

export function railRefund({ fare, delayMin, season = 'none', delays = 1 }: RailInput): RailResult {
  const R = P.rail_de;
  if (season !== 'none') {
    if (delayMin < R.minutes[0]) return { pct: 0, amount: 0, belowMin: false, rule: 'under-60' };
    const per = R.season[season];
    const cap = fare * R.season.cap_pct / 100;
    const raw = per * Math.max(1, delays);
    const amount = Math.min(raw, cap);
    return { pct: 0, amount: amount < R.min_payout_eur ? 0 : amount, belowMin: amount < R.min_payout_eur, rule: raw > cap ? 'season-capped' : 'season' };
  }
  const pct = delayMin >= R.minutes[1] ? R.pct[1] : delayMin >= R.minutes[0] ? R.pct[0] : 0;
  const amount = Math.round(fare * pct) / 100;
  if (pct && amount < R.min_payout_eur) return { pct, amount: 0, belowMin: true, rule: 'below-4' };
  return { pct, amount, belowMin: false, rule: pct ? `pct-${pct}` : 'under-60' };
}
