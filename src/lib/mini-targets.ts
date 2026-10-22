/** Cible du lien d'un mini-simulateur : la page qui porte le calculateur complet correspondant. */
import { route, hasRoute, type Locale } from '../i18n/routes';
const TARGET: Record<string, string> = { band: 'distanz', delay: 'home', appr: 'ca', cancel: 'annullierung', rail: 'bahn', baggage: 'gepaeck', deadline: 'verjaehrung', route: 'home' };
export function miniHref(kind: string, lang: Locale, path: string): string | undefined {
  let id = TARGET[kind] ?? 'home';
  if (lang === 'fr' && (id === 'home' || id === 'distanz' || id === 'annullierung')) id = 'ca';
  if (lang === 'fr' && id === 'gepaeck') id = 'ca-bagages';
  if (!hasRoute(id, lang)) id = lang === 'fr' ? 'ca' : 'home';
  const href = route(id, lang);
  return href === path ? undefined : href;
}
