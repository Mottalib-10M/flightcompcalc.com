import { definePage, type Helpers } from '../../lib/page-types';

const DEST = ['LGW', 'BCN', 'FCO', 'CPH', 'VIE', 'LIS', 'TFS', 'DOH'];
const rows = (h: Helpers) => DEST.map((c) => {
  const late = h.owed('BER', c, 200)[0]?.amount ?? '–';
  const uk = c === 'LGW' ? (h.owed(c, 'BER', 200)[1]?.amount ?? '–') : '–';
  return [h.ap(c), h.km('BER', c), late, uk];
});

export default definePage({
  id: 'ber', group: 'airports-de', order: 230,
  tool: 'flight', toolArg: { from: 'BER', to: 'BCN', event: 'delay', delay: 230, cause: 'airline', carrier: 'eu' },
  related: ['fra', 'dus', 'ham', 'streik', 'annullierung'],
  sources: ['eu261', 'uk261', 'luftvg57', 'soep', 'lba'],
  de: {
    slug: 'flughafen-berlin-ber-verspaetung',
    nav: 'Flughafen Berlin (BER)', card: 'Städteflüge, Nachtflugverbot und Billigflieger: was bei Verspätung ab BER gilt, Amtsgericht Königs Wusterhausen.',
    title: 'Flughafen BER Verspätung: Entschädigung ab Berlin, Fristen',
    description: 'Flughafen BER Verspätung: Beträge für 8 Ziele ab Berlin, späte Abflüge und Nachtflugverbot, Billigflieger, London mit UK261, Klage am AG Königs Wusterhausen.',
    h1: 'Verspätung am Flughafen Berlin Brandenburg: was ab BER zusteht',
    intro: 'Ab Berlin fliegen viele kurz und günstig. Eine Ausgleichszahlung von 250 € übersteigt dann oft den Ticketpreis, und genau deshalb lohnt sie sich.',
    resume: 'Seit der Schließung von Tegel im November 2020 laufen alle Linienflüge der Hauptstadt über den Flughafen Berlin Brandenburg in Schönefeld. Für jeden Abflug von dort gilt die Verordnung (EG) Nr. 261/2004: Erreicht der Flug das Endziel drei Stunden oder mehr zu spät, oder wird er weniger als 14 Tage vorher annulliert, gibt es je nach Entfernung 250, 400 oder 600 € pro Person, unabhängig davon, was das Ticket gekostet hat. Bei Städteflügen nach London, Barcelona oder Rom mit einem Ticket für 40 € ist das ein Mehrfaches des Preises. Typisch für Berlin sind späte Abendflüge, die wegen der Nachtruhe zwischen Mitternacht und fünf Uhr nicht mehr starten dürfen und auf den nächsten Morgen fallen. Das Betriebsverbot selbst ist kein Grund, der die Airline entlastet: Entscheidend ist, warum der Flug so spät dran war. Für Klagen zu Flügen ab oder nach BER ist das Amtsgericht Königs Wusterhausen zuständig, weil der Flughafen in seinem Bezirk liegt.',
    faqs: [
      { q: 'Mein Abendflug ab BER wurde wegen des Nachtflugverbots auf den Morgen verschoben. Bekomme ich Geld?', a: 'Wahrscheinlich ja, wenn die Verspätung bis zum Abend auf einen Grund zurückgeht, den die Airline zu vertreten hat, etwa einen technischen Defekt oder fehlende Besatzung. Das Nachtflugverbot ist bekannt und planbar; es erklärt nur, warum aus zwei Stunden zwölf wurden. Die Airline muss außerdem ein Hotel und den Transfer stellen.' },
      { q: 'Lohnt sich eine Forderung bei einem Ticket für 30 €?', a: 'Ja. Die Ausgleichszahlung ist ein fester Betrag und hängt nicht vom Ticketpreis ab. Bei einem Flug bis 1 500 km sind es 250 € pro Person, auch wenn Sie nur einen Bruchteil davon bezahlt haben. Billigflieger lehnen häufig zunächst ab; die Schlichtung ist für Sie kostenlos und die Airline trägt die Gebühr.' },
      { q: 'Welches Gericht ist für BER zuständig?', a: 'Das Amtsgericht Königs Wusterhausen, weil der Flughafen in Schönefeld in dessen Bezirk liegt. Nach dem Urteil Rehder des Gerichtshofs können Sie wahlweise am Abflug- oder Ankunftsort klagen, bei einem Rückflug nach Berlin also ebenfalls dort. Vor dem Amtsgericht besteht kein Anwaltszwang, Sie können die Klage selbst einreichen.' },
      { q: 'Gilt etwas Besonderes für Flüge von Berlin nach London?', a: 'Auf dem Hinweg gilt die EU-Verordnung für jede Airline. Auf dem Rückweg von London Gatwick oder Stansted gilt UK261 für jede Airline, die EU-Verordnung zusätzlich nur bei einer Gesellschaft aus der EU. Die Beträge stehen dann in Pfund: bei rund 950 km sind es 220 £.' },
    ],
    body: (h) => `
<h2>Acht Ziele ab Berlin</h2>
<p>Die Tabelle setzt eine Ankunftsverspätung von drei Stunden und zwanzig Minuten voraus, verursacht durch einen Grund, den die Airline zu vertreten hat. Für London ist der Rückflug nach britischem Recht zusätzlich angegeben.</p>
${h.table(['Ziel', 'Entfernung', 'Ab BER (EU261)', 'Zurück aus London (UK261)'], rows(h), 'Ausgleichszahlung pro Person, Rechtslage bis 22. Oktober 2027', ['l', 'r', 'r', 'r'])}
<p>Die Kanaren sind das Beispiel für die Sonderregel innerhalb der EU: Teneriffa liegt ${h.km('BER', 'TFS')} entfernt, mehr als 3 500 km, und bleibt trotzdem bei ${h.eur(h.P.eu261.intra_over_1500)}, weil der Flug die Union nicht verlässt. Barcelona liegt mit ${h.km('BER', 'BCN')} knapp über der Grenze von 1 500 km und bringt deshalb ${h.eur(h.P.eu261.amounts[1])} statt ${h.eur(h.P.eu261.amounts[0])}. Doha dagegen erreicht die oberste Stufe; eine Ankunft zwischen drei und vier Stunden zu spät darf die Airline dort auf ${h.eur(h.P.eu261.amounts[2] / 2)} kürzen.</p>
${h.mini('route', { t: 'Ab Berlin: Ziel wählen, Betrag sehen', from: 'BER', to: ['LGW', 'BCN', 'FCO', 'CPH', 'LIS', 'TFS'], d: { h: 3.33 } })}
<h2>Spät am Abend: wenn die Nachtruhe greift</h2>
<p>Zwischen Mitternacht und fünf Uhr finden am BER grundsätzlich keine planmäßigen Starts und Landungen statt. Ein Flug, der um 22 Uhr hätte starten sollen und wegen eines Defekts bis 23.30 Uhr nicht bereit ist, wird dann oft auf den Morgen verschoben. Aus anderthalb Stunden werden so zehn oder zwölf. Für die Ausgleichszahlung zählt die Ankunft am Ziel, und als Grund zählt der Defekt, nicht die Betriebszeit. Wer dagegen wegen eines Gewitters am Nachmittag in den Abend und dann in die Nachtruhe rutscht, hat schlechte Karten, wenn die Airline zeigt, dass sie danach alles Zumutbare versucht hat. Mehr zu den Gründen, die die Airline entlasten, unter ${h.a('streik', 'Streik und außergewöhnliche Umstände')}.</p>
${h.mini('delay', { d: { h: 11, b: 0 }, t: 'Berlin: Abendflug auf den Morgen verschoben' })}
<h2>Wenn die Airline nicht zahlt</h2>
<p>Bleibt eine Antwort aus oder lehnt die Airline ab, ist die Schlichtung nach ${h.src('luftvg57', '§ 57 LuftVG')} der nächste Schritt, für die meisten Gesellschaften über die ${h.src('soep', 'söp')}. Ist eine Airline keiner privaten Schlichtungsstelle angeschlossen, übernimmt das ${h.src('lba', 'Luftfahrt-Bundesamt')}. Danach bleibt die Klage am Amtsgericht Königs Wusterhausen. Den Weg im Einzelnen beschreibt ${h.a('schlichtung', 'Schlichtung und Klage')}.</p>
`,
  },
  en: {
    slug: 'berlin-airport-delay-compensation',
    nav: 'Berlin Airport (BER)', card: 'City breaks, the night curfew and low-cost airlines: what applies to delays from BER.',
    title: 'Berlin Airport delay compensation: BER flights and curfew',
    description: 'Berlin Brandenburg Airport (BER) delay compensation: amounts for 8 routes, late flights pushed past the night curfew, low-cost fares, and London under UK261.',
    h1: 'Delays at Berlin Brandenburg Airport: what is owed from BER',
    intro: 'From Berlin many flights are short and cheap. A €250 payment often exceeds the fare, which is exactly why it is worth claiming.',
    resume: 'Since Tegel closed in November 2020, all scheduled flights serving the German capital use Berlin Brandenburg Airport in Schönefeld. Every departure from there is covered by EU Regulation 261/2004: if the flight reaches its final destination three hours or more late, or is cancelled less than 14 days ahead, each passenger is owed €250, €400 or €600 depending on distance, whatever the ticket cost. On a city break to London, Barcelona or Rome bought for €40, that is several times the fare. A typical Berlin case is the late evening flight that can no longer leave because of the night restriction between midnight and 5 a.m. and is moved to the next morning. The restriction itself does not excuse the airline: what matters is why the flight was running so late in the first place. Court claims about flights from or to BER go to the local court of Königs Wusterhausen, in whose district the airport lies.',
    faqs: [
      { q: 'My evening flight from BER was moved to the morning because of the curfew. Is money owed?', a: 'Probably, if the delay up to the evening came from a cause the airline is responsible for, such as a technical fault or a missing crew. The night restriction is known and can be planned for; it only explains why two hours became twelve. The airline must also provide a hotel and the transfer.' },
      { q: 'Is it worth claiming on a €30 ticket?', a: 'Yes. The compensation is a fixed amount and does not depend on the fare. For a flight up to 1,500 km it is €250 per passenger, even if you paid a fraction of that. Low-cost airlines often refuse at first; arbitration in Germany is free for passengers and the airline pays the fee.' },
      { q: 'Which court is competent for BER?', a: 'The local court of Königs Wusterhausen (Amtsgericht Königs Wusterhausen), because the airport in Schönefeld lies in its district. Under the Court of Justice’s Rehder judgment you may sue at the place of departure or arrival, so a delayed flight back to Berlin can be brought there too. No lawyer is required at a local court.' },
      { q: 'Is anything different on Berlin to London flights?', a: 'Outbound, the EU regulation applies to every airline. On the way back from Gatwick or Stansted, UK261 applies to every airline and the EU regulation only to an EU carrier. Amounts are then in pounds: at around 950 km, £220 per passenger.' },
    ],
    body: (h) => `
<h2>Eight routes from Berlin</h2>
<p>The table assumes an arrival delay of three hours and twenty minutes for a reason the airline is responsible for. For London the return flight under UK law is shown as well.</p>
${h.table(['Destination', 'Distance', 'From BER (EU261)', 'Back from London (UK261)'], rows(h), 'Compensation per passenger, rules until 22 October 2027', ['l', 'r', 'r', 'r'])}
<p>The Canaries show the intra-EU rule: Tenerife is ${h.km('BER', 'TFS')} away, more than 3,500 km, yet stays at ${h.eur(h.P.eu261.intra_over_1500)} because the flight never leaves the Union. Barcelona, at ${h.km('BER', 'BCN')}, sits just over the 1,500 km line and therefore pays ${h.eur(h.P.eu261.amounts[1])} rather than ${h.eur(h.P.eu261.amounts[0])}. Doha, by contrast, reaches the top band, and for an arrival between three and four hours late the airline may reduce it to ${h.eur(h.P.eu261.amounts[2] / 2)}.</p>
${h.mini('route', { t: 'From Berlin: pick a destination', from: 'BER', to: ['LGW', 'BCN', 'FCO', 'CPH', 'LIS', 'TFS'], d: { h: 3.33 } })}
<h2>Late in the evening: when the curfew bites</h2>
<p>Between midnight and 5 a.m. there are, as a rule, no scheduled take-offs or landings at BER. A flight due to leave at 10 p.m. that is not ready by 11.30 p.m. because of a fault is often moved to the morning, and an hour and a half becomes ten or twelve. Compensation counts the arrival at destination, and the cause is the fault, not the operating hours. If instead a thunderstorm in the afternoon pushed the flight into the evening and then into the curfew, the airline is likely to escape payment if it shows it did everything reasonable afterwards. The causes that excuse an airline are covered in ${h.a('streik', 'strikes and extraordinary circumstances')}.</p>
${h.mini('delay', { d: { h: 11, b: 0 }, t: 'Berlin: evening flight moved to the morning' })}
<h2>If the airline does not pay</h2>
<p>When the airline refuses or does not answer, arbitration under ${h.src('luftvg57', 'section 57 of the German Aviation Act')} is the next step, for most airlines through the ${h.src('soep', 'söp')}. If an airline belongs to no private arbitration body, the ${h.src('lba', 'Federal Aviation Office')} handles it. After that, a claim at the Königs Wusterhausen local court remains. The route is set out in ${h.a('schlichtung', 'arbitration and court')}.</p>
`,
  },
});
