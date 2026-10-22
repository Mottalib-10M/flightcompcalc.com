import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'schlichtung', group: 'flug', order: 90,
  tool: 'flight', toolArg: { from: 'BER', to: 'AYT', event: 'delay', delay: 260, cause: 'technical', carrier: 'eu' },
  related: ['verjaehrung', 'streik', 'fluggastrechte', 'fra', 'muc', 'uk261'],
  sources: ['luftvg57', 'luftschlichtv', 'soep', 'lba', 'caa-adr', 'eu261'],
  de: {
    slug: 'schlichtungsstelle-flug',
    nav: 'Schlichtung und Klage', card: 'Erst die Airline, dann söp oder Bundesamt für Justiz, notfalls Amtsgericht: der Weg in vier Stufen.',
    title: 'Schlichtungsstelle Flug: von der Forderung bis zum Gericht',
    description: 'Schlichtungsstelle Flug: erst bei der Airline fordern, nach Ablehnung oder 2 Monaten Schweigen zur söp oder zum Bundesamt für Justiz, LBA und Amtsgericht.',
    h1: 'Schlichtung bei Flugärger: der Weg zum Geld in vier Stufen',
    intro: 'Die meisten Ansprüche lassen sich ohne Anwalt und ohne Kosten durchsetzen. Entscheidend ist die Reihenfolge.',
    resume: 'Wer eine Ausgleichszahlung durchsetzen will, fordert zuerst schriftlich bei der Airline, die den Flug durchgeführt hat, mit Buchungsnummer, Flugdaten, Betrag und Bankverbindung. Lehnt die Airline ab oder reagiert sie innerhalb von zwei Monaten weder mit Zusage noch mit Ablehnung, können Sie nach § 57b des Luftverkehrsgesetzes eine Schlichtung beantragen. Zuständig ist die söp, Schlichtungsstelle für den öffentlichen Personenverkehr, wenn die Airline dort Mitglied ist, sonst die Schlichtungsstelle Luftverkehr beim Bundesamt für Justiz. Das Verfahren ist für Fluggäste grundsätzlich kostenlos, erfasst Ansprüche bis 5 000 € und hemmt die Verjährung. Das Luftfahrt-Bundesamt nimmt Beschwerden entgegen und kann Bußgelder verhängen, treibt aber kein Geld für Sie ein. Bleibt die Schlichtung erfolglos, bleibt der Weg zum Amtsgericht, wahlweise am Abflug- oder am Ankunftsort, ohne Anwaltszwang. Bei grenzüberschreitenden Fällen steht das europäische Verfahren für geringfügige Forderungen bis 5 000 € offen. Eine Gesellschaft, die das für Sie übernimmt, behält dagegen einen Anteil der Zahlung.',
    faqs: [
      { q: 'Wie lange sollte ich der Airline Zeit geben?', a: 'Setzen Sie in Ihrem Schreiben eine Frist von zwei bis vier Wochen, das ist üblich und angemessen. Für die Schlichtung kommt es aber auf das Gesetz an: Sie ist möglich, sobald die Airline abgelehnt hat oder seit Ihrer Forderung zwei Monate vergangen sind, ohne dass sie zugestimmt oder abgelehnt hat. Ab Oktober 2027 muss die Airline zudem binnen 30 Tagen antworten.' },
      { q: 'Was kostet mich die Schlichtung?', a: 'In der Regel nichts. Nach § 57 LuftVG darf von Fluggästen ein Entgelt von höchstens 30 € nur verlangt werden, wenn die Geltendmachung missbräuchlich ist. Eine Vorabgebühr ist nur unter engen Voraussetzungen erlaubt und auf 20 € begrenzt. Die Kosten des Verfahrens trägt im Normalfall die Airline. Eigene Auslagen wie Porto oder Kopien bleiben bei Ihnen.' },
      { q: 'Ist der Schlichtungsvorschlag verbindlich?', a: 'Nicht automatisch. Die Schlichtungsstelle schlägt eine Lösung vor; verbindlich wird sie erst, wenn beide Seiten zustimmen. Lehnen Sie den Vorschlag ab, steht Ihnen der Weg zum Gericht weiterhin offen, das Recht, die Gerichte anzurufen, bleibt nach § 57b Abs. 4 LuftVG unberührt. Prüfen Sie vor der Zustimmung, ob der Vorschlag den vollen Betrag nach Art. 7 enthält.' },
      { q: 'Wann lohnt sich der Gang zum Amtsgericht?', a: 'Wenn die Airline auch nach der Schlichtung nicht zahlt oder die Schlichtung ausgeschlossen ist, etwa weil deutsche Gerichte nicht zuständig wären. Vor dem Amtsgericht brauchen Sie keinen Anwalt. Sie können wahlweise am Abflug- oder am Ankunftsort klagen. Wer gewinnt, bekommt die Gerichtskosten erstattet; wer verliert, trägt sie, deshalb lohnt sich ein klarer Fall.' },
      { q: 'Kann ich mehrere Fluggäste in einem Antrag zusammenfassen?', a: 'Jeder Fluggast hat einen eigenen Anspruch, auch Kinder mit eigenem Sitzplatz. Bei der Schlichtung und im Schreiben an die Airline können Sie die Ansprüche einer Buchung gemeinsam geltend machen, sollten aber jeden Namen und jeden Betrag einzeln aufführen. Für Mitreisende ab 18 Jahren ist eine kurze Vollmacht sinnvoll, damit Sie für sie handeln dürfen.' },
    ],
    body: (h) => {
      const amt = h.owed('BER', 'AYT', 260)[0].amount;
      return `
<h2>Stufe 1: die Forderung an die Airline</h2>
<p>Der Rechner oben ist auf Berlin nach Antalya eingestellt, ${h.km('BER', 'AYT')}, vier Stunden und zwanzig Minuten Verspätung wegen eines technischen Defekts: ${amt} pro Person. Daraus erstellt er ein Schreiben in Ihrem Browser, mit Verweis auf Art. 7 der ${h.src('eu261', 'Verordnung (EG) Nr. 261/2004')}, Flugdaten, Betrag und Frist. Schicken Sie es an die Airline, die den Flug durchgeführt hat, per E-Mail, Kontaktformular oder Einschreiben, und bewahren Sie den Nachweis auf. Viele Airlines verlangen ein eigenes Online-Formular; nutzen Sie es und hängen Sie das Schreiben an.</p>
${h.table(['Stufe', 'Wann', 'Kosten für Sie', 'Ergebnis'], [
  ['1. Forderung an die Airline', 'sofort nach dem Flug', 'keine', 'Zahlung oder Ablehnung'],
  ['2. Schlichtung (söp oder Bundesamt für Justiz)', 'nach Ablehnung oder 2 Monaten ohne Antwort', 'in der Regel keine', 'Vorschlag, verbindlich bei Zustimmung'],
  ['Parallel: Beschwerde beim LBA', 'jederzeit', 'keine', 'Aufsicht, Bußgeld, keine Zahlung an Sie'],
  ['3. Mahnbescheid oder Klage', 'wenn die Schlichtung scheitert', 'Gerichtskosten, bei Erfolg erstattet', 'vollstreckbarer Titel'],
], 'Durchsetzung einer Ausgleichszahlung in Deutschland', ['l', 'l', 'l', 'l'])}
${h.mini('band', { t: 'Welchen Betrag Sie fordern', d: { km: 2244 } })}
<h2>Stufe 2: die Schlichtung</h2>
<p>Die Schlichtung ist in ${h.src('luftvg57', '§ 57 bis § 57b LuftVG')} und der ${h.src('luftschlichtv', 'Luftverkehrsschlichtungsverordnung')} geregelt. Erfasst sind Zahlungsansprüche bis 5 000 € aus Nichtbeförderung, Verspätung, Annullierung, Herabstufung und Gepäck. Ausgeschlossen ist sie, wenn die Sache schon vor Gericht liegt, wenn eine andere Schlichtungsstelle befasst war oder der Betrag 10 € nicht übersteigt. Ist die Airline Mitglied der ${h.src('soep', 'söp')}, wenden Sie sich dorthin; sonst an die Schlichtungsstelle Luftverkehr beim Bundesamt für Justiz (§ 57a LuftVG). Den Antrag stellen Sie online oder schriftlich mit Ihrer Forderung und der Antwort der Airline. Ab Eingang ist die Verjährung gehemmt (${h.a('verjaehrung', 'Fristen')}).</p>
<h2>Parallel: das Luftfahrt-Bundesamt</h2>
<p>Das ${h.src('lba', 'Luftfahrt-Bundesamt')} ist die nationale Durchsetzungsstelle nach Art. 16 der Verordnung. Eine Beschwerde dort lohnt, wenn eine Airline systematisch Rechte verweigert. Für Ihre Zahlung bringt sie aber nichts: Das Amt prüft Verstöße und kann Bußgelder verhängen, es entscheidet keine Einzelfälle zwischen Ihnen und der Airline.</p>
<h2>Stufe 3: das Gericht</h2>
<p>Zuständig ist das Amtsgericht am Abflug- oder am Ankunftsort; der Europäische Gerichtshof hat dieses Wahlrecht 2009 im Urteil Rehder (C-204/08) bestätigt. Für Abflüge in Frankfurt ist das Amtsgericht Frankfurt am Main zuständig, für München das Amtsgericht Erding (${h.a('fra', 'Flughafen Frankfurt')}, ${h.a('muc', 'Flughafen München')}). Einen Anwalt brauchen Sie dort nicht. Statt der Klage können Sie mit einem Mahnbescheid beginnen; widerspricht die Airline, kann das Verfahren auf Antrag vor dem Gericht weitergeführt werden. Bei Flügen mit Bezug zu einem anderen EU-Staat steht außerdem das ${h.ext('https://eur-lex.europa.eu/eli/reg/2007/861/oj', 'europäische Verfahren für geringfügige Forderungen')} bis 5 000 € offen, schriftlich und mit Standardformularen.</p>
${h.box('Ohne Provision', `<p>Gesellschaften, die Ansprüche gegen Erfolgsbeteiligung durchsetzen, behalten üblicherweise 25 bis 35 % der Zahlung einschließlich Mehrwertsteuer. Mit dem Schreiben aus dem Rechner, der Schlichtung und notfalls dem Amtsgericht erreichen Sie dasselbe Ziel und behalten den vollen Betrag.</p>`)}
`;
    },
  },
  en: {
    slug: 'how-to-claim-flight-delay-compensation',
    nav: 'Claiming step by step', card: 'Write to the airline, escalate to ADR or the CAA, then the small claims court: the route in order.',
    title: 'Flight delay claim: steps from first letter to small claims',
    description: 'Flight delay claim step by step: write to the airline, escalate to its ADR body or the CAA, then the small claims court. EU routes: arbitration, EU procedure.',
    h1: 'Claiming flight delay compensation, step by step',
    intro: 'Most claims can be won without a lawyer and without paying anyone a share. What matters is doing things in the right order.',
    resume: 'Start by writing to the airline that operated the flight, with your booking reference, flight number and date, the amount you are owed and your bank details; the calculator above produces this letter in your browser. Many airlines also have an online claim form; use it and attach the letter. If the airline rejects the claim or does not resolve it, a UK flight claim can go to the alternative dispute resolution (ADR) body the airline has signed up to; the Civil Aviation Authority publishes the list of airlines in each scheme, and handles complaints about airlines that are not in one. If that fails, you can issue a claim in the small claims track of the county court in England and Wales, or the simple procedure in Scotland, within six or five years. For flights from Germany, the German arbitration bodies and local courts are open to you too, and cross-border claims within the EU can use the European small claims procedure up to €5,000. Claims firms commonly keep 25 to 35% of the payment, VAT included.',
    faqs: [
      { q: 'What should the first letter to the airline contain?', a: 'Your names, booking reference, flight number, date and route, what happened (delay at arrival, cancellation or denied boarding), the regulation you rely on, the amount per passenger and your bank details. Set a reasonable deadline, such as two to four weeks. Keep proof of sending. The letter from the calculator above contains all of this and is generated in your browser, ready to copy or print.' },
      { q: 'When can I take a UK claim to ADR?', a: 'Once the airline has rejected your complaint or failed to resolve it within the time the scheme allows. Each ADR body sets its own conditions, and you must complain to the airline first. If the airline is not part of any ADR scheme, the Civil Aviation Authority can look at the complaint instead. Neither route stops you going to court later if the dispute is still open.' },
      { q: 'Is it worth going to the small claims court?', a: 'For a clear case, often yes. In England and Wales flight compensation claims are normally allocated to the small claims track, where you do not need a lawyer and the costs you can be ordered to pay are limited. There are court fees to start a claim, which you can recover from the airline if you win. Prepare the boarding passes, your letter and the airline’s reply before you file.' },
      { q: 'I live in the UK but flew from Germany. Where do I claim?', a: 'You can still write to the airline and use the German arbitration body if the airline belongs to it, or the one at the Federal Office of Justice if it does not. In court, the Court of Justice allows claims at the place of departure or arrival of the flight, so a German local court would be competent for a flight from Frankfurt or Munich. A UK court may also be available depending on the facts.' },
      { q: 'Should I use a claims company instead?', a: 'That is your choice, but it costs a share of your compensation, commonly 25 to 35% including VAT, sometimes with extra fees if the case goes to court. The steps on this page are the same ones such firms follow. If your case is straightforward, doing it yourself keeps the full amount; if the airline digs in, the ADR body or court can still decide.' },
    ],
    body: (h) => {
      const uk = h.owed('MAN', 'AYT', 260, { carrier: 'gb' }).find((x) => x.regime === 'UK261')!;
      return `
<h2>Step 1: write to the airline</h2>
<p>For Manchester to Antalya, ${h.km('MAN', 'AYT')}, four hours twenty late because of a technical fault, UK261 gives ${uk.amount} per passenger. The calculator builds a claim letter in your browser with the flight details, the article relied on, the amount and a deadline. Send it to the operating carrier by email, web form or recorded post, and keep proof. If you flew from Berlin, as in the calculator default, the amount is ${h.owed('BER', 'AYT', 260)[0].amount} under ${h.src('eu261', 'EU261')}.</p>
${h.table(['Step', 'When', 'Cost to you', 'Outcome'], [
  ['1. Claim to the airline', 'as soon as possible after the flight', 'none', 'payment or rejection'],
  ['2. ADR body or CAA (UK)', 'after rejection or no resolution', 'see the scheme rules on the CAA page', 'decision on the complaint'],
  ['2. söp or Federal Office of Justice (Germany)', 'after rejection or 2 months’ silence', 'normally free', 'proposal, binding if both agree'],
  ['3. Small claims court', 'if the dispute is still open', 'court fee, recoverable if you win', 'enforceable judgment'],
], 'Escalation route for UK and German flights', ['l', 'l', 'l', 'l'])}
${h.mini('band', { t: 'Check the amount before you write', d: { km: 3500 } })}
<h2>Step 2 in the UK: ADR or the CAA</h2>
<p>Most airlines flying from the UK belong to an approved alternative dispute resolution scheme. The ${h.src('caa-adr', 'Civil Aviation Authority’s ADR page')} lists which airline belongs to which body and explains the conditions. You must complain to the airline first. If the airline is not in any scheme, the CAA itself can take up the complaint. Using ADR does not prevent you from going to court afterwards.</p>
<h2>Step 2 for flights from Germany</h2>
<p>German law offers arbitration for claims up to €5,000 under ${h.src('luftvg57', 'section 57 of the Aviation Act')}: through ${h.src('soep', 'söp')} if the airline is a member, otherwise through the arbitration body at the Federal Office of Justice. It opens once the airline has refused or stayed silent for two months. The Luftfahrt-Bundesamt (${h.src('lba', 'LBA')}) enforces the regulation and can fine airlines, but does not collect individual payments. Full German route: ${h.a('fra', 'Frankfurt Airport')} and ${h.a('muc', 'Munich Airport')} pages name the local courts.</p>
<h2>Step 3: court</h2>
<p>In England and Wales you can start a money claim online through ${h.ext('https://www.gov.uk/make-court-claim-for-money', 'GOV.UK')}; claims of this size go to the small claims track. In Scotland the equivalent is the simple procedure. Within the EU, cross-border claims up to €5,000 can use the ${h.ext('https://eur-lex.europa.eu/eli/reg/2007/861/oj', 'European small claims procedure')}, in writing with standard forms. Under the Court of Justice’s Rehder judgment (C-204/08) you can sue at the place of departure or arrival of the flight. Mind the time limits: ${h.a('verjaehrung', 'how long you have to claim')}.</p>
${h.box('No commission', `<p>Claims firms commonly keep 25 to 35% of the payment including VAT. The letter, the ADR route and the small claims court reach the same result, and you keep the whole amount.</p>`)}
`;
    },
  },
});
