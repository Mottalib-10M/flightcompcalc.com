/**
 * Contrôle des fichiers de contenu (CONTRIBUTING-PAGES.md), à lancer pendant la rédaction :
 *   npx vitest run tests/content.test.ts
 * Mêmes règles que check-seo / check-snippets / §7 / §21, sur la source, sans construire le site.
 */
import { describe, it, expect } from 'vitest';
import { PAGES } from '../src/lib/pages';
import { PLANNED_PAGES } from '../src/lib/planned';
import { helpers } from '../src/lib/helpers';
import { MINI_KINDS } from '../src/lib/mini-specs';

const words = (s: string) => s.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const GENERIC = /^(¿|calculateur\b|calcul\b|calculer\b|calculator\b|calculate\b|rechner\b|berechnen\b|about\b|methodik\b|faq\b|comment\b|quel\b|quelle\b|combien\b|how\b|what\b|when\b|wie\b|was\b|wer\b|canada\b|canadian\b|uk |united kingdom|british|german|germany|deutschland|france\b|french)/i;
const LANGS = ['de', 'en', 'fr'] as const;
const titles = new Map<string, string>(), descs = new Map<string, string>();

for (const p of PAGES) for (const l of LANGS) {
  const x = p[l]; if (!x) continue;
  describe(`${p.id} [${l}]`, () => {
    it('title 50-60, key term first, no em dash', () => {
      expect(x.title.length, x.title).toBeGreaterThanOrEqual(50); expect(x.title.length, x.title).toBeLessThanOrEqual(60);
      expect(GENERIC.test(x.title), x.title).toBe(false); expect(x.title.includes('—')).toBe(false);
      expect(titles.has(x.title), `duplicate title with ${titles.get(x.title)}`).toBe(false); titles.set(x.title, `${p.id}/${l}`);
    });
    it('description 150-160', () => {
      expect(x.description.length, x.description).toBeGreaterThanOrEqual(150); expect(x.description.length, x.description).toBeLessThanOrEqual(160);
      expect(descs.has(x.description)).toBe(false); descs.set(x.description, `${p.id}/${l}`);
    });
    it('resume >= 120 words, one paragraph', () => { expect(words(x.resume)).toBeGreaterThanOrEqual(120); expect(x.resume.includes('\n')).toBe(false); });
    it('4+ FAQ, answers 40-90 words', () => {
      expect(x.faqs.length).toBeGreaterThanOrEqual(4);
      for (const f of x.faqs) { const n = words(f.a); expect(n, `${f.q} (${n})`).toBeGreaterThanOrEqual(40); expect(n, `${f.q} (${n})`).toBeLessThanOrEqual(90); }
    });
    it('body renders, links and minis valid, long enough', () => {
      const h = helpers(l);
      const html = x.body(h) + (x.folds ? x.folds(h).map((f) => f.html).join(' ') : '');
      for (const m of html.matchAll(/<!--mini:([A-Za-z0-9_]+)/g)) expect(MINI_KINDS).toContain(m[1]);
      expect(html.includes('undefined')).toBe(false); expect(html.includes('NaN')).toBe(false);
      const n = words(html) + words(x.resume) + x.faqs.reduce((s, f) => s + words(f.a) + words(f.q), 0);
      expect(n, `${n} words`).toBeGreaterThanOrEqual(x.slug === '' ? 1900 : 650);
      expect(/—/.test(html), 'no em dash').toBe(false);
      expect(/airhelp|flightright|claimcompass|bottonline|euclaim|fairplane/i.test(html.replace(/<[^>]+>/g, '')) && /href="[^"]*(airhelp|flightright|claimcompass|bottonline|euclaim|fairplane)/i.test(html), 'no link to claims companies').toBe(false);
    });
  });
}
describe('site', () => {
  it('every planned page exists', () => { const ids = PAGES.map((p) => p.id); for (const id of PLANNED_PAGES) expect(ids, id).toContain(id); });
  it('slugs are unique per language', () => { for (const l of LANGS) { const s = PAGES.filter((p) => p[l]).map((p) => p[l]!.slug); expect(new Set(s).size).toBe(s.length); } });
});
