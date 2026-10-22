import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'muc', group: 'airports-de', order: 210,
  tool: 'flight', toolArg: { from: 'MUC', to: 'ATH', event: 'delay', delay: 195, cause: 'airline', carrier: 'eu' },
  related: ['distanz', 'fra', 'schlichtung', 'fluggastrechte', 'annullierung'],
  sources: ['eu261', 'uk261', 'luftvg57', 'soep', 'lba'],
  de: {
    slug: 'flughafen-muenchen-verspaetung',
    nav: 'Flughafen München', card: 'Urlaubsziele ab MUC nahe an den Kilometergrenzen, Rückflüge aus Drittstaaten, Amtsgericht Erding.',
    title: 'Flughafen München Verspätung: Ansprüche und Grenzfälle',
    description: 'Flughafen München Verspätung: welche Urlaubsziele ab MUC knapp an 1 500 oder 3 500 km liegen, Rückflüge aus Drittstaaten, Pauschalreise, Amtsgericht Erding.',
    h1: 'Verspätung ab München: wenn wenige Kilometer über den Betrag entscheiden',
    intro: 'Von München aus liegen beliebte Ferienziele knapp diesseits oder jenseits der Kilometergrenzen. Das macht hier den Unterschied zwischen zwei Stufen.',
    resume: 'Für jeden Abflug in München gilt die Verordnung (EG) Nr. 261/2004, unabhängig von der Airline. Bei mindestens drei Stunden Verspätung am Ziel, kurzfristiger Annullierung oder Nichtbeförderung zahlt die Airline 250, 400 oder 600 € pro Person, je nach Großkreisentfernung. Ab München liegen mehrere Urlaubsziele dicht an den Grenzen: Madrid liegt knapp unter 1 500 km und bringt 250 €, Athen knapp darüber 400 €. Die ägyptischen Badeorte am Roten Meer bleiben ab München unter 3 500 km und damit bei 400 €, während Marsa Alam ab Frankfurt schon die oberste Stufe erreicht. Gran Canaria und Teneriffa bleiben trotz über 3 000 km als EU-Ziele bei 400 €. Auf dem Rückflug aus der Türkei oder Ägypten nach München sind Sie nur geschützt, wenn eine Airline aus der EU fliegt. Zuständiges Gericht für Flüge ab oder nach München ist nicht ein Münchner Gericht, sondern das Amtsgericht Erding, in dessen Bezirk der Flughafen liegt. Davor stehen die Forderung an die Airline und die kostenlose Schlichtung.',
    faqs: [
      { q: 'Warum ist für den Münchner Flughafen das Amtsgericht Erding zuständig?', a: 'Der Flughafen liegt im Bezirk des Amtsgerichts Erding, nicht in dem des Amtsgerichts München. Nach dem Urteil Rehder (C-204/08) können Sie am Abflug- oder am Ankunftsort klagen; für beide Richtungen ab oder nach München ist das Erding. Das Amtsgericht München ist für diese Flüge also nicht die richtige Adresse; prüfen Sie das vor dem Einreichen.' },
      { q: 'Ich habe eine Pauschalreise nach Hurghada gebucht. Wer zahlt bei Verspätung?', a: 'Die Ausgleichszahlung schuldet die Airline, die den Flug durchgeführt hat, auch wenn der Veranstalter den Flug ausgewählt hat. Gegen den Veranstalter können zusätzlich Ansprüche auf Minderung des Reisepreises bestehen, etwa wenn ein Urlaubstag verloren geht. Beide Zahlungen können aufeinander angerechnet werden, schließen sich aber nicht von vornherein aus.' },
      { q: 'Der Rückflug aus Antalya mit einer türkischen Airline war fünf Stunden zu spät. Habe ich Anspruch?', a: 'Nach der Verordnung nicht, weil der Flug außerhalb der EU startet und keine Airline aus der EU ihn durchführt. Auf dem Hinflug ab München mit derselben Airline wären Sie geschützt gewesen. Für tatsächliche Mehrkosten durch die Verspätung, etwa ein verfallenes Parkticket, kann das Montrealer Übereinkommen greifen, das Schäden statt Pauschalen ersetzt.' },
      { q: 'Gilt für Flüge nach Madrid die erste oder die zweite Stufe?', a: 'Die erste, wenn Sie in München abfliegen: Die Großkreisentfernung liegt wenige Kilometer unter 1 500 km. Ab Frankfurt oder Düsseldorf ist Madrid ebenfalls in der ersten Stufe, mit größerem Abstand zur Grenze. Fliegen Sie dagegen über einen anderen Flughafen mit einer Buchung weiter, zählt die Entfernung bis zum Endziel.' },
      { q: 'Kann ich Bus und Bahn zum Flughafen erstattet bekommen, wenn der Flug ausfällt?', a: 'Die Kosten der Anreise sind keine Leistung nach der Verordnung. Wählen Sie nach einer Annullierung die Erstattung, bekommen Sie den Flugpreis zurück, nicht das Bahnticket. Mehrkosten, die durch die Annullierung entstehen, etwa ein zusätzliches Ticket für die Rückfahrt, können als Schaden geltend gemacht werden; die Ausgleichszahlung kann darauf angerechnet werden.' },
    ],
    body: (h) => {
      const D: Array<[string, string]> = [['MAD', 'Madrid'], ['ATH', 'Athen'], ['PMI', 'Palma de Mallorca'], ['HER', 'Heraklion'], ['AYT', 'Antalya'], ['HRG', 'Hurghada'], ['RMF', 'Marsa Alam'], ['LPA', 'Gran Canaria'], ['DXB', 'Dubai'], ['MLE', 'Malé (Malediven)']];
      const stufe = (c: string) => { const a = h.owed('MUC', c, 250)[0].amount; return a; };
      return `
<h2>Zehn Urlaubsziele und ihre Stufe</h2>
<p>Die Höhe hängt allein von der Großkreisentfernung ab, nicht von der Flugzeit und nicht vom Ticketpreis. Ab München entscheiden bei einigen Zielen wenige Kilometer. Die Tabelle zeigt die Entfernung und den Abstand zur nächsten Grenze.</p>
${h.table(['Ziel', 'Entfernung ab MUC', 'Abstand zur Grenze', 'Betrag ab 4 Std.'], D.map(([c, n]) => {
        const d = h.dist('MUC', c);
        const lim = d <= 1500 ? 1500 : d <= 3500 ? 3500 : 0;
        const gap = lim ? `${h.n(Math.round(lim - d))} km unter ${h.n(lim)} km` : `${h.n(Math.round(d - 3500))} km über ${h.n(3500)} km`;
        return [`${n} (${c})`, h.km('MUC', c), d > 1500 && d < 1600 ? `${h.n(Math.round(d - 1500))} km über ${h.n(1500)} km` : gap, stufe(c)];
      }), 'Ausgleichszahlung pro Person für Flüge ab München nach Art. 7 der Verordnung (EG) Nr. 261/2004', ['l', 'r', 'l', 'r'])}
<p>Madrid liegt ${h.km('MUC', 'MAD')} entfernt: erste Stufe, ${h.owed('MUC', 'MAD', 250)[0].amount}. Athen, ${h.km('MUC', 'ATH')}: zweite Stufe, ${h.owed('MUC', 'ATH', 250)[0].amount}. Marsa Alam ist ab München ${h.km('MUC', 'RMF')} entfernt und bleibt damit in der zweiten Stufe; ab Frankfurt sind es ${h.km('FRA', 'RMF')}, genug für ${h.owed('FRA', 'RMF', 250)[0].amount} (${h.a('fra', 'Flughafen Frankfurt')}). Wie gemessen wird, erklärt die Seite ${h.a('distanz', 'Flugentfernung berechnen')}.</p>
${h.mini('route', { t: 'Ab München: Ziel und Verspätung wählen', from: 'MUC', to: ['MAD', 'ATH', 'RMF', 'HRG', 'LPA', 'MLE'], d: { h: 4 } })}
<h2>Hin ja, zurück nicht immer</h2>
<p>Der Hinflug ab München ist mit jeder Airline geschützt. Beim Rückflug aus Antalya, Hurghada oder Dubai gilt die ${h.src('eu261', 'Verordnung (EG) Nr. 261/2004')} nur, wenn die ausführende Airline eine Betriebsgenehmigung aus der EU hat. Prüfen Sie vor dem Buchen, wer den Rückflug durchführt, nicht nur, wer ihn verkauft. Für Rückflüge von den Kanaren, aus Griechenland oder Spanien stellt sich die Frage nicht: Sie starten in der EU.</p>
<h2>Pauschalreise ab München</h2>
<p>Bei Pauschalreisen kommen zwei Ansprüche zusammen. Die Ausgleichszahlung nach Art. 7 schuldet die Airline, die geflogen ist. Daneben haftet der Reiseveranstalter für Mängel der Reise, etwa einen verlorenen Urlaubstag, mit einer Minderung des Reisepreises. Art. 12 erlaubt, das eine auf das andere anzurechnen. Wer zuerst bei der Airline fordert, hat den sichereren und meist höheren Betrag in der Hand.</p>
<h2>Amtsgericht Erding statt München</h2>
<p>Der Flughafen liegt im Bezirk des Amtsgerichts Erding. Dort klagen Sie für Flüge ab oder nach München; das Wahlrecht zwischen Abflug- und Ankunftsort folgt aus dem Urteil Rehder des Gerichtshofs (C-204/08). Vorher führen die Forderung an die Airline und, nach Ablehnung oder zwei Monaten ohne Antwort, die Schlichtung nach ${h.src('luftvg57', '§ 57 LuftVG')} über die ${h.src('soep', 'söp')} oft schon zum Ziel. Das ${h.src('lba', 'Luftfahrt-Bundesamt')} nimmt Beschwerden an, zahlt aber nichts aus. Ablauf: ${h.a('schlichtung', 'Schlichtung und Klage')}.</p>
`;
    },
  },
  en: {
    slug: 'munich-airport-delay-compensation',
    nav: 'Munich Airport', card: 'Flights between Munich and the UK: which rules cover each direction, amounts in euros and pounds, the Erding court.',
    title: 'Munich Airport delay compensation: UK and EU rules compared',
    description: 'Munich Airport delay compensation: which rules cover flights between MUC and the UK in each direction, euro and pound amounts, and the court in Erding.',
    h1: 'Munich Airport delays: claiming on flights to and from the UK',
    intro: 'Between Munich and the UK, the direction you fly and the airline you fly with decide whether EU261, UK261 or both apply.',
    resume: 'A flight from Munich is covered by EU261 whatever the airline, so a delay of three hours or more at your UK destination, a short-notice cancellation or denied boarding gives €250 per passenger on routes up to 1,500 km, which includes London, Manchester and Edinburgh. If a UK or EU airline operates it, UK261 also covers that flight because it lands in the UK, at £220; you are paid once, under the scheme you choose. In the other direction, from the UK to Munich, UK261 covers every airline, while EU261 applies only if an EU airline operates the flight. On long-haul journeys that start in Munich, such as Munich to New York or Dubai, compensation rises to €600, halved when the delay at arrival is between three and four hours. If the airline refuses, you can use the German arbitration body or sue at the place of departure or arrival. For Munich Airport the competent local court is not in the city of Munich but the Amtsgericht Erding, because the airport lies in its district.',
    faqs: [
      { q: 'My flight from Munich to Heathrow was cancelled the evening before. What can I claim?', a: 'Notice of less than seven days with a replacement arriving two hours or more late gives compensation: €250 under EU261, or £220 under UK261 if a UK or EU airline operated it, plus a refund or rerouting and a hotel if you had to stay overnight. If the cause was a genuine air traffic control restriction or severe weather, compensation can fall away, but care does not.' },
      { q: 'Which court would hear a claim about a Munich flight?', a: 'The Amtsgericht Erding, the local court whose district includes the airport. Under the Court of Justice’s Rehder judgment (C-204/08) you may sue at the place of departure or arrival, so it covers flights both from and to Munich. There is no requirement to have a lawyer before a German local court, though documents must be in German.' },
      { q: 'I flew Manchester to Munich on a non-EU, non-UK airline. Am I covered?', a: 'Yes, by UK261, because it protects every departure from the UK whatever the airline. EU261 would not apply to that flight, as it starts outside the EU on a non-EU carrier. The amount is £220 for a route of this length if you arrive in Munich three hours or more late.' },
      { q: 'Does a delayed return from Munich after a ski trip count if I drove to the airport?', a: 'How you reached the airport makes no difference. What counts is the flight: departing from Munich, it is covered by EU261, and the delay is measured at arrival in the UK. Costs of getting to the airport, such as a hire car returned late, are not part of the fixed compensation but may be claimed as actual losses if the airline caused them.' },
      { q: 'Is there anything special about long-haul flights from Munich?', a: 'Long-haul routes from Munich are over 3,500 km and outside the EU, so the top band of €600 applies, halved if you arrive between three and four hours late. A UK traveller connecting in Munich on a single booking from London to New York is measured from London to New York and covered by UK261 for the whole journey.' },
    ],
    body: (h) => {
      const U: Array<[string, string]> = [['LHR', 'London Heathrow'], ['LGW', 'London Gatwick'], ['STN', 'London Stansted'], ['MAN', 'Manchester'], ['BHX', 'Birmingham'], ['EDI', 'Edinburgh'], ['GLA', 'Glasgow'], ['BFS', 'Belfast']];
      const pick = (r: { regime: string; amount: string }[], id: string) => r.find((x) => x.regime === id)?.amount ?? 'does not apply';
      return `
<h2>Which rules cover which direction</h2>
${h.table(['Direction', 'EU airline', 'UK airline', 'Other airline'], [
  ['Munich to the UK', 'EU261 and UK261', 'EU261 and UK261', 'EU261 only'],
  ['UK to Munich', 'UK261 and EU261', 'UK261 only', 'UK261 only'],
], 'Scope of EU261 (Article 3) and UK261 on flights between Munich and the UK', ['l', 'l', 'l', 'l'])}
<p>When both schemes apply, you claim under one of them and are paid once. On these routes the euro amount under ${h.src('eu261', 'EU261')} and the pound amount under ${h.src('uk261', 'UK261')} are close; choose the one that is easier to enforce, often the one matching where you would go to court.</p>
<h2>UK airports from Munich, at four hours late</h2>
${h.table(['UK airport', 'Distance from MUC', 'EU261 (EU airline)', 'UK261 (EU airline)'], U.map(([c, n]) => {
        const r = h.owed('MUC', c, 240, { carrier: 'eu' });
        return [`${n} (${c})`, h.km('MUC', c), pick(r, 'EU261'), pick(r, 'UK261')];
      }), 'Compensation per passenger for a delay of four hours at arrival', ['l', 'r', 'r', 'r'])}
<p>Every UK airport in the table is under 1,500 km from Munich, so the first band applies in both schemes. Long-haul is different: Munich to New York, ${h.km('MUC', 'JFK')}, pays ${h.owed('MUC', 'JFK', 250)[0].amount} for a delay of four hours or more, and Munich to Dubai, ${h.km('MUC', 'DXB')}, the same. Measuring rules are on ${h.a('distanz', 'flight distance')}.</p>
${h.mini('route', { t: 'From Munich: choose a destination', from: 'MUC', to: ['LHR', 'MAN', 'EDI', 'DUB', 'JFK', 'DXB'], d: { h: 3.25 } })}
<h2>Cancellations on the way home</h2>
<p>A late cancellation of your flight home from Munich gives compensation unless the airline told you 14 days ahead, or offered a replacement close enough to the original times. Until you are on your way, it owes meals and, if needed, a hotel near the airport. Details by notice period are on ${h.a('annullierung', 'cancelled flights')}.</p>
<h2>Enforcing a claim: Erding, not Munich</h2>
<p>Munich Airport lies in the district of the Amtsgericht Erding, so that is the local court for flights from or to the airport, under the Court of Justice’s Rehder judgment (C-204/08). Before that, write to the airline; if it refuses or does not answer within two months, the German arbitration route under ${h.src('luftvg57', 'section 57 of the Aviation Act')} through ${h.src('soep', 'söp')} is open and free for passengers. The ${h.src('lba', 'Luftfahrt-Bundesamt')} supervises airlines but does not collect payments for individuals. If you claim under UK261 instead, the UK route of ADR and the small claims court applies: ${h.a('schlichtung', 'how to claim')}. Comparing with Frankfurt? See ${h.a('fra', 'Frankfurt Airport')}.</p>
`;
    },
  },
});
