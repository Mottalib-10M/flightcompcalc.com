/**
 * Mini-simulateurs de page (RECETTE §9.3). Chaque entrée : des champs numériques ou des listes, et une
 * fonction qui rend le chiffre du sujet. Tous les montants viennent du moteur et de params-2026.json.
 */
import type { MiniSpec, MiniOut } from './mini-types';
import type { MiniOpts } from './page-types';
import P from '../data/params-2026.json';
import TOP from '../data/airports-top.json';
import { band, bandUk, compute, deadlines, greatCircleKm, inEuArea, sdrTo, toAirport, type AirportRow } from './engine/flight';
import { railRefund } from './engine/rail';
import { formatMoney, formatNumber, displayDate, TAG, type Lang, type Cur } from './format';

const W = {
  de: { km: 'Entfernung', h: 'Ankunftsverspätung', hUnit: 'Std.', band: 'Strecke', bands: ['bis 1 500 km', '1 500 bis 3 500 km', 'über 3 500 km (außerhalb der EU)'], eu: 'EU261 heute', eu27: 'EU261 ab 23.10.2027', uk: 'UK261', nothing: 'nichts', cta: 'Zum vollständigen Rechner mit Musterschreiben' },
  en: { km: 'Distance', h: 'Arrival delay', hUnit: 'h', band: 'Route', bands: ['up to 1,500 km', '1,500 to 3,500 km', 'over 3,500 km (outside the EU)'], eu: 'EU261 today', eu27: 'EU261 from 23 Oct 2027', uk: 'UK261', nothing: 'nothing', cta: 'Open the full calculator with the claim letter' },
  fr: { km: 'Distance', h: 'Retard à l’arrivée', hUnit: 'h', band: 'Trajet', bands: ['jusqu’à 1 500 km', '1 500 à 3 500 km', 'plus de 3 500 km (hors UE)'], eu: 'CE 261 aujourd’hui', eu27: 'CE 261 dès le 23 oct. 2027', uk: 'UK261', nothing: 'rien', cta: 'Ouvrir le calculateur complet avec la lettre' },
};
const rows = TOP as unknown as AirportRow[];
const ap = (c: string) => rows.find((r) => r[0] === c);

/** Montant CE 261 / UK261 pour une tranche et un retard (minutes), régime actuel ou 2027. */
function euAmount(b: number, min: number, regime: 'eu261' | 'eu2027' | 'uk261'): number {
  const uk = regime === 'uk261';
  const amounts = uk ? P.uk261.amounts : P.eu261.amounts;
  const ok = regime === 'eu2027' ? min > P.eu261_2027.delay_strictly_over_minutes : min >= P.eu261.delay_min_minutes;
  if (!ok) return 0;
  const red = b === 2 && (regime === 'eu2027' ? min <= P.eu261_2027.band3_reduction_up_to_minutes : min < P.eu261.delay_reduction_band3_under_minutes);
  return amounts[b] * (red ? 0.5 : 1);
}

