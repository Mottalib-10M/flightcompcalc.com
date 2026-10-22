# Écrire une page

Une page = un fichier `src/content/pages/<id>.ts` (modèle : `drei-stunden.ts`). Il porte ses versions
`de`, `en`, `fr` côte à côte ; une version absente = la page n'existe pas dans cette langue (routes
partielles, hreflang limité aux paires réelles). Routes, menus, sitemap, schémas, liens : tout se déduit
de ces fichiers. La liste des pages prévues est dans `src/lib/planned.ts`.

Contrôle pendant la rédaction (sans construire le site) :

    npx vitest run tests/content.test.ts

## Règles (RECETTE-SITE.md)

| Règle | Valeur |
|---|---|
| `title` | 50 à 60 caractères, **terme-clé d'abord** ; jamais ouvert par un pays (Canada, UK, German…), un mot d'outil (Rechner, Calculator), une question (Wie, How, Comment) ; pas de tiret cadratin |
| `description` | 150 à 160 caractères, terme-clé d'abord |
| `resume` | UN paragraphe de 120 mots ou plus, la réponse directe et chiffrée (§21, bloc citable) |
| `faqs` | 4 à 6 questions propres à la page (jamais reprises d'une autre page), réponses de 40 à 90 mots |
| corps | 650 mots au moins avec résumé et FAQ ; page racine d'une langue : 1 900 au moins (accordéons `folds` pour le texte long) |
| unicité | moins de 30 % de texte commun avec toute autre page : chaque page a son angle, ses exemples, son plan |
| simulateur | le calculateur de tête (`tool`, `toolArg`) + au moins un mini-simulateur `h.mini(kind, opts)` dans le corps |

## Chiffres

Aucun chiffre légal tapé à la main : `h.P` (params-2026.json), `h.eur(x)`, `h.gbp(x)`, `h.cad(x)`,
`h.km('FRA', 'PMI')` (distance orthodromique calculée), `h.owed(from, to, minutes, opts)` (montants du
moteur), `h.day(iso)`, `h.n(x)`. Un chiffre qu'on ne peut pas sourcer ne se publie pas (pas de
statistiques de ponctualité, de nombre de passagers, de taux de réussite des réclamations).

## Liens

- Interne : `h.a('<id>', 'texte')` (id de `planned.ts`).
- Source officielle : `h.src('<clé>', 'texte')` (clés de `params-2026.json > sources`) ou `h.ext(url, texte)`
  vers un site public (EUR-Lex, gesetze-im-internet.de, legislation.gov.uk, caa.co.uk, laws-lois.justice.gc.ca,
  otc-cta.gc.ca, bahn.de, soep-online.de, lba.de). Jamais de lien vers une société de réclamation, un
  avocat, une assurance, une appli, ni vers un autre site de l'éditeur.
- Auteur : Radif Partners seulement. Le site ne se présente jamais comme une autorité.

## Mini-simulateurs (`src/lib/mini-specs.ts`)

`band` (distance → montants), `delay` (heures + tranche → UE aujourd'hui, UE 2027, UK), `appr` (heures +
taille → CAD), `cancel` (préavis, retard du remplacement, tranche), `rail` (prix, minutes), `baggage`
(valeur, devise → plafond Montréal), `deadline` (année, mois → délais), `route` (`{ from: 'FRA', to:
['PMI','AYT','JFK'] }` → montant selon la destination ; codes de `src/data/airports-top.json`).
Options : `{ t: 'titre', d: { champ: valeur } }`.

## Faits de référence (relus le 2026-10-22 sur les textes officiels)

- **Règlement (CE) 261/2004** : 250 € (≤ 1 500 km), 400 € (intra-UE > 1 500 km, ou 1 500 à 3 500 km),
  600 € (au-delà) ; retard ≥ 3 h à l'arrivée finale (CJUE Sturgeon C-402/07, 2009 ; Nelson C-581/10, 2012) ;
  réduction de 50 % possible au-delà de 3 500 km si arrivée < 4 h de retard ; arrivée = ouverture d'une porte
  (Germanwings C-452/13) ; correspondance réservée en une fois : distance du premier départ à la destination
  finale (Folkerts C-11/11) ; grève du personnel de la compagnie ≠ circonstance extraordinaire (C-28/20,
  Airhelp/SAS) ; défaut technique ordinaire ≠ extraordinaire (Wallentin-Hermann C-549/07) ; annulation :
  rien si prévenu ≥ 14 jours, ou 7–14 jours avec remplacement parti ≤ 2 h plus tôt et arrivé < 4 h plus tard,
  ou < 7 jours avec ≤ 1 h plus tôt et < 2 h plus tard. Champ : départ d'un aéroport de l'UE/EEE/Suisse
  (toute compagnie) ou arrivée dans l'UE sur une compagnie de l'UE.
