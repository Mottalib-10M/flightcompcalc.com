import { definePage, type Helpers } from '../../lib/page-types';

const DEST = ['CPH', 'ARN', 'OSL', 'LHR', 'PMI', 'LPA', 'AYT', 'DXB'];
const rows = (h: Helpers) => DEST.map((c) => [h.ap(c), h.km('HAM', c), h.owed('HAM', c, 195)[0]?.amount ?? '–', h.owed('HAM', c, 260)[0]?.amount ?? '–']);

export default definePage({
  id: 'ham', group: 'airports-de', order: 240,
  tool: 'flight', toolArg: { from: 'HAM', to: 'ARN', event: 'cancel', delay: 300, cause: 'airport-strike', carrier: 'eu', notice: 1 },
  related: ['fra', 'muc', 'streik', 'anschluss', 'annullierung'],
  sources: ['eu261', 'eu2202', 'luftvg57', 'soep', 'uk261'],
  de: {
    slug: 'flughafen-hamburg-verspaetung',
    nav: 'Flughafen Hamburg', card: 'Kurze Nordstrecken, Zubringer zu den Drehkreuzen, Warnstreiks und Winterwetter: was ab HAM zählt.',
    title: 'Flughafen Hamburg Verspätung: Entschädigung ab HAM',
    description: 'Flughafen Hamburg Verspätung: Beträge für 8 Ziele ab HAM, Zubringer über Frankfurt und München, Warnstreiks am Flughafen, Enteisung im Winter und die Fristen.',
    h1: 'Verspätung am Flughafen Hamburg: Nordstrecken, Zubringer, Streiktage',
    intro: 'Ab Hamburg sind die Strecken oft kurz, die Reisen aber lang: Wer über ein Drehkreuz weiterfliegt, rechnet mit der ganzen Entfernung.',
    resume: 'Für jeden Abflug ab Hamburg gilt die Verordnung (EG) Nr. 261/2004. Die Direktziele im Norden sind kurz: Kopenhagen, Oslo, Stockholm und London liegen alle unter 1 500 km, eine Ankunft mit drei Stunden Verspätung bringt dort 250 € pro Person. Viele Reisen ab Hamburg beginnen aber mit einem Zubringer nach Frankfurt, München, Amsterdam oder Istanbul. Steht alles in einer Buchung, zählt die Entfernung von Hamburg bis zum Endziel, und ein verpasster Anschluss nach New York wird zum Anspruch von 600 €, obwohl der verspätete Abschnitt nur eine Stunde dauerte. Zwei Ursachen prägen die Streitfälle in Hamburg. Warnstreiks des Bodenpersonals oder der Luftsicherheit am Flughafen treffen die Airline von außen und gelten meist als außergewöhnlicher Umstand; ein Streik der eigenen Crew dagegen nicht. Im Winter kostet die Enteisung Zeit: Schneefall entlastet die Airline, ein schlecht geplanter eigener Enteisungsablauf nicht. Ansprüche verjähren nach deutschem Recht drei Jahre nach Ende des Flugjahres.',
    faqs: [
      { q: 'Mein Flug ab Hamburg fiel wegen eines Warnstreiks am Flughafen aus. Gibt es Geld?', a: 'Meist nicht. Streikt das Personal des Flughafens oder der Sicherheitskontrolle, liegt der Grund außerhalb der Airline, und der Gerichtshof sieht darin in der Regel einen außergewöhnlichen Umstand. Die Airline muss Sie trotzdem umbuchen oder den Ticketpreis erstatten und Sie betreuen. Streikt dagegen ihr eigenes Personal, schuldet sie die Ausgleichszahlung.' },
      { q: 'Ich habe in München meinen Anschluss nach Singapur verpasst. Wie wird gerechnet?', a: 'Wenn beide Flüge in einer Buchung stehen, zählt die Großkreisentfernung von Hamburg nach Singapur, also die oberste Stufe mit 600 € pro Person, und die Ankunftsverspätung in Singapur. Wie lange der Zubringer verspätet war, ist gleichgültig. Getrennt gebuchte Flüge werden dagegen einzeln betrachtet.' },
      { q: 'Zählt eine Verspätung durch Enteisung?', a: 'Nur wenn sie nicht auf das Wetter zurückgeht, sondern auf die Organisation der Airline, etwa weil sie zu wenige Enteisungsslots gebucht hat. Starker Schneefall oder Eisregen, bei dem alle Abflüge warten müssen, ist ein außergewöhnlicher Umstand. Fragen Sie schriftlich nach dem genauen Grund und vergleichen Sie mit anderen Abflügen zur gleichen Zeit.' },
      { q: 'Bekomme ich für Hamburg–London Euro oder Pfund?', a: 'Auf dem Hinflug ab Hamburg gilt die EU-Verordnung mit Beträgen in Euro, 250 € pro Person. Auf dem Rückflug ab London gilt für jede Airline UK261 mit 220 £, die EU-Verordnung zusätzlich nur für eine Airline aus der EU. Sie fordern einmal, nach dem Recht, das für Sie günstiger ist.' },
    ],
    body: (h) => `
<h2>Acht Ziele ab Hamburg</h2>
<p>Die Tabelle vergleicht eine Ankunft am Ziel mit drei Stunden und fünfzehn Minuten Verspätung und eine mit über vier Stunden, jeweils aus einem Grund, den die Airline zu vertreten hat.</p>
${h.table(['Ziel', 'Entfernung', '3¼ Std. zu spät', 'über 4 Std. zu spät'], rows(h), 'Ausgleichszahlung pro Person nach Art. 7 der Verordnung (EG) Nr. 261/2004, Rechtslage bis 22. Oktober 2027', ['l', 'r', 'r', 'r'])}
<p>Die Unterschiede zwischen den beiden Spalten zeigen sich nur bei Dubai: Auf Langstrecken außerhalb der EU darf die Airline unter vier Stunden halbieren. Gran Canaria liegt ${h.km('HAM', 'LPA')} entfernt, mehr als 3 500 km, bleibt aber als innereuropäischer Flug bei ${h.eur(h.P.eu261.intra_over_1500)}.</p>
${h.mini('route', { t: 'Ab Hamburg: Ziel wählen, Betrag sehen', from: 'HAM', to: ['CPH', 'ARN', 'LHR', 'PMI', 'LPA', 'DXB'], d: { h: 3.25 } })}
<h2>Zubringer: die ganze Reise zählt</h2>
<p>Ein Flug von Hamburg nach Frankfurt dauert eine Stunde. Kommt er 50 Minuten zu spät an und ist der Anschluss nach Chicago weg, landen Sie vielleicht sechs Stunden später als geplant. Mit einer gemeinsamen Buchung zählt dann die Entfernung von Hamburg nach Chicago, ${h.km('HAM', 'ORD')}, und die Verspätung in Chicago. Die Forderung richtet sich an die Airline, die den verspäteten Zubringer durchgeführt hat. Einzelheiten unter ${h.a('anschluss', 'Anschlussflug verpasst')} und zu den Drehkreuzen unter ${h.a('fra', 'Flughafen Frankfurt')}.</p>
${h.mini('band', { d: { km: Math.round(h.dist('HAM', 'ORD')) }, t: 'Hamburg–Chicago über Frankfurt' })}
<h2>Streiktage und Wintertage</h2>
<p>Hamburg ist regelmäßig von Warnstreiks im Bodenverkehrsdienst und an der Sicherheitskontrolle betroffen. Für diese Tage gilt: Die Airline muss umbuchen, betreuen und auf Wunsch den Preis erstatten, die Ausgleichszahlung entfällt aber meist. Ein Streik des eigenen Personals der Airline ist dagegen kein außergewöhnlicher Umstand, und daran ändert auch die ${h.src('eu2202', 'neue Fassung von 2026')} nichts. Lehnt die Airline zu Unrecht ab, folgt die kostenlose Schlichtung nach ${h.src('luftvg57', '§ 57 LuftVG')}, meist über die ${h.src('soep', 'söp')}, und danach die Klage am Abflug- oder Ankunftsort. Die Abgrenzung im Einzelnen steht unter ${h.a('streik', 'Streik und außergewöhnliche Umstände')}.</p>
`,
  },
  en: {
    slug: 'hamburg-airport-delay-compensation',
    nav: 'Hamburg Airport', card: 'Short northern routes, feeder flights to the hubs, airport strikes and winter weather: what counts from HAM.',
    title: 'Hamburg Airport delay compensation: flights from HAM',
    description: 'Hamburg Airport (HAM) delay compensation: amounts for 8 routes, feeder flights via Frankfurt and Munich, airport staff strikes, winter de-icing and deadlines.',
    h1: 'Delays at Hamburg Airport: northern routes, feeder flights, strike days',
    intro: 'From Hamburg the flights are often short but the journeys long: if you connect through a hub, the whole distance counts.',
    resume: 'Every departure from Hamburg is covered by EU Regulation 261/2004. The direct routes to the north are short: Copenhagen, Oslo, Stockholm and London are all under 1,500 km, so an arrival three hours late pays €250 per passenger. Many trips from Hamburg, however, start with a feeder flight to Frankfurt, Munich, Amsterdam or Istanbul. If everything is on one booking, distance is measured from Hamburg to the final destination, and a missed connection to New York becomes a €600 claim even though the delayed leg lasted an hour. Two causes dominate disputes in Hamburg. Warning strikes by airport ground handling or security staff hit the airline from outside and are usually extraordinary circumstances; a strike by the airline’s own crew is not. In winter de-icing costs time: snowfall excuses the airline, a badly planned de-icing schedule of its own does not. Under German law claims become time-barred three years after the end of the year of the flight.',
    faqs: [
      { q: 'My flight from Hamburg was cancelled by a warning strike at the airport. Is money owed?', a: 'Usually not. When airport or security staff strike, the cause lies outside the airline, and the Court of Justice generally treats it as an extraordinary circumstance. The airline must still rebook you or refund the fare, and provide care. If its own staff strike, it owes the compensation.' },
      { q: 'I missed my Munich connection to Singapore. How is it calculated?', a: 'If both flights are on one booking, the great-circle distance from Hamburg to Singapore counts, so the top band of €600 per passenger, together with the arrival delay in Singapore. How late the feeder flight was does not matter. Separately booked flights are assessed one by one.' },
      { q: 'Does a de-icing delay count?', a: 'Only when it stems from the airline’s organisation rather than the weather, for instance because it booked too few de-icing slots. Heavy snow or freezing rain that holds every departure is an extraordinary circumstance. Ask in writing for the exact cause and compare with other departures at the same time.' },
      { q: 'Hamburg to London: euros or pounds?', a: 'Outbound from Hamburg the EU regulation applies, in euros: €250 per passenger. On the way back from London, UK261 applies to every airline with £220, and the EU regulation only to an EU airline. You claim once, under whichever rules suit you better.' },
    ],
    body: (h) => `
<h2>Eight routes from Hamburg</h2>
<p>The table compares an arrival three hours and fifteen minutes late with one over four hours late, in both cases for a cause the airline is responsible for.</p>
${h.table(['Destination', 'Distance', '3¼ h late', 'Over 4 h late'], rows(h), 'Compensation per passenger under Article 7 of Regulation (EC) No 261/2004, rules until 22 October 2027', ['l', 'r', 'r', 'r'])}
<p>The two columns differ only for Dubai: on long-haul routes outside the EU the airline may halve the amount below four hours. Gran Canaria is ${h.km('HAM', 'LPA')} away, more than 3,500 km, but as an intra-EU flight stays at ${h.eur(h.P.eu261.intra_over_1500)}.</p>
${h.mini('route', { t: 'From Hamburg: pick a destination', from: 'HAM', to: ['CPH', 'ARN', 'LHR', 'PMI', 'LPA', 'DXB'], d: { h: 3.25 } })}
<h2>Feeder flights: the whole journey counts</h2>
<p>Hamburg to Frankfurt takes an hour. If it arrives 50 minutes late and the connection to Chicago is gone, you may land six hours later than planned. With a single booking, the distance from Hamburg to Chicago counts, ${h.km('HAM', 'ORD')}, together with the delay in Chicago. The claim goes to the airline that operated the late feeder flight. Details in ${h.a('anschluss', 'missed connections')} and, for the hubs, ${h.a('fra', 'Frankfurt Airport')}.</p>
${h.mini('band', { d: { km: Math.round(h.dist('HAM', 'ORD')) }, t: 'Hamburg to Chicago via Frankfurt' })}
<h2>Strike days and winter days</h2>
<p>Hamburg is regularly hit by warning strikes in ground handling and at security. On those days the airline must rebook, provide care and refund on request, but compensation usually falls away. A strike by the airline’s own staff is not an extraordinary circumstance, and the ${h.src('eu2202', '2026 amendment')} does not change that. If the airline refuses wrongly, free arbitration under ${h.src('luftvg57', 'section 57 of the Aviation Act')} follows, usually through the ${h.src('soep', 'söp')}, then a claim at the place of departure or arrival. The dividing line is explained in ${h.a('streik', 'strikes and extraordinary circumstances')}.</p>
`,
  },
});
