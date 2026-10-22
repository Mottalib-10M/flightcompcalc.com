import { definePage, type Helpers } from '../../lib/page-types';

const DEST: Array<[string, string, string]> = [
  ['PMI', 'Palma de Mallorca', 'Palma de Mallorca'], ['HER', 'Heraklion', 'Heraklion'], ['LPA', 'Gran Canaria', 'Gran Canaria'],
  ['AYT', 'Antalya', 'Antalya'], ['HRG', 'Hurghada', 'Hurghada'], ['IST', 'Istanbul', 'Istanbul'], ['DXB', 'Dubai', 'Dubai'], ['JFK', 'New York JFK', 'New York JFK'],
];
const amt = (h: Helpers, f: string, t: string, carrier: 'eu' | 'other') => h.owed(f, t, 250, { carrier })[0]?.amount ?? '–';
const rows = (h: Helpers, de: boolean) => DEST.map(([c, nde, nen]) => [`${de ? nde : nen} (${c})`, h.km('DUS', c), amt(h, 'DUS', c, 'eu'), amt(h, c, 'DUS', 'eu'), amt(h, c, 'DUS', 'other')]);

export default definePage({
  id: 'dus', group: 'airports-de', order: 220,
  tool: 'flight', toolArg: { from: 'DUS', to: 'AYT', event: 'delay', delay: 250, cause: 'technical', carrier: 'eu' },
  related: ['fra', 'ber', 'ham', 'anschluss', 'schlichtung'],
  sources: ['eu261', 'bgb651p', 'luftvg57', 'soep', 'eu2202'],
  de: {
    slug: 'flughafen-duesseldorf-verspaetung',
    nav: 'Flughafen Düsseldorf', card: 'Urlaubsflüge, Pauschalreisen und Rückflüge aus der Türkei und Ägypten: was ab DUS zählt.',
    title: 'Flughafen Düsseldorf Verspätung: Entschädigung ab DUS',
    description: 'Flughafen Düsseldorf Verspätung: Beträge für 8 Urlaubsziele ab DUS, Rückflüge aus Antalya und Hurghada, Pauschalreise und Airline, Klage beim AG Düsseldorf.',
    h1: 'Verspätung am Flughafen Düsseldorf: Urlaubsflug, Rückflug, Pauschalreise',
    intro: 'Ab Düsseldorf geht es meist in den Urlaub. Entscheidend ist dann oft nicht der Hinflug, sondern wer den Rückflug durchführt.',
    resume: 'Jeder Flug ab Düsseldorf fällt unter die Verordnung (EG) Nr. 261/2004, gleich welche Airline ihn durchführt: Bei drei Stunden oder mehr Verspätung am Endziel oder einer kurzfristigen Annullierung gibt es je nach Großkreisentfernung 250, 400 oder 600 € pro Person. Für die typischen Urlaubsziele ab DUS heißt das: Mallorca liegt in der ersten Stufe, Kreta und Antalya in der zweiten, Hurghada mit gut 3 500 km knapp in der dritten. Beim Rückflug kommt es auf die Airline an. Von Antalya oder Hurghada zurück nach Düsseldorf gilt die Verordnung nur, wenn eine Gesellschaft mit Betriebsgenehmigung aus der EU fliegt; eine türkische oder ägyptische Airline schuldet auf diesem Abschnitt nach EU-Recht nichts. Wer pauschal gebucht hat, fordert die Ausgleichszahlung trotzdem bei der Airline, nicht beim Veranstalter. Was Sie vom Veranstalter als Minderung bekommen, wird nach § 651p Abs. 3 BGB angerechnet und umgekehrt. Klagen können Sie am Abflug- oder Ankunftsort, für Flüge ab oder nach Düsseldorf also beim Amtsgericht Düsseldorf.',
    faqs: [
      { q: 'Mein Rückflug aus Antalya war fünf Stunden zu spät. Bekomme ich Geld?', a: 'Nur wenn eine Airline aus der EU den Flug durchgeführt hat, denn für Flüge aus einem Drittstaat in die EU gilt die Verordnung allein für EU-Gesellschaften. Dann sind es bei rund 2 500 km Entfernung 400 € pro Person. Maßgeblich ist der Name unter „durchgeführt von“ auf der Bordkarte, nicht die Airline, bei der Sie gebucht haben.' },
      { q: 'Wer zahlt bei einer Pauschalreise, der Veranstalter oder die Airline?', a: 'Die Ausgleichszahlung schuldet immer die ausführende Airline, auch wenn Sie nur mit dem Veranstalter einen Vertrag haben. Der Veranstalter haftet daneben für verlorene Urlaubszeit mit einer Minderung des Reisepreises. Beides schließt sich nicht aus, wird aber nach § 651p Abs. 3 BGB gegeneinander angerechnet, sodass Sie nicht zweimal für dasselbe Ereignis Geld bekommen.' },
      { q: 'Der Veranstalter hat meinen Flug um sechs Stunden vorverlegt. Zählt das?', a: 'Eine Vorverlegung um mehr als eine Stunde kann nach der Rechtsprechung des Gerichtshofs wie eine Annullierung zu behandeln sein, wenn sie weniger als 14 Tage vorher mitgeteilt wird. Dann richtet sich der Anspruch nach der Entfernung, und die Airline muss beweisen, wann sie Sie informiert hat. Bewahren Sie die Mitteilung mit Datum auf.' },
      { q: 'Welches Gericht ist für Düsseldorf zuständig?', a: 'Für Flüge, die in Düsseldorf starten oder landen, das Amtsgericht Düsseldorf, gestützt auf das Urteil Rehder des Gerichtshofs, das die Wahl zwischen Abflug- und Ankunftsort erlaubt. Vor dem Amtsgericht brauchen Sie keinen Anwalt. Vorher lohnt die kostenlose Schlichtung, wenn die Airline ablehnt oder zwei Monate nicht antwortet.' },
    ],
    body: (h) => `
<h2>Acht Urlaubsziele ab Düsseldorf</h2>
<p>Die Tabelle rechnet mit einer Ankunftsverspätung von vier Stunden und zehn Minuten und einem Grund, den die Airline zu vertreten hat, etwa einem technischen Defekt. Die Spalten zeigen, wie unterschiedlich Hin- und Rückflug behandelt werden.</p>
${h.table(['Ziel', 'Entfernung', 'Hinflug ab DUS', 'Rückflug, EU-Airline', 'Rückflug, andere Airline'], rows(h, true), 'Ausgleichszahlung pro Person nach Art. 7 der Verordnung (EG) Nr. 261/2004, Rechtslage bis 22. Oktober 2027', ['l', 'r', 'r', 'r', 'r'])}
<p>Innerhalb der EU sind Hin- und Rückflug gleich gedeckt. Bei Antalya, Hurghada, Istanbul, Dubai und New York entscheidet auf dem Rückweg die Herkunft der Airline. Wer die Wahl hat, bucht für den Rückflug deshalb besser eine Gesellschaft aus der EU: Der Preisunterschied ist oft kleiner als der Anspruch, der sonst verloren geht.</p>
${h.mini('route', { t: 'Ab Düsseldorf: Ziel wählen, Betrag sehen', from: 'DUS', to: ['PMI', 'AYT', 'HRG', 'LPA', 'HER', 'IST'], d: { h: 4.17 } })}
<h2>Pauschalreise: zwei Ansprüche, eine Anrechnung</h2>
<p>Ein großer Teil der Abflüge ab Düsseldorf ist Teil einer Pauschalreise. Die Verspätung betrifft dann zwei Verträge. Von der Airline verlangen Sie die feste Ausgleichszahlung nach der ${h.src('eu261', 'Verordnung')}, unabhängig vom Reisepreis. Vom Veranstalter können Sie eine Minderung verlangen, wenn Urlaubszeit verloren geht, etwa ein ganzer Tag am Ziel. Beide Beträge werden nach ${h.src('bgb651p', '§ 651p Abs. 3 BGB')} verrechnet: Wer 400 € von der Airline erhalten hat und vom Veranstalter 250 € Minderung zugesprochen bekommt, erhält dort nichts mehr, weil die Ausgleichszahlung schon höher ist. Fordern Sie deshalb zuerst die Airline an, deren Betrag nicht vom Reisepreis abhängt.</p>
${h.mini('delay', { d: { h: 4.17, b: 1 }, t: 'Düsseldorf–Antalya: Betrag nach Verspätung' })}
<h2>Fristen und Gericht</h2>
<p>Nach deutschem Recht verjähren Ausgleichszahlungen in drei Jahren ab Ende des Flugjahres (${h.a('verjaehrung', 'Fristen im Überblick')}). Lehnt die Airline ab oder schweigt sie zwei Monate, folgt die kostenlose Schlichtung nach ${h.src('luftvg57', '§ 57 LuftVG')}, meist über die ${h.src('soep', 'söp')}. Danach bleibt die Klage am Amtsgericht Düsseldorf. Für Flüge ab dem ${h.day(h.P.eu261_2027.applies_from)} kommt nach der ${h.src('eu2202', 'Verordnung (EU) 2026/2202')} ein Antrag binnen ${h.P.eu261_2027.claim_window_months} Monaten bei der Airline hinzu. Wie die drei Stufen ineinandergreifen, steht unter ${h.a('schlichtung', 'Schlichtung und Klage')}.</p>
`,
  },
  en: {
    slug: 'dusseldorf-airport-delay-compensation',
    nav: 'Düsseldorf Airport', card: 'Holiday flights, package trips and return flights from Turkey and Egypt: what counts from DUS.',
    title: 'Düsseldorf Airport delay compensation: flights from DUS',
    description: 'Düsseldorf Airport (DUS) delay compensation: amounts for 8 holiday routes, return flights from Antalya and Hurghada, package holidays and the court to use.',
    h1: 'Delays at Düsseldorf Airport: holiday flights, return legs, package trips',
    intro: 'Most departures from Düsseldorf are holiday flights, and on those the question is often less the outbound flight than who operates the way back.',
    resume: 'Every flight leaving Düsseldorf is covered by EU Regulation 261/2004, whatever the airline: a delay of three hours or more at the final destination, or a late cancellation, pays €250, €400 or €600 per passenger depending on great-circle distance. For the typical holiday routes from DUS that means Mallorca sits in the first band, Crete and Antalya in the second, and Hurghada, just over 3,500 km away, in the third. On the way back the operating airline decides. From Antalya or Hurghada to Düsseldorf the regulation applies only if an airline licensed in the EU operates the flight; a Turkish or Egyptian airline owes nothing under EU law on that leg. Travellers on a package still claim the compensation from the airline, not the tour operator. What the operator pays as a price reduction is offset against it under section 651p(3) of the German Civil Code, and the other way round. Court claims can be brought at the place of departure or arrival, so at the Düsseldorf local court for flights from or to DUS.',
    faqs: [
      { q: 'My return flight from Antalya was five hours late. Is money owed?', a: 'Only if an EU airline operated the flight, because the regulation covers flights from outside the EU into the EU only on EU carriers. Then, for roughly 2,500 km, it is €400 per passenger. What matters is the name shown as “operated by” on the boarding pass, not the airline you booked with.' },
      { q: 'With a package holiday, who pays: the tour operator or the airline?', a: 'The operating airline always owes the fixed compensation, even if your contract is only with the tour operator. The operator is liable on top for lost holiday time through a price reduction. Both can be claimed, but section 651p(3) of the German Civil Code offsets one against the other, so the same event is not paid twice.' },
      { q: 'The operator moved my flight six hours earlier. Does that count?', a: 'A flight brought forward by more than an hour can be treated as a cancellation under the Court of Justice’s case law when you are told less than 14 days before. The claim then follows the distance bands, and the airline has to prove when it informed you. Keep the notification with its date.' },
      { q: 'Which court hears claims for Düsseldorf?', a: 'For flights departing from or arriving at Düsseldorf, the Düsseldorf local court (Amtsgericht Düsseldorf), on the basis of the Court of Justice’s Rehder judgment, which lets you choose the place of departure or arrival. No lawyer is required at a local court. Free arbitration comes first if the airline refuses or stays silent for two months.' },
    ],
    body: (h) => `
<h2>Eight holiday routes from Düsseldorf</h2>
<p>The table assumes an arrival delay of four hours and ten minutes and a cause the airline is responsible for, such as a technical fault. The columns show how differently the outbound and return legs are treated.</p>
${h.table(['Destination', 'Distance', 'Outbound from DUS', 'Return, EU airline', 'Return, other airline'], rows(h, false), 'Compensation per passenger under Article 7 of Regulation (EC) No 261/2004, rules until 22 October 2027', ['l', 'r', 'r', 'r', 'r'])}
<p>Within the EU both legs are covered alike. For Antalya, Hurghada, Istanbul, Dubai and New York, the airline’s licence decides the return leg. If you have a choice, an EU airline for the flight home is often worth the small price difference, since the claim is otherwise lost.</p>
${h.mini('route', { t: 'From Düsseldorf: pick a destination', from: 'DUS', to: ['PMI', 'AYT', 'HRG', 'LPA', 'HER', 'IST'], d: { h: 4.17 } })}
<h2>Package holidays: two claims, one offset</h2>
<p>Many departures from Düsseldorf are part of a package. A delay then touches two contracts. From the airline you claim the fixed amount under the ${h.src('eu261', 'regulation')}, whatever the fare. From the tour operator you can claim a price reduction when holiday time is lost, such as a full day at the destination. The two are offset under ${h.src('bgb651p', 'section 651p(3) BGB')}: if the airline pays €400 and a court grants a €250 reduction against the operator, nothing more is due from the operator because the compensation already exceeds it. Claim from the airline first, since its amount does not depend on the price you paid.</p>
${h.mini('delay', { d: { h: 4.17, b: 1 }, t: 'Düsseldorf to Antalya: amount by delay' })}
<h2>Deadlines and court</h2>
<p>Under German law, compensation claims become time-barred three years after the end of the year of the flight (${h.a('verjaehrung', 'deadlines')}). If the airline refuses or stays silent for two months, free arbitration under ${h.src('luftvg57', 'section 57 of the Aviation Act')} follows, usually through the ${h.src('soep', 'söp')}. After that, a claim at the Düsseldorf local court remains. For flights from ${h.day(h.P.eu261_2027.applies_from)}, ${h.src('eu2202', 'Regulation (EU) 2026/2202')} adds a request to the airline within ${h.P.eu261_2027.claim_window_months} months. The three steps are set out in ${h.a('schlichtung', 'arbitration and court')}.</p>
`,
  },
});
