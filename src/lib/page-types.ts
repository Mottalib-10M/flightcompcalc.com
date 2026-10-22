/**
 * Une page = UN fichier de contenu (CONTRIBUTING-PAGES.md) : `src/content/pages/<id>.ts`, avec ses versions
 * `de`, `en`, `fr` côte à côte (chacune facultative : la page n'existe que dans les langues écrites).
 * Routes, menus, pied de page, sitemap, hreflang, schémas et liens internes lisent ces fichiers.
 */
import type { Lang } from './format';
import type { ToolArg } from './tool-types';

export interface FAQ { q: string; a: string }
export interface MiniOpts { /** titre */ t?: string; /** valeurs par défaut des champs */ d?: Record<string, number>; /** aéroport de départ (mini « route ») */ from?: string; /** destinations proposées (mini « route ») */ to?: string[] }

export interface Helpers {
  lang: Lang;
  /** Lien interne par id de page, dans la langue de la page (repli : version existante). Id inconnu = test en échec. */
  a: (id: string, text: string) => string;
  /** Tableau ; les nombres sont formatés dans la langue, les chaînes insérées en HTML. */
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  /** Lien vers une source de params-2026.json > sources (clé). */
  src: (key: string, text?: string) => string;
  ext: (url: string, text: string) => string;
  box: (title: string, html: string) => string;
  /** Mini-simulateur (src/lib/mini-specs.ts). */
  mini: (kind: string, opts?: MiniOpts) => string;
  /** Montants : eur(250) « 250 € », gbp(220) « £220 », cad(400) « 400 $ » ; n(x, d) nombre ; day(iso) date en toutes lettres. */
  eur: (x: number, d?: number) => string; gbp: (x: number, d?: number) => string; cad: (x: number, d?: number) => string;
  n: (x: number, d?: number) => string; day: (iso: string) => string;
  /** Distance orthodromique arrondie entre deux codes IATA, en km (« 1 268 km »). */
  km: (from: string, to: string) => string;
  /** Distance brute, pour un calcul dans le texte. */
  dist: (from: string, to: string) => number;
  /** Montant dû selon chaque régime pour un vol et un retard donnés (moteur du site). */
  owed: (from: string, to: string, delayMin: number, opts?: { carrier?: 'eu' | 'gb' | 'ca' | 'other'; event?: 'delay' | 'cancel' | 'denied'; date?: string; cause?: string; size?: 'large' | 'small' }) => { regime: string; amount: string; status: string }[];
  /** Nom d'aéroport (« Frankfurt Main Airport (FRA) »). */
  ap: (iata: string) => string;
  /** Paramètres légaux (params-2026.json). */
  P: typeof import('../data/params-2026.json');
}

export type Group = 'flug' | 'airports-de' | 'uk' | 'ca' | 'bahn';

export interface LangPage {
  /** Segment d'URL, minuscules et tirets, sans accent ; '' = racine de la langue. */
  slug: string;
  nav: string; card: string;
  /** 50 à 60 caractères, terme clé d'abord (RECETTE §11). */
  title: string;
  /** 150 à 160 caractères. */
  description: string;
  h1: string; intro: string;
  /** UN paragraphe de 120 mots ou plus : la réponse directe, chiffrée (RECETTE §21). */
  resume: string;
  faqs: FAQ[];
  body: (h: Helpers) => string;
  /** Textes longs en accordéons sous le corps (page d'accueil surtout). */
  folds?: (h: Helpers) => Array<{ title: string; html: string }>;
}
export interface PageDef {
  id: string; group: Group; order: number;
  /** Calculateur en tête de page (src/lib/tool-types.ts). */
  tool: 'flight' | 'rail' | 'baggage' | 'deadline' | 'distance';
  toolArg?: ToolArg;
  related: string[];
  /** Clés de params-2026.json > sources. */
  sources: string[];
  de?: LangPage; en?: LangPage; fr?: LangPage;
}
export const definePage = (p: PageDef): PageDef => p;
