import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'nichtbefoerderung', group: 'flug', order: 40,
  tool: 'flight', toolArg: { from: 'MUC', to: 'HER', event: 'denied', delay: 300, cause: 'airline', carrier: 'eu' },
  related: ['fluggastrechte', 'annullierung', 'anschluss', 'schlichtung', 'uk261'],
  sources: ['eu261', 'eu2202', 'uk261', 'appr'],
  de: {
    slug: 'nichtbefoerderung-ueberbuchung',
    nav: 'Überbuchung und Nichtbeförderung', card: 'Am Gate abgewiesen: Freiwillige, Ausgleich ohne Ausnahme für Überbuchung, Ersatzflug und Betreuung.',
    title: 'Nichtbeförderung bei Überbuchung: 250 bis 600 € pro Person',
    description: 'Nichtbeförderung wegen Überbuchung: Freiwillige gegen Gegenleistung, sonst sofort 250, 400 oder 600 €, Erstattung oder Ersatzflug, Hotel. Was am Gate zählt.',
    h1: 'Nichtbeförderung: wenn der Platz im Flugzeug vergeben ist',
    intro: 'Bei Überbuchung gibt es keine Ausrede mit Unwetter oder Streik: Wer gegen seinen Willen am Boden bleibt, hat Anspruch.',
    resume: 'Verweigert die Airline Ihnen den Einstieg, obwohl Sie eine bestätigte Buchung haben und rechtzeitig am Abfertigungsschalter und am Gate waren, liegt eine Nichtbeförderung nach Art. 4 der Verordnung (EG) Nr. 261/2004 vor. Die Airline muss zuerst Freiwillige suchen, die gegen eine vereinbarte Gegenleistung verzichten. Findet sie nicht genug, darf sie Fluggäste gegen ihren Willen zurückweisen, muss ihnen dann aber sofort die Ausgleichszahlung nach Art. 7 leisten: 250 € bis 1 500 km, 400 € bis 3 500 km oder innerhalb der EU, 600 € darüber, halbiert, wenn der Ersatzflug je nach Strecke höchstens zwei, drei oder vier Stunden später ankommt. Dazu kommen das Wahlrecht zwischen Erstattung und Ersatzflug sowie Mahlzeiten, Hotel und Kommunikation. Anders als bei Verspätung und Annullierung kann sich die Airline bei Überbuchung nicht auf außergewöhnliche Umstände berufen. Ausnahmen gelten nur bei vertretbaren Gründen wie fehlenden Reisedokumenten, Gesundheit oder Sicherheit. Wer freiwillig verzichtet, bekommt die vereinbarte Gegenleistung statt der Ausgleichszahlung.',
    faqs: [
      { q: 'Soll ich mich am Gate freiwillig melden?', a: 'Das hängt vom Angebot ab. Als Freiwilliger bekommen Sie das, was Sie mit der Airline aushandeln, und zusätzlich Erstattung oder Ersatzflug nach Art. 8, aber keine Ausgleichszahlung. Liegt das Angebot unter dem Betrag, der Ihnen bei unfreiwilliger Zurückweisung zustünde, lohnt es sich meist, abzuwarten. Lassen Sie sich die Vereinbarung schriftlich geben, bevor Sie die Bordkarte abgeben.' },
      { q: 'Ich war zu spät am Gate. Habe ich trotzdem Anspruch?', a: 'Nein, wenn Sie die von der Airline genannte Zeit für die Abfertigung oder das Boarding verpasst haben. Art. 3 verlangt, dass Sie sich rechtzeitig einfinden, mangels Angabe 45 Minuten vor dem Abflug am Schalter. Wurde das Boarding aber geschlossen, während Sie wegen einer verspäteten Sicherheitskontrolle in der Schlange standen, lohnt es sich, Belege zu sammeln.' },
      { q: 'Die Airline sagt, das Flugzeug sei kleiner gewesen. Ist das eine Überbuchung?', a: 'Für die Verordnung kommt es nicht darauf an, warum zu wenig Plätze da waren. Ein Flugzeugtausch auf ein kleineres Muster, eine Umbuchung von Crew-Mitgliedern auf Passagierplätze oder ein Buchungsfehler: Wer trotz gültiger Buchung und pünktlichem Erscheinen nicht mitfliegt, ist nicht befördert worden. Auch hier gibt es keine Entlastung durch außergewöhnliche Umstände.' },
      { q: 'Muss die Airline am Flughafen zahlen?', a: 'Art. 4 Abs. 3 verlangt, dass die Airline unfreiwillig zurückgewiesene Fluggäste „unverzüglich“ entschädigt. In der Praxis wird das selten am Schalter erledigt. Verlangen Sie eine schriftliche Bestätigung der Nichtbeförderung mit Grund und Uhrzeit. Mit diesem Papier und der Bordkarte ist die spätere Forderung kaum zu bestreiten.' },
      { q: 'Gilt die Regel auch für den Weiterflug, wenn der erste Flug verspätet war?', a: 'Wurde Ihnen der Anschlussflug verweigert, weil die Airline wegen der Verspätung des Zubringers mit Ihrem Nichterscheinen gerechnet und den Platz neu vergeben hat, kann das eine Nichtbeförderung sein. Waren Sie dagegen schlicht zu spät am Anschlussgate, geht es um die Verspätung am Endziel, nicht um Überbuchung.' },
    ],
    body: (h) => {
      const A = h.P.eu261.amounts;
      const r = h.owed('MUC', 'HER', 300, { event: 'denied' })[0];
      const r2 = h.owed('MUC', 'HER', 150, { event: 'denied' })[0];
      return `
<h2>Ein Beispiel: München nach Heraklion</h2>
<p>Der Flug ist überbucht, Sie stehen pünktlich am Gate und werden abgewiesen. Die Großkreisentfernung beträgt ${h.km('MUC', 'HER')}, die Strecke liegt in der mittleren Stufe. Kommt Ihr Ersatzflug fünf Stunden später an, schuldet die Airline ${r.amount}. Bringt sie Sie so um, dass Sie nur zweieinhalb Stunden später in Heraklion landen, darf sie nach Art. 7 Abs. 2 auf ${r2.amount} kürzen, weil die Grenze für diese Stufe bei drei Stunden liegt.</p>
${h.table(['Strecke', 'Ausgleich', 'Gekürzt, wenn der Ersatz höchstens … später ankommt'], [
  ['bis 1 500 km', h.eur(A[0]), `${h.P.eu261.reroute_reduction_limits_minutes[0] / 60} Std. → ${h.eur(A[0] / 2)}`],
  ['1 500 bis 3 500 km oder innerhalb der EU', h.eur(A[1]), `${h.P.eu261.reroute_reduction_limits_minutes[1] / 60} Std. → ${h.eur(A[1] / 2)}`],
  ['über 3 500 km außerhalb der EU', h.eur(A[2]), `${h.P.eu261.reroute_reduction_limits_minutes[2] / 60} Std. → ${h.eur(A[2] / 2)}`],
], 'Nichtbeförderung gegen den Willen des Fluggasts, Art. 4 und 7 der Verordnung (EG) Nr. 261/2004', ['l', 'r', 'l'])}
${h.mini('band', { t: 'Ihre Strecke, Ihr Betrag bei Nichtbeförderung', d: { km: 1818 } })}
<h2>Der Ablauf, den Art. 4 vorschreibt</h2>
<p>Zuerst fragt die Airline nach Freiwilligen. Was diese erhalten, ist Verhandlungssache: Gutscheine, Geld, ein Upgrade auf dem nächsten Flug. Zusätzlich behalten Freiwillige das Wahlrecht nach Art. 8 zwischen Erstattung und Ersatzflug. Reicht das nicht, darf die Airline Fluggäste gegen ihren Willen zurückweisen. Für sie gelten dann die volle Ausgleichszahlung, die Erstattung oder Weiterbeförderung und die Betreuung nach Art. 9 mit Mahlzeiten, Hotel und Transfer. Nach Art. 14 muss die Airline jedem zurückgewiesenen Fluggast einen schriftlichen Hinweis auf diese Rechte aushändigen.</p>
${h.box('Am Gate', `<p>Bordkarte behalten, Uhrzeit notieren, eine schriftliche Bestätigung der Nichtbeförderung verlangen, Belege für Essen und Taxi sammeln. Kein Formular unterschreiben, das auf weitere Ansprüche verzichtet: Nach Art. 15 wäre ein solcher Verzicht ohnehin unwirksam.</p>`)}
<h2>Wann die Abweisung keine Nichtbeförderung ist</h2>
<p>Die Verordnung nimmt Fälle aus, in denen es vertretbare Gründe gibt: fehlende oder ungültige Reisedokumente, Gründe der Gesundheit, der Sicherheit oder der Gefahrenabwehr. Wer etwa ohne gültiges Visum für das Zielland erscheint, bekommt nichts. Ein Hinweis auf „technische Gründe“ oder ein Gerätewechsel reicht dagegen nicht. Für Pauschalreisende, deren Veranstalter die Buchung nicht weitergegeben hat, kann der Anspruch gegen die Airline trotzdem bestehen, wenn eine bestätigte Buchung vorlag.</p>
<h2>Nach 2027 und außerhalb der EU</h2>
<p>Die ${h.src('eu2202', 'Verordnung (EU) 2026/2202')} lässt die Grundregel unverändert: Wer gegen seinen Willen nicht mitfliegt, bekommt den Ausgleich ohne Entlastungsmöglichkeit. In Großbritannien gilt dieselbe Regel nach ${h.src('uk261', 'UK261')} mit Beträgen in Pfund. Kanada geht einen eigenen Weg: Dort richtet sich der Betrag bei Nichtbeförderung aus Gründen in der Kontrolle der Airline nach der Ankunftsverspätung, von ${h.cad(h.P.appr.denied_boarding.amounts[0])} bis ${h.cad(h.P.appr.denied_boarding.amounts[2])}, zahlbar binnen ${h.P.appr.denied_boarding_pay_hours} Stunden (${h.src('appr', 'APPR')}).</p>
`;
    },
  },
  en: {
    slug: 'denied-boarding-compensation',
    nav: 'Denied boarding', card: 'Bumped from an overbooked flight: volunteers, compensation with no excuses, rerouting and care.',
    title: 'Denied boarding compensation: overbooked flights explained',
    description: 'Denied boarding compensation for overbooked flights: volunteers first, then €250 to €600 or £220 to £520 at once, refund or rerouting, hotel and meals.',
    h1: 'Denied boarding: when your seat has been given to someone else',
    intro: 'Overbooking leaves the airline no weather or strike defence: if you are kept off the flight against your will, you are owed.',
    resume: 'If an airline refuses to carry you although you held a confirmed booking and presented yourself for check-in and boarding on time, that is denied boarding under Article 4 of EU261 and of UK261. The airline must first ask for volunteers willing to give up their seats in exchange for benefits agreed with them. If there are not enough, it may deny boarding against passengers’ will, but must then compensate them immediately: €250, €400 or €600 under EU261, or £220, £350 or £520 under UK261, depending on distance, halved if the replacement flight lands within two, three or four hours of the original arrival depending on the band. On top come the choice between a refund and rerouting, and care with meals, hotel and calls. Unlike delays and cancellations, overbooking cannot be excused by extraordinary circumstances. The only exceptions are reasonable grounds such as missing travel documents, health, safety or security. Volunteers receive what they agreed instead of the fixed compensation. Canada has its own scale of up to C$2,400.',
    faqs: [
      { q: 'Should I volunteer to give up my seat?', a: 'Only if the offer beats what you would get by being bumped. Volunteers receive the benefits they negotiate plus a refund or rerouting, but no fixed compensation. If the voucher on the table is worth less than the amount the regulation would pay you as an involuntary passenger, it is usually worth waiting. Get the agreement in writing before you hand over your boarding pass.' },
      { q: 'I reached the gate after boarding closed. Can I still claim?', a: 'Not if you missed the check-in or boarding deadline the airline gave you. The regulation requires you to turn up on time, or 45 minutes before departure at check-in if no time was given. If the gate closed while you were stuck in a security queue the airport ran late, keep any evidence, but expect the airline to resist.' },
      { q: 'The airline says a smaller aircraft was used. Is that overbooking?', a: 'The reason for the shortage of seats does not matter. An aircraft swap, crew taking passenger seats or a booking error all lead to the same result: if you held a valid booking, turned up on time and were not carried, you were denied boarding. The airline cannot rely on extraordinary circumstances for that either.' },
      { q: 'Does the airline have to pay at the airport?', a: 'Article 4(3) says compensation is owed immediately to passengers denied boarding against their will. In practice it is rarely paid at the desk. Ask for written confirmation that you were denied boarding, with the reason and the time; together with your boarding pass, this makes a later claim very hard to dispute.' },
      { q: 'How is denied boarding treated on flights from Canada?', a: 'Under the Air Passenger Protection Regulations the amount depends on how late you arrive, not on distance: C$900 under six hours, C$1,800 from six to under nine hours and C$2,400 beyond, when the cause is within the airline’s control. It must be paid within 48 hours. You cannot collect the same loss under EU261 and APPR together.' },
    ],
    body: (h) => {
      const r = h.owed('LHR', 'PMI', 300, { event: 'denied', carrier: 'gb' });
      const uk = r.find((x) => x.regime === 'UK261')!;
      const r2 = h.owed('LHR', 'PMI', 100, { event: 'denied', carrier: 'gb' }).find((x) => x.regime === 'UK261')!;
      return `
<h2>An example from Heathrow</h2>
<p>The flight to Palma is overbooked and you are turned away at the gate. The great-circle distance is ${h.km('LHR', 'PMI')}, the first band. If your replacement lands five hours late, UK261 gives you ${uk.amount}. If the airline gets you to Palma within two hours of the original arrival, it may halve that to ${r2.amount}. Departing from Munich to Heraklion instead, as in the calculator above, the EU text applies and the band changes, because that route is ${h.km('MUC', 'HER')} long.</p>
${h.table(['Distance', 'EU261', 'UK261', 'Halved if the replacement lands within'], [
  ['up to 1,500 km', h.eur(h.P.eu261.amounts[0]), h.gbp(h.P.uk261.amounts[0]), `${h.P.eu261.reroute_reduction_limits_minutes[0] / 60} h`],
  ['1,500 to 3,500 km (or intra-EU)', h.eur(h.P.eu261.amounts[1]), h.gbp(h.P.uk261.amounts[1]), `${h.P.eu261.reroute_reduction_limits_minutes[1] / 60} h`],
  ['over 3,500 km', h.eur(h.P.eu261.amounts[2]), h.gbp(h.P.uk261.amounts[2]), `${h.P.eu261.reroute_reduction_limits_minutes[2] / 60} h`],
], 'Involuntary denied boarding, Articles 4 and 7 of EU261 and UK261', ['l', 'r', 'r', 'l'])}
${h.mini('band', { t: 'Bumped: what your route pays', d: { km: 1348 } })}
<h2>What Article 4 requires, step by step</h2>
<p>The airline first calls for volunteers. What they get is negotiable: vouchers, cash, a better seat on the next flight. Volunteers also keep the Article 8 choice between a refund and rerouting. If not enough people come forward, the airline may refuse boarding to others against their will, and those passengers are owed full compensation, the refund or rerouting choice, and care under Article 9, including meals, a hotel and transfers if needed. Under Article 14 the airline must hand each of them a written notice setting out these rights.</p>
${h.box('At the gate', `<p>Keep your boarding pass, note the time, ask for written confirmation of denied boarding, and keep receipts for food and transport. Do not sign anything that waives further claims: under Article 15 such a waiver has no effect anyway.</p>`)}
<h2>When being turned away is not denied boarding</h2>
<p>The regulation leaves out cases with reasonable grounds: missing or invalid travel documents, health, safety or security. Turning up without the visa your destination requires gives you nothing. “Operational reasons” or an aircraft change, on the other hand, are not a valid excuse.</p>
<h2>EU after 2027, and Canada</h2>
<p>${h.src('eu2202', 'Regulation (EU) 2026/2202')} leaves the core rule unchanged: involuntary denied boarding is compensated with no extraordinary-circumstances defence. ${h.src('uk261', 'UK261')} has not been amended. In Canada the ${h.src('appr', 'APPR')} pay by length of delay: ${h.cad(h.P.appr.denied_boarding.amounts[0])}, ${h.cad(h.P.appr.denied_boarding.amounts[1])} or ${h.cad(h.P.appr.denied_boarding.amounts[2])}, within ${h.P.appr.denied_boarding_pay_hours} hours. See ${h.a('ca', 'flight compensation in Canada')}.</p>
`;
    },
  },
});
