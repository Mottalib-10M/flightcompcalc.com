import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'anschluss', group: 'flug', order: 50,
  tool: 'flight', toolArg: { from: 'HAM', to: 'JFK', event: 'delay', delay: 320, cause: 'technical', carrier: 'eu' },
  related: ['drei-stunden', 'distanz', 'fluggastrechte', 'nichtbefoerderung', 'fra'],
  sources: ['eu261', 'eu2202', 'uk261', 'caa-delays'],
  de: {
    slug: 'anschlussflug-verpasst',
    nav: 'Anschlussflug verpasst', card: 'Umsteigen mit einer Buchung: gezählt wird am Endziel, gemessen vom ersten Abflug bis zum letzten Ziel.',
    title: 'Anschlussflug verpasst: Entschädigung bei einer Buchung',
    description: 'Anschlussflug verpasst: Anspruch bei durchgehender Buchung, Entfernung vom ersten Abflug bis zum Endziel, drei Stunden am Ziel, Fall Folkerts und neuer Art. 6b.',
    h1: 'Anschlussflug verpasst: wann die ganze Reise zählt',
    intro: 'Wer wegen eines verspäteten Zubringers den Weiterflug verpasst, rechnet mit der Ankunft am letzten Ziel und mit der Entfernung der ganzen Reise.',
    resume: 'Verpassen Sie wegen eines verspäteten ersten Flugs den Anschluss und kommen am Endziel drei Stunden oder mehr zu spät an, schuldet die Airline des verspäteten Flugs die Ausgleichszahlung, auch wenn der erste Flug selbst nur wenig Verspätung hatte. Voraussetzung ist eine einheitliche Buchung: Beide Flüge müssen in einem Vertrag gebucht sein, in der Regel unter einer Buchungsnummer. Der Gerichtshof hat das 2013 im Fall Folkerts (C-11/11) entschieden. Die Entfernung wird dann nicht für jeden Abschnitt einzeln gemessen, sondern in Großkreisentfernung vom ersten Abflughafen bis zum Endziel. Hamburg über Frankfurt nach New York ergibt so die Langstreckenstufe mit 600 €, obwohl der verspätete Zubringer nur ein Inlandsflug war. Die Umsteigeverbindung muss außerdem in der EU beginnen oder von einer Airline aus der EU durchgeführt werden. Für Flüge ab dem 23. Oktober 2027 schreibt der neue Art. 6b diese Regel ausdrücklich in die Verordnung: Ausgleich, wenn die Ankunft am Endziel mehr als drei Stunden später liegt. Zwei getrennt gebuchte Tickets sind nicht geschützt.',
    faqs: [
      { q: 'Ich hatte zwei getrennte Tickets. Bekomme ich etwas?', a: 'Für den verpassten zweiten Flug nicht. Jede Buchung wird für sich betrachtet: Der erste Flug zählt nur mit seiner eigenen Ankunftsverspätung, und das Ticket für den Weiterflug verfällt meist. Ausgleich gibt es dann nur, wenn der Zubringer selbst drei Stunden oder mehr zu spät ankam. Ein neues Ticket für den verpassten Flug zahlen Sie in diesem Fall selbst.' },
      { q: 'Welche Airline muss zahlen, wenn zwei Gesellschaften beteiligt waren?', a: 'Die Gesellschaft, die den verspäteten Flug durchgeführt hat, der den Anschluss platzen ließ. Steht auf der Bordkarte für den Zubringer „durchgeführt von“ eine Partnerairline, richtet sich die Forderung an diese. Beide Flüge müssen aber in einer Buchung zusammengefasst sein, sonst zählt nur der einzelne Flug.' },
      { q: 'Gilt das auch, wenn ich in Istanbul oder Dubai umsteige?', a: 'Ja, wenn die Reise in der EU beginnt. Für einen Flug ab Deutschland über ein Drehkreuz außerhalb der EU zu einem Fernziel gilt die Verordnung für die gesamte Verbindung, auch für den zweiten Abschnitt außerhalb Europas. Beginnt die Reise außerhalb der EU, kommt es darauf an, ob eine Airline aus der EU fliegt.' },
      { q: 'Wie viel Zeit zum Umsteigen muss eingeplant sein?', a: 'Die Verbindung muss so gebucht sein, wie die Airline sie verkauft hat. Sie haben die Mindestumsteigezeit nicht selbst zu verantworten, wenn das Buchungssystem die Verbindung angeboten hat. Wer dagegen getrennt gebucht und eine zu knappe Umsteigezeit gewählt hat, trägt das Risiko allein.' },
      { q: 'Muss ich den Ersatzflug annehmen, den man mir am Drehkreuz anbietet?', a: 'Sie haben die Wahl nach Art. 8: frühestmögliche Weiterreise, späterer Wunschtermin oder Erstattung mit Rückflug zum Ausgangsort, wenn die Reise ihren Zweck verloren hat. Die Ausgleichszahlung hängt nicht davon ab, welche Option Sie wählen. Maßgeblich bleibt die tatsächliche Ankunft am Endziel, wenn Sie weiterfliegen.' },
    ],
    body: (h) => {
      const owed = h.owed('HAM', 'JFK', 320)[0].amount;
      const seg = h.owed('HAM', 'FRA', 320)[0].amount;
      return `
<h2>Hamburg, Frankfurt, New York: wie gerechnet wird</h2>
<p>Sie fliegen mit einer Buchung von Hamburg über Frankfurt nach New York. Der Zubringer ist 50 Minuten verspätet, der Anschluss ist weg, und Sie landen am JFK fünf Stunden und zwanzig Minuten nach Plan. Gemessen wird von Hamburg bis New York: ${h.km('HAM', 'JFK')}, also die oberste Stufe mit ${owed}. Dass die beiden Abschnitte zusammen länger sind (${h.km('HAM', 'FRA')} plus ${h.km('FRA', 'JFK')}), spielt keine Rolle, und ebenso wenig, dass der verspätete Abschnitt allein nur ${seg} wert wäre.</p>
${h.table(['Abschnitt', 'Großkreisentfernung', 'Rolle'], [
  ['Hamburg nach Frankfurt', h.km('HAM', 'FRA'), 'verspäteter Zubringer'],
  ['Frankfurt nach New York', h.km('FRA', 'JFK'), 'verpasster Anschluss'],
  ['Hamburg nach New York', h.km('HAM', 'JFK'), 'maßgebliche Entfernung'],
], 'Umsteigeverbindung mit einer Buchung, Entfernung nach dem Urteil Folkerts', ['l', 'r', 'l'])}
${h.mini('route', { t: 'Ab Hamburg: was die ganze Reise wert ist', from: 'HAM', to: ['JFK', 'BKK', 'DXB', 'LPA', 'AYT'], d: { h: 5.33 } })}
<h2>Die drei Bedingungen</h2>
<p>Erstens eine einheitliche Buchung. Das ist der Normalfall, wenn Sie bei einer Airline oder über ein Reisebüro eine Umsteigeverbindung mit gemeinsamer Buchungsnummer gekauft haben. Selbst kombinierte Einzeltickets verschiedener Airlines zählen nicht. Zweitens die Anwendbarkeit der ${h.src('eu261', 'Verordnung (EG) Nr. 261/2004')}: Abflug aus der EU, oder Ankunft in der EU mit einer Airline aus der EU. Drittens drei Stunden Verspätung am Endziel, gemessen bis zur Türöffnung (Einzelheiten unter ${h.a('drei-stunden', 'Flugverspätung ab drei Stunden')}).</p>
<h2>Was am Umsteigeflughafen gilt</h2>
<p>Während Sie auf den Ersatz warten, schuldet die Airline Betreuung nach Art. 9: Mahlzeiten, bei Übernachtung ein Hotel und den Transfer, zwei Telefonate oder E-Mails. Diese Pflicht hängt nicht von der Ursache ab. Behalten Sie die Bordkarten aller Abschnitte, auch die des verpassten Flugs, und lassen Sie sich die Umbuchung schriftlich bestätigen. Wer als einziger Fluggast den Anschluss verpasst, steht am Transferschalter oft allein: Bestehen Sie auf dem frühestmöglichen Ersatz, auch mit einer anderen Airline.</p>
${h.box('Rückflug außerhalb der EU', `<p>Kommen Sie aus Bangkok über Dubai zurück nach München mit einer Airline von außerhalb der EU, gilt die Verordnung für diese Verbindung nicht, auch wenn das Endziel in Deutschland liegt. Mit einer Airline aus der EU auf dem verspäteten Abschnitt sieht es anders aus.</p>`)}
<h2>Ab 2027: der neue Art. 6b</h2>
<p>Die ${h.src('eu2202', 'Verordnung (EU) 2026/2202')} übernimmt die Rechtsprechung in den Text. Für Flüge ab dem ${h.day(h.P.eu261_2027.applies_from)} gibt es Ausgleich bei verpasstem Anschluss, wenn die Ankunft am Endziel mehr als drei Stunden später liegt. Wie bei allen Ansprüchen nach der neuen Fassung muss der Antrag binnen ${h.P.eu261_2027.claim_window_months} Monaten bei der Airline sein. Für Umsteiger über ein deutsches Drehkreuz lohnt auch die Seite ${h.a('fra', 'Flughafen Frankfurt')}.</p>
`;
    },
  },
  en: {
    slug: 'missed-connecting-flight-compensation',
    nav: 'Missed connection', card: 'Connections on one booking: delay counted at the final destination, distance from first departure to last arrival.',
    title: 'Missed connecting flight compensation on a single booking',
    description: 'Missed connecting flight compensation under EU261 and UK261: one booking, distance from first departure to final destination, 3 hours late, new Article 6b.',
    h1: 'Missed connecting flight: when the whole journey counts',
    intro: 'If a late first leg costs you your onward flight, compensation is worked out on your arrival at the final destination and the distance of the whole journey.',
    resume: 'If a delayed first flight makes you miss your connection and you reach your final destination three hours or more late, the airline that operated the delayed flight owes compensation, even if that first flight was only slightly late. The condition is a single booking: both flights bought under one contract, usually one booking reference. The Court of Justice settled this in Folkerts (C-11/11) in 2013. Distance is then measured as the great-circle distance from the first departure airport to the final destination, not leg by leg, so Hamburg to New York via Frankfurt falls in the long-haul band of €600 although the late leg was domestic. The journey must start in the EU or be operated by an EU airline on the relevant leg; UK261 applies the same logic to journeys from the UK, with £520 in the top band. For EU flights from 23 October 2027, the new Article 6b writes the rule into the text: compensation when arrival at the final destination is more than three hours late. Two separately bought tickets are not protected.',
    faqs: [
      { q: 'I bought two separate tickets. Am I covered?', a: 'Not for the missed second flight. Each booking stands alone: the first flight counts only with its own arrival delay, and the onward ticket is usually lost. Compensation is due only if that first flight itself landed three hours or more late. Buying a new ticket for the flight you missed is then at your own expense.' },
      { q: 'Which airline pays when two carriers were involved?', a: 'The one that operated the delayed flight that broke the connection. If your boarding pass for that leg says “operated by” a partner airline, the claim goes to the partner. Both flights must still be on one booking; otherwise only the delayed flight on its own counts.' },
      { q: 'Does it work with a connection in Dubai or Doha?', a: 'Yes, if the journey starts in the EU or the UK. A flight from Manchester or Munich through a Gulf hub to Asia is covered for the whole connection, including the leg outside Europe. On the way back, starting outside Europe, coverage depends on the airline: an EU carrier is covered under EU261, a UK or EU carrier under UK261 for arrivals in the UK.' },
      { q: 'Does it matter where along the journey the delay happened?', a: 'No. On a single booking it makes no difference whether the first leg left late, a later leg was cancelled or you were held at the hub: what counts is how late you reach the final destination. A journey starting at Heathrow is covered by UK261 whatever the airline, and the distance always runs from the first departure airport to the last.' },
      { q: 'Do I have to accept the rebooking offered at the hub?', a: 'You have the Article 8 choice: onward travel at the earliest opportunity, travel at a later date of your choosing, or a refund with a flight back to your starting point if the trip no longer serves its purpose. Compensation does not depend on which you pick; if you fly on, your actual arrival at the final destination is what counts.' },
    ],
    body: (h) => {
      const r = h.owed('MAN', 'BKK', 330, { carrier: 'other' });
      const uk = r.find((x) => x.regime === 'UK261')!;
      return `
<h2>Hamburg, Frankfurt, New York: the calculation</h2>
<p>The calculator above is set to a single booking from Hamburg via Frankfurt to New York. The feeder flight is 50 minutes late, the connection is gone, and you land at JFK five hours twenty late. Distance is measured from Hamburg to New York, ${h.km('HAM', 'JFK')}, so the top band applies: ${h.owed('HAM', 'JFK', 320)[0].amount}. The legs added together come to more (${h.km('HAM', 'FRA')} plus ${h.km('FRA', 'JFK')}) but that is irrelevant, and so is the fact that the delayed domestic leg on its own would only be worth ${h.owed('HAM', 'FRA', 320)[0].amount}.</p>
<h2>From the UK: Manchester to Bangkok via a Gulf hub</h2>
<p>A UK traveller booked Manchester to Bangkok on one ticket with a change in the Gulf, on a non-UK, non-EU airline. The first leg leaves late, the onward flight is missed and arrival in Bangkok is five and a half hours late. UK261 covers the journey because it starts in the UK, the distance is ${h.km('MAN', 'BKK')}, and the amount is ${uk.amount}. EU261 does not apply, as no part of the journey starts in the EU.</p>
${h.table(['Journey on one booking', 'Measured distance', 'Regime', 'Amount at 5 h late'], [
  ['Hamburg, Frankfurt, New York', h.km('HAM', 'JFK'), 'EU261', h.owed('HAM', 'JFK', 300)[0].amount],
  ['Manchester, Gulf hub, Bangkok', h.km('MAN', 'BKK'), 'UK261', uk.amount],
  ['Edinburgh, Amsterdam, Málaga', h.km('EDI', 'AGP'), 'UK261', h.owed('EDI', 'AGP', 300, { carrier: 'eu' }).find((x) => x.regime === 'UK261')!.amount],
], 'Distance from first departure to final destination (Folkerts, C-11/11)', ['l', 'r', 'l', 'r'])}
${h.mini('route', { t: 'From Manchester: what the whole trip is worth', from: 'MAN', to: ['BKK', 'JFK', 'DXB', 'TFS', 'AGP'], d: { h: 5.5 } })}
<h2>The three conditions</h2>
<p>First, a single booking: a connection sold as one journey, typically under one reference, by an airline or an agent. Self-combined tickets from different airlines do not count. Second, the journey has to fall under ${h.src('eu261', 'EU261')} or ${h.src('uk261', 'UK261')}. Third, a delay of three hours or more at the final destination, timed to the door opening, which the ${h.src('caa-delays', 'Civil Aviation Authority')} also uses: see ${h.a('drei-stunden', 'flight delayed three hours')}.</p>
<h2>At the transfer airport</h2>
<p>While you wait for the next available flight, the airline owes care under Article 9: meals, a hotel and transfers if you are stuck overnight, and two calls or emails. Keep the boarding passes for every leg, including the one you missed, and ask for written confirmation of the rebooking.</p>
<h2>EU rules from 2027: Article 6b</h2>
<p>${h.src('eu2202', 'Regulation (EU) 2026/2202')} writes the Folkerts rule into the text for flights from ${h.day(h.P.eu261_2027.applies_from)}: a missed connection gives compensation when arrival at the final destination is more than three hours late. Claims must then reach the airline within ${h.P.eu261_2027.claim_window_months} months. UK261 has not been changed.</p>
`;
    },
  },
});
