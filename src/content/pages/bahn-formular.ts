import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'bahn-formular', group: 'bahn', order: 610,
  tool: 'rail', toolArg: { fare: 89.9, delay: 135 },
  related: ['bahn', 'verjaehrung', 'schlichtung', 'anschluss'],
  sources: ['db-rules', 'rail2021', 'soep', 'evo'],
  de: {
    slug: 'fahrgastrechte-formular-ausfuellen',
    nav: 'Fahrgastrechte-Formular', card: 'Online oder auf Papier: welche Angaben die Bahn braucht, wohin der Antrag geht und was bei Auslandsfahrkarten gilt.',
    title: 'Fahrgastrechte-Formular online ausfüllen und einreichen',
    description: 'Fahrgastrechte-Formular der Bahn ausfüllen: online oder auf Papier, nötige Zeiten und Belege, Zeitkarten sammeln, Auslandsfahrkarten, Frist von drei Monaten.',
    h1: 'Fahrgastrechte-Formular der Deutschen Bahn: den Antrag richtig stellen',
    intro: 'Der Antrag ist kurz, aber eine falsche Uhrzeit oder ein fehlender Beleg verzögert ihn um Wochen. So kommt er beim ersten Mal durch.',
    resume: 'Entschädigung, Erstattung und Ersatz von Taxi- oder Hotelkosten beantragen Sie beim Unternehmen, das Ihre Fahrkarte ausgegeben hat. Bei der DB geht das online über das Kundenkonto und die App, im Reisezentrum oder mit dem Fahrgastrechte-Formular, das die DB als PDF bereitstellt. Sie brauchen die Fahrkarte oder ihre Auftragsnummer, das Reisedatum, den Zielbahnhof, die planmäßige und die tatsächliche Ankunftszeit sowie die Zugnummern, bei einem verpassten Anschluss auch die des Anschlusszugs. Für Auslagen legen Sie Quittungen bei. Inhaber von Zeitkarten sammeln die Fälle innerhalb der Gültigkeit und reichen sie zusammen ein, weil Beträge unter 4 € nicht ausgezahlt werden. Wurde eine grenzüberschreitende Fahrkarte von einer ausländischen Bahn ausgegeben, ist diese zuständig; die DB leitet Anträge sonst weiter, was Zeit kostet. Die Verordnung sieht drei Monate nach der Fahrt vor, die Zahlung muss binnen eines Monats folgen. Lehnt die Bahn ab, schlichtet die söp kostenlos.',
    faqs: [
      { q: 'Welche Ankunftszeit trage ich ein?', a: 'Die tatsächliche Ankunft am Zielbahnhof Ihrer Fahrkarte, nicht die des ersten verspäteten Zuges. Haben Sie unterwegs umgeplant, zählt, wann Sie am Ziel angekommen sind. Ein Foto der Anzeigetafel oder ein Bildschirmfoto der App mit Uhrzeit hilft, falls die Bahn eine andere Zeit in ihren Daten hat.' },
      { q: 'Kann ich das Formular für mehrere Personen einreichen?', a: 'Ja, wenn alle auf einer Fahrkarte oder einer Buchung reisen; der Fahrpreis ist dann der Gesamtpreis für alle. Bei getrennten Fahrkarten stellen Sie je Fahrkarte einen Antrag. Bei Kindern, die kostenlos mitfahren, gibt es keine Entschädigung, weil kein Fahrpreis gezahlt wurde.' },
      { q: 'Was passiert mit meiner Original-Fahrkarte?', a: 'Bei Papierfahrkarten verlangt die Bahn für die Entschädigung in der Regel das Original oder eine Kopie, je nach Antragsweg; bei Online-Tickets genügt die Auftragsnummer. Behalten Sie Zeitkarten bis zum Ende ihrer Gültigkeit und reichen Sie Kopien ein, wenn Sie mehrere Fälle sammeln.' },
      { q: 'Ich habe zwei getrennte Fahrkarten und den Anschluss verpasst. Was gilt?', a: 'Ohne Durchgangsfahrkarte werden die Fahrten einzeln betrachtet. Die erste Fahrt wird nach ihrer eigenen Verspätung entschädigt; für die zweite, die Sie verpasst haben, gibt es keine Entschädigung, es sei denn, die Fahrkarten wurden als eine Reise verkauft. Beim Kauf auf eine Gesamtfahrkarte achten lohnt sich.' },
    ],
    body: (h) => `
<h2>Die Angaben, Feld für Feld</h2>
${h.table(['Feld', 'Was hineingehört', 'Häufiger Fehler'], [
  ['Fahrkarte', 'Auftragsnummer oder Original bzw. Kopie', 'Rückfahrt statt betroffener Richtung angegeben'],
  ['Reisedatum und Zielbahnhof', 'wie auf der Fahrkarte', 'Umstiegsbahnhof statt Ziel eingetragen'],
  ['Planmäßige Ankunft', 'laut Fahrplan bei Reiseantritt', 'Zeit aus einer späteren Umplanung'],
  ['Tatsächliche Ankunft', 'Ankunft am Zielbahnhof', 'Ankunft des ersten verspäteten Zuges'],
  ['Zugnummern', 'alle genutzten Züge', 'Anschlusszug fehlt'],
  ['Auslagen', 'Taxi, Hotel, Aufpreis, mit Quittung', 'Beleg ohne Datum oder Uhrzeit'],
  ['Auszahlung', 'Überweisung oder Gutschein', 'kein Feld angekreuzt'],
], 'Fahrgastrechte-Antrag der DB, Stand der Hinweise vom Abruftag', ['l', 'l', 'l'])}
<p>Online ist der Antrag am schnellsten, weil die Bahn Fahrkarte und Verspätung automatisch abgleicht. Das PDF-Formular verlinkt die DB auf ihrer ${h.src('db-rules', 'Seite zu den Fahrgastrechten')}; ausgefüllt geben Sie es im Reisezentrum ab oder schicken es an das Servicecenter Fahrgastrechte.</p>
${h.mini('rail', { d: { f: 89.9, m: 135 }, t: 'Vor dem Antrag: Betrag prüfen' })}
<h2>Zeitkarten und Deutschlandticket</h2>
<p>Bei Zeitkarten lohnt sich das Sammeln. Notieren Sie für jede Fahrt mit mindestens 60 Minuten Verspätung Datum, Züge und Zeiten und reichen Sie die Fälle innerhalb der Gültigkeit gemeinsam ein. Die Pauschale beträgt im Nahverkehr ${h.eur(h.P.rail_de.season.nah2, 2)} je Fall in der 2. Klasse; erst ab drei Fällen wird die Auszahlungsgrenze von ${h.eur(h.P.rail_de.min_payout_eur)} erreicht. Die Höhe der Pauschalen erklärt die Seite ${h.a('bahn', 'Fahrgastrechte Bahn')}.</p>
<h2>Andere Bahnen und Auslandsfahrkarten</h2>
<p>Zuständig ist immer das Unternehmen, das die Fahrkarte ausgegeben hat. Eine Fahrkarte eines Verkehrsverbunds oder einer privaten Bahn reichen Sie dort ein. Für grenzüberschreitende Fahrten gilt dasselbe: Hat eine ausländische Bahn die Fahrkarte verkauft, bearbeitet sie den Antrag; die DB leitet falsch adressierte Anträge weiter, was Wochen kosten kann. Rechtsgrundlage ist Art. 19 der ${h.src('rail2021', 'Verordnung (EU) 2021/782')}, in Deutschland ergänzt durch die ${h.src('evo', 'Eisenbahn-Verkehrsordnung')}.</p>
<h2>Frist, Auszahlung, Schlichtung</h2>
<p>Die Verordnung nennt drei Monate nach der Fahrt; die DB nimmt nach eigener Aussage derzeit auch spätere Anträge an. Die Zahlung ist binnen eines Monats fällig. Bei einer Ablehnung oder ausbleibender Antwort wenden Sie sich an die ${h.src('soep', 'söp')}, die für Fahrgäste kostenlos schlichtet. Wie lange Ansprüche danach noch durchsetzbar sind, steht unter ${h.a('verjaehrung', 'Fristen')}.</p>
`,
  },
  en: {
    slug: 'german-rail-compensation-form',
    nav: 'German rail claim form', card: 'Online or on paper: what details Deutsche Bahn needs, where the claim goes and what applies to international tickets.',
    title: 'DB compensation form: how to claim for a delayed train',
    description: 'German rail compensation form (Fahrgastrechte): online or paper, the times and receipts needed, season tickets, international tickets, three-month deadline.',
    h1: 'German rail claim form: filing for a delayed train the right way',
    intro: 'The form is short, but a wrong time or a missing receipt can delay it by weeks. Here is how to get it through first time.',
    resume: 'Compensation, refunds and taxi or hotel costs are claimed from the company that issued your ticket. With Deutsche Bahn that means online through your account or the app, at a travel centre, or with the passenger rights form (Fahrgastrechte-Formular) that DB publishes as a PDF. You need the ticket or its order number, the travel date, the destination station, the scheduled and actual arrival times and the train numbers, including the connecting train if you missed one. Attach receipts for expenses. Season ticket holders collect cases within the ticket’s validity and submit them together, because amounts under €4 are not paid out. If a foreign railway issued a cross-border ticket, that railway is responsible; DB otherwise forwards claims, which takes time. The regulation provides three months after the journey, and payment must follow within one month. If the railway refuses, the söp arbitration body handles the case free of charge.',
    faqs: [
      { q: 'Which arrival time do I enter?', a: 'The actual arrival at the destination station on your ticket, not the arrival of the first late train. If you changed plans on the way, what counts is when you reached your destination. A photo of the departure board or a screenshot of the app with the time helps if the railway’s data show a different time.' },
      { q: 'Can one form cover several passengers?', a: 'Yes, if everyone travels on one ticket or one booking; the fare is then the total for all. With separate tickets, file one claim per ticket. Children travelling free give no compensation, because no fare was paid for them, and the amount is always worked out on the price actually paid.' },
      { q: 'What happens to my original ticket?', a: 'For paper tickets the railway usually asks for the original or a copy, depending on how you file; for online tickets the order number is enough. Keep season tickets until they expire and submit copies when you collect several cases on them over a month or a year.' },
      { q: 'I had two separate tickets and missed the connection. What applies?', a: 'Without a through ticket, each journey is assessed on its own. The first is compensated for its own delay; the missed second journey gives no compensation unless the tickets were sold as a single trip. Buying one ticket for the whole route is worth it when you have the choice.' },
    ],
    body: (h) => `
<h2>The form, field by field</h2>
${h.table(['Field', 'What goes in', 'Common mistake'], [
  ['Ticket', 'order number, or original or copy', 'return direction entered instead of the delayed one'],
  ['Date and destination', 'as printed on the ticket', 'a change station instead of the destination'],
  ['Scheduled arrival', 'timetable at the start of the trip', 'a time from a later replanned journey'],
  ['Actual arrival', 'arrival at the destination station', 'arrival of the first late train'],
  ['Train numbers', 'every train used', 'connecting train missing'],
  ['Expenses', 'taxi, hotel, supplement, with receipts', 'receipt without date or time'],
  ['Payment', 'bank transfer or voucher', 'no box ticked'],
], 'Deutsche Bahn passenger rights claim, guidance as of the retrieval date', ['l', 'l', 'l'])}
<p>Online is fastest, because the railway matches ticket and delay automatically. DB links the PDF form on its ${h.src('db-rules', 'passenger rights page')}; once completed, hand it in at a travel centre or post it to the passenger rights service centre (Servicecenter Fahrgastrechte).</p>
${h.mini('rail', { d: { f: 89.9, m: 135 }, t: 'Before you file: check the amount' })}
<h2>Season tickets and the Deutschlandticket</h2>
<p>With season tickets, collecting pays. For every trip at least 60 minutes late, note the date, trains and times, and submit the cases together within the ticket’s validity. On local transport the flat amount is ${h.eur(h.P.rail_de.season.nah2, 2)} per case in second class, so three cases are needed to reach the ${h.eur(h.P.rail_de.min_payout_eur)} payout threshold. The amounts are on the ${h.a('bahn', 'train delay compensation')} page.</p>
<h2>Other railways and international tickets</h2>
<p>The company that issued the ticket is always the one to claim from. A ticket from a regional transport association or a private railway goes to that company. Cross-border trips follow the same rule: if a foreign railway sold the ticket, it handles the claim; DB forwards misdirected claims, which can take weeks. The legal basis is Article 19 of ${h.src('rail2021', 'Regulation (EU) 2021/782')}, supplemented in Germany by the ${h.src('evo', 'Railway Traffic Regulations')}.</p>
<h2>Deadline, payment, arbitration</h2>
<p>The regulation sets three months after the journey; DB says it currently accepts later claims too. Payment is due within one month. After a refusal or no answer, turn to the ${h.src('soep', 'söp')}, which arbitrates free of charge for passengers. How long claims remain enforceable after that is covered under ${h.a('verjaehrung', 'deadlines')}.</p>
`,
  },
});
