/** Toutes les pages prévues (id = nom du fichier de src/content/pages). Les tests de contenu acceptent un lien
 *  vers ces ids pendant la rédaction ; le test « toutes les pages existent » échoue tant qu'il manque un fichier. */
export const PLANNED_PAGES = [
  // Vols, de + en
  'home', 'fluggastrechte', 'drei-stunden', 'annullierung', 'nichtbefoerderung', 'anschluss', 'streik', 'gepaeck', 'verjaehrung', 'schlichtung', 'reform', 'distanz',
  // Bahn, de + en
  'bahn', 'bahn-formular',
  // Flughäfen, de + en
  'fra', 'muc', 'dus', 'ber', 'ham',
  // Royaume-Uni, en
  'uk261', 'lhr', 'lgw', 'man', 'stn', 'edi',
  // Canada, en + fr
  'ca', 'appr', 'ca-annulation', 'ca-bagages', 'ca-plainte', 'yyz', 'yul', 'yvr', 'yyc',
];
export const PLANNED_IDS = new Set<string>([...PLANNED_PAGES, 'method', 'about', 'widget', 'contact', 'editorial', 'privacy', 'terms', 'cookies']);
