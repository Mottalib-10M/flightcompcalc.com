import { route, hasRoute, homeOf, type Locale } from './routes';
import { PAGES, pageById } from '../lib/pages';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  de: { home: 'Flugentschädigung berechnen', method: 'Methodik', about: 'Über uns', widget: 'Rechner einbinden', contact: 'Kontakt', editorial: 'Redaktionelle Grundsätze', privacy: 'Datenschutz', terms: 'Impressum', cookies: 'Cookies' },
  en: { home: 'Compensation calculator', method: 'Method', about: 'About', widget: 'Embed the calculator', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
  fr: { home: 'Indemnité de vol au Canada', method: 'Méthode', about: 'À propos', widget: 'Intégrer le calculateur', contact: 'Contact', editorial: 'Politique éditoriale', privacy: 'Confidentialité', terms: 'Mentions légales', cookies: 'Cookies' },
};
export const GROUPS: Array<{ id: Group; label: Record<Locale, string> }> = [
  { id: 'flug', label: { de: 'Fluggastrechte', en: 'EU and UK flights', fr: 'Vols en Europe' } },
  { id: 'uk', label: { de: 'Großbritannien', en: 'UK261', fr: 'Royaume-Uni' } },
  { id: 'ca', label: { de: 'Kanada', en: 'Canada', fr: 'Canada' } },
  { id: 'airports-de', label: { de: 'Flughäfen', en: 'German airports', fr: 'Aéroports allemands' } },
  { id: 'bahn', label: { de: 'Bahn', en: 'Train', fr: 'Train' } },
];
export const label = (id: string, lang: Locale) => (id === 'home' && lang === 'fr' ? CORE.fr.home : CORE[lang][id]) ?? pageById(id)?.[lang]?.nav ?? pageById(id)?.en?.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
/** Pages d'un groupe qui existent dans la langue. */
export const inGroup = (g: Group, lang: Locale): NavLink[] => PAGES.filter((p) => p.group === g && hasRoute(p.id, lang) && p[lang]!.slug !== '').map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  return GROUPS.map((g) => ({ label: g.label[lang], links: inGroup(g.id, lang) })).filter((c) => c.links.length);
}
export const navDirect = (lang: Locale): NavLink[] => [link('method', lang)];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...GROUPS.map((g) => ({ label: g.label[lang], links: inGroup(g.id, lang) })).filter((c) => c.links.length).slice(0, 3),
  { label: { de: 'Diese Seite', en: 'This site', fr: 'Ce site' }[lang], links: [{ href: homeOf(lang), label: label('home', lang) }, ...['method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang))] },
];
/** Les aéroports, à un clic de toute page (RECETTE §18.2). */
export const popularLinks = (lang: Locale): NavLink[] => (['airports-de', 'bahn'] as Group[]).flatMap((g) => inGroup(g, lang)).concat(PAGES.filter((p) => ['lhr', 'lgw', 'man', 'stn', 'edi', 'yyz', 'yul', 'yvr', 'yyc'].includes(p.id) && hasRoute(p.id, lang)).map((p) => link(p.id, lang)));
