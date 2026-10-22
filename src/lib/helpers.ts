/** Outils d'écriture (`Helpers`) passés au corps de chaque page, dans sa langue. */
import { route, ROUTES, hasRoute, LOCALES, type Locale } from '../i18n/routes';
import type { Helpers, MiniOpts } from './page-types';
import { formatMoney, formatNumber, displayDate, TAG, type Lang } from './format';
import P from '../data/params-2026.json';
import { PLANNED_IDS } from './planned';
import { airport } from './airports';
import { compute, greatCircleKm, type Cause } from './engine/flight';

const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
type Src = { url: string; url_fr?: string; label: Record<Lang, string> };
const RAW = (P as unknown as { sources: Record<string, Src> }).sources;
export const SOURCES = (lang: Lang): Record<string, { url: string; label: string }> =>
  Object.fromEntries(Object.entries(RAW).map(([k, v]) => [k, { url: lang === 'fr' ? v.url_fr ?? v.url : v.url, label: v.label[lang] }]));
export const sourceList = (keys: string[], lang: Lang) => { const S = SOURCES(lang); return keys.map((k) => { if (!S[k]) throw new Error(`Unknown source ${k}`); return { name: S[k].label, url: S[k].url }; }); };
export function table(headers: string[], rows: Array<Array<string | number>>, caption?: string, align: Array<'l' | 'r'> = [], lang: Lang = 'de') {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-700">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="border-b-2 border-navy-200 px-3 py-2 font-semibold text-navy-900 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumber(c, 0, lang)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
export const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
/** Lien interne : la page dans la langue de lecture, sinon sa version anglaise (hreflang posé). */
export function link(id: string, text: string, lang: Lang) {
  if (!ROUTES.some((r) => r.id === id)) { if (process.env.VITEST && !PLANNED_IDS.has(id)) throw new Error(`Unknown page id in link: ${id}`); return text; }
  if (hasRoute(id, lang as Locale)) return `<a href="${route(id, lang as Locale)}">${text}</a>`;
  const alt = (['en', ...LOCALES] as Locale[]).find((l) => hasRoute(id, l))!;
  return `<a href="${route(id, alt)}" hreflang="${alt}">${text}</a>`;
}
export const box = (title: string, html: string) => `<aside class="boxnote not-prose"><p class="boxnote-title">${title}</p><div class="text-navy-800">${html}</div></aside>`;
export const mini = (kind: string, arg?: MiniOpts) => `<!--mini:${kind}${arg === undefined ? '' : `|${Buffer.from(JSON.stringify(arg)).toString('base64')}`}-->`;
export const srcLink = (key: string, lang: Lang, text?: string) => { const s = SOURCES(lang)[key]; if (!s) throw new Error(`Unknown source ${key}`); return ext(s.url, text ?? s.label); };

const STATUS: Record<Lang, Record<string, string>> = {
  de: { owed: 'geschuldet', 'likely-exempt': 'entfällt bei außergewöhnlichen Umständen', none: 'kein Anspruch', 'out-of-scope': 'nicht anwendbar' },
  en: { owed: 'owed', 'likely-exempt': 'not owed if extraordinary', none: 'nothing owed', 'out-of-scope': 'does not apply' },
  fr: { owed: 'due', 'likely-exempt': 'non due si circonstance extraordinaire', none: 'rien de dû', 'out-of-scope': 'ne s’applique pas' },
};
export const REGIME_NAME: Record<Lang, Record<string, string>> = {
  de: { eu261: 'Verordnung (EG) 261/2004', eu2027: 'Verordnung 261/2004 i. d. F. 2026/2202', uk261: 'UK261', appr: 'APPR (Kanada)' },
  en: { eu261: 'EU261', eu2027: 'EU261 as amended by 2026/2202', uk261: 'UK261', appr: 'APPR (Canada)' },
  fr: { eu261: 'Règlement (CE) 261/2004', eu2027: 'Règlement 261/2004 modifié (2026/2202)', uk261: 'UK261', appr: 'RPPA (Canada)' },
};
export function helpers(lang: Lang): Helpers {
  const money = (cur: 'EUR' | 'GBP' | 'CAD') => (x: number, d = 0) => formatMoney(x, d, lang, cur);
  return {
    lang, P,
    a: (id, text) => link(id, text, lang),
    table: (hd, rows, cap, al) => table(hd, rows, cap, al, lang),
    src: (key, text) => srcLink(key, lang, text), ext, box, mini,
    eur: money('EUR'), gbp: money('GBP'), cad: money('CAD'),
    n: (x, d = 0) => formatNumber(x, d, lang), day: (iso) => displayDate(iso, TAG[lang]),
    dist: (f, t) => greatCircleKm(airport(f), airport(t)),
    km: (f, t) => `${formatNumber(Math.round(greatCircleKm(airport(f), airport(t))), 0, lang)} km`,
    ap: (c) => `${airport(c).name} (${c.toUpperCase()})`,
    owed: (f, t, d, o = {}) => compute({ from: airport(f), to: airport(t), carrier: o.carrier ?? 'eu', event: o.event ?? 'delay', arrivalDelayMin: d, flightDate: o.date ?? '2026-10-22', cause: (o.cause ?? 'technical') as Cause, apprSize: o.size, apprCategory: o.cause ? undefined : 'control' })
      .regimes.map((r) => ({ regime: REGIME_NAME[lang][r.id], amount: r.amount ? formatMoney(r.amount, 0, lang, r.currency) : '–', status: STATUS[lang][r.status] })),
  };
}
