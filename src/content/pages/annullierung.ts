import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'annullierung', group: 'flug', order: 30,
  tool: 'flight', toolArg: { from: 'HAM', to: 'LIS', event: 'cancel', delay: 150, cause: 'airline', carrier: 'eu', advanced: true, notice: 9 },
  related: ['fluggastrechte', 'drei-stunden', 'streik', 'reform', 'schlichtung'],
  sources: ['eu261', 'eu2202', 'caa-cancel', 'uk261'],
  de: {
    slug: 'flug-annulliert-entschaedigung',
    nav: 'Flug annulliert', card: 'Wann eine Absage Geld bringt, wie Vorwarnzeit und Ersatzflug zusammenwirken, Erstattung in sieben Tagen.',
    title: 'Flug annulliert: Entschädigung, Ersatzflug und Erstattung',
    description: 'Flug annulliert: Entschädigung 250 bis 600 €, wann 14 oder 7 Tage Vorwarnung sie ausschließen, Ersatzflug oder Erstattung binnen 7 Tagen, alte und neue Regeln.',
    h1: 'Flug annulliert: was die Airline schuldet, wenn sie absagt',
    intro: 'Bei einer Annullierung zählen drei Daten: wann Sie davon erfahren haben, wann der Ersatzflug startet und wann er ankommt.',
    resume: 'Sagt die Airline Ihren Flug ab, schuldet sie nach Art. 5 und 7 der Verordnung (EG) Nr. 261/2004 dieselbe Ausgleichszahlung wie bei einer langen Verspätung: 250 € bis 1 500 km, 400 € bis 3 500 km oder innerhalb der EU, 600 € darüber. Die Zahlung entfällt, wenn Sie mindestens 14 Tage vorher informiert wurden. Bei einer Mitteilung 7 bis 14 Tage vorher entfällt sie nur, wenn der angebotene Ersatzflug höchstens zwei Stunden früher startet und weniger als vier Stunden später ankommt; bei weniger als 7 Tagen sind es eine Stunde früher und weniger als zwei Stunden später. Unabhängig davon haben Sie die Wahl zwischen Erstattung des Ticketpreises binnen sieben Tagen und einer Beförderung zum Ziel. Die Airline muss beweisen, dass und wann sie Sie informiert hat. Für Flüge ab dem 23. Oktober 2027 fällt die Zwischenstufe weg: Unter 14 Tagen Vorwarnung zählt nur noch ein Ersatzflug, der höchstens eine Stunde früher abfliegt und weniger als zwei Stunden später ankommt.',
    faqs: [
      { q: 'Die Airline hat mir die Absage nur per App geschickt. Zählt das?', a: 'Entscheidend ist, dass Sie die Information tatsächlich erhalten haben und die Airline das beweisen kann. Eine Nachricht, die nur in einer App liegt, die Sie nicht geöffnet haben, ist ein schwacher Nachweis. Haben Sie über ein Reisebüro gebucht und hat die Airline nur das Reisebüro informiert, gilt die Mitteilung nach der Rechtsprechung des Gerichtshofs als nicht erfolgt, wenn sie Sie nicht erreicht hat.' },
      { q: 'Ich habe die Erstattung gewählt. Bekomme ich trotzdem die Ausgleichszahlung?', a: 'Ja, beide Ansprüche stehen nebeneinander. Die Erstattung nach Art. 8 ersetzt Ihren Ticketpreis, die Ausgleichszahlung nach Art. 7 entschädigt für die Unannehmlichkeit. Wer die Erstattung wählt, hat allerdings keinen Anspruch mehr auf eine Weiterbeförderung oder auf Hotel und Verpflegung, weil die Reise mit dieser Wahl beendet ist.' },
      { q: 'Mein Flug wurde nur um sechs Stunden vorverlegt. Ist das eine Annullierung?', a: 'Eine erhebliche Vorverlegung kann nach der Rechtsprechung des Gerichtshofs wie eine Annullierung behandelt werden, denn der ursprünglich gebuchte Flug findet so nicht statt. Für die Ausgleichszahlung zählen dann dieselben Fristen und Grenzen wie bei einer Absage. Prüfen Sie im Rechner mit den erweiterten Angaben, wie früher der Ersatz startete.' },
      { q: 'Was zahlt die Airline, wenn ich mir selbst einen anderen Flug kaufe?', a: 'Nach heutiger Rechtslage müssen Sie zuerst das Angebot der Airline abwarten oder einfordern; bleibt sie untätig, können Sie die Mehrkosten eines selbst gebuchten Flugs als Schaden geltend machen. Ab Oktober 2027 regelt die neue Fassung das ausdrücklich: Bietet die Airline innerhalb von drei Stunden keine Lösung an, dürfen Sie selbst umbuchen, mit einer Obergrenze von 400 % des Ticketpreises.' },
      { q: 'Wie schnell muss die Erstattung kommen?', a: 'Binnen sieben Tagen, so steht es in Art. 8 und daran ändert die Reform nichts. Die Frist läuft ab Ihrer Wahl, nicht ab dem Ende der Reise. Zahlt die Airline nur einen Gutschein aus, obwohl Sie Geld verlangt haben, müssen Sie das nicht hinnehmen: Ein Gutschein setzt Ihr schriftliches Einverständnis voraus.' },
    ],
    body: (h) => {
      const E = h.P.eu261, N = h.P.eu261_2027;
      return `
<h2>Das Beispiel im Rechner</h2>
<p>Oben ist Hamburg nach Lissabon eingestellt, ${h.km('HAM', 'LIS')}, also die mittlere Stufe mit ${h.eur(E.amounts[1])}. Die Absage kam neun Tage vor dem Abflug, der Ersatzflug landet zwei Stunden und dreißig Minuten später als geplant. Weil die Mitteilung zwischen 7 und 14 Tagen lag und der Ersatz weniger als vier Stunden später ankam, entfällt die Zahlung. Hätte die Airline nur fünf Tage vorher informiert, wäre die Grenze bei zwei Stunden gewesen, und dieselben zweieinhalb Stunden hätten zur Zahlung geführt, allerdings halbiert nach Art. 7 Abs. 2, weil der Ersatz höchstens drei Stunden später ankam.</p>
<h2>Die Regeln nach Vorwarnzeit</h2>
${h.table(['Mitteilung', 'Kein Geld, wenn der Ersatzflug …', 'Ab 23.10.2027'], [
  [`${E.cancel_notice_full_days} Tage oder mehr`, 'immer (Anspruch entfällt)', 'immer (Anspruch entfällt)'],
  [`${E.cancel_notice_mid_days} bis ${E.cancel_notice_full_days} Tage`, `höchstens ${E.cancel_mid_reroute.depart_earlier_max_min / 60} Std. früher startet und weniger als ${E.cancel_mid_reroute.arrive_later_max_min / 60} Std. später ankommt`, `höchstens ${N.cancel_reroute.depart_earlier_max_min / 60} Std. früher und weniger als ${N.cancel_reroute.arrive_later_max_min / 60} Std. später`],
  [`unter ${E.cancel_notice_mid_days} Tagen`, `höchstens ${E.cancel_short_reroute.depart_earlier_max_min / 60} Std. früher startet und weniger als ${E.cancel_short_reroute.arrive_later_max_min / 60} Std. später ankommt`, `höchstens ${N.cancel_reroute.depart_earlier_max_min / 60} Std. früher und weniger als ${N.cancel_reroute.arrive_later_max_min / 60} Std. später`],
], 'Art. 5 Abs. 1 Buchst. c der Verordnung (EG) Nr. 261/2004 und Fassung der Verordnung (EU) 2026/2202', ['l', 'l', 'l'])}
<p>Die Beweislast liegt bei der Airline: Sie muss zeigen, dass sie Sie informiert hat und wann (Art. 5 Abs. 4). Notieren Sie deshalb, auf welchem Weg Sie die Absage erhalten haben, und bewahren Sie E-Mails und SMS auf.</p>
${h.mini('cancel', { d: { n: 9, l: 2.5, b: 1 } })}
<h2>Erstattung oder Ersatzflug: Ihre Wahl, nicht die der Airline</h2>
<p>Art. 8 lässt Ihnen drei Möglichkeiten. Erstens die Erstattung des vollen Ticketpreises binnen sieben Tagen, für nicht angetretene Teilstrecken und, wenn die Reise ihren Sinn verloren hat, auch für bereits geflogene, dazu ein Rückflug zum Ausgangsort. Zweitens eine Beförderung zum Endziel zum frühestmöglichen Zeitpunkt unter vergleichbaren Bedingungen. Drittens eine Umbuchung auf einen späteren Termin Ihrer Wahl, solange Plätze frei sind. Bis zum Ersatzflug schuldet die Airline Betreuung: Mahlzeiten, bei Übernachtung Hotel und Transfer. Diese Pflichten bestehen auch, wenn ein Unwetter die Absage verursacht hat.</p>
<p>Ein Gutschein ist keine Erstattung. Wer Geld verlangt hat, muss sich nicht auf ein Guthaben im Kundenkonto verweisen lassen; die Verordnung erlaubt Gutscheine nur mit schriftlicher Zustimmung des Fluggasts.</p>
<h2>Wann die Absage nichts kostet</h2>
<p>Außer bei rechtzeitiger Mitteilung entfällt die Zahlung bei außergewöhnlichen Umständen, die sich auch mit zumutbaren Maßnahmen nicht hätten vermeiden lassen. Eine Absage aus „betrieblichen Gründen“, wegen Personalmangels oder eines technischen Defekts reicht dafür nach ständiger Rechtsprechung nicht. Was als außergewöhnlich gilt, steht unter ${h.a('streik', 'Streik und außergewöhnliche Umstände')}.</p>
<h2>Ab Oktober 2027</h2>
<p>Die ${h.src('eu2202', 'Verordnung (EU) 2026/2202')} vereinfacht die Staffel: Bei 14 Tagen oder mehr gibt es weiterhin nichts, darunter zählt für jeden Fall dieselbe Spanne von einer Stunde früher und weniger als zwei Stunden später. Die Airline muss außerdem eine Weiterbeförderung anbieten; bleibt sie drei Stunden lang untätig, dürfen Sie selbst buchen und bekommen die Kosten bis ${h.n(N.self_reroute_cap_pct)} % des Ticketpreises ersetzt. Der Antrag muss binnen ${N.claim_window_months} Monaten gestellt werden. Mehr unter ${h.a('reform', 'Reform 2027')}.</p>
`;
    },
  },
  en: {
    slug: 'cancelled-flight-compensation',
    nav: 'Cancelled flight', card: 'When a cancellation pays, how notice and the replacement flight interact, and the 7-day refund rule.',
    title: 'Cancelled flight compensation: notice, rerouting, refund',
    description: 'Cancelled flight compensation under EU261 and UK261: when 14 or 7 days’ notice rules it out, the replacement flight test, refunds within 7 days, and 2027 rules.',
    h1: 'Cancelled flight: what you are owed when the airline calls it off',
    intro: 'Three times decide a cancellation claim: when you were told, when the replacement leaves and when it lands.',
    resume: 'When an airline cancels your flight, Articles 5 and 7 of EU261 give you the same compensation as for a long delay: €250 up to 1,500 km, €400 up to 3,500 km or within the EU, €600 beyond; UK261 pays £220, £350 or £520 on flights it covers. Nothing is owed if you were told at least 14 days before departure. With 7 to 14 days’ notice, nothing is owed only if the replacement leaves no more than two hours early and arrives less than four hours late; with under 7 days, the limits are one hour early and less than two hours late. Separately, you choose between a refund of the ticket within seven days and rerouting to your destination, and the airline must look after you while you wait. The burden of proving when you were informed lies on the airline. For EU flights from 23 October 2027 the middle tier disappears: below 14 days, only a replacement leaving at most one hour early and arriving less than two hours late avoids compensation.',
    faqs: [
      { q: 'I was only notified through the airline’s app. Does that count?', a: 'What matters is that the notice actually reached you and that the airline can prove it. A message sitting in an app you never opened is weak evidence. If you booked through an agent and the airline only told the agent, the Court of Justice has held that this does not count as informing you unless the message was passed on in time.' },
      { q: 'If I take the refund, do I still get compensation?', a: 'Yes. The refund under Article 8 gives you back the fare; compensation under Article 7 is a flat payment for the disruption, and the two are cumulative. Choosing the refund does end the airline’s duty to get you to your destination and to provide meals or a hotel from then on, so decide before you leave the airport.' },
      { q: 'My flight was moved six hours earlier. Is that a cancellation?', a: 'A substantial rescheduling to an earlier time can be treated as a cancellation, because the flight you booked no longer takes place as booked. The notice periods and replacement limits then apply as for any cancellation. Enter the new departure time in the advanced settings of the calculator to see where you stand.' },
      { q: 'Can I book my own replacement and send the bill?', a: 'Under the current text you should first ask the airline to reroute you; if it does nothing, the extra cost can be claimed as damage. For EU flights from October 2027 the amended regulation says so expressly: if no rerouting is offered within three hours, you may book yourself, up to 400% of the original fare. UK261 has no such rule yet.' },
      { q: 'What does the UK regulator say about cancellations?', a: 'The Civil Aviation Authority applies the same notice periods and replacement limits under UK261, with compensation in pounds. You still choose between a refund and a replacement flight, and care is owed while you wait. If the airline rejects or ignores a valid claim, you can take it to the approved dispute resolution body the airline belongs to, or to the CAA itself.' },
    ],
    body: (h) => {
      const E = h.P.eu261, N = h.P.eu261_2027;
      return `
<h2>The example in the calculator</h2>
<p>The calculator is set to Hamburg to Lisbon, ${h.km('HAM', 'LIS')}, the middle band of ${h.eur(E.amounts[1])}. The airline cancelled nine days ahead and the replacement lands two and a half hours late. Because the notice fell between 7 and 14 days and the replacement arrived less than four hours late, nothing is owed. Had the warning come five days out, the limit would have been two hours, and the same two and a half hours would have triggered compensation, halved under Article 7(2) because the new arrival was within three hours of the original.</p>
<h2>The rules by notice period</h2>
${h.table(['Notice given', 'Nothing owed if the replacement…', 'EU from 23 Oct 2027'], [
  [`${E.cancel_notice_full_days} days or more`, 'always (no claim)', 'always (no claim)'],
  [`${E.cancel_notice_mid_days} to ${E.cancel_notice_full_days} days`, `leaves at most ${E.cancel_mid_reroute.depart_earlier_max_min / 60} h early and lands less than ${E.cancel_mid_reroute.arrive_later_max_min / 60} h late`, `at most ${N.cancel_reroute.depart_earlier_max_min / 60} h early, under ${N.cancel_reroute.arrive_later_max_min / 60} h late`],
  [`under ${E.cancel_notice_mid_days} days`, `leaves at most ${E.cancel_short_reroute.depart_earlier_max_min / 60} h early and lands less than ${E.cancel_short_reroute.arrive_later_max_min / 60} h late`, `at most ${N.cancel_reroute.depart_earlier_max_min / 60} h early, under ${N.cancel_reroute.arrive_later_max_min / 60} h late`],
], 'Article 5(1)(c) of EU261 (same in UK261) and the amended EU text', ['l', 'l', 'l'])}
${h.mini('cancel', { t: 'Try your own notice period', d: { n: 5, l: 2.5, b: 1 } })}
<h2>Refund or rerouting: your choice</h2>
<p>Article 8 gives you three options. A full refund of the ticket within seven days, for the unused parts and, if the trip has lost its purpose, for parts already flown, with a flight back to where you started. Rerouting to your final destination at the earliest opportunity under comparable conditions. Or rerouting on a later date that suits you, subject to seats. Until you are on your way, the airline owes care: meals and, if you have to stay overnight, a hotel and transfers. That duty applies even when bad weather caused the cancellation and no compensation is due.</p>
<p>A voucher is not a refund. If you asked for your money, you do not have to accept credit in a customer account: vouchers need your written agreement.</p>
<h2>UK flights</h2>
<p>On flights covered by ${h.src('uk261', 'UK261')} the same three tiers apply, with ${h.gbp(h.P.uk261.amounts[0])}, ${h.gbp(h.P.uk261.amounts[1])} or ${h.gbp(h.P.uk261.amounts[2])}. The ${h.src('caa-cancel', 'Civil Aviation Authority’s cancellation guidance')} reads the rules in the same way. No reform of UK261 had been adopted by October 2026, so the 2027 changes below do not apply to flights from the UK.</p>
<h2>When a cancellation costs the airline nothing</h2>
<p>Apart from timely notice, the exemption is extraordinary circumstances that could not have been avoided with all reasonable measures. “Operational reasons”, staff shortages or a routine technical fault do not meet that test under settled case law: see ${h.a('streik', 'extraordinary circumstances')}.</p>
<h2>From October 2027 in the EU</h2>
<p>${h.src('eu2202', 'Regulation (EU) 2026/2202')} keeps the 14 days but merges the lower tiers into one test: at most one hour early and less than two hours late. Airlines must offer rerouting; if they do nothing for three hours, you may book yourself and recover up to ${h.n(N.self_reroute_cap_pct)}% of the fare. Claims must be filed within ${N.claim_window_months} months. Details: ${h.a('reform', 'EU261 reform 2027')}.</p>
`;
    },
  },
});
