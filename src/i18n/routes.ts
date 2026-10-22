import { makeRouter, type RouteDef } from './routes-core';
import { PAGES } from '../lib/pages';
/** Allemand d'abord (le plus gros marché : Fluggastrechte), anglais partout (Royaume-Uni, voyageurs
 *  étrangers, Canada anglophone), français pour le Canada seulement (APPR). Routes partielles : une
 *  page n'existe que dans les langues où on la cherche, et le hreflang ne relie que les paires réelles. */
export const LOCALES = ['de', 'en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'de';
const R = (id: string, de: string, en: string, fr: string, noindex = false) => ({ id, paths: { de: `/de/${de}/`, en: `/en/${en}/`, fr: `/fr/${fr}/` }, ...(noindex ? { noindex } : {}) });
const CORE: RouteDef<Locale>[] = [
  R('method', 'methodik', 'method', 'methode'),
  R('about', 'ueber-uns', 'about', 'a-propos'),
  R('widget', 'widget', 'widget', 'widget', true),
  R('contact', 'kontakt', 'contact', 'contact', true),
  R('editorial', 'redaktionelle-grundsaetze', 'editorial-policy', 'politique-editoriale', true),
  R('privacy', 'datenschutz', 'privacy', 'confidentialite', true),
  R('terms', 'impressum', 'legal-notice', 'mentions-legales', true),
  R('cookies', 'cookies', 'cookies', 'cookies', true),
];
/** Une page de contenu : chemin `/<langue>/<slug>/`, ou la racine de la langue quand le slug est vide. */
const pathOf = (l: Locale, slug: string) => (slug ? `/${l}/${slug}/` : `/${l}/`);
const G = (g: (typeof PAGES)[number]): RouteDef<Locale> => ({
  id: g.id,
  paths: Object.fromEntries(LOCALES.filter((l) => g[l]).map((l) => [l, pathOf(l, g[l]!.slug)])) as Partial<Record<Locale, string>>,
});
export const ROUTES: RouteDef<Locale>[] = [...PAGES.map(G), ...CORE];
export const { NOINDEX_PATHS, route, hasRoute, altPaths } = makeRouter(LOCALES, ROUTES);
/** Accueil d'une langue : le français ne couvre que le Canada. */
export const homeOf = (l: Locale) => (l === 'fr' ? route('ca', 'fr') : route('home', l));
