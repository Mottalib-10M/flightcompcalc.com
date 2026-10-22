/**
 * Calculateurs secondaires (un composant, quatre modes) : train (Fahrgastrechte), bagages (Convention de
 * Montréal), délais pour réclamer, distance entre deux aéroports. Même règle de premier rendu que FlightCalc.
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import AirportField, { loadAll, topRows } from './AirportField';
import { railRefund, type Season } from '../../lib/engine/rail';
import { band, bandUk, deadlines, greatCircleKm, inEuArea, sdrTo, SDR, toAirport, type AirportRow } from '../../lib/engine/flight';
import { formatMoney, formatNumber, displayDate, TAG, type Lang, type Cur } from '../../lib/format';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import P from '../../data/params-2026.json';
import type { ToolArg } from '../../lib/tool-types';

const X = {
  de: {
    fare: 'Fahrpreis', delay: 'Verspätung am Ziel (Minuten)', ticket: 'Fahrkarte', tickets: { none: 'Einzelfahrkarte / Sparpreis / Flexpreis', fern2: 'Zeitkarte Fernverkehr, 2. Klasse', fern1: 'Zeitkarte Fernverkehr, 1. Klasse', nah2: 'Zeitkarte Nahverkehr, 2. Klasse', nah1: 'Zeitkarte Nahverkehr, 1. Klasse', bc100_2: 'BahnCard 100, 2. Klasse', bc100_1: 'BahnCard 100, 1. Klasse' }, delays: 'Verspätungen ab 60 Min. im Geltungszeitraum',
    railHead: 'Entschädigung', railRule: { 'under-60': 'Unter 60 Minuten: keine Entschädigung.', 'pct-25': '60 bis 119 Minuten: 25 % des Fahrpreises.', 'pct-50': 'Ab 120 Minuten: 50 % des Fahrpreises.', 'below-4': 'Betrag unter 4 €: wird nicht ausgezahlt.', season: 'Pauschale je Verspätung ab 60 Minuten.', 'season-capped': 'Pauschalen gedeckelt auf 25 % des Zeitkartenwerts.' },
    railNote: 'Ab 20 Minuten erwarteter Verspätung dürfen Sie einen anderen Zug nehmen; Taxi oder anderes Verkehrsmittel bis 120 €, wenn Sie zwischen 0 und 5 Uhr mindestens 60 Minuten später ankämen oder die letzte Verbindung ausfällt.',
    value: 'Wert des Schadens', cur: 'Währung', bagType: 'Was ist passiert?', bag: { delayed: 'Verspätet', lost: 'Verloren', damaged: 'Beschädigt' },
    bagHead: 'Höchstens erstattet (Montrealer Übereinkommen)', cap: 'Haftungsgrenze 1 519 SZR', rate: 'Kurs des IWF vom', claimBy: 'Schriftlich melden bis', bagDays: { delayed: '21 Tage nach Erhalt des Gepäcks', lost: 'so bald wie möglich; als verloren gilt Gepäck nach 21 Tagen', damaged: '7 Tage nach Erhalt' }, action: 'Klagefrist: 2 Jahre',
    date: 'Datum des Flugs', law: 'Anwendbares Recht', laws: { eu: 'EU / Deutschland', uk: 'Vereinigtes Königreich', ca: 'Kanada (APPR)' }, dlHead: 'Spätester Termin',
    from: 'Abflughafen', to: 'Zielflughafen', placeholder: 'Stadt, Flughafen oder IATA-Code', noMatch: 'Kein Flughafen gefunden', distHead: 'Großkreisentfernung', bands: ['bis 1 500 km', '1 500 bis 3 500 km', 'über 3 500 km'], amountEu: 'EU261 ab 3 Std.', amountUk: 'UK261 ab 3 Std.', intraNote: 'Innerhalb der EU über 3 500 km: Stufe 400 €.',
  },
  en: {
    fare: 'Ticket price', delay: 'Delay at destination (minutes)', ticket: 'Ticket', tickets: { none: 'Single ticket / Saver / Flex fare', fern2: 'Long-distance season ticket, 2nd class', fern1: 'Long-distance season ticket, 1st class', nah2: 'Local season ticket, 2nd class', nah1: 'Local season ticket, 1st class', bc100_2: 'BahnCard 100, 2nd class', bc100_1: 'BahnCard 100, 1st class' }, delays: 'Delays of 60 min or more during validity',
    railHead: 'Compensation', railRule: { 'under-60': 'Under 60 minutes: no compensation.', 'pct-25': '60 to 119 minutes: 25% of the fare.', 'pct-50': '120 minutes or more: 50% of the fare.', 'below-4': 'Under €4: not paid out.', season: 'Flat amount per delay of 60 minutes or more.', 'season-capped': 'Flat amounts capped at 25% of the season ticket value.' },
    railNote: 'From 20 minutes of expected delay you may take another train; a taxi or other transport up to €120 if you would arrive at least 60 minutes late between midnight and 5 a.m., or if the last connection is cancelled.',
    value: 'Value of the loss', cur: 'Currency', bagType: 'What happened?', bag: { delayed: 'Delayed', lost: 'Lost', damaged: 'Damaged' },
    bagHead: 'Maximum refunded (Montreal Convention)', cap: 'Liability limit 1,519 SDR', rate: 'IMF rate of', claimBy: 'Write to the airline within', bagDays: { delayed: '21 days of getting the bag back', lost: 'as soon as possible; a bag counts as lost after 21 days', damaged: '7 days of receipt' }, action: 'Court time limit: 2 years',
    date: 'Flight date', law: 'Applicable law', laws: { eu: 'EU / Germany', uk: 'United Kingdom', ca: 'Canada (APPR)' }, dlHead: 'Last day',
    from: 'Departure airport', to: 'Destination airport', placeholder: 'City, airport or IATA code', noMatch: 'No airport found', distHead: 'Great-circle distance', bands: ['up to 1,500 km', '1,500 to 3,500 km', 'over 3,500 km'], amountEu: 'EU261 from 3 h', amountUk: 'UK261 from 3 h', intraNote: 'Within the EU over 3,500 km: €400 band.',
  },
  fr: {
    fare: 'Prix du billet', delay: 'Retard à l’arrivée (minutes)', ticket: 'Titre de transport', tickets: { none: 'Billet simple', fern2: 'Abonnement grandes lignes, 2e classe', fern1: 'Abonnement grandes lignes, 1re classe', nah2: 'Abonnement régional, 2e classe', nah1: 'Abonnement régional, 1re classe', bc100_2: 'BahnCard 100, 2e classe', bc100_1: 'BahnCard 100, 1re classe' }, delays: 'Retards de 60 min ou plus pendant la validité',
    railHead: 'Indemnité', railRule: { 'under-60': 'Moins de 60 minutes : rien.', 'pct-25': '60 à 119 minutes : 25 % du prix.', 'pct-50': '120 minutes ou plus : 50 % du prix.', 'below-4': 'Moins de 4 € : non versé.', season: 'Forfait par retard de 60 minutes ou plus.', 'season-capped': 'Forfaits plafonnés à 25 % de la valeur de l’abonnement.' },
    railNote: 'Dès 20 minutes de retard prévu, vous pouvez prendre un autre train ; taxi jusqu’à 120 € si vous arriveriez avec au moins 60 minutes de retard entre minuit et 5 h, ou si la dernière correspondance est supprimée.',
    value: 'Valeur du préjudice', cur: 'Devise', bagType: 'Que s’est-il passé ?', bag: { delayed: 'Retardé', lost: 'Perdu', damaged: 'Endommagé' },
    bagHead: 'Remboursement maximal (Convention de Montréal)', cap: 'Limite de 1 519 DTS', rate: 'Cours du FMI du', claimBy: 'Réclamer par écrit dans les', bagDays: { delayed: '21 jours suivant la remise du bagage', lost: 'meilleurs délais ; un bagage est réputé perdu après 21 jours', damaged: '7 jours suivant la réception' }, action: 'Délai pour poursuivre : 2 ans',
    date: 'Date du vol', law: 'Droit applicable', laws: { eu: 'UE / Allemagne', uk: 'Royaume-Uni', ca: 'Canada (RPPA)' }, dlHead: 'Dernier jour',
    from: 'Aéroport de départ', to: 'Aéroport d’arrivée', placeholder: 'Ville, aéroport ou code IATA', noMatch: 'Aucun aéroport trouvé', distHead: 'Distance orthodromique', bands: ['jusqu’à 1 500 km', '1 500 à 3 500 km', 'plus de 3 500 km'], amountEu: 'CE 261 dès 3 h', amountUk: 'UK261 dès 3 h', intraNote: 'Dans l’UE au-delà de 3 500 km : tranche de 400 €.',
  },
};
const DL: Record<Lang, Record<string, string>> = {
  de: { 'de-limitation': 'Verjährung (§§ 195, 199 BGB)', 'eu2027-request': 'Antrag an die Airline (9 Monate, neues Recht)', 'uk-england-wales': 'Klage in England und Wales (6 Jahre)', 'uk-scotland': 'Klage in Schottland (5 Jahre)', 'appr-request': 'Antrag an die Airline (1 Jahr)' },
  en: { 'de-limitation': 'Time limit in Germany (BGB s. 195, 199)', 'eu2027-request': 'Claim to the airline (9 months, new rules)', 'uk-england-wales': 'Court claim, England and Wales (6 years)', 'uk-scotland': 'Court claim, Scotland (5 years)', 'appr-request': 'Request to the airline (one year)' },
  fr: { 'de-limitation': 'Prescription en Allemagne (BGB)', 'eu2027-request': 'Demande à la compagnie (9 mois, nouveau régime)', 'uk-england-wales': 'Action en Angleterre et pays de Galles (6 ans)', 'uk-scotland': 'Action en Écosse (5 ans)', 'appr-request': 'Demande au transporteur (un an)' },
};
const box = 'rounded-xl border border-navy-200 bg-white p-4 shadow-sm sm:p-5';
const res = 'mt-5 rounded-xl bg-navy-50 p-4 sm:p-5';

interface Props { kind: 'rail' | 'baggage' | 'deadline' | 'distance'; lang: Lang; arg?: string; methodHref: string; idPrefix?: string }
export default function SmallTools(p: Props) {
  const a: ToolArg = p.arg ? JSON.parse(p.arg) : {};
  if (p.kind === 'rail') return <Rail {...p} a={a} />;
  if (p.kind === 'baggage') return <Baggage {...p} a={a} />;
  if (p.kind === 'deadline') return <Deadline {...p} a={a} />;
  return <Distance {...p} a={a} />;
}
type SP = Props & { a: ToolArg };

function Rail({ lang, a, idPrefix = 'r' }: SP) {
  const T = X[lang];
  const [fare, setFare] = useState(a.fare ?? 79.9);
  const [delay, setDelay] = useState(a.delay ?? 75);
  const [season, setSeason] = useState<Season>('none');
  const [n, setN] = useState(1);
  useEffect(() => { const u = readParams(window.location.search); setFare(num(u, 'preis', a.fare ?? 79.9)); setDelay(num(u, 'min', a.delay ?? 75)); const s = str(u, 'karte', 'none'); if (s in T.tickets) setSeason(s as Season); }, []);
  useEffect(() => { updateURL({ preis: fare, min: delay, karte: season === 'none' ? undefined : season }); }, [fare, delay, season]);
  const r = useMemo(() => railRefund({ fare, delayMin: delay, season, delays: n }), [fare, delay, season, n]);
  return (
    <div className={box}>
      <form onSubmit={(e) => e.preventDefault()} className="grid gap-x-4 gap-y-1 sm:grid-cols-3 sm:grid-rows-[auto_auto_auto]">
        <NumberField id={`${idPrefix}-preis`} label={T.fare} value={fare} onChange={setFare} unit="€" max={20000} decimals={2} lang={lang} />
        <NumberField id={`${idPrefix}-min`} label={T.delay} value={delay} onChange={setDelay} unit="min" max={1440} lang={lang} />
        <SelectField id={`${idPrefix}-karte`} label={T.ticket} value={season} onChange={(v) => setSeason(v as Season)} options={Object.entries(T.tickets).map(([value, label]) => ({ value, label }))} />
        {season !== 'none' && <NumberField id={`${idPrefix}-n`} label={T.delays} value={n} onChange={setN} max={60} lang={lang} />}
      </form>
      <div data-resultat aria-live="polite" className={res}>
        <p className="text-sm font-medium text-navy-600">{T.railHead}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{formatMoney(r.amount, 2, lang, 'EUR')}</p>
        <p className="mt-1 text-sm text-navy-700">{T.railRule[r.rule as keyof typeof T.railRule]}</p>
        <p className="mt-3 text-sm text-navy-600">{T.railNote}</p>
      </div>
    </div>
  );
}

function Baggage({ lang, a, idPrefix = 'b' }: SP) {
  const T = X[lang];
  const [cur, setCur] = useState<Cur>(a.cur ?? (lang === 'fr' ? 'CAD' : lang === 'en' ? 'GBP' : 'EUR'));
  const [value, setValue] = useState(a.fare ?? 1200);
  const [type, setType] = useState<'delayed' | 'lost' | 'damaged'>('lost');
  useEffect(() => { const u = readParams(window.location.search); setValue(num(u, 'wert', a.fare ?? 1200)); const c = str(u, 'cur', ''); if (c === 'EUR' || c === 'GBP' || c === 'CAD') setCur(c); }, []);
  useEffect(() => { updateURL({ wert: value, cur, art: type }); }, [value, cur, type]);
  const cap = sdrTo(P.montreal.baggage_sdr, cur);
  const date = cur === 'EUR' ? SDR.eur_date : cur === 'GBP' ? SDR.gbp_date : SDR.cad_date;
  return (
    <div className={box}>
      <form onSubmit={(e) => e.preventDefault()} className="grid gap-x-4 gap-y-1 sm:grid-cols-3 sm:grid-rows-[auto_auto_auto]">
        <NumberField id={`${idPrefix}-wert`} label={T.value} value={value} onChange={setValue} unit={cur === 'EUR' ? '€' : cur === 'GBP' ? '£' : '$'} max={100000} lang={lang} />
        <SelectField id={`${idPrefix}-cur`} label={T.cur} value={cur} onChange={(v) => setCur(v as Cur)} options={[{ value: 'EUR', label: 'EUR (€)' }, { value: 'GBP', label: 'GBP (£)' }, { value: 'CAD', label: 'CAD ($)' }]} />
        <Toggle id={`${idPrefix}-art`} label={T.bagType} value={type} onChange={(v) => setType(v as typeof type)} options={(['delayed', 'lost', 'damaged'] as const).map((k) => ({ value: k, label: T.bag[k] }))} />
      </form>
      <div data-resultat aria-live="polite" className={res}>
        <p className="text-sm font-medium text-navy-600">{T.bagHead}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{formatMoney(Math.min(value, cap), 0, lang, cur)}</p>
        <p className="mt-1 text-sm text-navy-700">{T.cap} = {formatMoney(cap, 0, lang, cur)} · {T.rate} {displayDate(date, TAG[lang])}</p>
        <p className="mt-2 text-sm text-navy-700">{T.claimBy} {T.bagDays[type]}. {T.action}.</p>
      </div>
    </div>
  );
}

function Deadline({ lang, a, idPrefix = 'd' }: SP) {
  const T = X[lang];
  const [date, setDate] = useState(a.date ?? '2025-06-15');
  const [law, setLaw] = useState<'eu' | 'uk' | 'ca'>(a.law ?? (lang === 'fr' ? 'ca' : 'eu'));
  const [today, setToday] = useState(__BUILD_DAY__);
  useEffect(() => { setToday(new Date().toISOString().slice(0, 10)); const u = readParams(window.location.search); const d = str(u, 'datum', ''); if (/^\d{4}-\d{2}-\d{2}$/.test(d)) setDate(d); const l = str(u, 'recht', ''); if (l === 'eu' || l === 'uk' || l === 'ca') setLaw(l); }, []);
  useEffect(() => { updateURL({ datum: date, recht: law }); }, [date, law]);
  const id = law === 'uk' ? 'uk261' : law === 'ca' ? 'appr' : date >= P.eu261_2027.applies_from ? 'eu2027' : 'eu261';
  const list = deadlines(id, date);
  const days = (iso: string) => Math.round((Date.parse(`${iso}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 864e5);
  const word = { de: ['noch', 'Tage', 'abgelaufen seit'], en: ['', 'days left', 'expired'], fr: ['encore', 'jours', 'expiré depuis'] }[lang];
  return (
    <div className={box}>
      <form onSubmit={(e) => e.preventDefault()} className="grid gap-x-4 gap-y-1 sm:grid-cols-2 sm:grid-rows-[auto_auto_auto]">
        <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
          <label htmlFor={`${idPrefix}-datum`} className="mb-1 block text-sm font-medium text-navy-700">{T.date}</label>
          <input id={`${idPrefix}-datum`} type="date" value={date} min="2010-01-01" max="2030-12-31" onChange={(e) => e.target.value && setDate(e.target.value)} className="h-12 w-full rounded-lg border border-navy-300 bg-white px-3 text-navy-900" />
        </div>
        <Toggle id={`${idPrefix}-recht`} label={T.law} value={law} onChange={(v) => setLaw(v as typeof law)} options={(['eu', 'uk', 'ca'] as const).map((k) => ({ value: k, label: T.laws[k] }))} />
      </form>
      <div data-resultat aria-live="polite" className={res}>
        <p className="text-sm font-medium text-navy-600">{T.dlHead}</p>
        <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{displayDate(list[0].date, TAG[lang])}</p>
        <ul className="mt-3 space-y-1 text-sm text-navy-700">
          {list.map((d) => { const n = days(d.date); return <li key={d.kind}><strong>{DL[lang][d.kind]}</strong> : {displayDate(d.date, TAG[lang])} · {n >= 0 ? (lang === 'en' ? `${formatNumber(n, 0, lang)} ${word[1]}` : `${word[0]} ${formatNumber(n, 0, lang)} ${word[1]}`) : `${word[2]} ${formatNumber(-n, 0, lang)} ${lang === 'en' ? 'days ago' : word[1]}`}</li>; })}
        </ul>
      </div>
    </div>
  );
}

function Distance({ lang, a, idPrefix = 'k' }: SP) {
  const T = X[lang];
  const pick = (c: string | undefined, fb: string) => topRows.find((r) => r[0] === c) ?? topRows.find((r) => r[0] === fb)!;
  const [from, setFrom] = useState<AirportRow>(pick(a.from, 'FRA'));
  const [to, setTo] = useState<AirportRow>(pick(a.to, 'LPA'));
  useEffect(() => { const u = readParams(window.location.search); if (!u.toString()) return; loadAll().then((all) => { const f = all.find((r) => r[0] === u.get('von')); const t = all.find((r) => r[0] === u.get('nach')); if (f) setFrom(f); if (t) setTo(t); }); }, []);
  useEffect(() => { updateURL({ von: from[0], nach: to[0] }); }, [from, to]);
  const A = toAirport(from), B = toAirport(to);
  const km = greatCircleKm(A, B);
  const intra = inEuArea(A.zone) && inEuArea(B.zone);
  const b = band(km, intra), bu = bandUk(km);
  return (
    <div className={box}>
      <form onSubmit={(e) => e.preventDefault()} className="grid gap-4 sm:grid-cols-2">
        <AirportField id={`${idPrefix}-von`} label={T.from} value={from} onChange={setFrom} placeholder={T.placeholder} noMatch={T.noMatch} />
        <AirportField id={`${idPrefix}-nach`} label={T.to} value={to} onChange={setTo} placeholder={T.placeholder} noMatch={T.noMatch} />
      </form>
      <div data-resultat aria-live="polite" className={res}>
        <p className="text-sm font-medium text-navy-600">{T.distHead}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{formatNumber(Math.round(km), 0, lang)} km</p>
        <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
          <tr><td className="py-1.5 text-navy-600">{T.amountEu}</td><td className="tabular-nums py-1.5 text-right font-semibold text-navy-900">{formatMoney(P.eu261.amounts[b], 0, lang, 'EUR')} · {T.bands[intra && km > 3500 ? 1 : b]}</td></tr>
          <tr><td className="py-1.5 text-navy-600">{T.amountUk}</td><td className="tabular-nums py-1.5 text-right font-semibold text-navy-900">{formatMoney(P.uk261.amounts[bu], 0, lang, 'GBP')} · {T.bands[bu]}</td></tr>
        </tbody></table>
        {intra && km > 3500 && <p className="mt-2 text-sm text-navy-700">{T.intraNote}</p>}
      </div>
    </div>
  );
}
