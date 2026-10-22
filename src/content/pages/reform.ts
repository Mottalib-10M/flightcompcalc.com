import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'reform', group: 'flug', order: 100,
  tool: 'flight', toolArg: { from: 'STR', to: 'TFS', event: 'delay', delay: 180, cause: 'airline', carrier: 'eu', date: '2027-11-05' },
  related: ['drei-stunden', 'annullierung', 'anschluss', 'streik', 'verjaehrung'],
  sources: ['eu2202', 'oeil', 'eu261', 'uk261'],
  de: {
    slug: 'fluggastrechte-reform-2027',
    nav: 'Reform 2027', card: 'Verordnung (EU) 2026/2202: was ab dem 23. Oktober 2027 bei Verspätung, Annullierung und Antrag anders ist.',
    title: 'Fluggastrechte-Reform 2027: was sich ab 23. Oktober ändert',
    description: 'Fluggastrechte-Reform 2027: Verordnung (EU) 2026/2202 gilt ab 23.10.2027, gleiche Beträge, mehr als 3 Stunden, Antrag binnen 9 Monaten, Anhang zu Ausnahmen.',
    h1: 'Die Reform der Fluggastrechte: was ab Oktober 2027 gilt',
    intro: 'Nach mehr als zwölf Jahren Verhandlung ist die Änderung beschlossen. Für Flüge bis zum 22. Oktober 2027 bleibt alles beim Alten.',
    resume: 'Die Verordnung (EU) 2026/2202 ändert die Fluggastrechteverordnung 261/2004. Sie wurde am 16. September 2026 unterzeichnet, am 2. Oktober 2026 im Amtsblatt veröffentlicht und gilt für Flüge ab dem 23. Oktober 2027. Die Beträge bleiben bei 250, 400 und 600 €. Die Verspätung muss künftig mehr als drei Stunden betragen; genau drei Stunden reichen nicht mehr. Bei Langstrecken darf die Airline den Betrag halbieren, wenn die Verspätung höchstens vier Stunden beträgt. Bei Annullierungen gibt es nur noch eine Grenze unter 14 Tagen Vorwarnung: Ersatzflug höchstens eine Stunde früher und weniger als zwei Stunden später. Ein Anhang listet, nicht abschließend, außergewöhnliche Umstände auf. Neu sind Pflichten und Fristen: Information der Fluggäste binnen 96 Stunden, Antrag binnen neun Monaten nach dem Flug, Antwort der Airline binnen 30 Tagen, eigene Umbuchung nach drei Stunden ohne Angebot bis 400 % des Ticketpreises, Ausgleich bei verpasstem Anschluss im neuen Art. 6b. Für Flüge aus Großbritannien gilt die Reform nicht.',
    faqs: [
      { q: 'Gilt die Reform für meinen Flug, den ich heute für November 2027 buche?', a: 'Ja. Maßgeblich ist nach dem Wortlaut das Datum des Flugs, nicht das der Buchung. Ein Flug am 5. November 2027 fällt unter die neue Fassung, auch wenn Sie ihn im Oktober 2026 gekauft haben. Der Rechner oben ist genau so eingestellt und zeigt, was sich dadurch ändert.' },
      { q: 'Gilt die Antwortfrist von 30 Tagen schon für meinen Flug von 2026?', a: 'Nein. Die Pflicht der Airline, binnen 30 Tagen zu antworten, gilt wie die Neun-Monats-Frist nur für Flüge ab dem 23. Oktober 2027. Für frühere Flüge gibt es keine feste Antwortfrist; schweigt die Airline zwei Monate lang, können Sie aber nach dem Luftverkehrsgesetz die Schlichtung beantragen. Die Verjährung von drei Jahren zum Jahresende läuft dabei weiter.' },
      { q: 'Warum hat die Reform so lange gedauert?', a: 'Die Kommission hat ihren Vorschlag 2013 vorgelegt, das Verfahren trägt das Aktenzeichen 2013/0072(COD). Die Verhandlungen zwischen Parlament und Rat zogen sich danach über viele Jahre. Der Verlauf ist auf der Seite des Europäischen Parlaments zum Verfahren dokumentiert. Das Ergebnis behält die Drei-Stunden-Schwelle bei, schreibt sie aber in den Text.' },
      { q: 'Was passiert mit einem Antrag, den ich nach zehn Monaten stelle?', a: 'Für Flüge ab dem 23. Oktober 2027 ist die Neun-Monats-Frist für den Antrag bei der Airline einzuhalten. Ein späterer Antrag riskiert, abgelehnt zu werden, auch wenn die nationale Verjährung noch läuft. Notieren Sie das Fristende direkt nach dem Flug; der Rechner zeigt es mit dem Musterschreiben an.' },
      { q: 'Ändert sich etwas für Bahn oder Schiff?', a: 'Nein, die Verordnung (EU) 2026/2202 betrifft den Luftverkehr. Für die Bahn gelten weiter die Verordnung (EU) 2021/782 und die Regeln der Bahnunternehmen, mit Prozentsätzen des Fahrpreises statt Pauschalen. Was dort bei Verspätung zu holen ist, steht auf der Bahn-Seite dieses Rechners.' },
    ],
    body: (h) => {
      const before = h.owed('STR', 'TFS', 180, { date: '2027-10-20' })[0];
      const after = h.owed('STR', 'TFS', 180, { date: '2027-11-05' })[0];
      const N = h.P.eu261_2027, E = h.P.eu261;
      return `
<h2>Ein Flug, zwei Rechtslagen</h2>
<p>Stuttgart nach Teneriffa, ${h.km('STR', 'TFS')}, genau drei Stunden zu spät. Am 20. Oktober 2027 gibt das ${before.amount}. Derselbe Flug am 5. November 2027 bringt ${after.amount === '–' ? 'nichts' : after.amount}, weil die Verspätung nun drei Stunden übersteigen muss. Eine Minute mehr, und es sind wieder ${h.eur(N.amounts[1])}. Der Rechner oben ist auf das Datum nach der Reform eingestellt.</p>
${h.mini('delay', { t: 'Vorher und nachher: dieselbe Verspätung', d: { h: 3, b: 2 } })}
<p>Im Mini-Rechner ist eine Langstrecke mit genau drei Stunden eingestellt: heute die gekürzte Hälfte, ab Oktober 2027 nichts. Setzen Sie 3,5 Stunden: Beide Fassungen geben die Hälfte. Bei 4 Stunden zahlt das alte Recht voll, das neue noch die Hälfte, denn gekürzt werden darf jetzt bis einschließlich vier Stunden.</p>
<h2>Die Änderungen im Überblick</h2>
${h.table(['Punkt', 'Bis 22.10.2027', 'Ab 23.10.2027'], [
  ['Beträge', `${h.eur(E.amounts[0])}, ${h.eur(E.amounts[1])}, ${h.eur(E.amounts[2])}`, `${h.eur(N.amounts[0])}, ${h.eur(N.amounts[1])}, ${h.eur(N.amounts[2])}`],
  ['Schwelle Verspätung', '3 Stunden oder mehr (Rechtsprechung)', 'mehr als 3 Stunden (im Text)'],
  ['Kürzung Langstrecke', 'unter 4 Stunden', 'bis einschließlich 4 Stunden'],
  ['Annullierung, 7 bis 14 Tage', 'Ersatz 2 Std. früher, unter 4 Std. später', 'Ersatz 1 Std. früher, unter 2 Std. später'],
  ['Außergewöhnliche Umstände', 'Rechtsprechung', 'Anhang mit Beispielen, nicht abschließend'],
  ['Information', 'keine feste Frist', `binnen ${N.info_after_hours} Stunden`],
  ['Antrag bei der Airline', 'keine Frist (nur Verjährung)', `binnen ${N.claim_window_months} Monaten, Antwort in ${N.airline_answer_days} Tagen`],
  ['Selbst umbuchen', 'nicht geregelt', `nach 3 Std. ohne Angebot, bis ${h.n(N.self_reroute_cap_pct)} % des Preises`],
  ['Verpasster Anschluss', 'Rechtsprechung (Folkerts)', 'Art. 6b: mehr als 3 Std. am Endziel'],
], `Verordnung (EG) Nr. 261/2004 und Fassung der Verordnung (EU) 2026/2202`, ['l', 'l', 'l'])}
<h2>Was das für Sie praktisch heißt</h2>
<p>Die wichtigste Änderung im Alltag ist die Frist. Bisher konnten Sie nach deutschem Recht bis zum Ende des dritten Jahres nach dem Flug fordern (${h.a('verjaehrung', 'Verjährung')}). Ab Oktober 2027 kommt der Antrag binnen ${N.claim_window_months} Monaten hinzu. Zweitens die Annullierung: Wer zehn Tage vorher erfährt, dass der Flug ausfällt, und einen Ersatz bekommt, der drei Stunden später landet, hat heute keinen Anspruch, ab 2027 schon (${h.a('annullierung', 'Flug annulliert')}). Drittens der Streik: Ein Tarifstreik des eigenen Personals bleibt Sache der Airline, die Ausnahme greift nur bei Forderungen, die allein der Staat erfüllen kann (${h.a('streik', 'Streik')}).</p>
<h2>Woher die Reform kommt</h2>
<p>Die Kommission hat 2013 einen Vorschlag vorgelegt, das ${h.src('oeil', 'Verfahren 2013/0072(COD)')} lief über mehr als ein Jahrzehnt. Veröffentlicht ist der Text im ${h.src('eu2202', 'Amtsblatt vom 2. Oktober 2026')}, unterzeichnet am ${h.day(N.signed)}. Bis zum ${h.day('2027-10-22')} gilt die ${h.src('eu261', 'bisherige Fassung')} unverändert, ebenso die Rechtsprechung des Gerichtshofs dazu.</p>
${h.box('Großbritannien', `<p>Das britische ${h.src('uk261', 'UK261')} ist eine eigenständige Kopie und wird von der EU-Reform nicht berührt. Eine britische Reform war bis Oktober 2026 nicht beschlossen.</p>`)}
`;
    },
  },
  en: {
    slug: 'eu261-reform-2027',
    nav: 'EU261 reform 2027', card: 'Regulation (EU) 2026/2202: what changes from 23 October 2027 for delays, cancellations and claims.',
    title: 'EU261 reform 2027: what changes from 23 October for flyers',
    description: 'EU261 reform 2027: Regulation (EU) 2026/2202 applies from 23 October 2027, same amounts, over 3 hours, 9 months to claim, and what it means for UK travellers.',
    h1: 'The EU261 reform: what applies from October 2027',
    intro: 'After more than twelve years of negotiation the amendment is law. Flights up to 22 October 2027 keep the current rules.',
    resume: 'Regulation (EU) 2026/2202 amends EU261. It was signed on 16 September 2026, published in the Official Journal on 2 October 2026 and applies to flights from 23 October 2027. The amounts stay at €250, €400 and €600. A delay must now exceed three hours; arriving exactly three hours late is no longer enough. On long-haul routes the airline may halve the payment when the delay is four hours or less. For cancellations with less than 14 days’ notice there is a single test: a replacement leaving no more than one hour early and arriving less than two hours late. An annex lists examples of extraordinary circumstances, and an own-staff strike excuses the airline only when the demands can be met by public authorities alone. New duties and deadlines: information within 96 hours, a claim within nine months of the flight, an answer within 30 days, self-rerouting after three hours without an offer up to 400% of the fare, and missed connections in a new Article 6b. UK261 is not affected: flights from the UK keep the current rules, but UK travellers flying back from the EU will meet the new ones.',
    faqs: [
      { q: 'Does the reform apply to a flight I book today for November 2027?', a: 'Yes. What counts is the date of the flight, not the booking date. A flight on 5 November 2027 falls under the amended text even if you bought the ticket in October 2026. The calculator above is set to exactly that case and shows what changes.' },
      { q: 'I am a UK traveller. Which of my flights does the reform affect?', a: 'Flights departing from the EU, Iceland, Norway or Switzerland on any airline, and flights into the EU on an EU airline, from 23 October 2027. Your outbound flight from Gatwick to Málaga stays under UK261; the return from Málaga will be under the amended EU text. On the return UK261 also applies if a UK or EU airline operates it.' },
      { q: 'Does the 30-day answer rule already apply to my 2026 flight?', a: 'No. The airline’s duty to answer within 30 days, like the nine-month claim window, applies only to EU flights from 23 October 2027. For earlier flights there is no fixed reply deadline in the regulation. If the airline stalls on a UK flight, you can move on to its ADR body or the CAA once the scheme’s conditions are met.' },
      { q: 'Why did the reform take so long?', a: 'The Commission tabled its proposal in 2013 under procedure reference 2013/0072(COD). Negotiations between Parliament and Council then stretched over many years. The full history is on the European Parliament’s procedure file. The outcome keeps three hours but writes it into the text.' },
      { q: 'What happens if I claim ten months after a 2028 flight?', a: 'For flights from 23 October 2027 the nine-month window for the claim to the airline applies. A later claim risks being refused even where the national limitation period, such as six years in England and Wales, would still be running. Note the deadline right after the flight; the calculator shows it with the claim letter.' },
    ],
    body: (h) => {
      const before = h.owed('STR', 'TFS', 180, { date: '2027-10-20' })[0];
      const after = h.owed('STR', 'TFS', 180, { date: '2027-11-05' })[0];
      const N = h.P.eu261_2027, E = h.P.eu261;
      const uk = h.owed('LGW', 'AGP', 180, { carrier: 'gb', date: '2027-11-05' }).find((x) => x.regime === 'UK261')!;
      const back = h.owed('AGP', 'LGW', 180, { carrier: 'gb', date: '2027-11-05' })[0];
      return `
<h2>One flight, two sets of rules</h2>
<p>Stuttgart to Tenerife, ${h.km('STR', 'TFS')}, exactly three hours late. On 20 October 2027 that pays ${before.amount}. The same flight on 5 November 2027 pays ${after.amount === '–' ? 'nothing' : after.amount}, because the delay now has to exceed three hours. One minute more and it is ${h.eur(N.amounts[1])} again.</p>
<h2>A UK holiday in November 2027</h2>
<p>Gatwick to Málaga on a UK airline, exactly three hours late both ways. Outbound, UK261 applies and still pays ${uk.amount} at three hours. On the way back the flight departs from the EU, so the amended EU text applies and pays ${back.amount === '–' ? 'nothing' : back.amount} at exactly three hours. UK261 also covers that return, because it lands in the UK on a UK airline, and it still pays ${uk.amount} at three hours. The same holds on an EU airline, since UK261 covers arrivals in the UK on UK and EU carriers alike; only on an airline from elsewhere does the return fall under the EU text alone.</p>
${h.mini('delay', { t: 'Before and after: the same delay', d: { h: 3, b: 2 } })}
<p>The mini calculator is set to a long-haul flight exactly three hours late: today the reduced half, from October 2027 nothing, while UK261 still pays half. At 4 hours the current rules pay in full and the new ones half, because the reduction now runs up to and including four hours.</p>
<h2>What changes, point by point</h2>
${h.table(['Point', 'Until 22 Oct 2027', 'From 23 Oct 2027'], [
  ['Amounts', `${h.eur(E.amounts[0])}, ${h.eur(E.amounts[1])}, ${h.eur(E.amounts[2])}`, `${h.eur(N.amounts[0])}, ${h.eur(N.amounts[1])}, ${h.eur(N.amounts[2])}`],
  ['Delay threshold', '3 hours or more (case law)', 'more than 3 hours (in the text)'],
  ['Long-haul reduction', 'under 4 hours', 'up to and including 4 hours'],
  ['Cancellation, 7 to 14 days', 'replacement 2 h early, under 4 h late', 'replacement 1 h early, under 2 h late'],
  ['Extraordinary circumstances', 'case law', 'annex of examples, not exhaustive'],
  ['Information to passengers', 'no fixed deadline', `within ${N.info_after_hours} hours`],
  ['Claim to the airline', 'no deadline (limitation only)', `within ${N.claim_window_months} months, answer in ${N.airline_answer_days} days`],
  ['Booking your own rerouting', 'not regulated', `after 3 h without an offer, up to ${h.n(N.self_reroute_cap_pct)}% of the fare`],
  ['Missed connection', 'case law (Folkerts)', 'Article 6b: more than 3 h at final destination'],
], 'EU261 before and after Regulation (EU) 2026/2202', ['l', 'l', 'l'])}
<h2>Where the reform comes from</h2>
<p>The Commission proposed it in 2013, and ${h.src('oeil', 'procedure 2013/0072(COD)')} ran for more than a decade. The text appeared in the ${h.src('eu2202', 'Official Journal of 2 October 2026')}, signed on ${h.day(N.signed)}. Until ${h.day('2027-10-22')} the ${h.src('eu261', 'current EU261')} and the Court of Justice’s case law apply unchanged. ${h.src('uk261', 'UK261')} is a separate copy that the EU reform does not touch, and no UK reform had been adopted by October 2026. Related pages: ${h.a('annullierung', 'cancelled flights')}, ${h.a('streik', 'strikes')} and ${h.a('verjaehrung', 'time limits')}.</p>
`;
    },
  },
});
