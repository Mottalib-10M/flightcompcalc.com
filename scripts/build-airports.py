#!/usr/bin/env python3
"""Construit src/data/airports.json depuis OurAirports (domaine public).

Source : https://ourairports.com/data/ (fichiers miroirs https://davidmegginson.github.io/ourairports-data/),
« Public Domain » d'après la page des données d'OurAirports. Mise à jour quotidienne côté source ;
le site la relit chaque semaine (scripts/update-data.py, workflow .github/workflows/update-data.yml).

Retenus : aéroports « large_airport » et « medium_airport », plus les « small_airport », qui ont un
service régulier (scheduled_service = yes) et un code IATA. Ce sont les aéroports où un passager
peut avoir une réservation confirmée : les seuls où le règlement peut jouer.

Format compact, une ligne par aéroport : [iata, nom, ville, pays ISO, lat, lon, zone]
  zone = eu (Union européenne, régions ultrapériphériques comprises), eea (Islande, Norvège,
         Liechtenstein), ch (Suisse), gb (Royaume-Uni), ca (Canada), xx (ailleurs).

Usage : python3 scripts/build-airports.py [--offline]   (--offline : relit scripts/cache/ sans réseau)
"""
import csv, io, json, os, sys, urllib.request, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
CACHE = os.path.join(HERE, 'cache')
SRC = 'https://davidmegginson.github.io/ourairports-data/airports.csv'

# Union européenne : 27 États membres + régions ultrapériphériques qui ont leur propre code ISO
# (Guadeloupe, Martinique, Guyane, La Réunion, Mayotte, Saint-Martin) et Åland. Les Canaries, les
# Açores et Madère sont déjà rangées sous ES et PT. Ne sont PAS dans l'Union : îles Féroé (FO),
# Groenland (GL), Saint-Barthélemy (BL), Polynésie (PF), Nouvelle-Calédonie (NC), etc.
EU = set('AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE GP MQ GF RE YT MF AX'.split())
EEA = {'IS', 'NO', 'LI'}


# Liste courte : aéroports allemands, britanniques et canadiens les plus fréquentés, destinations de
# vacances et grands hubs. Ordre = ordre de proposition quand le champ est vide.
TOP = '''FRA MUC DUS BER HAM STR CGN HAJ NUE LEJ BRE DTM FMO PAD
LHR LGW MAN STN LTN EDI BHX BRS GLA BFS
YYZ YUL YVR YYC YEG YOW YHZ YWG YQB
PMI AYT LPA TFS ACE FUE HRG RMF SSH IST SAW
CDG ORY AMS MAD BCN LIS FAO AGP ALC FCO MXP NAP VCE VIE ZRH GVA CPH ARN OSL HEL KEF DUB BRU PRG WAW KRK BUD ATH HER RHO SKG CFU OPO
DXB DOH AUH JFK EWR LAX MIA ORD SFO BOS MCO IAD CUN PUJ BKK SIN HKG NRT DEL CPT JNB MRU MLE SYD'''.split()


def zone(c):
    if c in EU: return 'eu'
    if c in EEA: return 'eea'
    if c == 'CH': return 'ch'
    if c == 'GB': return 'gb'
    if c == 'CA': return 'ca'
    return 'xx'


def lire():
    os.makedirs(CACHE, exist_ok=True)
    p = os.path.join(CACHE, 'airports.csv')
    if '--offline' not in sys.argv:
        req = urllib.request.Request(SRC, headers={'User-Agent': 'flight-delay-compensation data build (Radif Partners)'})
        with urllib.request.urlopen(req, timeout=120) as r:
            data = r.read()
        if len(data) < 1_000_000:
            sys.exit(f'build-airports : fichier trop court ({len(data)} octets), on garde le cache')
        open(p, 'wb').write(data)
    return open(p, encoding='utf-8').read()


def main():
    rows = list(csv.DictReader(io.StringIO(lire())))
    out, seen = [], set()
    for r in rows:
        iata = (r['iata_code'] or '').strip().upper()
        if len(iata) != 3 or not iata.isalpha() or r['scheduled_service'] != 'yes':
            continue
        if r['type'] not in ('large_airport', 'medium_airport', 'small_airport'):
            continue
        if iata in seen:  # un code IATA ne désigne qu'un aéroport ; le premier rang (large) l'emporte
            continue
        seen.add(iata)
        c = r['iso_country']
        out.append([iata, r['name'].strip(), (r['municipality'] or '').strip(), c,
                    round(float(r['latitude_deg']), 3), round(float(r['longitude_deg']), 3), zone(c),
                    {'large_airport': 3, 'medium_airport': 2, 'small_airport': 1}[r['type']]])
    out.sort(key=lambda a: (-a[7], a[0]))
    if len(out) < 3000:
        sys.exit(f'build-airports : {len(out)} aéroports seulement, refus d\'écrire')
    json.dump(out, open(os.path.join(SITE, 'src/data/airports.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
    meta = {'source': 'OurAirports', 'source_url': 'https://ourairports.com/data/', 'licence': 'Public Domain',
            'retrieved_at': datetime.date.today().isoformat(), 'count': len(out),
            'by_zone': {z: sum(1 for a in out if a[6] == z) for z in ('eu', 'eea', 'ch', 'gb', 'ca', 'xx')}}
    json.dump(meta, open(os.path.join(SITE, 'src/data/airports-meta.json'), 'w'), ensure_ascii=False, indent=1)
    # Petite liste embarquée dans chaque calculateur (premier rendu, mini-simulateurs) ; la liste
    # complète se charge à la demande quand on tape dans un champ « aéroport ».
    idx = {a[0]: a for a in out}
    top = [idx[c] for c in TOP if c in idx]
    manque = [c for c in TOP if c not in idx]
    if manque:
        print('build-airports : absents de la source, retirés de la liste courte :', ' '.join(manque))
    json.dump(top, open(os.path.join(SITE, 'src/data/airports-top.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
    print(f"airports.json : {len(out)} aéroports ({meta['by_zone']})")


if __name__ == '__main__':
    main()
