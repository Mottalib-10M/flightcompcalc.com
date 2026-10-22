import type { Locale } from './routes';
const de = {
  updatedOn: 'Stand der Daten', editorialPolicy: 'Redaktionelle Grundsätze', contactLabel: 'Kontakt', reviewedBy: 'Erstellt von',
  skipToContent: 'Zum Inhalt springen', mainNav: 'Hauptnavigation', breadcrumbLabel: 'Brotkrumennavigation', breadcrumbHome: 'Start', menuOpen: 'Menü öffnen',
  faqTitle: 'Häufige Fragen', relatedCalculators: 'Weiterlesen', sourcesTitle: 'Amtliche Quellen dieser Seite', writtenBy: 'Erstellt von',
  asOf: 'Rechtsstand', lastUpdated: 'nach den amtlichen Texten geprüft und aktualisiert am', footerValidated: 'Quellen: EUR-Lex, legislation.gov.uk, Justice Laws Canada, OurAirports',
  footerBrowser: 'Alles wird in Ihrem Browser berechnet · kein Konto, keine E-Mail, keine Provision',
  footerDisclaimer: 'Unabhängige Seite von Radif Partners. Keine Verbindung zu einer Airline, einem Flughafen, einer Behörde oder einem Fluggastrechte-Portal. Allgemeine, unverbindliche Information; ersetzt keine Rechtsberatung.',
  footerPopular: 'Flughäfen und Bahn',
  notFound: 'Unter dieser Adresse gibt es keine Seite. Die Startseite berechnet die Entschädigung für jeden Flug zwischen 4 008 Flughäfen.',
  readMore: 'Ganze Antwort lesen',
};
const en: typeof de = {
  updatedOn: 'Data as of', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Prepared by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Common questions', relatedCalculators: 'Keep going', sourcesTitle: 'Official sources for this page', writtenBy: 'Prepared by',
  asOf: 'Law as of', lastUpdated: 'checked against the official texts on', footerValidated: 'Sources: EUR-Lex, legislation.gov.uk, Justice Laws Canada, OurAirports',
  footerBrowser: 'Everything is computed in your browser · no account, no email, no commission',
  footerDisclaimer: 'Independent site published by Radif Partners. Not affiliated with any airline, airport, regulator or claims company. General information, not legal advice.',
  footerPopular: 'Airports and train',
  notFound: 'Nothing lives at this address. The home page works out the compensation for any flight between 4,008 airports.',
  readMore: 'Read the full answer',
};
const fr: typeof de = {
  updatedOn: 'Données au', editorialPolicy: 'Politique éditoriale', contactLabel: 'Contact', reviewedBy: 'Préparé par',
  skipToContent: 'Aller au contenu', mainNav: 'Navigation principale', breadcrumbLabel: 'Fil d’Ariane', breadcrumbHome: 'Accueil', menuOpen: 'Ouvrir le menu',
  faqTitle: 'Questions fréquentes', relatedCalculators: 'Pour aller plus loin', sourcesTitle: 'Sources officielles de cette page', writtenBy: 'Préparé par',
  asOf: 'Droit en vigueur', lastUpdated: 'vérifié sur les textes officiels le', footerValidated: 'Sources : Justice Canada, Office des transports du Canada, EUR-Lex, OurAirports',
  footerBrowser: 'Tout se calcule dans votre navigateur · aucun compte, aucun courriel, aucune commission',
  footerDisclaimer: 'Site indépendant publié par Radif Partners. Sans lien avec une compagnie aérienne, un aéroport, l’Office des transports du Canada ou une société de réclamation. Information générale à titre informatif ; ne remplace pas un avis juridique.',
  footerPopular: 'Aéroports',
  notFound: 'Aucune page à cette adresse. L’accueil calcule l’indemnité de tout vol entre 4 008 aéroports.',
  readMore: 'Lire la réponse complète',
};
export function t(lang: Locale) { return lang === 'en' ? en : lang === 'fr' ? fr : de; }
