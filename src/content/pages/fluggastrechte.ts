import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'fluggastrechte', group: 'flug', order: 10,
  tool: 'flight', toolArg: { from: 'DUS', to: 'IST', event: 'delay', delay: 230, cause: 'airline', carrier: 'other' },
  related: ['drei-stunden', 'annullierung', 'nichtbefoerderung', 'anschluss', 'reform', 'uk261'],
  sources: ['eu261', 'eu2202', 'sturgeon', 'uk261', 'lba'],
  de: {
    slug: 'fluggastrechteverordnung-261-2004',
    nav: 'Fluggastrechteverordnung', card: 'Welche Flüge die Verordnung 261/2004 erfasst, wer haftet und welche Rechte die Artikel 5 bis 10 geben.',
    title: 'Fluggastrechteverordnung 261/2004: Ansprüche im Überblick',
    description: 'Fluggastrechteverordnung 261/2004: welche Flüge erfasst sind, wer als ausführende Airline haftet und was Art. 5 bis 10 bei Ausfall und Verspätung gewähren.',
    h1: 'Die Fluggastrechteverordnung: wen sie schützt und gegen wen',
    intro: 'Zwei Fragen entscheiden fast jeden Fall, bevor es um Geld geht: Fällt der Flug unter die Verordnung, und welche Airline muss zahlen?',
    resume: 'Die Verordnung (EG) Nr. 261/2004 gilt für jeden Flug, der in der EU, in Island, Norwegen oder der Schweiz startet, gleich mit welcher Airline, und für Flüge aus einem Drittstaat in die EU, wenn eine Airline mit Betriebsgenehmigung aus der EU sie durchführt. Anspruchsgegner ist immer das ausführende Luftfahrtunternehmen, also die Gesellschaft, die den Flug tatsächlich fliegt, nicht der Reiseveranstalter und nicht die Airline, deren Flugnummer auf dem Ticket steht. Bei Annullierung (Art. 5) und Nichtbeförderung (Art. 4) sieht der Text selbst eine Ausgleichszahlung nach Art. 7 vor: 250 € bis 1 500 km, 400 € bis 3 500 km und für innereuropäische Flüge darüber, 600 € für längere Strecken. Für Verspätungen ab drei Stunden am Endziel hat der Europäische Gerichtshof dieselben Beträge zugesprochen. Daneben stehen Wahlrechte auf Erstattung oder Umbuchung (Art. 8) und Betreuung mit Mahlzeiten, Hotel und Kommunikation (Art. 9). Die Rechte können vertraglich weder ausgeschlossen noch beschränkt werden (Art. 15). Ab dem 23. Oktober 2027 gilt eine geänderte Fassung.',
    faqs: [
      { q: 'Gilt die Verordnung auch für einen Rückflug aus Antalya?', a: 'Nur wenn eine Airline aus der EU den Flug durchführt. Die Türkei gehört nicht zum Geltungsbereich, also hängt der Schutz beim Flug in die EU an der Herkunft der ausführenden Gesellschaft. Fliegt eine türkische Airline, gilt für den Rückweg die Verordnung nicht, für den Hinflug ab Deutschland dagegen schon. Ein und dieselbe Pauschalreise kann so zwei unterschiedliche Rechtslagen haben.' },
      { q: 'Muss ich mich an das Reisebüro oder an die Airline wenden?', a: 'Die Ausgleichszahlung schuldet allein die Airline, die den Flug ausgeführt hat. Bei einer Pauschalreise können zusätzlich Ansprüche gegen den Reiseveranstalter auf Minderung des Reisepreises bestehen, die nach anderen Regeln laufen. Eine Zahlung des Veranstalters kann aber auf die Ausgleichszahlung angerechnet werden und umgekehrt, wie Art. 12 der Verordnung zulässt.' },
      { q: 'Sind Bonusmeilen-Tickets geschützt?', a: 'Ja. Art. 3 schließt nur Fluggäste aus, die kostenlos oder zu einem reduzierten Tarif reisen, der der Öffentlichkeit weder unmittelbar noch mittelbar zur Verfügung steht. Prämientickets aus Vielfliegerprogrammen sind ausdrücklich erfasst. Mitarbeitertickets mit Personalrabatt fallen dagegen in der Regel nicht darunter, ebenso wenig ein Freiflug für ein Kleinkind ohne eigenen Sitzplatz.' },
      { q: 'Darf die Airline mir statt Geld einen Gutschein geben?', a: 'Nur mit Ihrer schriftlichen Zustimmung. Nach Art. 7 Abs. 3 wird die Ausgleichszahlung in bar, per Überweisung oder Scheck geleistet; Reisegutscheine sind nur zulässig, wenn der Fluggast sie unterschrieben akzeptiert. Wer einen Gutschein am Schalter ablehnt, verliert nichts. Ein Gutschein über einen höheren Betrag kann sich lohnen, er bindet Sie aber an diese Airline.' },
      { q: 'Was bekomme ich, wenn ich in eine niedrigere Klasse gesetzt werde?', a: 'Art. 10 regelt die Herabstufung. Die Airline erstattet einen Teil des Preises für den betroffenen Flug: 30 % bei Strecken bis 1 500 km, 50 % bei Strecken bis 3 500 km und bei innereuropäischen Flügen darüber, 75 % bei allen anderen Flügen. Eine Höherstufung dagegen löst keine Zuzahlung aus, die Airline darf dafür nichts verlangen.' },
    ],
    body: (h) => `
<h2>Der Geltungsbereich in zwei Sätzen</h2>
<p>Art. 3 der ${h.src('eu261', 'Verordnung (EG) Nr. 261/2004')} knüpft an den Abflugort und an die Airline an. Wer in der EU, im übrigen Europäischen Wirtschaftsraum oder in der Schweiz abfliegt, ist geschützt, egal ob eine europäische, amerikanische oder türkische Gesellschaft fliegt. Wer aus einem Drittstaat in die EU fliegt, ist nur geschützt, wenn die ausführende Airline eine Betriebsgenehmigung eines Mitgliedstaats hat. Der Rechner oben ist auf Düsseldorf nach Istanbul mit einer Airline von außerhalb der EU eingestellt: Die Verordnung greift, weil der Flug in Deutschland beginnt.</p>
${h.table(['Strecke', 'Airline aus der EU', 'Airline von außerhalb'], [
  ['Düsseldorf nach Istanbul', 'erfasst', 'erfasst'],
  ['Istanbul nach Düsseldorf', 'erfasst', 'nicht erfasst'],
  ['New York nach Frankfurt', 'erfasst', 'nicht erfasst'],
  ['London nach Frankfurt', 'erfasst', 'nicht erfasst (UK261 prüfen)'],
  ['Frankfurt nach New York', 'erfasst', 'erfasst'],
], 'Geltungsbereich nach Art. 3 Abs. 1 der Verordnung (EG) Nr. 261/2004', ['l', 'l', 'l'])}
<p>Seit dem Austritt des Vereinigten Königreichs zählt London als Drittstaat. Für Abflüge dort gilt das britische ${h.src('uk261', 'UK261')}; auf der Seite ${h.a('uk261', 'UK261')} steht, wie beide Regelungen zusammenspielen. Außerdem verlangt Art. 3 Abs. 2 eine bestätigte Buchung und dass Sie sich rechtzeitig zur Abfertigung eingefunden haben, also zur angegebenen Zeit oder, wenn keine angegeben ist, spätestens 45 Minuten vor dem veröffentlichten Abflug.</p>
<h2>Wer „ausführendes Luftfahrtunternehmen“ ist</h2>
<p>Art. 2 Buchstabe b definiert es als das Unternehmen, das im Rahmen eines Vertrags mit einem Fluggast oder im Namen einer anderen Person einen Flug durchführt oder durchzuführen beabsichtigt. Praktisch heißt das: Steht auf der Bordkarte „durchgeführt von“ eine andere Gesellschaft als die verkaufende, richten Sie die Forderung an die durchführende. Bei Codeshare-Flügen ist das häufig nicht die Airline, bei der Sie gebucht haben. Bei einem gemieteten Flugzeug mit Besatzung bleibt die Gesellschaft verantwortlich, die den Flug unter eigener Verantwortung anbietet. Zahlt sie, kann sie sich nach Art. 13 bei Dritten schadlos halten, etwa beim Flughafen oder beim Veranstalter, das berührt Sie aber nicht.</p>
<h2>Die Artikel, die zählen</h2>
${h.table(['Artikel', 'Fall', 'Was er gibt'], [
  ['Art. 4', 'Nichtbeförderung', 'Freiwillige zuerst, sonst Ausgleich nach Art. 7 und Betreuung'],
  ['Art. 5', 'Annullierung', 'Ausgleich, außer bei rechtzeitiger Mitteilung oder außergewöhnlichen Umständen'],
  ['Art. 6', 'Verspätung', 'Betreuung ab 2, 3 oder 4 Stunden; ab 5 Stunden Erstattung'],
  ['Art. 7', 'Höhe', `${h.eur(h.P.eu261.amounts[0])}, ${h.eur(h.P.eu261.amounts[1])} oder ${h.eur(h.P.eu261.amounts[2])}`],
  ['Art. 8', 'Wahlrecht', 'Erstattung binnen 7 Tagen oder Umbuchung'],
  ['Art. 9', 'Betreuung', 'Mahlzeiten, Hotel, Transfer, zwei Telefonate oder E-Mails'],
  ['Art. 10', 'Herabstufung', '30, 50 oder 75 % des Flugpreises'],
  ['Art. 14', 'Information', 'Aushang am Schalter, schriftlicher Hinweis auf die Rechte'],
], undefined, ['l', 'l', 'l'])}
${h.mini('band', { t: 'Welche Stufe hat Ihre Strecke?', d: { km: 1837 } })}
<h2>Erstattung und Betreuung: die Rechte neben dem Geld</h2>
<p>Bei Annullierung und Nichtbeförderung haben Sie nach Art. 8 die Wahl: den Ticketpreis binnen sieben Tagen zurück, für nicht angetretene Teile und, wenn die Reise ihren Zweck verloren hat, auch für bereits geflogene Teile samt Rückflug zum Ausgangsort; oder eine Beförderung zum Endziel zum frühestmöglichen Zeitpunkt; oder eine Umbuchung zu einem späteren Wunschtermin. Bei einer Verspätung ab fünf Stunden steht Ihnen die Erstattung ebenfalls zu, wenn Sie nicht mehr fliegen wollen. Die Betreuung nach Art. 9 umfasst Mahlzeiten und Erfrischungen in angemessenem Verhältnis zur Wartezeit, ein Hotel samt Transfer, wenn eine Übernachtung nötig wird, und zwei Telefongespräche, E-Mails oder Faxe. Sie entfällt nicht wegen außergewöhnlicher Umstände; nur die Ausgleichszahlung kann entfallen.</p>
<h2>Was sich ändert und wer kontrolliert</h2>
<p>Die ${h.src('eu2202', 'Verordnung (EU) 2026/2202')} schreibt den Text ab dem ${h.day(h.P.eu261_2027.applies_from)} neu, mit einer Frist von ${h.P.eu261_2027.claim_window_months} Monaten für den Antrag (Einzelheiten unter ${h.a('reform', 'Reform 2027')}). In Deutschland überwacht das ${h.src('lba', 'Luftfahrt-Bundesamt')} die Einhaltung. Es kann Bußgelder verhängen, treibt aber keine Zahlung im Einzelfall ein. Ihr Geld holen Sie bei der Airline, notfalls über die Schlichtung oder das Gericht.</p>
`,
  },
  en: {
    slug: 'eu261-compensation',
    nav: 'EU261 compensation', card: 'Which flights EU261 covers, which airline pays, and what Articles 4 to 10 give you.',
    title: 'EU261 compensation: scope, amounts and who has to pay',
    description: 'EU261 compensation explained: which flights are covered, why the operating carrier pays, €250 to €600 under Article 7, plus refunds, care and downgrading.',
    h1: 'EU261 compensation: the regulation, read from the passenger’s side',
    intro: 'Before any money changes hands, two questions decide most claims: is the flight covered, and which airline is liable?',
    resume: 'Regulation (EC) No 261/2004, known as EU261, covers every flight departing from an airport in the EU, Iceland, Norway or Switzerland, whatever the airline, and flights arriving in the EU from outside when the operating airline holds an EU operating licence. The claim always lies against the operating carrier, the company that actually flies the aircraft, not the travel agent and not necessarily the airline whose flight number is on your ticket. For cancellation and denied boarding the text itself grants compensation under Article 7: €250 up to 1,500 km, €400 up to 3,500 km and for intra-EU flights beyond that, €600 for longer routes. For arrival delays of three hours or more the Court of Justice has granted the same amounts. On top of that come refund or rerouting (Article 8) and care such as meals and hotels (Article 9), and none of these rights can be waived in the contract (Article 15). Since leaving the EU the UK applies its own copy, UK261, in pounds. An amended EU text applies from 23 October 2027.',
    faqs: [
      { q: 'Is my flight from London to Frankfurt covered by EU261?', a: 'Only if an EU airline operates it. Since Brexit the UK counts as a third country for EU261, so a departure from London is covered by the EU text only on the inbound-to-EU-carrier rule. It is, however, covered by UK261, which protects every departure from the UK regardless of airline. In practice you claim under UK261 in pounds whichever company flew you.' },
      { q: 'I booked a package holiday: who do I claim from?', a: 'Compensation under EU261 is owed only by the airline that operated the flight. A package organiser may separately owe a price reduction under package travel rules, which run on their own terms. Article 12 lets one payment be deducted from the other, so you cannot collect twice for the same loss, but neither claim replaces the other automatically.' },
      { q: 'Are award tickets bought with miles protected?', a: 'Yes. Article 3 excludes only passengers travelling free of charge or on a reduced fare not available to the public directly or indirectly, and it expressly includes tickets issued under frequent flyer programmes. Staff travel on employee discounts is generally outside the regulation, and so is an infant travelling free on a parent’s lap without a seat.' },
      { q: 'Can the airline pay me in vouchers instead of cash?', a: 'Only with your signed agreement. Article 7(3) says compensation is paid in cash, by bank transfer or by cheque; travel vouchers are allowed only if the passenger accepts them in writing. Turning down a voucher at the desk costs you nothing. A voucher worth more than the cash amount can be a fair deal, but it ties you to that airline.' },
      { q: 'What if I am moved to a lower cabin class?', a: 'Article 10 covers downgrading. The airline must refund part of the price of that flight: 30% for routes up to 1,500 km, 50% for routes up to 3,500 km and intra-EU routes beyond, and 75% for all other flights, within seven days. An upgrade, on the other hand, cannot be charged to you as a supplement.' },
    ],
    body: (h) => `
<h2>Coverage in two sentences</h2>
<p>Article 3 of ${h.src('eu261', 'Regulation (EC) No 261/2004')} looks at where you depart and who flies you. Departing from the EU, the wider European Economic Area or Switzerland, you are protected on any airline, European or not. Flying into the EU from outside, you are protected only if the operating airline is licensed in a member state. The calculator above is set to Düsseldorf to Istanbul on a non-EU airline: EU261 applies, because the flight starts in Germany.</p>
${h.table(['Route', 'EU airline', 'Non-EU airline'], [
  ['Düsseldorf to Istanbul', 'covered', 'covered'],
  ['Istanbul to Düsseldorf', 'covered', 'not covered'],
  ['New York to Frankfurt', 'covered', 'not covered'],
  ['London to Frankfurt', 'covered by EU261 and UK261', 'UK261 only'],
  ['Frankfurt to London', 'covered', 'covered'],
], 'Scope under Article 3(1) of Regulation (EC) No 261/2004, with the UK rules added', ['l', 'l', 'l'])}
<p>Two further conditions sit in Article 3(2): a confirmed reservation, and turning up for check-in on time, either at the time the airline gave you or, if none was given, no later than 45 minutes before the published departure. If you were rerouted onto another flight, you are covered on that flight too.</p>
<h2>The operating carrier, not the seller</h2>
<p>Article 2(b) defines the operating air carrier as the one that performs, or intends to perform, a flight under a contract with a passenger or on behalf of someone else. If your boarding pass says “operated by” another company, that company is the one to write to, even if you paid a different airline. This matters most on codeshares and on holiday flights where an aircraft and crew are leased in. If the operating carrier pays and believes a third party caused the problem, Article 13 lets it recover the money from them; that is its problem, not yours.</p>
<h2>Articles 4 to 10 at a glance</h2>
${h.table(['Article', 'Situation', 'What you get'], [
  ['4', 'Denied boarding', 'Volunteers first, then compensation and care'],
  ['5', 'Cancellation', 'Compensation unless warned in time or extraordinary'],
  ['6', 'Delay', 'Care from 2, 3 or 4 hours; refund option from 5 hours'],
  ['7', 'Amounts', `${h.eur(h.P.eu261.amounts[0])}, ${h.eur(h.P.eu261.amounts[1])} or ${h.eur(h.P.eu261.amounts[2])}`],
  ['8', 'Choice', 'Refund within 7 days, or rerouting'],
  ['9', 'Care', 'Meals, hotel, transfers, two calls or emails'],
  ['10', 'Downgrading', '30, 50 or 75% of the fare'],
], undefined, ['l', 'l', 'l'])}
${h.mini('band', { t: 'Which band is your route in?', d: { km: 2298 } })}
<h2>UK261: the same structure in pounds</h2>
<p>${h.src('uk261', 'UK261')} keeps the EU text almost word for word, with ${h.gbp(h.P.uk261.amounts[0])}, ${h.gbp(h.P.uk261.amounts[1])} and ${h.gbp(h.P.uk261.amounts[2])} in place of the euro amounts. It covers departures from the UK on any airline, arrivals in the UK on a UK or EU airline, and arrivals in the EU on a UK airline. A London to Frankfurt flight on an EU airline can therefore fall under both texts; you are paid once, under whichever you choose. The detailed UK rules are on the ${h.a('uk261', 'UK261 page')}.</p>
<h2>Who enforces it and what is changing</h2>
<p>Each member state names an enforcement body; in Germany it is the ${h.src('lba', 'Luftfahrt-Bundesamt')}, which can fine airlines but does not collect individual payments. ${h.src('eu2202', 'Regulation (EU) 2026/2202')} rewrites the text for flights from ${h.day(h.P.eu261_2027.applies_from)}, with a ${h.P.eu261_2027.claim_window_months}-month window to claim: see ${h.a('reform', 'the 2027 reform')}.</p>
`,
  },
});
