import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'verjaehrung', group: 'flug', order: 80,
  tool: 'deadline', toolArg: { date: '2023-08-12' },
  related: ['schlichtung', 'reform', 'gepaeck', 'drei-stunden', 'uk261'],
  sources: ['bgb195', 'bgb199', 'eu2202', 'limitation-ew', 'limitation-sc', 'appr'],
  de: {
    slug: 'flugverspaetung-verjaehrung-frist',
    nav: 'Verjährung und Fristen', card: 'Drei Jahre bis zum Jahresende, ab 2027 neun Monate für den Antrag: welche Frist für Ihren Flug läuft.',
    title: 'Flugverspätung Verjährung: 3 Jahre, ab 2027 neun Monate',
    description: 'Flugverspätung und Verjährung: 3 Jahre ab Ende des Flugjahres nach BGB, Hemmung durch Schlichtung oder Mahnbescheid, ab Oktober 2027 Antrag binnen 9 Monaten.',
    h1: 'Verjährung bei Flugverspätung: bis wann Sie noch fordern können',
    intro: 'Für Flüge aus dem Jahr 2023 endet die Frist am 31. Dezember 2026. Wer jetzt noch fordern will, sollte nicht auf eine Antwort der Airline warten.',
    resume: 'Die Verordnung (EG) Nr. 261/2004 selbst nennt keine Frist für die Ausgleichszahlung. Der Europäische Gerichtshof hat 2012 entschieden (C-139/11), dass sich die Frist nach nationalem Recht richtet. Nach deutschem Recht gilt die regelmäßige Verjährung von drei Jahren (§ 195 BGB), die mit dem Schluss des Jahres beginnt, in dem der Anspruch entstanden ist und Sie davon wussten (§ 199 BGB). Ein Flug im August 2023 verjährt also am 31. Dezember 2026, ein Flug im Januar 2024 am 31. Dezember 2027. Eine E-Mail an die Airline hält die Verjährung nicht auf; das tun erst Verhandlungen, ein Antrag bei einer Schlichtungsstelle, ein Mahnbescheid oder eine Klage. Für Flüge ab dem 23. Oktober 2027 kommt eine zweite, viel kürzere Frist hinzu: Die Verordnung in der Fassung der Verordnung (EU) 2026/2202 verlangt, dass der Antrag binnen neun Monaten nach dem Flugdatum bei der Airline eingeht, die dann binnen 30 Tagen antworten muss. In Großbritannien gelten sechs Jahre in England und Wales und fünf in Schottland, in Kanada ein Jahr.',
    faqs: [
      { q: 'Mein Flug war im Dezember 2023. Habe ich wirklich bis Ende 2026 Zeit?', a: 'Ja, auch ein Flug am 31. Dezember 2023 verjährt nach deutschem Recht erst am 31. Dezember 2026, weil die Frist mit dem Ende des Jahres beginnt. Ein Flug am 1. Januar 2024 hat dagegen ein ganzes Jahr mehr. Wer kurz vor dem Jahreswechsel fordert, sollte die Hemmung sichern, etwa mit einem Antrag bei der Schlichtungsstelle, nicht nur mit einer E-Mail.' },
      { q: 'Hemmt meine Forderung an die Airline die Verjährung?', a: 'Eine einseitige Zahlungsaufforderung nicht. Antwortet die Airline aber und verhandelt mit Ihnen über den Anspruch, ist die Verjährung nach § 203 BGB gehemmt, bis eine Seite die Verhandlungen abbricht; danach endet sie frühestens drei Monate später. Eine pauschale Ablehnung ist keine Verhandlung. Sicherer ist ein förmlicher Schritt wie der Schlichtungsantrag.' },
      { q: 'Wie lange schützt ein Schlichtungsantrag?', a: 'Nach § 204 Abs. 1 Nr. 4 BGB ist die Verjährung ab Eingang des Antrags bei der Schlichtungsstelle gehemmt, wenn er der Airline demnächst bekannt gegeben wird. Die Hemmung endet sechs Monate nach dem Ende des Verfahrens. Scheitert die Schlichtung, bleibt also genug Zeit für einen Mahnbescheid oder eine Klage.' },
      { q: 'Ersetzt die Neun-Monats-Frist ab 2027 die Verjährung?', a: 'Sie kommt hinzu. Für Flüge ab dem 23. Oktober 2027 muss der Antrag binnen neun Monaten bei der Airline eingehen. Wer diese Frist verpasst, riskiert den Anspruch, auch wenn die dreijährige Verjährung noch läuft. Wer rechtzeitig beantragt, muss für Schlichtung und Klage weiter die nationale Verjährung im Blick behalten.' },
      { q: 'Gilt für Gepäck dieselbe Frist?', a: 'Nein. Gepäckschäden fallen unter das Montrealer Übereinkommen: schriftliche Anzeige binnen 7 Tagen bei Beschädigung und 21 Tagen bei Verspätung, Klage binnen zwei Jahren ab Ankunft. Diese zwei Jahre laufen taggenau und enden nicht am Jahresende. Eine Ausgleichszahlung für denselben verspäteten Flug verjährt dagegen nach den drei Jahren des BGB.' },
    ],
    body: (h) => {
      const y = h.P.de_limitation.years;
      return `
<h2>So rechnen Sie die drei Jahre</h2>
<p>Die Frist nach ${h.src('bgb195', '§ 195 BGB')} beträgt ${y} Jahre und beginnt nach ${h.src('bgb199', '§ 199 BGB')} erst mit dem Schluss des Jahres, in dem der Flug stattfand. Der Rechner oben ist auf einen Flug im August 2023 eingestellt: Fristende ist der ${h.day('2026-12-31')}. Das ist in wenigen Wochen.</p>
${h.table(['Flug im Jahr', 'Verjährung nach BGB', 'Antrag nach neuem Recht'], [
  ['2023', h.day(`${2023 + y}-12-31`), 'entfällt'],
  ['2024', h.day(`${2024 + y}-12-31`), 'entfällt'],
  ['2025', h.day(`${2025 + y}-12-31`), 'entfällt'],
  ['2026', h.day(`${2026 + y}-12-31`), 'entfällt'],
  [`ab ${h.day(h.P.eu261_2027.applies_from)}`, 'drei Jahre zum Jahresende', `${h.P.eu261_2027.claim_window_months} Monate ab dem Flugdatum`],
], 'Fristen für Ausgleichszahlungen nach deutschem Recht und nach der Verordnung (EU) 2026/2202', ['l', 'l', 'l'])}
${h.mini('deadline', { d: { y: 2027, m: 11 } })}
<p>Im Mini-Rechner ist ein Flug im November 2027 eingestellt: Er fällt unter die neue Fassung, und neben der Verjährung erscheint das Datum, bis zu dem der Antrag bei der Airline sein muss. Probieren Sie Ihr eigenes Flugdatum.</p>
<h2>Was die Verjährung anhält und was nicht</h2>
${h.table(['Schritt', 'Wirkung'], [
  ['E-Mail oder Brief an die Airline', 'keine Hemmung'],
  ['Verhandlungen mit der Airline', 'Hemmung nach § 203 BGB, solange verhandelt wird'],
  ['Antrag bei der Schlichtungsstelle', 'Hemmung ab Eingang (§ 204 Abs. 1 Nr. 4 BGB)'],
  ['Mahnbescheid', 'Hemmung ab Zustellung (§ 204 Abs. 1 Nr. 3 BGB)'],
  ['Klage', 'Hemmung ab Erhebung (§ 204 Abs. 1 Nr. 1 BGB)'],
], undefined, ['l', 'l'])}
<p>Jede dieser Hemmungen endet ${h.ext('https://www.gesetze-im-internet.de/bgb/__204.html', 'sechs Monate nach dem Ende des Verfahrens')}. Für Flüge aus 2023 heißt das: Ein Antrag bei der Schlichtungsstelle noch im Dezember 2026 sichert den Anspruch, ein Brief an die Airline nicht. Wie die Schlichtung abläuft, steht unter ${h.a('schlichtung', 'Schlichtung und Klage')}.</p>
<h2>Die neue Antragsfrist ab Oktober 2027</h2>
<p>Die ${h.src('eu2202', 'Verordnung (EU) 2026/2202')} führt für Flüge ab dem ${h.day(h.P.eu261_2027.applies_from)} eine Frist ein, die es bisher nicht gab: ${h.P.eu261_2027.claim_window_months} Monate ab dem Flugdatum für den Antrag bei der Airline, die binnen ${h.P.eu261_2027.airline_answer_days} Tagen antworten muss. Ein Flug am 1. Dezember 2027 muss also spätestens am 1. September 2028 reklamiert sein. Für Flüge davor bleibt es bei der Verjährung allein. Mehr unter ${h.a('reform', 'Reform 2027')}.</p>
${h.box('Ein Jahr vorbei? Nachrechnen', `<p>Flüge aus 2024 und 2025 sind nicht verjährt. Wer damals eine Absage oder drei Stunden Verspätung hatte und nie gefordert hat, kann das noch tun, mit dem Rechner auf der ${h.a('home', 'Startseite')} und dem Musterschreiben.</p>`)}
<h2>Andere Länder</h2>
<p>Klagen Sie in Großbritannien, gelten ${h.P.uk261.limitation_years_england_wales} Jahre in England und Wales (${h.src('limitation-ew', 'Limitation Act 1980')}) und ${h.P.uk261.limitation_years_scotland} Jahre in Schottland. Nach den kanadischen ${h.src('appr', 'APPR')} muss der Antrag binnen eines Jahres nach dem Flug bei der Airline sein.</p>
`;
    },
  },
  en: {
    slug: 'flight-compensation-time-limit',
    nav: 'Time limits to claim', card: 'Six years in England and Wales, five in Scotland, three in Germany, one in Canada, nine months in the EU from 2027.',
    title: 'Flight compensation time limit: how far back you can claim',
    description: 'Flight compensation time limits: 6 years in England and Wales, 5 in Scotland, 3 in Germany, 1 year under APPR, and 9 months for EU flights from October 2027.',
    h1: 'Flight compensation time limits: how far back you can go',
    intro: 'A delayed flight from 2021 can still be worth a claim in England. The same flight claimed through a German court would have run out years ago.',
    resume: 'Neither EU261 nor UK261 sets a deadline of its own for compensation; the Court of Justice held in 2012 (C-139/11) that the time limit comes from national law. In England and Wales you have six years under section 9 of the Limitation Act 1980; in Scotland five years under the 1973 Prescription and Limitation Act. In Germany the period is three years, running from the end of the year of the flight, so a flight in August 2023 is time-barred on 31 December 2026. Canada’s APPR require the claim to reach the airline within one year of the flight. For EU flights from 23 October 2027, the amended regulation adds a new and much shorter step: the claim must reach the airline within nine months of the flight date, and the airline must answer within 30 days. UK261 has no such rule. Baggage is different again: two years under the Montreal Convention, with written notice within 7 or 21 days.',
    faqs: [
      { q: 'Can I still claim for a flight from 2021?', a: 'If you can bring the claim in England or Wales, a flight up to six years ago is within time, so a flight in late 2020 runs out in late 2026. Scotland allows five years. For a flight from an EU airport claimed in an EU country, the national limit of that country applies, which can be much shorter, so check before you rely on six years.' },
      { q: 'Which country’s time limit applies to me?', a: 'The one where you bring the claim, under that country’s rules on which law applies. A UK passenger whose flight left from Manchester will usually be within UK law and its six or five years. For a flight from Germany sued in a German court, three years from the end of the flight year apply. Claim early rather than rely on the longest period.' },
      { q: 'Does writing to the airline stop the clock?', a: 'Not in England and Wales, and not under German law either. The limitation period keeps running while you exchange letters; it stops when court proceedings are issued. In Germany, negotiations and an application to an arbitration body suspend it. Keep an eye on the date while a complaint is being handled.' },
      { q: 'Does the nine-month rule from 2027 replace national limits?', a: 'It comes on top, for flights under the EU regulation from 23 October 2027. The claim has to reach the airline within nine months of the flight date; miss that and the claim is at risk even though the national period is still running. Flights covered only by UK261 are not affected.' },
      { q: 'How long do I have for a claim under Canadian rules?', a: 'Under the APPR the request for compensation must reach the airline within one year of the delay or cancellation, and the airline must reply within 30 days. If it refuses or does not answer, you can file a complaint with the Canadian Transportation Agency. EU and UK amounts cannot be added on top for the same disruption.' },
    ],
    body: (h) => {
      const ew = h.P.uk261.limitation_years_england_wales, sc = h.P.uk261.limitation_years_scotland;
      return `
<h2>The limits side by side</h2>
${h.table(['Where the claim is brought', 'Time limit', 'Flight on 12 Aug 2023: last day'], [
  ['England and Wales', `${ew} years (${h.src('limitation-ew', 'Limitation Act 1980, s. 9')})`, h.day(`${2023 + ew}-08-12`)],
  ['Scotland', `${sc} years (${h.src('limitation-sc', '1973 Act, s. 6')})`, h.day(`${2023 + sc}-08-12`)],
  ['Germany', `${h.P.de_limitation.years} years from the end of the year (${h.src('bgb195', 'BGB s. 195')})`, h.day(`${2023 + h.P.de_limitation.years}-12-31`)],
  ['Canada, APPR request', 'one year after the flight', h.day('2024-08-11')],
  [`EU flights from ${h.day(h.P.eu261_2027.applies_from)}`, `${h.P.eu261_2027.claim_window_months} months to claim from the airline`, 'not applicable'],
], 'Time limits for flight compensation claims', ['l', 'l', 'l'])}
<p>The calculator above is set to a flight on 12 August 2023 and shows each date. In England and Wales that claim is good for years to come; in a German court it expires at the end of 2026, a few weeks from now.</p>
${h.mini('deadline', { t: 'Enter your flight date', d: { y: 2021, m: 3 } })}
<h2>Where you claim decides the clock</h2>
<p>EU261 and UK261 contain no time limit, so courts apply their national rules. For UK passengers on flights from UK airports, UK law and its six or five years will normally govern. If you fly from Frankfurt or Munich and want to use the German arbitration body or a German court, the three-year rule applies, counted from 31 December of the flight year (${h.src('bgb199', 'BGB s. 199')}). Using the longest period available is fine; relying on it without checking is risky.</p>
<h2>What stops the clock</h2>
<p>In England and Wales only issuing a court claim stops the limitation period. Writing to the airline or chasing it on social media does not. In Germany, by contrast, ongoing negotiations and an application to the arbitration body suspend the period, and the suspension lasts until ${h.ext('https://www.gesetze-im-internet.de/bgb/__204.html', 'six months after the procedure ends')}. Details on escalation: ${h.a('schlichtung', 'how to escalate a flight delay claim')}.</p>
<h2>The new nine-month window in the EU</h2>
<p>${h.src('eu2202', 'Regulation (EU) 2026/2202')} introduces, for flights from ${h.day(h.P.eu261_2027.applies_from)}, a deadline that did not exist before: ${h.P.eu261_2027.claim_window_months} months from the flight date to claim from the airline, which must answer within ${h.P.eu261_2027.airline_answer_days} days. A flight on 1 December 2027 must be claimed by 1 September 2028. UK travellers flying home from Spain or Greece will fall under it, whatever the airline. See ${h.a('reform', 'EU261 reform 2027')}.</p>
${h.box('Canada', `<p>Under the ${h.src('appr', 'APPR')} the request goes to the airline within ${h.P.appr.claim_window_days} days, a year, and the airline answers within ${h.P.appr.airline_answer_days} days. Then a complaint can go to the Canadian Transportation Agency.</p>`)}
`;
    },
  },
});
