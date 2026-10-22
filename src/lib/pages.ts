/** Registre : chaque fichier de src/content/pages est chargé ici (un fichier = une page, toutes ses langues). */
import type { PageDef } from './page-types';

const base = (file: string) => file.split('/').pop()!.replace(/\.ts$/, '');
const g = import.meta.glob<{ default: PageDef }>(['../content/pages/*.ts', '!../content/pages/_*.ts'], { eager: true });
export const PAGES: PageDef[] = Object.entries(g).map(([f, m]) => {
  if (m.default.id !== base(f)) throw new Error(`${f}: id "${m.default.id}" differs from the file name`);
  return m.default;
}).sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
export const pageById = (id: string) => PAGES.find((p) => p.id === id);
/** Première page qui porte un calculateur : la cible du lien d'un mini-simulateur. */
export const pageOfTool = (kind: string) => PAGES.find((p) => p.tool === kind)?.id;
