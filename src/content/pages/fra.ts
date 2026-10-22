import { definePage } from '../../lib/page-types';

const DEST = ['PMI', 'LIS', 'ATH', 'IST', 'LPA', 'RMF', 'DXB', 'JFK', 'BKK', 'SIN'];

export default definePage({
  id: 'fra', group: 'airports-de', order: 200,
  tool: 'flight', toolArg: { from: 'FRA', to: 'JFK', event: 'delay', delay: 215, cause: 'technical', carrier: 'eu' },
  related: ['anschluss', 'muc', 'schlichtung', 'drei-stunden', 'distanz'],
  sources: ['eu261', 'uk261', 'eu2202', 'luftvg57', 'soep'],
  de: {
    slug: 'flughafen-frankfurt-verspaetung',
    nav: 'Flughafen Frankfurt', card: 'Langstrecke, Umsteigen und Kürzung bei drei bis vier Stunden: was ab Frankfurt zählt, Amtsgericht Frankfurt am Main.',
    title: 'Flughafen Frankfurt Verspätung: Entschädigung ab FRA',
    description: 'Flughafen Frankfurt Verspätung: 10 Ziele ab FRA, Kürzung auf Langstrecken, Umsteigen am Drehkreuz, Rückflüge nach FRA, Klage beim AG Frankfurt am Main.',
    h1: 'Verspätung am Flughafen Frankfurt: Ansprüche ab und über FRA',
    intro: 'Frankfurt ist für viele Reisende kein Ziel, sondern ein Umsteigepunkt. Das verändert, wie gerechnet wird und wer zahlen muss.',
    resume: 'Jeder Flug, der in Frankfurt startet, fällt unter die Verordnung (EG) Nr. 261/2004, gleich ob eine deutsche, eine asiatische oder eine amerikanische Airline fliegt. Kommt er drei Stunden oder mehr zu spät am Endziel an, oder wird er kurzfristig annulliert, gibt es je nach Großkreisentfernung 250, 400 oder 600 € pro Person. Weil von Frankfurt viele Langstrecken abgehen, ist die dritte Stufe hier häufig, und mit ihr die Kürzungsmöglichkeit: Bei einer Ankunftsverspätung von drei bis unter vier Stunden darf die Airline 600 € auf 300 € halbieren. Wer in Frankfurt nur umsteigt, rechnet mit der Entfernung vom ersten Abflug bis zum Endziel, wenn alles in einer Buchung steht. Für Flüge nach Frankfurt aus einem Land außerhalb der EU gilt die Verordnung nur, wenn eine Airline aus der EU fliegt. Klagen können Sie wahlweise am Abflug- oder am Ankunftsort; für Flüge ab oder nach Frankfurt ist das Amtsgericht Frankfurt am Main zuständig. Vorher lohnt die Forderung an die Airline und, wenn sie ablehnt, die kostenlose Schlichtung.',
    faqs: [
      { q: 'Ich fliege ab Frankfurt mit einer Airline aus Asien. Bin ich geschützt?', a: 'Ja, auf dem Hinflug. Die Verordnung erfasst jeden Abflug aus der EU, unabhängig von der Herkunft der Airline. Auf dem Rückflug nach Frankfurt gilt sie dagegen nur, wenn eine Airline aus der EU fliegt. Fliegt dieselbe asiatische Gesellschaft zurück, richten sich Ihre Rechte nach den Regeln des Abflugstaats und dem Montrealer Übereinkommen.' },
      { q: 'Mein Zubringer nach Frankfurt war verspätet, der Weiterflug weg. Wer zahlt?', a: 'Bei einer Buchung die Airline, die den verspäteten Zubringer durchgeführt hat, und zwar nach der Entfernung vom ersten Abflug bis zum Endziel. Kommen Sie aus Wien über Frankfurt nach Chicago mit fünf Stunden Verspätung an, zählt Wien nach Chicago. Hatten Sie getrennte Tickets, zählt nur der Zubringer mit seiner eigenen Verspätung.' },
      { q: 'Warum zahlt die Airline bei 3,5 Stunden nach New York nur die Hälfte?', a: 'Weil Art. 7 Abs. 2 bei Strecken über 3 500 km außerhalb der EU eine Kürzung um 50 % erlaubt, wenn die Ankunftsverspätung unter vier Stunden bleibt. Frankfurt nach New York liegt weit über dieser Grenze. Ab vier Stunden ist der volle Betrag fällig. Prüfen Sie deshalb genau, wann die Tür am Ziel geöffnet wurde.' },
      { q: 'Welches Gericht ist für meinen Flug ab Frankfurt zuständig?', a: 'Das Amtsgericht Frankfurt am Main, weil der Flughafen in seinem Bezirk liegt. Der Europäische Gerichtshof hat 2009 im Urteil Rehder (C-204/08) entschieden, dass Fluggäste am Abflug- oder am Ankunftsort klagen können. Ein Flug von Lissabon nach Frankfurt kann also ebenfalls dort eingeklagt werden. Einen Anwalt brauchen Sie vor dem Amtsgericht nicht.' },
      { q: 'Steht mir ein Hotel zu, wenn ich in Frankfurt über Nacht festsitze?', a: 'Ja. Nach Art. 9 muss die Airline ein Hotelzimmer stellen, wenn eine Übernachtung nötig wird, dazu den Transfer zwischen Flughafen und Hotel, Mahlzeiten und die Möglichkeit, zwei Telefonate zu führen oder E-Mails zu senden. Das gilt auch, wenn ein Unwetter die Verspätung verursacht hat. Organisiert die Airline nichts, buchen Sie angemessen selbst und heben die Belege auf.' },
    ],
    body: (h) => {
      const rows = DEST.map((c) => {
        const red = h.owed('FRA', c, 210)[0].amount;
        const full = h.owed('FRA', c, 250)[0].amount;
        return [`${c}`, h.km('FRA', c), red, full];
      });
      return `
<h2>Zehn Ziele ab Frankfurt</h2>
<p>Die Tabelle zeigt, was eine Verspätung am Ziel von dreieinhalb Stunden und von mehr als vier Stunden ab Frankfurt bringt, berechnet mit der Großkreisentfernung nach Art. 7 der ${h.src('eu261', 'Verordnung (EG) Nr. 261/2004')} und einer verspäteten Ankunft aus Gründen, die die Airline zu vertreten hat.</p>
${h.table(['Ziel (IATA)', 'Entfernung ab FRA', '3,5 Std. zu spät', 'über 4 Std. zu spät'], [
  ...rows.map((r, i) => [['Palma de Mallorca', 'Lissabon', 'Athen', 'Istanbul', 'Gran Canaria', 'Marsa Alam', 'Dubai', 'New York JFK', 'Bangkok', 'Singapur'][i] + ` (${r[0]})`, r[1], r[2], r[3]]),
], 'Ausgleichszahlung pro Person für Flüge ab Frankfurt, Rechtslage bis 22. Oktober 2027', ['l', 'r', 'r', 'r'])}
<p>Zwei Dinge fallen auf. Gran Canaria liegt ${h.km('FRA', 'LPA')} entfernt und bleibt dennoch bei der mittleren Stufe, weil die Kanaren zur EU gehören. Marsa Alam in Ägypten liegt mit ${h.km('FRA', 'RMF')} knapp über 3 500 km und erreicht deshalb ab Frankfurt die oberste Stufe; ab München wäre es eine Stufe weniger (${h.a('muc', 'Flughafen München')}).</p>
${h.mini('route', { t: 'Ab Frankfurt: Ziel wählen, Betrag sehen', from: 'FRA', to: ['JFK', 'DXB', 'RMF', 'IST', 'PMI', 'SIN'], d: { h: 3.5 } })}
<h2>Umsteigen in Frankfurt</h2>
<p>Wer in Frankfurt den Anschluss verpasst, rechnet nicht mit dem Abschnitt, der zu spät war, sondern mit der ganzen Reise, wenn sie in einer Buchung steht. Kommen Sie aus Hamburg und fliegen weiter nach New York, zählen ${h.km('HAM', 'JFK')} von Hamburg bis New York. Kommen Sie aus Wien und fliegen weiter nach Chicago, zählen ${h.km('VIE', 'ORD')}. Maßgeblich ist die Ankunft am letzten Ziel (${h.a('anschluss', 'Anschlussflug verpasst')}). Bis zum Weiterflug muss die Airline Sie betreuen: Verpflegung, bei Übernachtung ein Hotel in der Umgebung und den Transfer dorthin.</p>
<h2>Rückflüge nach Frankfurt</h2>
<p>Landet ein Flug aus Dubai, New York oder Bangkok verspätet in Frankfurt, kommt es auf die Airline an. Fliegt eine Gesellschaft mit Betriebsgenehmigung aus der EU, gilt die Verordnung wie beim Hinflug. Fliegt eine Gesellschaft von außerhalb, gilt sie nicht, auch wenn Sie das Ticket in Deutschland gekauft haben. Kommt der Flug aus London, prüfen Sie zusätzlich ${h.src('uk261', 'UK261')}, das jeden Abflug aus Großbritannien erfasst.</p>
<h2>Wo Sie Ihr Recht durchsetzen</h2>
<p>Erst die Forderung an die Airline, dann bei Ablehnung oder nach zwei Monaten Schweigen die Schlichtung nach ${h.src('luftvg57', '§ 57 LuftVG')}, meist über die ${h.src('soep', 'söp')}. Bleibt auch das ohne Erfolg, ist für Flüge ab oder nach Frankfurt das Amtsgericht Frankfurt am Main zuständig. Grundlage ist das Urteil Rehder des Gerichtshofs (C-204/08): Bei Flügen zwischen zwei Mitgliedstaaten können Sie am Abflug- oder am Ankunftsort klagen. Der Ablauf Schritt für Schritt steht unter ${h.a('schlichtung', 'Schlichtung und Klage')}.</p>
${h.box('Ab Oktober 2027', `<p>Für Abflüge ab dem ${h.day(h.P.eu261_2027.applies_from)} darf die Airline auf Langstrecken auch bei genau vier Stunden noch halbieren, und der Antrag muss binnen ${h.P.eu261_2027.claim_window_months} Monaten eingehen (${h.src('eu2202', 'Verordnung (EU) 2026/2202')}).</p>`)}
`;
    },
  },
  en: {
    slug: 'frankfurt-airport-delay-compensation',
    nav: 'Frankfurt Airport', card: 'Long-haul departures and connections through FRA: what you can claim and where.',
    title: 'Frankfurt Airport delay compensation: flights from FRA',
    description: 'Frankfurt Airport delay compensation for flights from FRA and connections through it: 10 destinations, UK travellers via Frankfurt, and the local court.',
    h1: 'Frankfurt Airport delays: what you can claim from and via FRA',
    intro: 'Many UK and international travellers only pass through Frankfurt. That changes how compensation is worked out and which rules apply.',
    resume: 'Any flight departing from Frankfurt falls under EU261, whichever airline operates it. If it reaches its final destination three hours or more late, or is cancelled at short notice, compensation is €250, €400 or €600 per passenger depending on the great-circle distance. Because Frankfurt is a long-haul hub, the top band is common here, and so is the airline’s right to halve €600 to €300 when the arrival delay is between three and four hours. If you only change planes in Frankfurt on a single booking, the distance runs from your first departure airport to your final destination: London to Singapore via Frankfurt counts as London to Singapore. A journey that starts in the UK is covered by UK261 for the whole trip, with £220, £350 or £520; the Frankfurt leg is also covered by EU261. Flights into Frankfurt from outside the EU are covered by EU261 only when an EU airline operates them. Disputes can go to the German arbitration body or to the local court at Frankfurt am Main, competent for flights departing from or arriving at the airport.',
    faqs: [
      { q: 'I fly Heathrow to Singapore via Frankfurt on one ticket. Which rules apply?', a: 'The journey starts in the UK, so UK261 covers it on any airline, measured from London to Singapore. The Frankfurt to Singapore leg also departs from the EU, so EU261 covers it too. If you arrive in Singapore three hours or more late, you can claim under either scheme, but you are paid only once for the same disruption.' },
      { q: 'My flight from Frankfurt to Manchester was delayed. Euros or pounds?', a: 'Both schemes can apply. EU261 covers the departure from Frankfurt on any airline; UK261 covers the arrival in the UK when a UK or EU airline operates the flight. The distance is in the first band either way. You choose which scheme to claim under, but the airline only pays once.' },
      { q: 'Can I claim in a UK court for a delay at Frankfurt?', a: 'Possibly, depending on the facts, but the German route is always open: the Court of Justice’s Rehder judgment (C-204/08) allows claims at the place of departure or arrival, so the local court at Frankfurt am Main is competent for flights from or to Frankfurt. The German arbitration body is free for passengers and handles claims in writing.' },
      { q: 'Does the airline have to put me in a hotel at Frankfurt if I miss my connection overnight?', a: 'Yes. Under Article 9 the airline must provide meals, a hotel when an overnight stay becomes necessary, transport between the airport and the hotel, and the chance to make two calls or send emails. That applies even if the original delay was caused by weather. Keep receipts if you end up paying yourself.' },
      { q: 'Is a flight from New York to Frankfurt covered?', a: 'Only if an EU airline operates it, because the flight departs from outside the EU. On a US or other non-EU airline, EU261 does not apply to that flight; your rights then depend on the rules of the country of departure and on the Montreal Convention for actual losses. On the outbound leg from Frankfurt, every airline is covered.' },
    ],
    body: (h) => {
      const sin = h.owed('LHR', 'SIN', 300, { carrier: 'eu' });
      const ukSin = sin.find((x) => x.regime === 'UK261')!;
      return `
<h2>UK travellers connecting in Frankfurt</h2>
<p>A single booking from Heathrow to Singapore via Frankfurt is measured as ${h.km('LHR', 'SIN')}, London to Singapore. If you land five hours late, ${h.src('uk261', 'UK261')} gives ${ukSin.amount}. The Frankfurt to Singapore leg, ${h.km('FRA', 'SIN')}, also falls under EU261 on its own departure from the EU. Either way, it is the arrival at the final destination that counts, timed when the door opens. Before that, the airline owes care at Frankfurt: meals, and a hotel with transfers if you are stuck overnight.</p>
${h.table(['Journey on one booking', 'Distance measured', 'UK261 at 5 h late'], [
  ['London Heathrow, Frankfurt, Singapore', h.km('LHR', 'SIN'), ukSin.amount],
  ['Manchester, Frankfurt, New York', h.km('MAN', 'JFK'), h.owed('MAN', 'JFK', 300, { carrier: 'eu' }).find((x) => x.regime === 'UK261')!.amount],
  ['Edinburgh, Frankfurt, Athens', h.km('EDI', 'ATH'), h.owed('EDI', 'ATH', 300, { carrier: 'eu' }).find((x) => x.regime === 'UK261')!.amount],
  ['Birmingham, Frankfurt, Dubai', h.km('BHX', 'DXB'), h.owed('BHX', 'DXB', 300, { carrier: 'eu' }).find((x) => x.regime === 'UK261')!.amount],
], 'Connections from the UK through Frankfurt, distance from first departure to final destination', ['l', 'r', 'r'])}
<h2>Starting in Frankfurt: ten destinations</h2>
${h.table(['Destination', 'Distance from FRA', 'EU261, 3.5 h late', 'EU261, over 4 h late'], ['PMI', 'LIS', 'ATH', 'IST', 'LPA', 'RMF', 'DXB', 'JFK', 'BKK', 'SIN'].map((c, i) => [
  ['Palma', 'Lisbon', 'Athens', 'Istanbul', 'Gran Canaria', 'Marsa Alam', 'Dubai', 'New York JFK', 'Bangkok', 'Singapore'][i] + ` (${c})`, h.km('FRA', c), h.owed('FRA', c, 210)[0].amount, h.owed('FRA', c, 250)[0].amount,
]), 'Compensation per passenger for flights from Frankfurt, rules until 22 October 2027', ['l', 'r', 'r', 'r'])}
<p>Long-haul routes from Frankfurt are halved between three and four hours; Gran Canaria stays at the middle band despite ${h.km('FRA', 'LPA')}, because the Canaries are in the EU.</p>
${h.mini('route', { t: 'From Frankfurt: pick a destination', from: 'FRA', to: ['SIN', 'JFK', 'DXB', 'BKK', 'LHR', 'MAN'], d: { h: 4.5 } })}
<h2>Flights into Frankfurt</h2>
<p>Arriving from outside the EU, ${h.src('eu261', 'EU261')} applies only if an EU airline operates the flight. Arriving from the UK, UK261 also applies, because it covers every departure from the UK. A flight from Frankfurt to a UK airport on a UK or EU airline sits under both schemes; you choose one.</p>
<h2>Enforcing a claim at Frankfurt</h2>
<p>Write to the airline first. If it refuses or stays silent for two months, the German arbitration route under ${h.src('luftvg57', 'section 57 of the Aviation Act')} opens, usually through ${h.src('soep', 'söp')}. Courts: the local court (Amtsgericht) at Frankfurt am Main is competent for flights from or to the airport, following the Court of Justice’s Rehder judgment (C-204/08). Step-by-step guidance is on ${h.a('schlichtung', 'how to claim')}. For EU departures from ${h.day(h.P.eu261_2027.applies_from)}, ${h.src('eu2202', 'Regulation (EU) 2026/2202')} adds a ${h.P.eu261_2027.claim_window_months}-month claim window. Flying from Munich instead? See ${h.a('muc', 'Munich Airport')}.</p>
`;
    },
  },
});
