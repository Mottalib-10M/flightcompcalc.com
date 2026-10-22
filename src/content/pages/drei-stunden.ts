import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'drei-stunden', group: 'flug', order: 20,
  tool: 'flight', toolArg: { from: 'FRA', to: 'PMI', event: 'delay', delay: 185, cause: 'technical', carrier: 'eu' },
  related: ['fluggastrechte', 'annullierung', 'streik', 'reform', 'verjaehrung'],
  sources: ['eu261', 'sturgeon', 'eu2202', 'uk261', 'caa-delays'],
  de: {
    slug: 'flugverspaetung-3-stunden',
    nav: 'Flugverspätung ab 3 Stunden', card: 'Wann die drei Stunden erreicht sind, wie gemessen wird und was ab 2027 anders ist.',
    title: 'Flugverspätung 3 Stunden: Entschädigung 250 bis 600 €',
    description: 'Flugverspätung ab 3 Stunden: wann der Anspruch entsteht, wie die Ankunft gemessen wird, 250, 400 oder 600 € je Strecke, mit Rechner und Musterschreiben.',
    h1: 'Flugverspätung von drei Stunden: ab wann gezahlt wird',
    intro: 'Maßgeblich ist die Ankunft am Endziel, gemessen beim Öffnen der ersten Flugzeugtür, nicht der verspätete Abflug.',
    resume: 'Eine Ausgleichszahlung nach der Verordnung (EG) Nr. 261/2004 steht Ihnen zu, wenn Ihr Flug das Endziel drei Stunden oder mehr nach der planmäßigen Ankunftszeit erreicht. Das steht nicht wörtlich in der Verordnung: Der Europäische Gerichtshof hat es 2009 im Urteil Sturgeon aus dem Gleichbehandlungsgrundsatz abgeleitet und verspätete Fluggäste den Fluggästen annullierter Flüge gleichgestellt. Gezählt wird bis zu dem Moment, in dem nach der Landung eine Tür geöffnet wird und die Fluggäste das Flugzeug verlassen dürfen; das Aufsetzen auf der Piste oder das Erreichen der Parkposition genügt nicht. Die Höhe hängt allein von der Großkreisentfernung ab: 250 € bis 1 500 km, 400 € bis 3 500 km sowie für alle innereuropäischen Flüge über 1 500 km, 600 € darüber. Bei Langstrecken außerhalb der EU darf die Airline auf 300 € kürzen, wenn die Verspätung unter vier Stunden bleibt. Für Flüge ab dem 23. Oktober 2027 verlangt die neue Fassung durch die Verordnung (EU) 2026/2202 eine Verspätung von mehr als drei Stunden: Wer genau drei Stunden und null Minuten zu spät ankommt, geht dann leer aus.',
    faqs: [
      { q: 'Zählt die Verspätung beim Abflug oder bei der Ankunft?', a: 'Für die Ausgleichszahlung zählt nur die Ankunft am Endziel. Ein Abflug mit vier Stunden Verspätung, der dank Rückenwind und kürzerer Rollzeit nur zwei Stunden und fünfzig Minuten zu spät ankommt, begründet keinen Anspruch. Umgekehrt kann ein pünktlicher Abflug mit langer Warteschleife und spätem Andocken über die Schwelle führen.' },
      { q: 'Was gilt, wenn das Flugzeug landet, die Türen aber geschlossen bleiben?', a: 'Dann läuft die Zeit weiter. Der Gerichtshof hat 2014 im Fall Germanwings (C-452/13) entschieden, dass die Ankunftszeit der Moment ist, in dem mindestens eine Tür geöffnet wird und die Fluggäste aussteigen dürfen. Wartezeit auf dem Vorfeld, weil keine Parkposition oder keine Treppe frei ist, gehört also zur Verspätung.' },
      { q: 'Woher weiß ich die genaue Ankunftszeit?', a: 'Notieren Sie die Uhrzeit beim Öffnen der Tür, machen Sie ein Foto der Anzeige im Terminal und heben Sie die Bordkarte auf. Die Airline kennt die Türöffnungszeit aus ihren Betriebsdaten und muss sie bei Streit vorlegen. Zeiten aus Flugverfolgungsdiensten beziehen sich meist auf das Aufsetzen und liegen deshalb einige Minuten zu früh.' },
      { q: 'Bekomme ich unter drei Stunden gar nichts?', a: 'Eine Ausgleichszahlung nicht, aber Betreuungsleistungen: Ab zwei Stunden Abflugverspätung auf Strecken bis 1 500 km, ab drei Stunden bis 3 500 km und ab vier Stunden darüber muss die Airline Mahlzeiten und Getränke anbieten, bei einer Verspätung über Nacht auch Hotel und Transfer. Belege für selbst gekaufte Verpflegung aufheben.' },
      { q: 'Ändert sich die Drei-Stunden-Regel 2027?', a: 'Ja, leicht. Für Flüge ab dem 23. Oktober 2027 steht in der Verordnung selbst, dass die Verspätung drei Stunden übersteigen muss. Wer mit genau drei Stunden ankommt, hat dann keinen Anspruch mehr. Die Beträge von 250, 400 und 600 € bleiben, ebenso die Messung bis zur Türöffnung.' },
    ],
    body: (h) => `
<h2>Die drei Stunden, Minute für Minute</h2>
<p>Der Rechner oben stellt eine Verspätung von drei Stunden und fünf Minuten auf der Strecke Frankfurt nach Palma de Mallorca ein. Die Großkreisentfernung beträgt ${h.km('FRA', 'PMI')}, also erste Stufe: ${h.eur(h.P.eu261.amounts[0])} pro Person. Ändern Sie die Minuten auf 2 Stunden 59, und das Ergebnis springt auf null. Genau diese Grenze ist der häufigste Streitpunkt, weil die Airline gern die Landezeit statt der Türöffnung nennt.</p>
${h.table(['Ankunft am Endziel', 'Strecke bis 1 500 km', '1 500 bis 3 500 km', 'Langstrecke außerhalb der EU'], [
  ['unter 3 Std.', 'nichts', 'nichts', 'nichts'],
  ['3 Std. bis unter 4 Std.', h.eur(h.P.eu261.amounts[0]), h.eur(h.P.eu261.amounts[1]), `${h.eur(h.P.eu261.amounts[2] / 2)} (gekürzt) oder ${h.eur(h.P.eu261.amounts[2])}`],
  ['4 Std. und mehr', h.eur(h.P.eu261.amounts[0]), h.eur(h.P.eu261.amounts[1]), h.eur(h.P.eu261.amounts[2])],
], 'Ausgleichszahlung pro Person nach Art. 7 der Verordnung (EG) Nr. 261/2004, Flüge bis zum 22. Oktober 2027', ['l', 'r', 'r', 'r'])}
<p>Innerhalb der Europäischen Union gibt es keine dritte Stufe: Auch ein Flug von Hamburg nach Gran Canaria über ${h.km('HAM', 'LPA')} bleibt bei ${h.eur(h.P.eu261.intra_over_1500)}. Die Kürzung um die Hälfte betrifft nur Langstrecken mit Abflug oder Ziel außerhalb der Union, und sie ist eine Möglichkeit der Airline, kein Automatismus: Viele zahlen den vollen Betrag, wenn man ihn verlangt.</p>
${h.mini('delay', { d: { h: 3.08, b: 0 } })}
<h2>Warum drei Stunden, obwohl die Verordnung sie nicht nennt</h2>
<p>Der Text von 2004 kennt die Ausgleichszahlung nur bei Annullierung und Nichtbeförderung. Für Verspätungen sah er lediglich Betreuung vor. Der Gerichtshof hat im ${h.src('sturgeon', 'Urteil Sturgeon')} entschieden, dass ein Fluggast, der drei Stunden oder mehr zu spät ankommt, einen vergleichbaren Zeitverlust erleidet wie jemand, dessen Flug annulliert und der umgebucht wurde. Seitdem ist die Drei-Stunden-Schwelle gefestigte Rechtsprechung, später bestätigt im Urteil Nelson (2012). Die ${h.src('eu2202', 'Verordnung (EU) 2026/2202')} schreibt sie nun ausdrücklich in den Text, allerdings mit dem Wort „übersteigen“.</p>
<h2>Was die Airline einwenden kann</h2>
<p>Die Zahlung entfällt nur, wenn die Verspätung auf außergewöhnliche Umstände zurückgeht, die sich auch mit allen zumutbaren Maßnahmen nicht hätten vermeiden lassen. Ein gewöhnlicher technischer Defekt gehört nach ständiger Rechtsprechung nicht dazu, ebenso wenig ein Streik des eigenen Personals. Unwetter, Sperrungen durch die Flugsicherung oder ein Vogelschlag dagegen schon. Mehr dazu auf der Seite ${h.a('streik', 'Streik und außergewöhnliche Umstände')}. Wichtig: Bei einer Verkettung zählt der Grund der eigenen Verspätung. Hatte die Maschine morgens wegen Nebels Verspätung, muss die Airline zeigen, dass sie danach alles getan hat, um Ihren Flug am Nachmittag zu retten.</p>
${h.box('Zum Mitnehmen', `<p>Drei Stunden am Endziel, gemessen bis zur Türöffnung. Bei Umsteigeverbindungen mit einer Buchung zählt allein die Ankunft am letzten Ziel, und die Entfernung wird vom ersten Abflug- bis zum Endflughafen gemessen. Wie man dann vorgeht, steht unter ${h.a('anschluss', 'Anschlussflug verpasst')}.</p>`)}
<h2>Großbritannien und Kanada</h2>
<p>Für Flüge ab Großbritannien gilt die im britischen Recht fortgeführte Fassung, ${h.src('uk261', 'UK261')}, mit denselben drei Stunden und Beträgen in Pfund: ${h.gbp(h.P.uk261.amounts[0])}, ${h.gbp(h.P.uk261.amounts[1])} und ${h.gbp(h.P.uk261.amounts[2])}. In Kanada beginnt die Entschädigung nach APPR ebenfalls bei drei Stunden, die Beträge steigen dort aber mit der Dauer der Verspätung statt mit der Entfernung (englische Seite ${h.a('ca', 'Canada')}).</p>
`,
  },
  en: {
    slug: 'flight-delayed-3-hours',
    nav: 'Flight delayed 3 hours', card: 'When the three hours are reached, how arrival is timed, and what changes in 2027.',
    title: 'Flight delayed 3 hours: compensation of €250 to €600',
    description: 'Flight delayed 3 hours or more: when compensation is owed, how arrival time is measured, €250, €400 or €600 by distance, and £220 to £520 under UK261.',
    h1: 'Flight delayed by three hours: when the airline has to pay',
    intro: 'What counts is arrival at the final destination, timed when the first aircraft door opens, not the late departure.',
    resume: 'Under EU Regulation 261/2004 you are owed compensation when your flight reaches its final destination three hours or more after the scheduled arrival time. The regulation itself does not say so: the Court of Justice read it into the text in the 2009 Sturgeon judgment, putting long-delayed passengers on the same footing as passengers whose flight was cancelled. The clock stops when, after landing, a door is opened and passengers are allowed to leave the aircraft, not when the wheels touch the runway or the aircraft reaches the stand. The amount depends only on the great-circle distance: €250 up to 1,500 km, €400 up to 3,500 km and for every intra-EU flight over 1,500 km, €600 beyond. On long-haul routes the airline may cut the payment to €300 when the delay stays under four hours. In the UK, the retained UK261 applies the same three hours with £220, £350 and £520. For flights from 23 October 2027, Regulation (EU) 2026/2202 requires a delay exceeding three hours, so arriving exactly three hours late will no longer be enough.',
    faqs: [
      { q: 'Does the delay count at departure or at arrival?', a: 'Only arrival at the final destination counts for compensation. A flight that leaves four hours late but makes up time in the air and lands two hours and fifty minutes late gives no right to a payment. The reverse also happens: an on-time departure followed by holding and a long wait for a gate can push the arrival past three hours.' },
      { q: 'What if the plane lands but the doors stay shut?', a: 'Then the delay keeps running. In Germanwings (C-452/13) the Court of Justice held in 2014 that arrival time is the moment at least one door opens and passengers may leave. Time spent waiting on the apron for a stand or for steps is therefore part of the delay, which often decides cases close to three hours.' },
      { q: 'How do I prove the exact arrival time?', a: 'Note the time when the door opens, photograph the arrivals board and keep your boarding pass. The airline holds the door-opening time in its operational records and has to produce it in a dispute. Flight tracking websites usually show touchdown, a few minutes earlier, so they understate your delay rather than overstate it.' },
      { q: 'Is anything owed under three hours?', a: 'No cash compensation, but care: from two hours of departure delay on flights up to 1,500 km, three hours up to 3,500 km and four hours beyond, the airline must offer meals and refreshments, plus a hotel and transfers if the delay runs overnight. Keep receipts for food you had to buy yourself.' },
      { q: 'Is the three-hour rule changing in 2027?', a: 'Slightly. For flights from 23 October 2027 the amended regulation itself says the delay must exceed three hours, so arriving exactly three hours late no longer qualifies. The €250, €400 and €600 amounts stay, the door-opening rule stays, and claims then have to reach the airline within nine months.' },
    ],
    body: (h) => `
<h2>Three hours, minute by minute</h2>
<p>The calculator above is set to a delay of three hours and five minutes from Frankfurt to Palma de Mallorca. The great-circle distance is ${h.km('FRA', 'PMI')}, first band: ${h.eur(h.P.eu261.amounts[0])} per passenger. Set the minutes to 2 hours 59 and the result drops to zero. That boundary is where most disputes sit, because airlines tend to quote the landing time rather than the moment the door opened.</p>
${h.table(['Arrival at final destination', 'Up to 1,500 km', '1,500 to 3,500 km', 'Long haul outside the EU'], [
  ['under 3 h', 'nothing', 'nothing', 'nothing'],
  ['3 h to under 4 h', h.eur(h.P.eu261.amounts[0]), h.eur(h.P.eu261.amounts[1]), `${h.eur(h.P.eu261.amounts[2] / 2)} (reduced) or ${h.eur(h.P.eu261.amounts[2])}`],
  ['4 h or more', h.eur(h.P.eu261.amounts[0]), h.eur(h.P.eu261.amounts[1]), h.eur(h.P.eu261.amounts[2])],
], 'Compensation per passenger under Article 7 of Regulation (EC) No 261/2004, flights up to 22 October 2027', ['l', 'r', 'r', 'r'])}
<p>Inside the European Union there is no third band: even Hamburg to Gran Canaria, ${h.km('HAM', 'LPA')}, stays at ${h.eur(h.P.eu261.intra_over_1500)}. The 50% reduction only concerns long-haul flights to or from outside the Union, and it is an option for the airline, not automatic.</p>
${h.mini('delay', { d: { h: 3.08, b: 2 } })}
<h2>Why three hours when the regulation never says it</h2>
<p>The 2004 text only grants compensation for cancellation and denied boarding; for delays it only required care. In ${h.src('sturgeon', 'Sturgeon')} the Court held that passengers arriving three hours or more late suffer a loss of time comparable to passengers rebooked after a cancellation, and must be treated alike. The threshold was confirmed in Nelson (2012) and is now written into the text by ${h.src('eu2202', 'Regulation (EU) 2026/2202')}, with the word “exceeding”.</p>
<h2>What the airline can argue</h2>
<p>Payment falls away only if the delay was caused by extraordinary circumstances that could not have been avoided even with all reasonable measures. An ordinary technical fault does not qualify under settled case law, nor does a strike by the airline’s own staff; severe weather, air traffic control restrictions or a bird strike can. See ${h.a('streik', 'extraordinary circumstances and strikes')}. In a knock-on delay what counts is the cause of your own flight’s delay and what the airline did afterwards to recover the schedule.</p>
${h.box('In short', `<p>Three hours at the final destination, timed to the door opening. On a connection booked as one journey only the last arrival counts and the distance runs from the first departure airport to the final one: see ${h.a('anschluss', 'missed connecting flight')}.</p>`)}
<h2>UK flights and Canada</h2>
<p>Flights from the UK fall under ${h.src('uk261', 'UK261')}, the retained version, with the same three hours and amounts in pounds: ${h.gbp(h.P.uk261.amounts[0])}, ${h.gbp(h.P.uk261.amounts[1])} and ${h.gbp(h.P.uk261.amounts[2])}; the ${h.src('caa-delays', 'Civil Aviation Authority')} applies the same reading. Canada’s APPR also starts at three hours, but its amounts rise with the length of the delay instead of the distance: see ${h.a('ca', 'flight delay compensation in Canada')}.</p>
`,
  },
});
