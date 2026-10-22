#!/usr/bin/env python3
"""Mise à jour des données qui changent (brief du 2026-10-21) : lancée chaque semaine par
.github/workflows/update-data.yml, ou à la main : python3 scripts/update-data.py

1. Aéroports : relit OurAirports (domaine public) par scripts/build-airports.py. En cas d'échec
   (réseau, fichier tronqué, moins de 3 000 aéroports), les fichiers en place sont gardés.
2. DTS (droits de tirage spéciaux) : relit le tableau « Currency units per SDR » du FMI pour l'euro, la
   livre et le dollar canadien, qui convertit les plafonds de la Convention de Montréal (1 519 DTS
   pour les bagages). Le FMI refuse parfois les requêtes automatiques (Akamai, 403) : les valeurs
   précédentes sont alors gardées avec leur date, et la page affiche cette date.
3. Les règles de droit (montants, seuils, délais) ne changent pas par script : elles se relisent sur
   les textes officiels, à la main (CONTRIBUTING-DATA.md).
Sortie 0 même si une source ne répond pas : le site reste publiable avec les dernières valeurs lues.
"""
import json, os, re, subprocess, sys, urllib.request, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
PARAMS = os.path.join(SITE, 'src/data/params-2026.json')
UA = {'User-Agent': 'Mozilla/5.0 (compatible; flight-delay-compensation data update; Radif Partners)'}
IMF = 'https://www.imf.org/external/np/fin/data/rms_five.aspx?tsvflag=Y'
NAMES = {'eur': 'Euro', 'gbp': 'U.K. pound', 'cad': 'Canadian dollar'}


def airports():
    r = subprocess.run([sys.executable, os.path.join(HERE, 'build-airports.py')], capture_output=True, text=True)
    print((r.stdout + r.stderr).strip() or 'build-airports : rien à signaler')
    if r.returncode:
        print('aéroports : source indisponible, fichiers précédents gardés')


def parse_sdr(tsv):
    """Tableau TSV du FMI : une ligne d'en-tête avec les dates (« October 21, 2026 »…), puis une ligne par
    devise. Renvoie {devise: (taux, date ISO)} avec la dernière valeur publiée de chaque devise."""
    lines = [l.split('\t') for l in tsv.splitlines()]
    head = next((l for l in lines if l and l[0].strip().lower().startswith('currency')), None)
    if not head:
        return {}
    dates = []
    for c in head[1:]:
        try:
            dates.append(datetime.datetime.strptime(c.strip(), '%B %d, %Y').date().isoformat())
        except ValueError:
            dates.append(None)
    out = {}
    for key, name in NAMES.items():
        row = next((l for l in lines if l and l[0].strip() == name), None)
        if not row:
            continue
        for v, d in reversed(list(zip(row[1:], dates))):
            v = v.strip().replace(',', '')
            if d and re.fullmatch(r'\d+\.\d+', v):
                out[key] = (float(v), d)
                break
    return out


def sdr():
    try:
        req = urllib.request.Request(IMF, headers=UA)
        with urllib.request.urlopen(req, timeout=60) as r:
            tsv = r.read().decode('utf-8', 'replace')
    except Exception as e:  # noqa: BLE001
        print(f'DTS : FMI indisponible ({e}), valeurs précédentes gardées')
        return
    rates = parse_sdr(tsv)
    if len(rates) < 3:
        print('DTS : tableau du FMI illisible, valeurs précédentes gardées')
        return
    p = json.load(open(PARAMS, encoding='utf-8'))
    for k, (v, d) in rates.items():
        # Garde-fou : un taux qui bouge de plus de 15 % d'un coup est une erreur de lecture.
        old = p['sdr'][k]
        if abs(v - old) / old > 0.15:
            print(f'DTS {k} : {v} trop loin de {old}, ignoré')
            continue
        p['sdr'][k], p['sdr'][f'{k}_date'] = v, d
    json.dump(p, open(PARAMS, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
    open(PARAMS, 'a', encoding='utf-8').write('\n')
    print('DTS :', ', '.join(f'{k} {v} ({d})' for k, (v, d) in rates.items()))


if __name__ == '__main__':
    airports()
    sdr()
