/**
 * Calculateur principal : deux aéroports, l'événement, le retard à l'arrivée, la cause, la compagnie,
 * la date → montant exact selon CE 261 (avant/après 2026/2202), UK261 et APPR, délais, lettre.
 * Premier rendu = valeurs par défaut du build (RECETTE §17.4) ; l'adresse ne porte que le trajet et
 * les réglages, jamais les données personnelles de la lettre.
 */
import { useEffect, useMemo, useState } from 'react';
import AirportField, { loadAll, topRows, rowLabel } from './AirportField';
import LetterBuilder from './LetterBuilder';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { compute, deadlines, toAirport, type AirportRow, type Carrier, type Cause, type EventKind, type ApprSize, type RegimeResult } from '../../lib/engine/flight';
import { TOOL, RULES } from '../../lib/tool-i18n';
import { formatMoney, formatNumber, displayDate, TAG, type Lang } from '../../lib/format';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import type { ToolArg } from '../../lib/tool-types';

const CAUSES: Cause[] = ['airline', 'unknown', 'technical', 'crew-strike', 'weather', 'atc', 'airport-strike', 'security', 'medical'];
const CARRIERS: Carrier[] = ['eu', 'gb', 'ca', 'other'];
const byCode = (c: string | undefined, fb: string): AirportRow => topRows.find((r) => r[0] === c) ?? topRows.find((r) => r[0] === fb)!;