export function getSpec(kind: string, lang: string, arg?: MiniOpts): MiniSpec {
  const L = (['de', 'en', 'fr'].includes(lang) ? lang : 'en') as Lang;
  const w = W[L];
  const eur = (x: number) => (x ? formatMoney(x, 0, L, 'EUR') : w.nothing);
  const gbp = (x: number) => (x ? formatMoney(x, 0, L, 'GBP') : w.nothing);
  const cad = (x: number) => (x ? formatMoney(x, 0, L, 'CAD') : w.nothing);
  const d = (id: string, def: number) => arg?.d?.[id] ?? def;
  const bandOpts = w.bands.map((label, i) => ({ value: String(i), label }));
  const t = (de: string, en: string, fr: string) => arg?.t ?? { de, en, fr }[L];

  switch (kind) {
    case 'band': return {
      title: t('Entfernung eingeben, Betrag ablesen', 'Enter a distance, read the amount', 'Entrez une distance, lisez le montant'), cta: w.cta,
      inputs: [{ id: 'km', label: w.km, def: d('km', 1200), unit: 'km', max: 20000 }],
      run: (v): MiniOut => { const b = band(v.km, false), bu = bandUk(v.km); return { head: [`${w.eu} (${w.bands[b]})`, eur(P.eu261.amounts[b])], rows: [[w.uk, gbp(P.uk261.amounts[bu])], [L === 'de' ? 'Langstrecke, 3 bis 4 Std. zu spät' : L === 'fr' ? 'Long-courrier, 3 à 4 h de retard' : 'Long haul, 3 to 4 h late', b === 2 ? `${eur(P.eu261.amounts[2] / 2)} · ${gbp(P.uk261.amounts[2] / 2)}` : '–']] }; },
    };
    case 'delay': return {
      title: t('Wie viel bei welcher Verspätung?', 'How much for which delay?', 'Combien pour quel retard ?'), cta: w.cta,
      inputs: [{ id: 'h', label: w.h, def: d('h', 3.25), unit: w.hUnit, max: 48, decimals: 2 }, { id: 'b', label: w.band, def: d('b', 1), options: bandOpts }],
      run: (v): MiniOut => { const min = Math.round(v.h * 60); return { head: [w.eu, eur(euAmount(v.b, min, 'eu261'))], rows: [[w.eu27, eur(euAmount(v.b, min, 'eu2027'))], [w.uk, gbp(euAmount(v.b, min, 'uk261'))]] }; },
    };
    case 'appr': return {
      title: t('APPR: Entschädigung nach Verspätung', 'APPR: compensation by delay', 'RPPA : indemnité selon le retard'), cta: w.cta,
      inputs: [{ id: 'h', label: w.h, def: d('h', 6.5), unit: w.hUnit, max: 72, decimals: 2 }, { id: 's', label: L === 'fr' ? 'Transporteur' : L === 'de' ? 'Airline' : 'Carrier', def: d('s', 0), options: [{ value: '0', label: L === 'fr' ? 'Gros (≥ 2 M passagers)' : L === 'de' ? 'Groß (≥ 2 Mio. Passagiere)' : 'Large (≥ 2 m passengers)' }, { value: '1', label: L === 'fr' ? 'Petit' : L === 'de' ? 'Klein' : 'Small' }] }],
      run: (v): MiniOut => { const A = P.appr.delay; const s = v.s ? 'small' : 'large'; const i = v.h < A.hours[0] ? -1 : v.h < A.hours[1] ? 0 : v.h < A.hours[2] ? 1 : 2; return { head: [L === 'fr' ? 'Indemnité minimale' : L === 'de' ? 'Mindestentschädigung' : 'Minimum compensation', cad(i < 0 ? 0 : A[s][i])], rows: [[L === 'fr' ? 'Billet remboursé à la place' : L === 'de' ? 'Stattdessen erstattet' : 'Refunded instead', cad(P.appr.refund_instead[s])], [L === 'fr' ? 'Refus d’embarquement, même retard' : L === 'de' ? 'Nichtbeförderung, gleiche Verspätung' : 'Denied boarding, same delay', cad(P.appr.denied_boarding.amounts[v.h < 6 ? 0 : v.h < 9 ? 1 : 2])]], note: L === 'fr' ? 'Cause sous le contrôle du transporteur, non liée à la sécurité.' : L === 'de' ? 'Ursache in der Kontrolle der Airline, nicht sicherheitsbedingt.' : 'Cause within the carrier’s control and not required for safety.' }; },
    };
    case 'cancel': return {
      title: t('Annullierung: zählt der Ersatzflug?', 'Cancellation: does the replacement count?', 'Annulation : le remplacement compte-t-il ?'), cta: w.cta,
      inputs: [{ id: 'n', label: L === 'de' ? 'Mitgeteilt (Tage vorher)' : L === 'fr' ? 'Prévenu (jours avant)' : 'Told (days before)', def: d('n', 5), max: 365 }, { id: 'l', label: L === 'de' ? 'Ersatz kam später an' : L === 'fr' ? 'Remplacement arrivé plus tard de' : 'Replacement arrived later by', def: d('l', 3), unit: w.hUnit, max: 72, decimals: 2 }, { id: 'b', label: w.band, def: d('b', 0), options: bandOpts }],
      run: (v): MiniOut => {
        const fake = { lat: 0, lon: 0 };
        const km = [1000, 2500, 5000][v.b];
        const from = { iata: 'AAA', name: '', city: '', country: 'DE', ...fake, zone: 'eu' as const };
        const to = { iata: 'BBB', name: '', city: '', country: v.b === 2 ? 'US' : 'DE', lat: km / 111.195, lon: 0, zone: (v.b === 2 ? 'xx' : 'eu') as 'xx' | 'eu' };
        const r = (date: string) => compute({ from, to, carrier: 'eu', event: 'cancel', arrivalDelayMin: Math.round(v.l * 60), flightDate: date, cause: 'airline', noticeDays: v.n, rerouted: true, departEarlierMin: 0 }).regimes[0];
        const now = r('2026-10-22'), later = r('2027-11-01');
        return { head: [w.eu, eur(now.amount)], rows: [[w.eu27, eur(later.amount)]], note: L === 'de' ? 'Ersatzflug zur ursprünglichen Abflugzeit angenommen.' : L === 'fr' ? 'Vol de remplacement accepté, départ à l’heure prévue.' : 'Replacement flight accepted, leaving at the original time.' };
      },
    };
    case 'rail': return {
      title: t('Zug zu spät: Ihr Anteil am Fahrpreis', 'Train late: your share of the fare', 'Train en retard : votre part du prix'), cta: L === 'de' ? 'Zum Bahn-Rechner' : L === 'fr' ? 'Ouvrir le calculateur train' : 'Open the train calculator',
      inputs: [{ id: 'f', label: L === 'de' ? 'Fahrpreis' : L === 'fr' ? 'Prix du billet' : 'Fare', def: d('f', 59.9), unit: '€', max: 5000, decimals: 2 }, { id: 'm', label: L === 'de' ? 'Verspätung' : L === 'fr' ? 'Retard' : 'Delay', def: d('m', 70), unit: 'min', max: 1440 }],
      run: (v): MiniOut => { const r = railRefund({ fare: v.f, delayMin: v.m }); return { head: [L === 'de' ? 'Entschädigung' : L === 'fr' ? 'Indemnité' : 'Compensation', formatMoney(r.amount, 2, L, 'EUR')], rows: [[L === 'de' ? 'Satz' : L === 'fr' ? 'Taux' : 'Rate', `${r.pct} %`]] }; },
    };
    case 'baggage': return {
      title: t('Koffer: was die Airline höchstens zahlt', 'Baggage: the most the airline pays', 'Bagage : le maximum que paie la compagnie'), cta: L === 'de' ? 'Zum Gepäck-Rechner' : L === 'fr' ? 'Ouvrir le calculateur bagages' : 'Open the baggage calculator',
      inputs: [{ id: 'v', label: L === 'de' ? 'Wert des Schadens' : L === 'fr' ? 'Valeur du préjudice' : 'Value of the loss', def: d('v', 2500), max: 100000 }, { id: 'c', label: L === 'de' ? 'Währung' : L === 'fr' ? 'Devise' : 'Currency', def: d('c', L === 'fr' ? 2 : L === 'en' ? 1 : 0), options: [{ value: '0', label: 'EUR' }, { value: '1', label: 'GBP' }, { value: '2', label: 'CAD' }] }],
      run: (v): MiniOut => { const cur = (['EUR', 'GBP', 'CAD'] as Cur[])[v.c]; const cap = sdrTo(P.montreal.baggage_sdr, cur); return { head: [L === 'de' ? 'Höchstbetrag' : L === 'fr' ? 'Maximum' : 'Maximum', formatMoney(Math.min(v.v, cap), 0, L, cur)], rows: [[L === 'de' ? 'Grenze 1 519 SZR' : L === 'fr' ? 'Limite 1 519 DTS' : 'Limit 1,519 SDR', formatMoney(cap, 0, L, cur)]], note: `${L === 'de' ? 'IWF-Kurs vom' : L === 'fr' ? 'Cours du FMI du' : 'IMF rate of'} ${displayDate(cur === 'GBP' ? P.sdr.gbp_date : cur === 'CAD' ? P.sdr.cad_date : P.sdr.eur_date, TAG[L])}` }; },
    };
    case 'deadline': return {
      title: t('Bis wann können Sie fordern?', 'Until when can you claim?', 'Jusqu’à quand réclamer ?'), cta: L === 'de' ? 'Zum Fristen-Rechner' : L === 'fr' ? 'Ouvrir le calculateur de délais' : 'Open the deadline calculator',
      inputs: [{ id: 'y', label: L === 'de' ? 'Jahr des Flugs' : L === 'fr' ? 'Année du vol' : 'Year of the flight', def: d('y', 2024), max: 2030 }, { id: 'm', label: L === 'de' ? 'Monat' : L === 'fr' ? 'Mois' : 'Month', def: d('m', 7), max: 12 }],
      run: (v): MiniOut => {
        const y = Math.max(2000, Math.round(v.y)), m = Math.min(12, Math.max(1, Math.round(v.m)));
        const iso = `${y}-${String(m).padStart(2, '0')}-15`;
        const day = (s: string) => displayDate(s, TAG[L]);
        const eu = deadlines(iso >= P.eu261_2027.applies_from ? 'eu2027' : 'eu261', iso);
        return { head: [L === 'de' ? 'Verjährung in Deutschland' : L === 'fr' ? 'Prescription en Allemagne' : 'Time limit in Germany', day(eu[eu.length - 1].date)], rows: [
          ...(eu.length > 1 ? [[L === 'de' ? 'Antrag (9 Monate, neues Recht)' : L === 'fr' ? 'Demande (9 mois, nouveau régime)' : 'Claim (9 months, new rules)', day(eu[0].date)] as [string, string]] : []),
          ['UK261, England & Wales', day(deadlines('uk261', iso)[0].date)], [L === 'fr' ? 'Canada (RPPA)' : L === 'de' ? 'Kanada (APPR)' : 'Canada (APPR)', day(deadlines('appr', iso)[0].date)]], note: L === 'de' ? 'Für einen Flug am 15. des Monats.' : L === 'fr' ? 'Pour un vol le 15 du mois.' : 'For a flight on the 15th of the month.' };
      },
    };
    case 'route': {
      const from = ap(arg?.from ?? 'FRA') ?? rows[0];
      const dests = (arg?.to ?? ['PMI', 'AYT', 'JFK']).map(ap).filter((x): x is AirportRow => !!x);
      return {
        title: t(`Ab ${from[2]}: Betrag nach Ziel`, `From ${from[2]}: amount by destination`, `Au départ de ${from[2]} : montant selon la destination`), cta: w.cta,
        inputs: [{ id: 'to', label: L === 'de' ? 'Ziel' : 'Destination', def: d('to', 0), options: dests.map((r, i) => ({ value: String(i), label: `${r[2] || r[1]} (${r[0]})` })) }, { id: 'h', label: w.h, def: d('h', 3.5), unit: w.hUnit, max: 48, decimals: 2 }],
        run: (v): MiniOut => {
          const to = dests[v.to] ?? dests[0];
          const A = toAirport(from), B = toAirport(to);
          const r = compute({ from: A, to: B, carrier: from[6] === 'ca' ? 'ca' : from[6] === 'gb' ? 'gb' : 'eu', event: 'delay', arrivalDelayMin: Math.round(v.h * 60), flightDate: '2026-10-22', cause: 'airline', apprCategory: 'control' });
          const name: Record<string, string> = { eu261: w.eu, eu2027: w.eu27, uk261: w.uk, appr: L === 'fr' ? 'RPPA' : 'APPR' };
          const main = r.regimes[0];
          return { head: [main ? name[main.id] : w.eu, main ? (main.amount ? formatMoney(main.amount, 0, L, main.currency) : w.nothing) : w.nothing], rows: [[w.km, `${formatNumber(Math.round(greatCircleKm(A, B)), 0, L)} km${inEuArea(A.zone) && inEuArea(B.zone) ? (L === 'de' ? ' (EU)' : ' (EU)') : ''}`], ...r.regimes.slice(1).map((x) => [name[x.id], x.amount ? formatMoney(x.amount, 0, L, x.currency) : w.nothing] as [string, string])] };
        },
      };
    }
    default: throw new Error(`Unknown mini kind ${kind}`);
  }
}
export const MINI_KINDS = ['band', 'delay', 'appr', 'cancel', 'rail', 'baggage', 'deadline', 'route'];
