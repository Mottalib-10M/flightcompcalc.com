import { definePage } from '../../lib/page-types';
import { AIRPORT_COUNT } from '../../lib/airports';

export default definePage({
  id: 'distanz', group: 'flug', order: 110,
  tool: 'distance', toolArg: { from: 'MUC', to: 'MAD' },
  related: ['anschluss', 'fluggastrechte', 'muc', 'fra', 'drei-stunden'],
  sources: ['eu261', 'uk261', 'ourairports'],
  de: {
    slug: 'flugentfernung-berechnen',
    nav: 'Flugentfernung berechnen', card: 'Großkreisentfernung zwischen zwei Flughäfen und die Stufe, die sich daraus ergibt.',
    title: 'Flugentfernung berechnen: Großkreis statt geflogener Strecke',
    description: 'Flugentfernung berechnen nach der Großkreismethode aus Art. 7 Abs. 4: warum Umwege nicht zählen, Grenzfälle bei 1 500 und 3 500 km, Umsteigen und EU-Ausnahme.',
    h1: 'Flugentfernung berechnen: die Zahl, an der der Betrag hängt',
    intro: 'Wenige Kilometer entscheiden, ob es 250 oder 400 € gibt. Gerechnet wird nicht mit der geflogenen Route, sondern mit dem Großkreis.',
    resume: 'Die Höhe der Ausgleichszahlung hängt nach Art. 7 der Verordnung (EG) Nr. 261/2004 allein von der Entfernung ab, und Art. 7 Abs. 4 schreibt vor, wie sie zu messen ist: nach der Methode der Großkreisentfernung, also der kürzesten Linie zwischen Abflug- und Zielflughafen auf der Erdoberfläche. Die tatsächlich geflogene Strecke mit Warteschleifen, Umwegen um Sperrgebiete oder Ausweichrouten zählt nicht. Der Rechner oben verwendet die Koordinaten von 4 008 Flughäfen aus einer gemeinfreien Datenbank und eine Kugel mit 6 371 km Radius. Bis 1 500 km gibt es 250 €, darüber bis 3 500 km 400 €, darüber 600 €. Zwei Besonderheiten: Innerhalb der EU bleibt es auch über 3 500 km bei 400 €, etwa von Frankfurt nach La Réunion; und bei Umsteigeverbindungen mit einer Buchung zählt die Entfernung vom ersten Abflug bis zum Endziel, nicht die Summe der Abschnitte. Liegt Ihre Strecke wenige Kilometer an einer Grenze, kann eine andere Berechnungsmethode der Airline zu einem anderen Ergebnis führen; dann lohnt das Nachrechnen.',
    faqs: [
      { q: 'Die Airline nennt eine andere Entfernung als der Rechner. Wer hat recht?', a: 'Kleine Abweichungen entstehen durch die Erdform: Wir rechnen mit einer Kugel, manche Systeme mit einem Ellipsoid, und die Koordinaten können sich um einige hundert Meter unterscheiden. Für die meisten Strecken ändert das die Stufe nicht. Liegt Ihre Strecke wenige Kilometer an einer Grenze, nennen Sie der Airline die Methode und die Koordinaten beider Flughäfen.' },
      { q: 'Zählt bei einem Hin- und Rückflug die doppelte Strecke?', a: 'Nein. Hin- und Rückflug sind zwei getrennte Flüge, jeder mit eigener Entfernung und eigenem Anspruch. Ist nur der Rückflug verspätet, zählt nur er. Waren beide drei Stunden zu spät, haben Sie zwei Ansprüche in der jeweiligen Stufe, auch wenn Sie beide Flüge in einer Buchung gekauft haben.' },
      { q: 'Was gilt bei einer Zwischenlandung ohne Umsteigen?', a: 'Hat der Flug eine Flugnummer und landet nur zwischendurch, zählt die Entfernung vom Abflug zum Endziel Ihrer Buchung. Steigen Sie an der Zwischenstation aus, gilt die Entfernung bis dorthin. Entscheidend ist immer, wo Ihre gebuchte Reise beginnt und endet, nicht, wie oft das Flugzeug unterwegs aufsetzt.' },
      { q: 'Warum gibt es für Gran Canaria nur 400 €, obwohl es weit ist?', a: 'Weil die Kanarischen Inseln zur EU gehören. Für innergemeinschaftliche Flüge über 1 500 km sieht Art. 7 Abs. 1 Buchstabe b einheitlich die mittlere Stufe vor, egal wie lang die Strecke ist. Das gilt auch für Madeira, die Azoren und die französischen Überseegebiete, die in der Flughafenliste als Teil der EU geführt sind.' },
      { q: 'Wird bei der Landung auf einem Ausweichflughafen neu gemessen?', a: 'Nein, maßgeblich ist das gebuchte Ziel. Landet das Flugzeug wegen Nebels auf einem anderen Flughafen und bringt die Airline Sie mit dem Bus weiter, bleibt die Entfernung die der gebuchten Strecke. Notieren Sie, wann Sie schließlich am gebuchten Ziel angekommen sind, denn davon hängt die Verspätung ab.' },
    ],
    body: (h) => `
<h2>Großkreis: die kürzeste Linie auf der Kugel</h2>
<p>Auf einer flachen Karte sieht die Strecke von Frankfurt nach New York wie ein Bogen nach Norden aus. Auf dem Globus ist dieser Bogen die kürzeste Verbindung, der Großkreis. Der Rechner oben bestimmt ihn aus Breiten- und Längengrad beider Flughäfen mit der Haversine-Formel auf einer Kugel mit ${h.n(6371)} km Radius. Die Daten stammen aus der gemeinfreien Sammlung ${h.src('ourairports', 'OurAirports')} und umfassen ${h.n(AIRPORT_COUNT)} Flughäfen. Die tatsächliche Flugroute ist länger: Luftstraßen, Wind, Sperrgebiete und Warteschleifen verlängern sie. Für die ${h.src('eu261', 'Verordnung (EG) Nr. 261/2004')} zählt das nicht, Art. 7 Abs. 4 verweist ausdrücklich auf die Großkreismethode.</p>
<h2>Grenzfälle, die es wirklich gibt</h2>
${h.table(['Strecke', 'Großkreisentfernung', 'Stufe', 'Betrag'], [
  ['München nach Madrid', h.km('MUC', 'MAD'), 'bis 1 500 km', h.owed('MUC', 'MAD', 240)[0].amount],
  ['Frankfurt nach Madrid', h.km('FRA', 'MAD'), 'bis 1 500 km', h.owed('FRA', 'MAD', 240)[0].amount],
  ['München nach Athen', h.km('MUC', 'ATH'), 'über 1 500 km, EU', h.owed('MUC', 'ATH', 240)[0].amount],
  ['München nach Marsa Alam', h.km('MUC', 'RMF'), '1 500 bis 3 500 km', h.owed('MUC', 'RMF', 240)[0].amount],
  ['Frankfurt nach Marsa Alam', h.km('FRA', 'RMF'), 'über 3 500 km', h.owed('FRA', 'RMF', 240)[0].amount],
  ['Frankfurt nach La Réunion', h.km('FRA', 'RUN'), 'innerhalb der EU', h.owed('FRA', 'RUN', 240)[0].amount],
], 'Ausgleichszahlung bei vier Stunden Verspätung nach Art. 7 der Verordnung (EG) Nr. 261/2004', ['l', 'r', 'l', 'r'])}
<p>München nach Madrid bleibt mit ${h.km('MUC', 'MAD')} knapp in der ersten Stufe, Athen liegt knapp darüber. Und das ägyptische Marsa Alam ist von Frankfurt aus gerade weit genug für die oberste Stufe, von München aus nicht. Der Rechner oben ist auf München nach Madrid eingestellt: Ändern Sie das Ziel und sehen Sie, wie sich die Stufe verschiebt.</p>
${h.mini('band', { t: 'Kilometer eingeben, Stufe sehen', d: { km: 1496 } })}
<h2>Umsteigen: gemessen wird die ganze Reise</h2>
<p>Bei einer Verbindung mit einer Buchung zählt die Großkreisentfernung vom ersten Abflug bis zum Endziel. Hamburg über Frankfurt nach New York ergibt ${h.km('HAM', 'JFK')}, nicht die Summe der Abschnitte. Das kann günstiger oder ungünstiger sein als die Teilstrecken, ist aber die Regel des Gerichtshofs (${h.a('anschluss', 'Anschlussflug verpasst')}).</p>
<h2>Die Ausnahme innerhalb der EU</h2>
<p>Art. 7 Abs. 1 Buchstabe b gibt 400 € für alle innergemeinschaftlichen Flüge über 1 500 km. Die dritte Stufe gibt es nur, wenn Abflug- oder Zielort außerhalb der EU liegt. Frankfurt nach La Réunion ist mit ${h.km('FRA', 'RUN')} weiter als nach New York, bleibt aber bei ${h.eur(h.P.eu261.intra_over_1500)}. Im Rechner sind die Kanaren, Madeira, die Azoren und die französischen Überseegebiete als EU geführt; Island, Norwegen und die Schweiz gehören zum Geltungsbereich der Verordnung.</p>
${h.box('Britische Strecken', `<p>${h.src('uk261', 'UK261')} misst ebenfalls nach dem Großkreis, mit Beträgen in Pfund: ${h.gbp(h.P.uk261.amounts[0])}, ${h.gbp(h.P.uk261.amounts[1])} und ${h.gbp(h.P.uk261.amounts[2])}. Wer ab London fliegt, rechnet also mit derselben Entfernung, nur in einer anderen Währung.</p>`)}
`,
  },
  en: {
    slug: 'flight-distance-calculator',
    nav: 'Flight distance calculator', card: 'Great-circle distance between two airports and the compensation band it puts you in.',
    title: 'Flight distance for compensation: the great-circle rule',
    description: 'Flight distance for EU261 and UK261 compensation is great-circle distance, not the route flown: the 1,500 and 3,500 km bands, borderline routes and connections.',
    h1: 'Flight distance: the number your compensation depends on',
    intro: 'A few kilometres can decide between £220 and £350. The distance used is the great circle between airports, not the route the aircraft flew.',
    resume: 'Under Article 7 of EU261 and UK261 the amount of compensation depends only on distance, and Article 7(4) says how it is measured: by the great-circle route method, the shortest line between the departure and arrival airports over the Earth’s surface. Holding patterns, detours around closed airspace and the airways actually flown do not count. The calculator above uses the coordinates of 4,008 airports from a public-domain database and a sphere of 6,371 km radius. Up to 1,500 km the compensation is €250 or £220, up to 3,500 km €400 or £350, beyond that €600 or £520. Two special rules: within the EU every flight over 1,500 km stays at €400, even Frankfurt to Réunion; and on a connection booked as one journey, the distance runs from the first departure airport to the final destination, not the sum of the legs. UK261 uses the same method with £220, £350 and £520. Close to a boundary, check the figure the airline gives you.',
    faqs: [
      { q: 'The airline quotes a different distance. Who is right?', a: 'Small differences come from the shape of the Earth: we use a sphere, some systems an ellipsoid, and airport coordinates can differ by a few hundred metres. For most routes that does not change the band. If your route sits within a few kilometres of 1,500 or 3,500 km, ask the airline for its method and coordinates, and quote Article 7(4).' },
      { q: 'Is a return trip measured as one distance?', a: 'No. Outbound and return are separate flights, each with its own distance and its own claim. If only the return was late, only the return counts. If both were three hours late, you have two claims in their respective bands, even though you bought both flights in one booking.' },
      { q: 'Which UK routes sit close to a band boundary?', a: 'Short-haul routes from Scotland and the north of England to southern Spain and the Canaries cluster around 1,500 to 3,000 km, so the first boundary matters most. London to Palma is well inside the first band; Manchester to Tenerife is comfortably in the second. Enter your own airports in the calculator to see exactly where you fall.' },
      { q: 'Why does Gran Canaria only pay €400 from Germany but £350 from the UK?', a: 'Both are the middle band, for different reasons. From Germany the flight is intra-EU and over 1,500 km, so the EU text caps it at the middle band whatever the distance. From the UK the route is simply between 1,500 and 3,500 km. A UK flight over 3,500 km, for instance to the Gulf, reaches £520.' },
      { q: 'Does a diversion change the distance?', a: 'No. The booked destination counts. If fog sends the aircraft to another airport and the airline buses you on, the distance stays that of the booked route. Note the time you finally reached your booked destination, since the delay is worked out from it.' },
    ],
    body: (h) => `
<h2>Great circle: the shortest line on a globe</h2>
<p>On a flat map, London to New York looks like an arc curving north. On a globe that arc is the shortest route, the great circle. The calculator above works it out from the latitude and longitude of both airports with the haversine formula on a sphere of ${h.n(6371)} km. The coordinates come from the public-domain ${h.src('ourairports', 'OurAirports')} data, ${h.n(AIRPORT_COUNT)} airports. The route actually flown is longer, but for ${h.src('eu261', 'EU261')} and ${h.src('uk261', 'UK261')} that does not matter: Article 7(4) points to the great-circle method.</p>
<h2>UK routes and their bands</h2>
${h.table(['Route', 'Great-circle distance', 'UK261 at 4 h late'], [
  ['London Heathrow to Palma', h.km('LHR', 'PMI'), h.owed('LHR', 'PMI', 240, { carrier: 'gb' })[0].amount],
  ['Edinburgh to Málaga', h.km('EDI', 'AGP'), h.owed('EDI', 'AGP', 240, { carrier: 'gb' })[0].amount],
  ['Manchester to Tenerife', h.km('MAN', 'TFS'), h.owed('MAN', 'TFS', 240, { carrier: 'gb' })[0].amount],
  ['London Gatwick to Gran Canaria', h.km('LGW', 'LPA'), h.owed('LGW', 'LPA', 240, { carrier: 'gb' })[0].amount],
  ['London Heathrow to Dubai', h.km('LHR', 'DXB'), h.owed('LHR', 'DXB', 240, { carrier: 'gb' })[0].amount],
  ['London Heathrow to New York', h.km('LHR', 'JFK'), h.owed('LHR', 'JFK', 240, { carrier: 'gb' })[0].amount],
], 'Compensation under UK261 for a four-hour delay, by great-circle distance', ['l', 'r', 'r'])}
${h.mini('band', { t: 'Type the kilometres, see the band', d: { km: 1496 } })}
<h2>Borderline cases from Germany</h2>
<p>The calculator default is Munich to Madrid, ${h.km('MUC', 'MAD')}, just inside the first band, while Munich to Athens, ${h.km('MUC', 'ATH')}, just crosses into the second. Marsa Alam in Egypt is ${h.km('FRA', 'RMF')} from Frankfurt, enough for the top band, but only ${h.km('MUC', 'RMF')} from Munich. These are the cases where a sloppy distance figure costs you money.</p>
<h2>Connections: the whole journey is measured</h2>
<p>On a single booking the great circle runs from the first departure to the final destination. Manchester via a Gulf hub to Bangkok counts as ${h.km('MAN', 'BKK')}, not the sum of the legs. See ${h.a('anschluss', 'missed connecting flight')}.</p>
<h2>The intra-EU cap</h2>
<p>Article 7(1)(b) of EU261 gives €400 for every intra-Community flight over 1,500 km; the third band applies only when one end is outside the EU. Frankfurt to Réunion, ${h.km('FRA', 'RUN')}, is further than London to New York but still pays ${h.eur(h.P.eu261.intra_over_1500)}. The calculator treats the Canaries, Madeira, the Azores and the French overseas regions as EU, and Iceland, Norway and Switzerland as within the regulation’s scope.</p>
`,
  },
});
