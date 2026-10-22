/**
 * Champ « aéroport » : liste déroulante accessible (combobox ARIA). Premier rendu et premières
 * suggestions : la liste courte embarquée (airports-top.json, 101 aéroports) ; dès le premier focus,
 * la liste complète OurAirports (4 008 aéroports à vols réguliers) se charge en arrière-plan.
 */
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import TOP from '../../data/airports-top.json';
import type { AirportRow } from '../../lib/engine/flight';

let FULL: AirportRow[] | null = null;
let loading: Promise<AirportRow[]> | null = null;
export function loadAll(): Promise<AirportRow[]> {
  if (FULL) return Promise.resolve(FULL);
  if (!loading) loading = import('../../data/airports.json').then((m) => (FULL = (m.default as unknown as AirportRow[])));
  return loading;
}
export const topRows = TOP as unknown as AirportRow[];
export const findRow = (iata: string): AirportRow | undefined => (FULL ?? topRows).find((r) => r[0] === iata) ?? topRows.find((r) => r[0] === iata);

const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
export const rowLabel = (r: AirportRow) => `${r[0]} · ${r[2] || r[1]}`;

function search(q: string, rows: AirportRow[]): AirportRow[] {
  const f = fold(q.trim());
  if (!f) return topRows.slice(0, 8);
  const up = q.trim().toUpperCase();
  const scored: Array<[number, AirportRow]> = [];
  for (const r of rows) {
    let s = 0;
    if (r[0] === up) s = 100;
    else if (fold(r[2]).startsWith(f)) s = 60;
    else if (r[0].startsWith(up) && up.length >= 2) s = 50;
    else if (fold(r[1]).includes(f)) s = 30;
    else if (f.length >= 3 && fold(r[2]).includes(f)) s = 20;
    if (s) scored.push([s + r[7] * 5, r]);
  }
  return scored.sort((a, b) => b[0] - a[0]).slice(0, 8).map((x) => x[1]);
}

interface Props { id: string; label: string; value: AirportRow; onChange: (r: AirportRow) => void; placeholder: string; noMatch: string }
export default function AirportField({ id, label, value, onChange, placeholder, noMatch }: Props) {
  const [text, setText] = useState(rowLabel(value));
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [rows, setRows] = useState<AirportRow[]>(FULL ?? topRows);
  const list = useId();
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { if (!open) setText(rowLabel(value)); }, [value, open]);
  const results = useMemo(() => (open ? search(text === rowLabel(value) ? '' : text, rows) : []), [open, text, rows, value]);
  const pick = (r: AirportRow) => { onChange(r); setText(rowLabel(r)); setOpen(false); };
  return (
    <div className="relative">
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-navy-700">{label}</label>
      <input ref={input} id={id} type="text" role="combobox" autoComplete="off" spellCheck={false}
        aria-autocomplete="list" aria-expanded={open} aria-controls={`${list}-lb`} aria-activedescendant={open && results[active] ? `${list}-${results[active][0]}` : undefined}
        value={text} placeholder={placeholder}
        onFocus={(e) => { setOpen(true); setActive(0); e.currentTarget.select(); loadAll().then(setRows); }}
        onChange={(e) => { setText(e.target.value); setOpen(true); setActive(0); }}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive((a) => Math.min(a + 1, results.length - 1)); }
          else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
          else if (e.key === 'Enter' && open && results[active]) { e.preventDefault(); pick(results[active]); }
          else if (e.key === 'Escape') { setOpen(false); setText(rowLabel(value)); }
        }}
        className="h-12 w-full rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
      {open && (
        <ul id={`${list}-lb`} role="listbox" className="absolute z-30 mt-1 max-h-80 w-full overflow-auto rounded-lg border border-navy-200 bg-white py-1 shadow-lg">
          {results.length === 0 && <li className="px-3 py-2 text-sm text-navy-500">{noMatch}</li>}
          {results.map((r, i) => (
            <li key={r[0]} id={`${list}-${r[0]}`} role="option" aria-selected={i === active}
              onMouseDown={(e) => { e.preventDefault(); pick(r); }} onMouseEnter={() => setActive(i)}
              className={`cursor-pointer px-3 py-2 text-sm ${i === active ? 'bg-accent-50 text-accent-800' : 'text-navy-800'}`}>
              <span className="font-semibold tabular-nums">{r[0]}</span> <span>{r[2] || r[1]}</span> <span className="text-navy-500">· {r[1]} · {r[3]}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
