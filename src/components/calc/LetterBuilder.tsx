/** Lettre de réclamation : composée dans le navigateur, jamais envoyée, jamais mise dans l'adresse. */
import { useMemo, useState } from 'react';
import { letterText } from '../../lib/letter';
import type { RegimeResult, EventKind } from '../../lib/engine/flight';
import type { Lang } from '../../lib/format';

const L = {
  de: { title: 'Anspruchsschreiben an die Airline erstellen', intro: 'Ihre Angaben bleiben in diesem Browserfenster: Sie werden weder gespeichert noch übertragen, auch nicht in den Link.', name: 'Name', address: 'Anschrift', airline: 'Airline', flight: 'Flugnummer', booking: 'Buchungscode', pax: 'Anzahl Fluggäste', iban: 'IBAN (freiwillig)', copy: 'Text kopieren', copied: 'Kopiert', print: 'Drucken', dl: 'Als .txt speichern', file: 'anspruchsschreiben' },
  en: { title: 'Write the claim letter to the airline', intro: 'What you type stays in this browser tab: it is never stored or sent, and never put in the link.', name: 'Name', address: 'Address', airline: 'Airline', flight: 'Flight number', booking: 'Booking reference', pax: 'Number of passengers', iban: 'IBAN or bank details (optional)', copy: 'Copy text', copied: 'Copied', print: 'Print', dl: 'Save as .txt', file: 'claim-letter' },
  fr: { title: 'Rédiger la lettre de réclamation', intro: 'Vos renseignements restent dans cet onglet : ils ne sont ni enregistrés ni transmis, ni ajoutés au lien.', name: 'Nom', address: 'Adresse', airline: 'Compagnie', flight: 'Numéro de vol', booking: 'Code de réservation', pax: 'Nombre de passagers', iban: 'Coordonnées bancaires (facultatif)', copy: 'Copier le texte', copied: 'Copié', print: 'Imprimer', dl: 'Enregistrer en .txt', file: 'lettre-reclamation' },
};
interface Props { lang: Lang; regime: RegimeResult; event: EventKind; delayMin: number; date: string; fromLabel: string; toLabel: string; idPrefix: string }
export default function LetterBuilder({ lang, regime, event, delayMin, date, fromLabel, toLabel, idPrefix }: Props) {
  const S = L[lang];
  const [f, setF] = useState({ name: '', address: '', airline: '', flight: '', booking: '', iban: '' });
  const [pax, setPax] = useState(1);
  const [ok, setOk] = useState(false);
  const [open, setOpen] = useState(false);
  const text = useMemo(() => (open ? letterText(lang, { ...f, passengers: pax, date, fromLabel, toLabel, event, delayMin, today: new Date().toISOString().slice(0, 10) }, regime) : ''), [open, lang, f, pax, date, fromLabel, toLabel, event, delayMin, regime]);
  const field = (k: keyof typeof f, label: string, wide = false) => (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <label htmlFor={`${idPrefix}-l-${k}`} className="mb-1 block text-sm font-medium text-navy-700">{label}</label>
      <input id={`${idPrefix}-l-${k}`} type="text" autoComplete="off" value={f[k]} onChange={(e) => setF((o) => ({ ...o, [k]: e.target.value }))} className="h-11 w-full rounded-lg border border-navy-300 bg-white px-3 text-navy-900" />
    </div>
  );
  const download = () => { const b = new Blob([text], { type: 'text/plain;charset=utf-8' }); const u = URL.createObjectURL(b); const x = document.createElement('a'); x.href = u; x.download = `${S.file}.txt`; x.click(); URL.revokeObjectURL(u); };
  const print = () => { const w = window.open('', '_blank'); if (!w) return; const pre = w.document.createElement('pre'); pre.style.cssText = 'font:14px/1.5 system-ui;white-space:pre-wrap;margin:2cm'; pre.textContent = text; w.document.body.appendChild(pre); w.print(); };
  return (
    <details className="mt-4 rounded-xl border border-navy-200 bg-white p-4" onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}>
      <summary className="cursor-pointer font-semibold text-accent-700">{S.title}</summary>
      {open && (<>
        <p className="mt-2 text-sm text-navy-600">{S.intro}</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {field('name', S.name)}{field('airline', S.airline)}{field('address', S.address, true)}{field('flight', S.flight)}{field('booking', S.booking)}
          <div>
            <label htmlFor={`${idPrefix}-l-pax`} className="mb-1 block text-sm font-medium text-navy-700">{S.pax}</label>
            <input id={`${idPrefix}-l-pax`} type="text" inputMode="numeric" value={String(pax)} onChange={(e) => setPax(Math.max(1, Math.min(20, parseInt(e.target.value.replace(/\D/g, '') || '1', 10))))} className="h-11 w-full rounded-lg border border-navy-300 bg-white px-3 text-right text-navy-900" />
          </div>
          {field('iban', S.iban)}
        </div>
        <label htmlFor={`${idPrefix}-l-text`} className="sr-only">{S.title}</label>
        <textarea id={`${idPrefix}-l-text`} readOnly value={text} rows={16} className="mt-3 w-full rounded-lg border border-navy-200 bg-navy-50 p-3 font-mono text-xs text-navy-900" />
        <p className="mt-2 flex flex-wrap gap-2">
          <button type="button" onClick={() => navigator.clipboard?.writeText(text).then(() => { setOk(true); setTimeout(() => setOk(false), 1500); })} className="rounded-lg bg-accent-600 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-700">{ok ? S.copied : S.copy}</button>
          <button type="button" onClick={print} className="rounded-lg border border-navy-300 px-4 py-2 text-sm font-semibold text-navy-800">{S.print}</button>
          <button type="button" onClick={download} className="rounded-lg border border-navy-300 px-4 py-2 text-sm font-semibold text-navy-800">{S.dl}</button>
        </p>
      </>)}
    </details>
  );
}
