# Données

| Donnée | Fichier | Source | Licence | Mise à jour |
|---|---|---|---|---|
| Aéroports (code IATA, nom, ville, pays, coordonnées) | `src/data/airports.json`, `airports-top.json`, `airports-meta.json` | OurAirports, https://ourairports.com/data/ (miroir davidmegginson.github.io/ourairports-data) | Domaine public | Chaque lundi, `scripts/update-data.py` (workflow `update-data.yml`) |
| Cours du DTS en EUR, GBP, CAD | `src/data/params-2026.json` > `sdr` | FMI, « Currency units per SDR » | Données publiques du FMI, citées | Chaque lundi ; si le FMI refuse la requête (403), les valeurs et leur date sont gardées |
| Règles : montants, seuils, délais, champ d'application | `src/data/params-2026.json` | EUR-Lex (261/2004, 2026/2202), legislation.gov.uk (UK261), Justice Laws (DORS/2019-150), gesetze-im-internet.de, DB | Textes officiels | À la main, à chaque changement de texte (voir ci-dessous) |

## Relire les règles

1. Ouvrir chaque URL de `params-2026.json > sources` ; comparer montants, seuils et délais.
2. Points à surveiller :
   - **Règlement (UE) 2026/2202** : applicable le 23 octobre 2027 ; le moteur bascule seul selon la date du vol
     (`eu261_2027.applies_from`). Surveiller une éventuelle rectification au JO.
   - **APPR** : modifications publiées en projet (Gazette du Canada, Partie I, décembre 2025) et projet de loi
     C-31 : tant qu'elles ne sont pas en vigueur, ne rien changer ; à l'entrée en vigueur, mettre à jour le bloc
     `appr` et `amendments_status`.
   - **UK261** : aucune réforme adoptée au 2026-10-22.
   - **Convention de Montréal** : limites révisées par l'OACI tous les cinq ans (dernière : 28 décembre 2024).
3. Modifier `params-2026.json` (valeur, `_source`, `retrieved_at`), puis `npx vitest run` : les tests de
   `tests/flight.test.ts` rejouent les cas de référence.
4. Mettre à jour `LAST_UPDATED` dans `src/data/site-config.ts`.

## Lancer à la main

    python3 scripts/update-data.py          # aéroports + DTS
    python3 scripts/build-airports.py --offline   # reconstruit les JSON depuis scripts/cache/ sans réseau
