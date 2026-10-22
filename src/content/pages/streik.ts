import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'streik', group: 'flug', order: 60,
  tool: 'flight', toolArg: { from: 'FRA', to: 'BCN', event: 'cancel', delay: 400, cause: 'crew-strike', carrier: 'eu', advanced: true, notice: 1 },
  related: ['drei-stunden', 'annullierung', 'reform', 'fluggastrechte', 'schlichtung'],
  sources: ['eu261', 'eu2202', 'uk261', 'appr', 'caa-delays'],
  de: {
    slug: 'streik-aussergewoehnliche-umstaende',
    nav: 'Streik und außergewöhnliche Umstände', card: 'Pilotenstreik, Fluglotsenstreik, Gewitter, Defekt: welche Ursache die Zahlung entfallen lässt.',
    title: 'Streik und außergewöhnliche Umstände: wann Airlines zahlen',
    description: 'Streik, Unwetter, Defekt: wann die Airline sich auf außergewöhnliche Umstände berufen darf, Streik des eigenen Personals nach C-28/20, Anhang der Reform 2027.',
    h1: 'Streik, Wetter, Technik: welche Ursache die Airline entlastet',
    intro: 'Die Ausrede „außergewöhnliche Umstände“ steht in fast jedem Ablehnungsschreiben. Sie greift viel seltener, als die Airlines behaupten.',
    resume: 'Nach Art. 5 Abs. 3 der Verordnung (EG) Nr. 261/2004 muss die Airline keine Ausgleichszahlung leisten, wenn die Annullierung oder Verspätung auf außergewöhnliche Umstände zurückgeht, die sich auch dann nicht hätten vermeiden lassen, wenn alle zumutbaren Maßnahmen ergriffen worden wären. Der Gerichtshof legt das eng aus. Ein Streik des eigenen Personals, etwa von Piloten oder Kabinenpersonal, ist kein außergewöhnlicher Umstand (C-28/20, 2021), weil er zur normalen Tätigkeit einer Airline gehört. Ein gewöhnlicher technischer Defekt, der bei der Wartung hätte entdeckt werden können, ebenfalls nicht (C-549/07). Dagegen entlasten in der Regel Unwetter, Sperrungen der Flugsicherung, Streiks von Fluglotsen oder Flughafenpersonal, Sicherheitsrisiken und versteckte Fabrikationsfehler. Die Airline muss die Ursache beweisen und zeigen, was sie getan hat, um die Folgen zu begrenzen. Betreuung mit Mahlzeiten und Hotel schuldet sie in jedem Fall. Ab dem 23. Oktober 2027 enthält die Verordnung einen Anhang mit einer nicht abschließenden Liste; ein Streik des eigenen Personals entlastet dann nur, wenn die Forderungen allein von staatlichen Stellen erfüllt werden können.',
    faqs: [
      { q: 'Die Piloten meiner Airline haben gestreikt. Zahlt sie trotzdem?', a: 'Ja, nach heutigem Recht. Der Gerichtshof hat 2021 entschieden, dass ein von Gewerkschaften ausgerufener Streik des eigenen Personals, um höhere Löhne zu erreichen, kein außergewöhnlicher Umstand ist. Die Airline kann ihn durch Verhandlungen beeinflussen. Ab Oktober 2027 bleibt das im Grundsatz so; eine Ausnahme sieht die neue Fassung nur für Forderungen vor, die allein der Staat erfüllen kann.' },
      { q: 'Und wenn die Fluglotsen oder das Sicherheitspersonal streiken?', a: 'Dann liegt der Streik außerhalb des Einflussbereichs der Airline und gilt in der Regel als außergewöhnlicher Umstand. Die Airline muss aber zeigen, dass gerade Ihr Flug betroffen war, etwa durch eine Zuteilung von Startzeiten, und dass sie zumutbare Maßnahmen ergriffen hat, etwa eine rasche Umbuchung. Ein Streik, der den Flug nur mittelbar berührt, reicht nicht ohne Weiteres.' },
      { q: 'Das Flugzeug hatte einen Defekt. Wann entlastet das?', a: 'Selten. Technische Probleme gehören zum normalen Betrieb, auch wenn sie unerwartet auftreten. Anders kann es bei einem versteckten Fabrikationsfehler sein, den der Hersteller oder eine Behörde mitgeteilt hat, oder bei Schäden durch Dritte wie einem Vogelschlag oder Fremdkörpern auf der Piste. Verlangen Sie die Angabe des konkreten Defekts, nicht nur „technische Gründe“.' },
      { q: 'Gilt Gewitter am Abflugort als Ausnahme, wenn die Sonne schien?', a: 'Entscheidend ist das Wetter dort, wo es den Flug tatsächlich behindert hat: am Abflugort, am Zielort oder auf der Strecke. Ein Unwetter am Vormittag an einem anderen Flughafen, das die Maschine nur verspätet hat, entlastet die Airline nur, wenn sie zeigt, dass sie danach die Folgen mit zumutbaren Mitteln nicht auffangen konnte. Wetterdaten zur Abflugzeit lassen sich nachträglich prüfen.' },
      { q: 'Was zählt in Kanada als Ursache außerhalb der Kontrolle?', a: 'Die kanadischen Regeln sind anders gebaut. Dort zählt ausdrücklich auch ein Streik innerhalb des Transporteurs zu den Situationen außerhalb seiner Kontrolle. Technische Probleme, die bei der Sicherheit eine Rolle spielen, gelten als sicherheitsbedingt: kein Geld, aber Umbuchung und Betreuung. Eine bei planmäßiger Wartung entdeckte Störung gilt dagegen als kontrollierbar.' },
    ],
    body: (h) => {
      const own = h.owed('FRA', 'BCN', 400, { event: 'cancel', cause: 'crew-strike' })[0];
      const atc = h.owed('FRA', 'BCN', 400, { event: 'cancel', cause: 'atc' })[0];
      return `
<h2>Zwei Streiks, zwei Ergebnisse</h2>
<p>Der Rechner oben zeigt Frankfurt nach Barcelona, ${h.km('FRA', 'BCN')}, am Vortag abgesagt wegen eines Streiks des Kabinenpersonals, im Rechner die Ursache „Streik der Airline-Crew“: ${own.amount} pro Person, Status „${own.status}“. Stellen Sie die Ursache auf „Fluglotsen, Luftraumsperrung“, wechselt das Ergebnis auf „${atc.status}“. Der Unterschied ist nicht die Wirkung für Sie, sondern wer den Streik in der Hand hat.</p>
${h.table(['Ursache', 'Heute (261/2004)', 'Ab 23.10.2027 (Anhang)'], [
  ['Streik der Airline-Crew (Piloten, Kabine)', 'kein Ausschluss (C-28/20)', 'kein Ausschluss, außer wenn nur der Staat die Forderung erfüllen kann'],
  ['Streik am Flughafen (Sicherheit, Bodenpersonal Dritter)', 'in der Regel Ausschluss', 'im Anhang genannt'],
  ['Unwetter', 'in der Regel Ausschluss', 'im Anhang genannt'],
  ['Fluglotsen, Luftraumsperrung (auch Lotsenstreik)', 'in der Regel Ausschluss', 'im Anhang genannt'],
  ['Technischer Defekt (gewöhnlich)', 'kein Ausschluss (C-549/07)', 'kein Ausschluss'],
  ['Technischer Defekt: versteckter Fabrikationsfehler', 'kann ausschließen', 'im Anhang genannt'],
  ['Kein Grund genannt / betrieblich (Personalmangel, Krankmeldungen, Planung)', 'kein Ausschluss', 'kein Ausschluss'],
], 'Außergewöhnliche Umstände nach Art. 5 Abs. 3 und nach dem Anhang der Verordnung (EU) 2026/2202', ['l', 'l', 'l'])}
${h.mini('delay', { t: 'Wenn die Ursache nicht entlastet: Ihr Betrag', d: { h: 4.5, b: 0 } })}
<h2>Die zwei Prüfungsschritte</h2>
<p>Ein Umstand ist nach der Rechtsprechung außergewöhnlich, wenn er seiner Natur oder Ursache nach nicht Teil der normalen Tätigkeit der Airline ist und von ihr tatsächlich nicht beherrscht werden kann. Das ist der erste Schritt. Im zweiten muss die Airline zeigen, dass sie alle zumutbaren Maßnahmen ergriffen hat, um die Annullierung oder Verspätung zu vermeiden: Reservemaschinen, Umplanung, Umbuchung auf andere Flüge auch fremder Airlines. Scheitert sie am zweiten Schritt, zahlt sie trotz außergewöhnlicher Ursache. Die Beweislast liegt bei ihr, nicht bei Ihnen.</p>
<h2>Was in einem Ablehnungsschreiben stehen sollte</h2>
<p>„Außergewöhnliche Umstände“ ohne weitere Angaben genügen nicht. Fragen Sie nach der konkreten Ursache, dem betroffenen Flughafen, der Uhrzeit und den Maßnahmen, die ergriffen wurden. Bei Wetter: an welchem Ort und mit welcher Auswirkung. Bei Flugsicherung: welche Beschränkung für welchen Zeitraum. Bleibt die Airline vage, ist das ein gutes Argument für die ${h.a('schlichtung', 'Schlichtung')}.</p>
<h2>Was ab Oktober 2027 neu ist</h2>
<p>Die ${h.src('eu2202', 'Verordnung (EU) 2026/2202')} fügt der Verordnung einen Anhang mit Beispielen hinzu: Wetter, Flugsicherung, Streiks am Flughafen, versteckte Fabrikationsfehler und weitere Fälle. Die Liste ist nicht abschließend, die Gerichte entscheiden weiter im Einzelfall. Neu ist die Regel zum Streik des eigenen Personals: Er entlastet nur, wenn die Forderungen der Streikenden allein von Behörden erfüllt werden können. Ein klassischer Tarifstreik bleibt Sache der Airline. Mehr unter ${h.a('reform', 'Reform 2027')}.</p>
<p>Unabhängig von der Ursache gilt: Betreuung nach Art. 9 und das Wahlrecht zwischen Erstattung und Ersatzflug bleiben bestehen. Selbst bei einem Gewitter, das jede Ausgleichszahlung ausschließt, muss die Airline Mahlzeiten und gegebenenfalls ein Hotel stellen.</p>
`;
    },
  },
  en: {
    slug: 'extraordinary-circumstances-strike',
    nav: 'Strikes and extraordinary circumstances', card: 'Pilot strike, air traffic control strike, storms, technical faults: which causes cancel your claim.',
    title: 'Extraordinary circumstances and strikes: when airlines pay',
    description: 'Extraordinary circumstances under EU261 and UK261: own-staff strikes after C-28/20, ATC and airport strikes, weather, technical faults, and the 2027 annex.',
    h1: 'Extraordinary circumstances: strikes, weather and technical faults',
    intro: '“Extraordinary circumstances” appears in almost every rejection letter. It applies far less often than airlines suggest.',
    resume: 'Under Article 5(3) of EU261, and the identical rule in UK261, an airline does not have to pay compensation if the cancellation or delay was caused by extraordinary circumstances that could not have been avoided even if all reasonable measures had been taken. The Court of Justice reads this narrowly. A strike by the airline’s own staff, such as pilots or cabin crew, is not extraordinary (C-28/20, 2021), because industrial relations are part of running an airline. An ordinary technical fault that maintenance could have found is not extraordinary either (C-549/07). Severe weather, air traffic control restrictions, strikes by air traffic controllers or airport staff, security risks and hidden manufacturing defects usually are. The airline has to prove the cause and show what it did to limit the consequences, and it owes care with meals and hotels in every case. For EU flights from 23 October 2027 an annex lists examples; an own-staff strike excuses the airline only when the demands can be met by public authorities alone. Canada treats strikes within the carrier differently.',
    faqs: [
      { q: 'My airline’s pilots went on strike. Do I still get paid?', a: 'Yes, under the current rules in both the EU and the UK. In 2021 the Court of Justice held that a strike called by a union of the airline’s own staff to obtain pay rises is not extraordinary, because the airline can influence it through negotiation. For EU flights from October 2027 the principle stays, with an exception only for demands that only the state can satisfy.' },
      { q: 'What about strikes by air traffic controllers or airport security?', a: 'These are outside the airline’s control and normally count as extraordinary. The airline still has to show that your particular flight was affected, for example by restricted slots, and that it took reasonable steps such as rebooking quickly. A general reference to “industrial action in Europe” does not prove that your cancellation was unavoidable.' },
      { q: 'The aircraft had a technical problem. When does that excuse the airline?', a: 'Rarely. Technical problems are part of normal operations even when they come out of the blue. A hidden manufacturing defect notified by the manufacturer or an authority can be different, as can damage caused by third parties, such as a bird strike or debris on the runway. Ask for the specific fault, not just “technical reasons”.' },
      { q: 'How does the UK regulator approach weather and ATC?', a: 'The Civil Aviation Authority follows the same two-step test: was the event outside the airline’s normal activity and control, and could reasonable measures have avoided the disruption? Weather and air traffic control restrictions usually pass the first step; the second is where claims are often won, when the airline cannot show what it did to get you away sooner.' },
      { q: 'What counts as outside the carrier’s control in Canada?', a: 'The Canadian rules are built differently. They expressly list a strike within the carrier among situations outside its control, so a pilot strike does not trigger compensation there. Technical problems that affect safety are treated as required for safety: no compensation, but rebooking and care. A fault found during scheduled maintenance counts as within the carrier’s control.' },
    ],
    body: (h) => {
      const own = h.owed('LGW', 'BCN', 400, { event: 'cancel', cause: 'crew-strike', carrier: 'gb' })[0];
      const atc = h.owed('LGW', 'BCN', 400, { event: 'cancel', cause: 'atc', carrier: 'gb' })[0];
      return `
<h2>Two strikes, two outcomes</h2>
<p>Take Gatwick to Barcelona, ${h.km('LGW', 'BCN')}, cancelled the day before. If cabin crew employed by the airline walked out, UK261 gives ${own.amount} per passenger (status: ${own.status}). If French air traffic controllers closed the airspace, the status becomes “${atc.status}”. Your evening is ruined either way; the difference is who controls the strike. The calculator above runs the same comparison on Frankfurt to Barcelona under EU261: switch the reason from “Airline staff strike” to “Air traffic control, airspace closure”.</p>
${h.table(['Cause', 'EU261 and UK261 today', 'EU from 23 Oct 2027 (annex)', 'Canada (APPR)'], [
  ['Airline staff strike (pilots, cabin crew)', 'not extraordinary (C-28/20)', 'not extraordinary unless only the state can meet the demands', 'outside the carrier’s control'],
  ['Air traffic control, airspace closure (including ATC strikes)', 'usually extraordinary', 'listed in the annex', 'outside the carrier’s control'],
  ['Airport strike (security, third-party ground staff)', 'usually extraordinary', 'listed in the annex', 'outside the carrier’s control'],
  ['Severe weather', 'usually extraordinary', 'listed in the annex', 'outside the carrier’s control'],
  ['Technical fault (routine)', 'not extraordinary (C-549/07)', 'not extraordinary', 'safety: no compensation, care owed'],
  ['Technical fault: hidden manufacturing defect', 'can be extraordinary', 'listed in the annex', 'outside the carrier’s control if notified'],
  ['No reason / operational (staff shortage, sickness, scheduling)', 'not extraordinary', 'not extraordinary', 'within the carrier’s control'],
], 'Exemptions compared: Article 5(3) of EU261 and UK261, the annex to Regulation (EU) 2026/2202, section 10 of the APPR', ['l', 'l', 'l', 'l'])}
${h.mini('delay', { t: 'If the cause does not excuse the airline', d: { h: 4.5, b: 0 } })}
<h2>The two-step test</h2>
<p>An event is extraordinary when, by its nature or origin, it is not part of the normal exercise of the airline’s activity and is beyond its actual control. That is step one. In step two the airline must show that it took all reasonable measures to avoid the cancellation or delay: standby aircraft, re-planning, rebooking on other flights including other airlines. Fail step two and it pays despite an extraordinary cause. The burden of proof is on the airline. The ${h.src('caa-delays', 'Civil Aviation Authority')} applies the same reasoning to ${h.src('uk261', 'UK261')} claims.</p>
<h2>What a rejection letter should contain</h2>
<p>A bare “extraordinary circumstances” is not enough. Ask for the specific cause, the airport, the time and the steps taken. For weather: where, and with what effect on your flight. For air traffic control: which restriction, for how long. A vague answer is a good reason to escalate: see ${h.a('schlichtung', 'how to escalate a claim')}.</p>
<h2>EU changes from October 2027</h2>
<p>${h.src('eu2202', 'Regulation (EU) 2026/2202')} adds an annex with examples: weather, air traffic management, airport strikes, hidden manufacturing defects and others. The list is not exhaustive; courts still decide case by case. The new point is the airline’s own staff: a strike excuses it only if the strikers’ demands can be met by public authorities alone. A normal pay dispute stays the airline’s risk. See ${h.a('reform', 'EU261 reform 2027')}.</p>
<h2>Canada is different</h2>
<p>Under the ${h.src('appr', 'APPR')}, section 10 lists a strike within the carrier as outside its control, so no compensation is owed there for a pilot walkout, though rebooking still is. Cause-by-cause details are on ${h.a('ca', 'the Canada page')}.</p>
`;
    },
  },
});