interface Props { lang: Lang; arg?: string; methodHref: string; idPrefix?: string; embed?: boolean }
export default function FlightCalc({ lang, arg, methodHref, idPrefix = 'f', embed = false }: Props) {
  const a: ToolArg = arg ? JSON.parse(arg) : {};
  const T = TOOL[lang];
  const [from, setFrom] = useState<AirportRow>(byCode(a.from, 'FRA'));
  const [to, setTo] = useState<AirportRow>(byCode(a.to, 'PMI'));
  const [event, setEvent] = useState<EventKind>(a.event ?? 'delay');
  const [h, setH] = useState(Math.floor((a.delay ?? 200) / 60));
  const [m, setM] = useState((a.delay ?? 200) % 60);
  const [cause, setCause] = useState<Cause>((a.cause as Cause) ?? 'airline');
  const [carrier, setCarrier] = useState<Carrier>(a.carrier ?? 'eu');
  const [date, setDate] = useState(a.date ?? __BUILD_DAY__);
  const [notice, setNotice] = useState(a.notice ?? 3);
  const [rerouted, setRerouted] = useState('yes');
  const [earlier, setEarlier] = useState(0);
  const [size, setSize] = useState<ApprSize>(a.size ?? 'large');
  // Les réglages avancés restent repliés au chargement (le résultat doit tenir dans le premier écran) ;
  // leurs valeurs préréglées s'appliquent quand même et sont rappelées dans le titre du bloc.
  const [adv, setAdv] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const u = readParams(window.location.search);
    if (!u.toString()) return;
    loadAll().then((all) => {
      const f = all.find((r) => r[0] === u.get('von')); const t = all.find((r) => r[0] === u.get('nach'));
      if (f) setFrom(f); if (t) setTo(t);
    });
    const ev = str(u, 'ev', ''); if (ev === 'delay' || ev === 'cancel' || ev === 'denied') setEvent(ev);
    const d = num(u, 'min', NaN); if (!isNaN(d)) { setH(Math.floor(d / 60)); setM(d % 60); }
    const c = str(u, 'grund', ''); if ((CAUSES as string[]).includes(c)) setCause(c as Cause);
    const cr = str(u, 'airline', ''); if ((CARRIERS as string[]).includes(cr)) setCarrier(cr as Carrier);
    const dt = str(u, 'datum', ''); if (/^\d{4}-\d{2}-\d{2}$/.test(dt)) setDate(dt);
    const n = num(u, 'tage', NaN); if (!isNaN(n)) { setNotice(n); setAdv(true); }
    if (u.get('ersatz') === 'no') setRerouted('no');
    const e = num(u, 'frueher', NaN); if (!isNaN(e)) setEarlier(e);
    if (u.get('groesse') === 'small') setSize('small');
  }, []);

  const delayMin = h * 60 + m;
  const res = useMemo(() => compute({
    from: toAirport(from), to: toAirport(to), carrier, event, arrivalDelayMin: delayMin, flightDate: date, cause,
    noticeDays: notice, rerouted: rerouted === 'yes', departEarlierMin: earlier, apprSize: size, refunded: rerouted === 'no',
  }), [from, to, carrier, event, delayMin, date, cause, notice, rerouted, earlier, size]);

  useEffect(() => {
    updateURL({ von: from[0], nach: to[0], ev: event, min: delayMin, grund: cause, airline: carrier, datum: date, tage: event === 'cancel' ? notice : undefined, ersatz: rerouted === 'no' ? 'no' : undefined, frueher: earlier || undefined, groesse: size === 'small' ? 'small' : undefined });
  }, [from, to, event, delayMin, cause, carrier, date, notice, rerouted, earlier, size]);

  const money = (r: RegimeResult, x = r.amount) => formatMoney(x, 0, lang, r.currency);
  const best = res.best && res.best.status !== 'none' ? res.best : null;
  const p = (s: string) => `${idPrefix}-${s}`;
  const owedAny = res.regimes.some((r) => r.status === 'owed');
  const ids = Array.from(new Set(res.regimes.map((r) => r.id)));
  const dl = ids.flatMap((id) => deadlines(id, date).map((d) => ({ ...d, id })));
  const uniq = dl.filter((d, i) => dl.findIndex((x) => x.kind === d.kind) === i);

  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 shadow-sm sm:p-5">
      <form onSubmit={(e) => e.preventDefault()} className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <AirportField id={p('von')} label={T.from} value={from} onChange={setFrom} placeholder={T.placeholder} noMatch={T.noMatch} />
          <AirportField id={p('nach')} label={T.to} value={to} onChange={setTo} placeholder={T.placeholder} noMatch={T.noMatch} />
        </div>
        <div className="grid gap-x-4 gap-y-3 sm:grid-cols-3 sm:grid-rows-[auto_auto_auto]">
          <Toggle id={p('ev')} label={T.event} value={event} onChange={(v) => setEvent(v as EventKind)} className="sm:col-span-3" options={[{ value: 'delay', label: T.evDelay }, { value: 'cancel', label: T.evCancel }, { value: 'denied', label: T.evDenied }]} />
        </div>
        <div className="grid gap-x-4 gap-y-1 sm:grid-cols-4 sm:grid-rows-[auto_auto_auto]">
          <NumberField id={p('h')} label={T.delayH} value={h} onChange={setH} max={72} lang={lang} />
          <NumberField id={p('m')} label={T.delayM} value={m} onChange={setM} max={59} lang={lang} />
          <SelectField id={p('grund')} label={T.cause} value={cause} onChange={(v) => setCause(v as Cause)} options={CAUSES.map((c) => ({ value: c, label: T.causes[c] }))} />
          <SelectField id={p('airline')} label={T.carrier} value={carrier} onChange={(v) => setCarrier(v as Carrier)} options={CARRIERS.map((c) => ({ value: c, label: T.carriers[c] }))} />
        </div>
        <details open={adv} onToggle={(e) => setAdv((e.currentTarget as HTMLDetailsElement).open)} className="rounded-lg border border-navy-200 px-3 py-2">
          <summary className="cursor-pointer text-sm font-semibold text-navy-800">{T.more}{!adv && event === 'cancel' ? <span className="font-normal text-navy-600"> · {T.notice}: {formatNumber(notice, 0, lang)}</span> : null}</summary>
          <div className="mt-3 grid gap-x-4 gap-y-1 pb-2 sm:grid-cols-3 sm:grid-rows-[auto_auto_auto]">
            <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
              <label htmlFor={p('datum')} className="mb-1 block text-sm font-medium text-navy-700">{T.date}</label>
              <input id={p('datum')} type="date" value={date} min="2015-01-01" max="2030-12-31" onChange={(e) => e.target.value && setDate(e.target.value)} className="h-12 w-full self-start rounded-lg border border-navy-300 bg-white px-3 text-navy-900" />
            </div>
            <NumberField id={p('tage')} label={T.notice} value={notice} onChange={setNotice} max={365} lang={lang} />
            <NumberField id={p('frueher')} label={T.earlier} value={earlier} onChange={setEarlier} max={1440} lang={lang} />
            <Toggle id={p('ersatz')} label={T.rerouted} value={rerouted} onChange={setRerouted} options={[{ value: 'yes', label: T.yes }, { value: 'no', label: T.no }]} />
            <Toggle id={p('groesse')} label={T.size} value={size} onChange={(v) => setSize(v as ApprSize)} className="sm:col-span-2" options={[{ value: 'large', label: T.large }, { value: 'small', label: T.small }]} />
          </div>
        </details>
      </form>

      <div data-resultat aria-live="polite" className="mt-5 rounded-xl bg-navy-50 p-4 sm:p-5">
        <p className="text-sm font-medium text-navy-600">{T.resultTitle} · {rowLabel(from)} → {rowLabel(to)}</p>
        {res.regimes.length === 0 ? <p className="mt-2 text-navy-800">{T.noRegime}</p> : (<>
          <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{best && owedAny ? money(best) : best ? money(best) : formatMoney(0, 0, lang, res.regimes[0].currency)}</p>
          <p className="text-sm text-navy-600">{best ? `${T.perPerson} · ${T.status[best.status]}` : T.nothing}</p>
          <ul className="mt-4 space-y-2">
            {res.regimes.map((r) => (
              <li key={r.id} className="rounded-lg border border-navy-200 bg-white p-3 text-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-semibold text-navy-900">{T.regime[r.id]}</span>
                  <span className="tabular-nums font-bold text-navy-900">{r.status === 'none' ? '0' : money(r)} <span className="font-normal text-navy-600">· {T.status[r.status]}{r.reduction ? ` · ${r.reduction === 0.25 ? T.reduced25 : T.reduced} (${money(r, r.fullAmount)})` : ''}</span></span>
                </div>
                <p className="mt-1 text-navy-700">{RULES[lang][r.rule] ?? ''}</p>
              </li>
            ))}
          </ul>
          {res.regimes.some((r) => r.status === 'likely-exempt') && <p className="mt-3 text-sm text-navy-700">{T.exemptNote}</p>}
          {res.regimes.some((r) => r.id === 'eu2027') && <p className="mt-2 text-sm text-navy-700">{T.newLawNote}</p>}
        </>)}
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <div><dt className="text-navy-600">{T.distance}</dt><dd className="tabular-nums font-semibold text-navy-900">{formatNumber(Math.round(res.distanceKm), 0, lang)} km</dd></div>
          <div><dt className="text-navy-600">{T.band}</dt><dd className="font-semibold text-navy-900">{T.bands[res.regimes.find((r) => r.band !== null && r.id !== 'appr')?.band ?? (res.distanceKm <= 1500 ? 0 : res.distanceKm <= 3500 ? 1 : 2)]}{res.intra && res.distanceKm > 3500 ? ` (${T.intra})` : ''}</dd></div>
          {uniq.slice(0, 2).map((d) => <div key={d.kind}><dt className="text-navy-600">{T.deadlines[d.kind as keyof typeof T.deadlines]}</dt><dd className="font-semibold text-navy-900">{displayDate(d.date, TAG[lang])}</dd></div>)}
        </dl>
        <p className="mt-3 flex flex-wrap gap-x-4 text-sm">
          <a href={methodHref} className="font-medium text-accent-700 underline" target={embed ? '_blank' : undefined} rel={embed ? 'noopener' : undefined}>{T.method}</a>
          {!embed && <button type="button" className="font-medium text-accent-700 underline" onClick={() => { navigator.clipboard?.writeText(window.location.href).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }); }}>{copied ? T.copied : T.share}</button>}
        </p>
      </div>
      {!embed && best && best.status !== 'none' && (
        <LetterBuilder lang={lang} regime={best} event={event} delayMin={delayMin} date={date} fromLabel={`${from[2] || from[1]} (${from[0]})`} toLabel={`${to[2] || to[1]} (${to[0]})`} idPrefix={idPrefix} />
      )}
    </div>
  );
}