- **Règlement (UE) 2026/2202** (signé le 16/09/2026, JO du 02/10/2026, applicable à partir du
  **23 octobre 2027**) : mêmes 250/400/600 € ; retard **supérieur** à 3 h ; tranche 600 € réductible de 50 %
  si arrivée ≤ 4 h de retard ; annulation : rien si prévenu ≥ 14 jours, ou < 14 jours avec remplacement
  ≤ 1 h plus tôt et < 2 h plus tard ; liste non exhaustive des circonstances extraordinaires en annexe (météo,
  contrôle aérien, grèves d'aéroport, grève du transporteur seulement si les revendications ne peuvent être
  satisfaites que par les pouvoirs publics, défauts cachés de fabrication…) ; la compagnie informe dans les
  96 h ; **demande dans les 9 mois** suivant la date du vol, réponse sous 30 jours ; remboursement sous 7 jours ;
  réacheminement par ses propres moyens après 3 h plafonné à 400 % du billet ; correspondance manquée
  (art. 6b) : indemnité si > 3 h à destination finale.
- **UK261** (legislation.gov.uk) : £220 / £350 / £520, £260 pour > 3 500 km avec 3–4 h ; départ du
  Royaume-Uni (toute compagnie), arrivée au Royaume-Uni sur compagnie britannique ou de l'UE, arrivée dans
  l'UE sur compagnie britannique ; délai pour agir : 6 ans (Angleterre et pays de Galles, Limitation Act 1980
  art. 9), 5 ans (Écosse) ; CAA et organismes ADR (la CAA publie la liste des compagnies adhérentes). Aucune
  réforme britannique adoptée au 2026-10-22.
- **APPR, DORS/2019-150** (à jour au 2026-09-30) : gros transporteur = ≥ 2 millions de passagers dans le monde
  chacune des deux années précédentes ; retard ou annulation sous son contrôle, hors sécurité, prévenu ≤ 14
  jours : gros 400 $ (3 à < 6 h), 700 $ (6 à < 9 h), 1 000 $ (≥ 9 h) ; petit 125 / 250 / 500 $ ; remboursement
  au lieu du réacheminement : 400 $ / 125 $ ; demande avant le premier anniversaire du vol, réponse sous
  30 jours ; refus d'embarquement sous contrôle : 900 $ (< 6 h), 1 800 $ (6 à < 9 h), 2 400 $ (≥ 9 h), payés
  sous 48 h ; art. 10 : situations hors contrôle (météo, contrôle aérien, sûreté, urgence médicale,
  **grève au sein du transporteur**, défaut de fabrication signalé…) ; « nécessaire par souci de sécurité » :
  pas d'indemnité, mais réacheminement et prise en charge ; défaillance mécanique repérée lors d'un entretien
  programmé = sous contrôle. Pas de cumul (Loi sur les transports au Canada, art. 86.11(3)). Plaintes à
  l'Office des transports du Canada (OTC/CTA). Modifications seulement proposées (Gazette du Canada I,
  décembre 2025 ; projet de loi C-31 déposé le 2 mai 2026) : à dire « en projet ».
- **Convention de Montréal** (depuis le 28/12/2024) : bagages 1 519 DTS, retard de passagers 6 303 DTS ;
  réclamation écrite : 7 jours (dommage), 21 jours (retard de bagage) ; action : 2 ans. DTS : cours du FMI dans
  `h.P.sdr` (avec date).
- **Allemagne** : prescription 3 ans à compter de la fin de l'année du vol (§ 195, § 199 BGB) ; médiation
  söp (§ 57 LuftVG, LuftSchlichtV : d'abord réclamer à la compagnie ; refus ou pas de réponse en 2 mois) ;
  Luftfahrt-Bundesamt = autorité de contrôle (pas de paiement individuel).
- **Bahn** (règlement (UE) 2021/782, DB) : 25 % dès 60 min, 50 % dès 120 min ; moins de 4 € non versé ;
  abonnements : forfaits par retard ≥ 60 min (grandes lignes 5 € / 7,50 €, régional 1,50 € / 2,25 €,
  BahnCard 100 10 € / 15 €), plafond 25 % de la valeur ; autre train dès 20 min de retard prévu ; taxi
  jusqu'à 120 € (arrivée entre 0 et 5 h avec ≥ 60 min, ou dernière correspondance supprimée) ; demande
  sous 3 mois (formulaire Fahrgastrechte ou en ligne). Deutschland-Ticket : forfait non publié par la DB →
  ne pas l'inventer.
