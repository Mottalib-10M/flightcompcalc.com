/**
 * Mini-simulateur de page (RECETTE §9.3) : un à trois champs, le chiffre du sujet de la page et un lien
 * vers le calculateur complet. `data-simulateur-secondaire` : ce n'est pas l'outil principal de la page.
 */
import { useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { getSpec } from '../../lib/mini-specs';
import type { MiniOpts } from '../../lib/page-types';

interface Props { kind: string; lang?: 'de' | 'en' | 'fr'; href?: string; arg?: string; idPrefix?: string }
export default function MiniSim({ kind, lang = 'en', href, arg, idPrefix = 'm' }: Props) {
  const opts: MiniOpts | undefined = arg ? JSON.parse(arg) : undefined;
  const spec = useMemo(() => getSpec(kind, lang, opts), [kind, lang, arg]);
  const [v, setV] = useState<Record<string, number>>(() => Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])));
  const out = useMemo(() => spec.run(v), [v, spec]);
  const set = (id: string) => (x: number) => setV((o) => ({ ...o, [id]: x }));
  return (
    <div data-chrome data-simulateur-secondaire data-mini={kind} className="not-prose my-8 rounded-xl border border-accent-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-base font-semibold text-navy-900">{spec.title}</p>
      <div className="mt-3 grid gap-5 sm:grid-cols-2">
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          {spec.inputs.map((i) => i.options
            ? <SelectField key={i.id} id={`${idPrefix}-${kind}-${i.id}`} label={i.label} value={String(v[i.id])} onChange={(x) => set(i.id)(Number(x))} options={i.options} />
            : <NumberField key={i.id} id={`${idPrefix}-${kind}-${i.id}`} label={i.label} value={v[i.id]} onChange={set(i.id)} unit={i.unit} max={i.max} decimals={i.decimals} lang={lang} />)}
        </form>
        <div aria-live="polite" className="rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">{out.head[0]}</p>
          <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{out.head[1]}</p>
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            {out.rows.map(([l, x]) => <tr key={l}><td className="py-1.5 pr-3 text-navy-600">{l}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{x}</td></tr>)}
          </tbody></table>
          {out.note && <p className="mt-2 text-xs text-navy-500">{out.note}</p>}
        </div>
      </div>
      {href && spec.cta && <a href={href} className="mt-4 inline-block text-sm font-medium text-accent-700 hover:underline">{spec.cta} →</a>}
    </div>
  );
}
