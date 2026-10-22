/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://flight-delay-compensation.example";
export const SITE_NAMES: Record<string, string> = {"de": "Flugentschädigung ohne Provision", "en": "Flight Compensation Without Commission", "fr": "Indemnité de vol sans commission"};
export const LANG_TAGS: Record<string, string> = {"de": "de-DE", "en": "en", "fr": "fr-CA"};
export const OG_LOCALES: Record<string, string> = {"de": "de_DE", "en": "en_GB", "fr": "fr_CA"};
export const LOCALE_TAG = 'de-DE';
export const CURRENCY = 'EUR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-22';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"de": "Unabhängiger Herausgeber von Rechnern zu Fluggastrechten nach der Verordnung (EG) Nr. 261/2004 und zu Fahrgastrechten im Bahnverkehr", "en": "Independent publisher of air passenger rights calculators under EU261, UK261 and Canada's Air Passenger Protection Regulations", "fr": "Éditeur indépendant de calculateurs sur les droits des passagers aériens au Canada (Règlement sur la protection des passagers aériens)"};
export const AUTHOR_DESC: Record<string, string> = {"de": "Radif Partners misst die Großkreisentfernung zwischen den beiden Flughäfen aus den gemeinfreien Koordinaten von OurAirports und wendet darauf den Wortlaut der Verordnung (EG) Nr. 261/2004 an, so wie er bis zum 22. Oktober 2027 gilt, und die ab dem 23. Oktober 2027 geltende Fassung der Verordnung (EU) 2026/2202. Das Ergebnis ist der Betrag, den die Airline schuldet, ohne Abzug einer Provision; das Anspruchsschreiben entsteht im Browser und wird nirgendwohin geschickt.", "en": "Radif Partners measures the great-circle distance between the two airports from OurAirports public-domain coordinates, then applies the text that governs the flight: EU Regulation 261/2004 as amended by Regulation (EU) 2026/2202, the UK's retained UK261 on legislation.gov.uk, or Canada's SOR/2019-150. You see the amount the airline owes before any claims company takes its cut, and the claim letter is assembled in your browser, never sent by us.", "fr": "Radif Partners applique le Règlement sur la protection des passagers aériens (DORS/2019-150) tel que publié par le ministère de la Justice du Canada : taille du transporteur, retard à l'arrivée et cause donnent l'indemnité minimale en dollars canadiens. Les distances viennent des coordonnées d'OurAirports, dans le domaine public. La lettre de réclamation se compose dans votre navigateur ; rien ne nous est transmis."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"de": ["Verordnung (EG) Nr. 261/2004", "Verordnung (EU) 2026/2202", "Ausgleichszahlung bei Flugverspätung und Annullierung", "Großkreisentfernung", "Montrealer Übereinkommen (Gepäck)", "Fahrgastrechte im Bahnverkehr, Verordnung (EU) 2021/782"], "en": ["EU Regulation 261/2004", "UK261 (retained Regulation 261/2004)", "Canada Air Passenger Protection Regulations", "Great-circle distance", "Montreal Convention baggage limits"], "fr": ["Règlement sur la protection des passagers aériens", "Indemnisation des retards et annulations au Canada", "Refus d'embarquement", "Convention de Montréal (bagages)"]};
export const CONTACT_EMAIL = "kontakt@flight-delay-compensation.example";
export const THEME_COLOR = '#B3261E';
export const LOGO_SYMBOL = '✈';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = '';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = '';
export const INDEXNOW_KEY = 'f1755292426f3bfc962528defa8cee75';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',  // vide : comme sur les autres sites du portefeuille
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "Frankreich / France",
  phone: '',
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "USt-IdNr.",
  vatNumber: '',
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city'];

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
