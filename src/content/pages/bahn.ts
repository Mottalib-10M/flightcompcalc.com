import { definePage } from '../../lib/page-types';

const FARES = [19.99, 39.99, 59.99, 89.9, 139.9];

export default definePage({
  id: 'bahn', group: 'bahn', order: 600,
  tool: 'rail', toolArg: { fare: 59.99, delay: 75 },
  related: ['bahn-formular', 'fluggastrechte', 'anschluss', 'verjaehrung'],
  sources: ['rail2021', 'db-rules', 'evo', 'soep'],
  de: {
    slug: 'fahrgastrechte-bahn-verspaetung',
    nav: 'Zug verspätet: Fahrgastrechte', card: '25 % ab 60 Minuten, 50 % ab 120 Minuten, Zeitkarten, Taxi und Hotel: was die Bahn bei Verspätung schuldet.',
    title: 'Fahrgastrechte Bahn: Entschädigung ab 60 Minuten Verspätung',
    description: 'Fahrgastrechte Bahn bei Verspätung: 25 % ab 60 Minuten, 50 % ab 120 Minuten, Pauschalen für Zeitkarten, Weiterfahrt, Taxi bis 120 €, mit Rechner und Fristen.',
    h1: 'Zug verspätet: Entschädigung nach den Fahrgastrechten',
    intro: 'Bei der Bahn zählt nicht die Strecke, sondern der Fahrpreis: ein Viertel ab einer Stunde Verspätung am Ziel, die Hälfte ab zwei Stunden.',
    resume: 'Kommt Ihr Zug mindestens 60 Minuten zu spät am Zielbahnhof an, erstattet das Eisenbahnunternehmen nach Art. 19 der Verordnung (EU) 2021/782 ein Viertel des Fahrpreises für die betroffene einfache Fahrt, ab 120 Minuten die Hälfte. Maßgeblich ist der Zielbahnhof auf der Fahrkarte, nicht der einzelne Zug; ein verpasster Anschluss zählt mit. Beträge unter 4 € werden nicht ausgezahlt. Für Zeitkarten gibt es feste Pauschalen je Verspätung ab 60 Minuten: im Nahverkehr 1,50 € in der 2. Klasse, im Fernverkehr 5 €, mit der BahnCard 100 10 €, insgesamt höchstens ein Viertel des Zeitkartenwerts. Schon ab 20 Minuten erwarteter Verspätung entfällt bei Sparpreisen die Zugbindung. Bleibt die Bahn 100 Minuten lang eine Auskunft schuldig, dürfen Sie mit einem anderen Zug oder Bus weiterfahren. Seit Juni 2023 muss die Bahn bei Unwetter, Personen im Gleis oder Kabeldiebstahl keine Entschädigung mehr zahlen; Streiks des eigenen Personals entlasten sie nicht. Die Frist für den Antrag beträgt drei Monate.',
    faqs: [
      { q: 'Bekomme ich bei 59 Minuten Verspätung etwas?', a: 'Keine Entschädigung, die Schwelle liegt bei 60 Minuten am Zielbahnhof. Erwarten Sie aber schon unterwegs mindestens 20 Minuten Verspätung, ist die Zugbindung Ihres Sparpreises aufgehoben, und Sie dürfen einen anderen Zug nehmen. Bei Nahverkehrsfahrkarten müssen Sie einen Fernzug dafür zunächst selbst bezahlen und können sich den Aufpreis erstatten lassen.' },
      { q: 'Gilt die Entschädigung auch für das Deutschlandticket?', a: 'Das Deutschlandticket ist eine Zeitkarte des Nahverkehrs. Pro Verspätung ab 60 Minuten gibt es 1,50 € in der 2. Klasse, insgesamt höchstens ein Viertel des Ticketpreises. Weil unter 4 € nichts ausgezahlt wird, sammeln Sie mindestens drei Fälle im Gültigkeitszeitraum. Den Umstieg in einen ICE auf Kosten der Bahn deckt das Ticket nicht.' },
      { q: 'Zahlt die Bahn bei einem Sturm?', a: 'Seit dem 7. Juni 2023 nicht mehr, wenn die Verspätung unmittelbar auf außergewöhnliche Umstände außerhalb des Bahnbetriebs zurückgeht, etwa extremes Wetter, eine Naturkatastrophe oder Personen im Gleis. Weiterfahrt, Erstattung und Hotel bleiben geschuldet. Ein Streik des eigenen Personals, Signalstörungen oder ein defekter Zug sind keine solchen Umstände.' },
      { q: 'Wann muss ich den Antrag stellen?', a: 'Die Verordnung sieht drei Monate nach der Fahrt vor. Die DB nimmt nach eigener Aussage bis auf Weiteres auch spätere Anträge an, darauf sollten Sie sich aber nicht verlassen. Die Auszahlung muss innerhalb eines Monats nach dem Antrag erfolgen. Sie wählen zwischen Überweisung und Gutschein.' },
    ],
    body: (h) => `
<h2>Was der Fahrpreis bringt</h2>
${h.table(['Fahrpreis einfache Fahrt', 'ab 60 Min. (25 %)', 'ab 120 Min. (50 %)'], FARES.map((f) => [h.eur(f, 2), f * 0.25 < h.P.rail_de.min_payout_eur ? 'unter 4 €, keine Auszahlung' : h.eur(Math.round(f * 25) / 100, 2), h.eur(Math.round(f * 50) / 100, 2)]), 'Entschädigung nach Art. 19 der Verordnung (EU) 2021/782, Regeln der DB', ['r', 'r', 'r'])}
<p>Bei Hin- und Rückfahrkarten zählt der Preis der betroffenen Richtung; ist nur ein Gesamtpreis ausgewiesen, die Hälfte davon. Ein Sparpreis für ${h.eur(14.99, 2)} mit 70 Minuten Verspätung bringt also nichts, weil ein Viertel davon unter ${h.eur(h.P.rail_de.min_payout_eur)} liegt; bei ${h.eur(19.99, 2)} sind es dagegen ${h.eur(5, 2)}. Maßgeblich ist der errechnete Betrag, nicht der Fahrpreis.</p>
${h.mini('rail', { d: { f: 59.99, m: 75 }, t: 'Fahrpreis und Verspätung eingeben' })}
<h2>Zeitkarten: Pauschalen statt Prozent</h2>
${h.table(['Zeitkarte', '2. Klasse', '1. Klasse'], [
  ['Nahverkehr, auch Länder- und Deutschlandticket', h.eur(h.P.rail_de.season.nah2, 2), h.eur(h.P.rail_de.season.nah1, 2)],
  ['Fernverkehr', h.eur(h.P.rail_de.season.fern2, 2), h.eur(h.P.rail_de.season.fern1, 2)],
  ['BahnCard 100', h.eur(h.P.rail_de.season.bc100_2, 2), h.eur(h.P.rail_de.season.bc100_1, 2)],
], `Pauschale je Verspätung ab 60 Minuten, höchstens ${h.P.rail_de.season.cap_pct} % des Zeitkartenwerts`, ['l', 'r', 'r'])}
<p>Die Fälle werden innerhalb der Gültigkeit der Karte gesammelt und zusammen eingereicht. Im Nahverkehr erreichen Sie die Auszahlungsgrenze von ${h.eur(h.P.rail_de.min_payout_eur)} erst mit drei Fällen.</p>
<h2>Weiterfahrt, Taxi und Hotel</h2>
<p>Ab ${h.P.rail_de.free_train_choice_minutes} Minuten erwarteter Verspätung am Ziel dürfen Sie einen anderen Zug nehmen, bei Sparpreisen ist die Zugbindung dann aufgehoben (${h.src('db-rules', 'Regeln der DB')}). Wäre die letzte Verbindung des Tages weg und der Zielbahnhof nicht mehr bis Mitternacht erreichbar, ersetzt die Bahn ein anderes Verkehrsmittel bis ${h.eur(h.P.rail_de.taxi_cap_eur)}, wenn sie selbst keines stellt und nicht erreichbar ist. Ist die Weiterfahrt am selben Tag nicht möglich oder nicht zumutbar, übernimmt sie angemessene Hotelkosten. Rechtsgrundlage sind die ${h.src('rail2021', 'Verordnung (EU) 2021/782')} und die ${h.src('evo', 'Eisenbahn-Verkehrsordnung')}.</p>
<h2>Wenn die Bahn ablehnt</h2>
<p>Gegen eine Ablehnung hilft die ${h.src('soep', 'söp')}, die auch für Bahnunternehmen schlichtet und für Fahrgäste kostenlos ist. Wie Sie den Antrag selbst stellen, online oder mit dem Formular, steht unter ${h.a('bahn-formular', 'Fahrgastrechte-Formular')}. Wer Flug und Zug kombiniert, findet die Regeln für den Flug unter ${h.a('fluggastrechte', 'Fluggastrechte')}.</p>
`,
  },
  en: {
    slug: 'train-delay-compensation-germany',
    nav: 'Train delays in Germany', card: '25% from 60 minutes, 50% from 120 minutes, season tickets, taxis and hotels: what German railways owe for delays.',
    title: 'Train delay compensation Germany: 25% from 60 minutes',
    description: 'Train delay compensation in Germany: 25% of the fare from 60 minutes, 50% from 120, flat amounts for season tickets, onward travel, taxis up to €120, deadlines.',
    h1: 'Train delayed in Germany: compensation under rail passenger rights',
    intro: 'On the railways the distance does not matter, the fare does: a quarter back from one hour late at your destination, half from two hours.',
    resume: 'If your train reaches your destination station at least 60 minutes late, the railway owes a quarter of the fare for that one-way journey under Article 19 of Regulation (EU) 2021/782, and half from 120 minutes. What counts is the destination on the ticket, not the individual train, so a missed connection is included. Amounts under €4 are not paid out. Season tickets get flat amounts per delay of 60 minutes or more: €1.50 in second class on local transport, €5 on long-distance, €10 with a BahnCard 100, capped at a quarter of the ticket’s value. From 20 minutes of expected delay, the train-specific restriction on saver fares no longer applies. If the railway gives no information for 100 minutes, you may continue by another train or coach. Since June 2023 railways no longer pay compensation for severe weather, people on the track or cable theft; strikes by their own staff do not excuse them. The deadline to apply is three months.',
    faqs: [
      { q: 'Is anything owed for a 59-minute delay?', a: 'No compensation: the threshold is 60 minutes at the destination station. But if you expect at least 20 minutes of delay during the trip, your saver fare is no longer tied to a train and you may take another one. With a regional ticket you pay the supplement for a long-distance train first and claim it back.' },
      { q: 'Does compensation apply to the Deutschlandticket?', a: 'The Deutschlandticket is a local transport season ticket. Each delay of 60 minutes or more gives €1.50 in second class, capped at a quarter of the ticket price. Since nothing under €4 is paid out, you need at least three cases within the validity period. Switching to an ICE at the railway’s expense is not covered by this ticket.' },
      { q: 'Does the railway pay after a storm?', a: 'Not since 7 June 2023, when the delay is directly caused by extraordinary circumstances outside railway operations, such as extreme weather, a natural disaster or people on the track. Onward travel, refunds and hotels remain owed. A strike by its own staff, signal failures or a broken train are not such circumstances.' },
      { q: 'When must I apply?', a: 'The regulation provides for three months after the journey. Deutsche Bahn says it accepts later claims for the time being, but you should not rely on that. Payment must follow within one month of the claim, and you choose between a bank transfer and a voucher.' },
    ],
    body: (h) => `
<h2>What your fare brings</h2>
${h.table(['One-way fare', 'From 60 min (25%)', 'From 120 min (50%)'], FARES.map((f) => [h.eur(f, 2), f * 0.25 < h.P.rail_de.min_payout_eur ? 'under €4, not paid' : h.eur(Math.round(f * 25) / 100, 2), h.eur(Math.round(f * 50) / 100, 2)]), 'Compensation under Article 19 of Regulation (EU) 2021/782, Deutsche Bahn rules', ['r', 'r', 'r'])}
<p>On return tickets the price of the affected direction counts; if only a total is shown, half of it. A saver fare of ${h.eur(14.99, 2)} with 70 minutes of delay therefore brings nothing, because a quarter of it is under ${h.eur(h.P.rail_de.min_payout_eur)}. The threshold applies to the computed amount, not the fare.</p>
${h.mini('rail', { d: { f: 59.99, m: 75 }, t: 'Enter fare and delay' })}
<h2>Season tickets: flat amounts instead of percentages</h2>
${h.table(['Season ticket', 'Second class', 'First class'], [
  ['Local transport, incl. regional passes and Deutschlandticket', h.eur(h.P.rail_de.season.nah2, 2), h.eur(h.P.rail_de.season.nah1, 2)],
  ['Long-distance', h.eur(h.P.rail_de.season.fern2, 2), h.eur(h.P.rail_de.season.fern1, 2)],
  ['BahnCard 100', h.eur(h.P.rail_de.season.bc100_2, 2), h.eur(h.P.rail_de.season.bc100_1, 2)],
], `Flat amount per delay of 60 minutes or more, at most ${h.P.rail_de.season.cap_pct}% of the season ticket’s value`, ['l', 'r', 'r'])}
<p>Cases are collected within the ticket’s validity and submitted together. On local transport you reach the ${h.eur(h.P.rail_de.min_payout_eur)} payout threshold only with three cases.</p>
<h2>Onward travel, taxis and hotels</h2>
<p>From ${h.P.rail_de.free_train_choice_minutes} minutes of expected delay at destination you may take another train, and saver fares lose their train restriction (${h.src('db-rules', 'Deutsche Bahn rules')}). If the last connection of the day is gone and the destination cannot be reached by midnight, the railway pays for another means of transport up to ${h.eur(h.P.rail_de.taxi_cap_eur)}, when it offers none itself and cannot be reached. If continuing the same day is impossible or unreasonable, it covers reasonable hotel costs. The legal basis is ${h.src('rail2021', 'Regulation (EU) 2021/782')} together with the ${h.src('evo', 'German Railway Traffic Regulations')}.</p>
<h2>If the railway refuses</h2>
<p>The ${h.src('soep', 'söp')} also arbitrates for railways and is free for passengers. How to file the claim yourself, online or on paper, is on the ${h.a('bahn-formular', 'passenger rights form')} page. If your trip combines a flight and a train, the flight rules are on the ${h.a('fluggastrechte', 'air passenger rights')} page.</p>
`,
  },
});
