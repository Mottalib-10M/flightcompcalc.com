import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'gepaeck', group: 'flug', order: 70,
  tool: 'baggage', toolArg: { cur: 'EUR' },
  related: ['fluggastrechte', 'verjaehrung', 'schlichtung', 'anschluss'],
  sources: ['icao-limits', 'cta-montreal', 'imf-sdr', 'luftvg57'],
  de: {
    slug: 'koffer-verspaetet-gepaeck',
    nav: 'Koffer verspätet oder verloren', card: 'Montrealer Übereinkommen: bis 1 519 Sonderziehungsrechte, Fristen von 7 und 21 Tagen, Klage binnen 2 Jahren.',
    title: 'Koffer verspätet oder verloren: Haftung und Fristen',
    description: 'Koffer verspätet, beschädigt oder verloren: Haftung bis 1 519 Sonderziehungsrechte nach Montreal, Anzeige binnen 7 oder 21 Tagen, Klage binnen 2 Jahren.',
    h1: 'Koffer verspätet oder verloren: was die Airline ersetzen muss',
    intro: 'Für Gepäck gibt es keine Pauschale wie bei Verspätungen. Ersetzt wird der nachgewiesene Schaden, bis zu einer Obergrenze in Sonderziehungsrechten.',
    resume: 'Für Gepäck gilt nicht die Fluggastrechteverordnung, sondern das Montrealer Übereinkommen, das die EU über die Verordnung (EG) Nr. 2027/97 auch auf Inlandsflüge anwendet. Die Airline haftet für aufgegebenes Gepäck, das verspätet ankommt, beschädigt wird oder verloren geht, ohne dass Sie ihr ein Verschulden nachweisen müssen. Ersetzt wird der tatsächliche Schaden, höchstens 1 519 Sonderziehungsrechte pro Person, eine Rechnungseinheit des Internationalen Währungsfonds, die der Rechner oben zum zuletzt veröffentlichten Kurs in Euro umrechnet. Der Betrag gilt seit dem 28. Dezember 2024. Wichtig sind die kurzen Fristen: Eine Beschädigung müssen Sie binnen 7 Tagen nach Erhalt des Koffers schriftlich anzeigen, eine Verspätung binnen 21 Tagen, nachdem Ihnen das Gepäck zur Verfügung gestellt wurde. Ist der Koffer nach 21 Tagen nicht da, gilt er als verloren. Klagen müssen Sie binnen zwei Jahren ab Ankunft. Höhere Werte sind nur geschützt, wenn Sie beim Einchecken ein besonderes Interesse an der Lieferung deklariert und gegebenenfalls einen Zuschlag gezahlt haben.',
    faqs: [
      { q: 'Was kann ich kaufen, solange mein Koffer fehlt?', a: 'Notwendige Ersatzkäufe wie Kleidung zum Wechseln, Hygieneartikel und Ladekabel werden als Verspätungsschaden ersetzt. Gerichte erkennen oft nur einen Teil des Kaufpreises an, weil Sie die Sachen behalten. Bewahren Sie alle Kassenbons auf und kaufen Sie Angemessenes, keine Garderobe für den ganzen Urlaub. Die Grenze von 1 519 Sonderziehungsrechten gilt für den gesamten Gepäckschaden.' },
      { q: 'Reicht die Verlustmeldung am Flughafen als Anzeige?', a: 'Die Meldung am Gepäckschalter, oft „Property Irregularity Report“ genannt, ist ein wichtiger Beleg, ersetzt aber nicht unbedingt die schriftliche Anzeige nach Art. 31 des Übereinkommens. Schicken Sie der Airline innerhalb der Frist zusätzlich eine eigene Schadensanzeige mit Aktenzeichen, Liste der Gegenstände und Belegen, am besten per E-Mail und mit Eingangsbestätigung.' },
      { q: 'Haftet die Airline auch für das Handgepäck?', a: 'Nur wenn sie oder ihre Leute den Schaden verschuldet haben. Für aufgegebenes Gepäck haftet die Airline unabhängig vom Verschulden, außer der Schaden beruht auf der Beschaffenheit des Koffers selbst. Beim Handgepäck, das Sie in der Kabine behalten, müssen Sie das Verschulden nachweisen, etwa wenn die Crew es in den Frachtraum verlegt und dort beschädigt hat.' },
      { q: 'Wie viel ist ein Sonderziehungsrecht wert?', a: 'Das Sonderziehungsrecht ist eine Rechnungseinheit des Internationalen Währungsfonds aus mehreren Währungen. Sein Kurs schwankt täglich, der IWF veröffentlicht ihn. Der Rechner oben nutzt den zuletzt veröffentlichten Kurs und nennt das Datum. Maßgeblich für die Umrechnung ist nach dem Übereinkommen in der Regel der Kurs am Tag des Urteils.' },
      { q: 'Wer ist zuständig, wenn mehrere Airlines geflogen sind?', a: 'Bei aufeinanderfolgenden Beförderungen können Sie sich an die erste oder die letzte Airline der Reise wenden sowie an die, auf deren Abschnitt der Schaden entstanden ist. In der Praxis ist die letzte Airline meist die richtige Adresse, weil sie den Koffer ausliefern sollte und die Verlustmeldung am Zielflughafen aufgenommen hat.' },
    ],
    body: (h) => {
      const cap = h.P.montreal.baggage_sdr * h.P.sdr.eur;
      return `
<h2>Die Obergrenze in Euro</h2>
<p>Seit dem ${h.day(h.P.montreal.in_force)} liegt die Haftungsgrenze für Gepäck bei ${h.n(h.P.montreal.baggage_sdr)} Sonderziehungsrechten pro Fluggast (von der ICAO revidiert, ${h.src('icao-limits', 'Tabelle in der britischen SI 2025/123')}). Zum ${h.src('imf-sdr', 'IWF-Kurs')} vom ${h.day(h.P.sdr.eur_date)} entspricht das ${h.eur(cap)}. Die Grenze ist kein Pauschalbetrag: Ersetzt wird, was Sie belegen, bei gebrauchten Sachen der Zeitwert, nicht der Neupreis.</p>
${h.table(['Schaden', 'Schriftliche Anzeige', 'Höchstbetrag'], [
  ['Koffer beschädigt', `binnen ${h.P.montreal.claim_damage_days} Tagen nach Erhalt`, h.eur(cap)],
  ['Koffer verspätet', `binnen ${h.P.montreal.claim_delay_days} Tagen nach Auslieferung`, h.eur(cap)],
  ['Koffer verloren', `nach ${h.P.montreal.claim_delay_days} Tagen ohne Koffer gilt er als verloren`, h.eur(cap)],
  ['Klage vor Gericht', `binnen ${h.P.montreal.action_years} Jahren ab Ankunft`, '–'],
], `Montrealer Übereinkommen, Art. 17, 22, 31 und 35; Umrechnung zum IWF-Kurs vom ${h.day(h.P.sdr.eur_date)}`, ['l', 'l', 'r'])}
${h.mini('baggage', { t: 'Ihr Schaden, die Grenze der Airline', d: { v: 2400, c: 0 } })}
<h2>Schritt für Schritt nach der Ankunft</h2>
<p>Noch im Gepäckbereich melden Sie den fehlenden oder beschädigten Koffer am Schalter der Airline oder ihres Abfertigers und lassen sich eine Bestätigung mit Aktenzeichen geben. Fotografieren Sie Schäden, bevor Sie den Koffer mitnehmen. Danach folgt die schriftliche Anzeige an die Airline innerhalb von 7 oder 21 Tagen, mit Liste der Gegenstände, Wert, Kaufbelegen soweit vorhanden, Bordkarte und Gepäckabschnitt. Ersatzkäufe während der Verspätung belegen Sie mit Kassenbons.</p>
<h2>Was nicht unter die Grenze fällt</h2>
<p>Die Ausgleichszahlung für einen verspäteten oder annullierten Flug nach der Verordnung 261/2004 ist ein eigener Anspruch und wird nicht auf den Gepäckschaden angerechnet. Kommt Ihr Koffer zu spät, weil der Flug drei Stunden Verspätung hatte, können Sie beides verlangen: die Pauschale für den Flug und den Gepäckschaden. Für Verspätungsschäden von Personen gilt nach dem Übereinkommen eine eigene, höhere Grenze von ${h.n(h.P.montreal.passenger_delay_sdr)} Sonderziehungsrechten, etwa für ein verlorenes Hotel.</p>
${h.box('Wertsachen', `<p>Schmuck, Kameras, Laptops und Medikamente gehören ins Handgepäck. Viele Beförderungsbedingungen schließen sie im aufgegebenen Gepäck aus. Wer Wertvolles aufgeben muss, kann beim Einchecken ein besonderes Interesse deklarieren; die Airline haftet dann bis zum deklarierten Betrag.</p>`)}
<h2>Wenn die Airline nicht zahlt</h2>
<p>Gepäckschäden gehören zu den Fällen, die in Deutschland vor die Schlichtung nach ${h.src('luftvg57', '§ 57 LuftVG')} gebracht werden können, wenn Sie zuerst bei der Airline gefordert haben. Wie das geht, steht unter ${h.a('schlichtung', 'Schlichtung und Klage')}. Die Zwei-Jahres-Frist für die Klage ist eine Ausschlussfrist: Anders als die dreijährige Verjährung für Ausgleichszahlungen läuft sie nicht bis zum Jahresende (${h.a('verjaehrung', 'Fristen im Überblick')}).</p>
`;
    },
  },
  en: {
    slug: 'delayed-lost-baggage-compensation',
    nav: 'Delayed or lost baggage', card: 'Montreal Convention: up to 1,519 SDR, written notice within 7 or 21 days, court action within 2 years.',
    title: 'Delayed or lost baggage compensation: limits and deadlines',
    description: 'Delayed, damaged or lost baggage: airline liability up to 1,519 SDR under the Montreal Convention, notice within 7 or 21 days, court action within two years.',
    h1: 'Delayed or lost baggage: what the airline has to pay',
    intro: 'Baggage has no fixed payout like flight delays. The airline pays your proven loss, up to a limit set in Special Drawing Rights.',
    resume: 'Baggage claims are not governed by EU261 or UK261 but by the Montreal Convention, which the EU and the UK also apply to domestic flights. The airline is liable for checked bags that arrive late, are damaged or are lost, without you having to prove fault. It pays the actual loss you can document, up to 1,519 Special Drawing Rights per passenger, a limit in force since 28 December 2024. The Special Drawing Right is a unit of the International Monetary Fund, and the calculator above converts it into pounds, euros or Canadian dollars at the latest published rate. The deadlines are short: report damage in writing within 7 days of receiving the bag, and a delay within 21 days of the bag being placed at your disposal. If the bag has not turned up after 21 days, it is treated as lost and you can claim for it. Court action must be started within two years of arrival. Higher values are protected only if you made a special declaration of interest at check-in and paid any supplement. Flight compensation for a delay is a separate claim on top.',
    faqs: [
      { q: 'What can I buy while my suitcase is missing?', a: 'Reasonable essentials such as a change of clothes, toiletries and chargers can be claimed as delay damage. Airlines and courts often refund only part of the price because you keep the items. Keep every receipt and buy what you need, not a holiday wardrobe. The 1,519 SDR limit covers the whole baggage loss, not each item.' },
      { q: 'Is the report at the baggage desk enough?', a: 'The Property Irregularity Report filled in at the airport is important evidence, but it may not count as the written complaint required by Article 31 of the Convention. Within the deadline, send the airline your own written claim with the file reference, a list of items, their value and receipts, ideally by email with a confirmation of receipt.' },
      { q: 'Is the airline liable for my cabin bag?', a: 'Only if the damage was caused by the fault of the airline or its staff. For checked bags liability is strict, unless the damage results from a defect in the bag itself. For hand luggage you keep with you, you must show fault, for example when crew moved your bag into the hold at the gate and it came back broken.' },
      { q: 'How are SDR converted into pounds or Canadian dollars?', a: 'The Special Drawing Right is an IMF unit based on a basket of currencies, and its value moves daily. The calculator above uses the latest published rate and shows its date, in euros, pounds or Canadian dollars. Under the Convention the conversion is generally made at the rate on the date of judgment, so the final figure can differ slightly.' },
      { q: 'Which airline do I claim from on a multi-airline journey?', a: 'On successive carriage you can claim from the first or the last carrier, or from the one on whose leg the damage occurred. In practice the last airline is usually the right address, since it was meant to deliver the bag and its agents took your report at the destination airport.' },
    ],
    body: (h) => {
      const capE = h.P.montreal.baggage_sdr * h.P.sdr.eur, capG = h.P.montreal.baggage_sdr * h.P.sdr.gbp, capC = h.P.montreal.baggage_sdr * h.P.sdr.cad;
      return `
<h2>The limit in your currency</h2>
<p>Since ${h.day(h.P.montreal.in_force)} the baggage limit has been ${h.n(h.P.montreal.baggage_sdr)} SDR per passenger (revised by ICAO, ${h.src('icao-limits', 'table certified in UK SI 2025/123')}; see also the ${h.src('cta-montreal', 'Canadian Transportation Agency notice')}). At the latest ${h.src('imf-sdr', 'IMF rates')} that is ${h.gbp(capG)} (${h.day(h.P.sdr.gbp_date)}), ${h.eur(capE)} (${h.day(h.P.sdr.eur_date)}) or ${h.cad(capC)} (${h.day(h.P.sdr.cad_date)}). It is a ceiling, not a payout: you receive what you can prove, and for used items that means their current value, not the price of new ones.</p>
${h.table(['Problem', 'Written notice', 'Limit (GBP)'], [
  ['Bag damaged', `within ${h.P.montreal.claim_damage_days} days of receipt`, h.gbp(capG)],
  ['Bag delayed', `within ${h.P.montreal.claim_delay_days} days of delivery`, h.gbp(capG)],
  ['Bag lost', `treated as lost after ${h.P.montreal.claim_delay_days} days`, h.gbp(capG)],
  ['Court action', `within ${h.P.montreal.action_years} years of arrival`, '–'],
], 'Montreal Convention, Articles 17, 22, 31 and 35', ['l', 'l', 'r'])}
${h.mini('baggage', { t: 'Your loss against the airline’s limit', d: { v: 1800, c: 1 } })}
<h2>What to do, in order</h2>
<p>Before leaving the baggage hall, report the missing or damaged bag at the desk of the airline or its handling agent and get a reference. Photograph any damage before you take the bag away. Then send the airline a written claim within 7 or 21 days, with a list of items, their value, receipts where you have them, the boarding pass and the bag tag. Keep receipts for anything you buy while you wait.</p>
<h2>Baggage and flight compensation together</h2>
<p>Compensation for a delayed or cancelled flight under EU261 or UK261 is a separate right and is not set off against the baggage claim. If your bag arrives late because the flight was four hours late, you can claim both. Delay to passengers themselves has its own, higher Montreal limit of ${h.n(h.P.montreal.passenger_delay_sdr)} SDR, for example for a hotel night you lost.</p>
${h.box('Valuables', `<p>Jewellery, cameras, laptops and medicines belong in your cabin bag. Many conditions of carriage exclude them from checked baggage. If you must check something valuable, you can make a special declaration of interest at check-in; the airline is then liable up to the declared sum.</p>`)}
<h2>If the airline will not pay</h2>
<p>In the UK, baggage complaints can go to the approved dispute body the airline belongs to, or to the CAA; in Germany to the arbitration body under ${h.src('luftvg57', 'section 57 LuftVG')}. See ${h.a('schlichtung', 'how to escalate a claim')}. The two-year period for court action is a strict cut-off, much shorter than the six years in England and Wales for flight compensation: see ${h.a('verjaehrung', 'claim time limits')}.</p>
`;
    },
  },
});
