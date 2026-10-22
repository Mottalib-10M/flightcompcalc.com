import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'ca-annulation', group: 'ca', order: 420,
  tool: 'flight', toolArg: { from: 'YUL', to: 'YYC', event: 'cancel', delay: 420, carrier: 'ca', cause: 'airline', notice: 2, advanced: true },
  related: ['ca', 'appr', 'ca-plainte', 'yul', 'yyc'],
  sources: ['appr', 'cta-deadlines', 'cta-act'],
  en: {
    slug: 'flight-cancellation-denied-boarding-canada',
    nav: 'Cancelled flight and denied boarding in Canada', card: 'Notice of 14 days, rebooking deadlines and the $900 to $2,400 denied boarding scale.',
    title: 'Cancelled flight in Canada: APPR rights and compensation',
    description: 'Cancelled flight or denied boarding in Canada: the 14-day notice rule, rebooking within 9 or 48 hours, refund options, and $900 to $2,400 when you are bumped.',
    h1: 'Cancelled flight or denied boarding in Canada',
    intro: 'Two situations, two scales: a cancellation pays like a delay, being bumped from a full flight pays far more and within 48 hours.',
    resume: 'Under the Air Passenger Protection Regulations, a cancellation within the airline’s control that you learn about 14 days or less before departure gives the same compensation as a delay, measured by how late you reach your destination on the replacement flight: $400, $700 or $1,000 from a large carrier, $125, $250 or $500 from a small one, or a flat $400 or $125 if you choose a refund instead. Denied boarding follows a separate, higher scale that does not depend on carrier size: $900 if you arrive less than six hours late, $1,800 from six to nine hours, $2,400 beyond, to be paid no later than 48 hours after you were refused. Before refusing anyone, the airline must ask for volunteers. In every category, including weather and strikes, the airline still has to rebook you, first on its own or a partner’s flights, then on any carrier, or refund the unused ticket if the new plan does not meet your needs.',
    faqs: [
      { q: 'My flight was cancelled three weeks ahead. Is anything owed?', a: 'No compensation, because the notice was more than 14 days. You are still entitled to alternate travel arrangements or, if they do not meet your needs, a refund of the unused part of the ticket. Check the new times carefully: if the replacement leaves much earlier or arrives much later, a refund may be the better choice.' },
      { q: 'How fast must denied boarding compensation be paid?', a: 'As soon as operationally feasible and no later than 48 hours after the denial of boarding, under section 20. If the arrival time of the replacement flight is not known when you are paid, the airline pays on the basis of the expected delay and must adjust the amount if the actual arrival is later.' },
      { q: 'Is a downgrade or a seat change denied boarding?', a: 'No. Denied boarding means you were not allowed to occupy a seat because the flight had fewer seats than checked-in passengers holding confirmed reservations and valid documents who showed up at the gate on time. Being moved to another seat or another cabin is handled under the airline’s tariff, which sets the refund of the fare difference.' },
      { q: 'Can I refuse the new flight and still be compensated?', a: 'Yes. If the alternate arrangements do not suit you and the ticket is refunded, a large carrier owes a flat $400 and a small carrier $125 for a cancellation within its control. If your trip no longer has a purpose and you are mid-journey, the airline must also fly you back to your origin free of charge.' },
    ],
    body: (h) => `
<h2>Cancellation: what the notice changes</h2>
<p>The 14-day line is the first thing to check. Told more than 14 days before departure, you get rebooking or a refund but no compensation. Told 14 days or less before, and the cause is within the airline’s control and not required for safety, the compensation depends on your arrival at the destination on your ticket. The calculator above is set to a Montréal to Calgary flight cancelled two days ahead, reaching Calgary seven hours late on the replacement: ${h.cad(h.P.appr.delay.large[1])} from a large carrier.</p>
${h.mini('appr', { d: { h: 4, s: 0 }, t: 'Cancellation: amount by delay on the replacement flight' })}
<h2>Rebooking deadlines</h2>
<p>For a cancellation within the airline’s control, a large carrier must first offer the next available flight on its own network or a partner’s, on a reasonable route, leaving within nine hours of the original departure time. If it cannot, it must book you on any carrier, including from a nearby airport. For a cancellation outside its control, the first window is 48 hours. A small carrier has lighter obligations: its own or partner flights first.</p>
<h2>Denied boarding: a separate scale</h2>
${h.table(['Arrival delay at destination', 'Compensation', 'Payment deadline'], [
  ['Under 6 h', h.cad(h.P.appr.denied_boarding.amounts[0]), '48 h'],
  ['6 h to under 9 h', h.cad(h.P.appr.denied_boarding.amounts[1]), '48 h'],
  ['9 h or more', h.cad(h.P.appr.denied_boarding.amounts[2]), '48 h'],
], 'Section 20 of the Air Passenger Protection Regulations, denial of boarding within the carrier’s control', ['l', 'r', 'r'])}
<p>The airline has to look for volunteers first and agree in writing on what they receive. Passengers who are refused against their will must get the reason in writing, the scale above and, depending on the category, rebooking and care. If you volunteered and accepted a voucher, you cannot later claim the involuntary amounts.</p>
<h2>Flights leaving Europe</h2>
<p>On a cancelled flight from the European Union to Canada, the ${h.src('eu261', 'EU regulation')} may give more: ${h.eur(h.P.eu261.amounts[2])} for Paris to Toronto, ${h.km('CDG', 'YYZ')}, with no compensation if you were told at least 14 days ahead. You can rely on one regime or the other, but not be paid twice for the same event (${h.src('cta-act', 'section 86.11(3)')}).</p>
`,
  },
  fr: {
    slug: 'vol-annule-refus-embarquement-canada',
    nav: 'Vol annulé et refus d’embarquement', card: 'Préavis de 14 jours, délais de réacheminement, 900 $ à 2 400 $ en cas de surréservation.',
    title: 'Vol annulé au Canada : indemnité et réacheminement (RPPA)',
    description: 'Vol annulé ou refus d’embarquement au Canada : règle des 14 jours, réacheminement dans les 9 ou 48 heures, remboursement, 900 $ à 2 400 $ si vous êtes refusé.',
    h1: 'Vol annulé ou refus d’embarquement au Canada',
    intro: 'Deux situations, deux barèmes : l’annulation se paie comme un retard, le refus d’embarquement rapporte beaucoup plus, et dans les 48 heures.',
    resume: 'Selon le Règlement sur la protection des passagers aériens, une annulation qui relève du transporteur et qui vous est annoncée 14 jours ou moins avant le départ donne la même indemnité qu’un retard, calculée sur l’heure d’arrivée du vol de remplacement à la destination du billet : 400 $, 700 $ ou 1 000 $ pour un gros transporteur, 125 $, 250 $ ou 500 $ pour un petit, ou un montant forfaitaire de 400 $ ou 125 $ si vous choisissez le remboursement. Le refus d’embarquement suit un barème distinct, plus élevé, qui ne dépend pas de la taille du transporteur : 900 $ si vous arrivez avec moins de six heures de retard, 1 800 $ de six à neuf heures, 2 400 $ au-delà, à verser au plus tard 48 heures après le refus. Avant de refuser qui que ce soit, la compagnie doit chercher des volontaires. Dans tous les cas, même pour la météo ou une grève, elle doit vous réacheminer ou rembourser la partie inutilisée du billet si le nouvel itinéraire ne répond pas à vos besoins.',
    faqs: [
      { q: 'Mon vol a été annulé trois semaines avant. Ai-je droit à quelque chose ?', a: 'Pas à une indemnité, puisque le préavis dépasse 14 jours. Vous avez toutefois droit à un autre itinéraire ou, s’il ne vous convient pas, au remboursement de la partie non utilisée du billet. Regardez bien les nouveaux horaires : si le remplacement part beaucoup plus tôt ou arrive bien plus tard, le remboursement peut être le meilleur choix.' },
      { q: 'Dans quel délai l’indemnité de refus d’embarquement est-elle versée ?', a: 'Dès que possible et au plus tard 48 heures après le refus, selon l’article 20. Si l’heure d’arrivée du vol de remplacement n’est pas encore connue au moment du paiement, la compagnie paie selon le retard prévu et doit compléter le montant si l’arrivée réelle est plus tardive.' },
      { q: 'Un changement de siège est-il un refus d’embarquement ?', a: 'Non. Il y a refus d’embarquement quand on ne vous laisse pas occuper un siège parce que le vol compte moins de places que de passagers enregistrés à temps, munis d’une réservation confirmée et de documents valides, et présents à la porte. Un déclassement ou un changement de siège relève du tarif de la compagnie.' },
      { q: 'Puis-je refuser le vol de remplacement et être indemnisé ?', a: 'Oui. Si l’itinéraire proposé ne vous convient pas et que le billet est remboursé, un gros transporteur doit 400 $ et un petit 125 $ pour une annulation sous son contrôle. Si votre voyage n’a plus de raison d’être et que vous êtes en cours de trajet, la compagnie doit aussi vous ramener gratuitement à votre point de départ.' },
    ],
    body: (h) => `
<h2>Annulation : tout dépend du préavis</h2>
<p>La limite des 14 jours se vérifie en premier. Prévenu plus de 14 jours avant le départ, vous avez droit à un autre vol ou au remboursement, sans indemnité. Prévenu 14 jours ou moins avant, pour une cause qui relève du transporteur et qui n’est pas liée à la sécurité, l’indemnité dépend de votre arrivée à la destination du billet. Le calculateur ci-dessus montre un vol Montréal–Calgary annulé deux jours avant, avec une arrivée à Calgary sept heures plus tard : ${h.cad(h.P.appr.delay.large[1])} pour un gros transporteur.</p>
${h.mini('appr', { d: { h: 4, s: 1 }, t: 'Annulation : montant selon le retard du vol de remplacement' })}
<h2>Les délais de réacheminement</h2>
<p>Pour une annulation sous son contrôle, un gros transporteur doit d’abord proposer le prochain vol disponible sur son réseau ou celui d’un partenaire, sur un itinéraire raisonnable, partant dans les neuf heures suivant l’heure de départ prévue. À défaut, il doit vous placer sur un vol de toute autre compagnie, y compris depuis un aéroport voisin. Pour une annulation hors de son contrôle, la première fenêtre est de 48 heures. Un petit transporteur a des obligations plus légères : ses vols ou ceux de ses partenaires d’abord.</p>
<h2>Refus d’embarquement : un barème à part</h2>
${h.table(['Retard à destination', 'Indemnité', 'Délai de paiement'], [
  ['Moins de 6 h', h.cad(h.P.appr.denied_boarding.amounts[0]), '48 h'],
  ['6 h à moins de 9 h', h.cad(h.P.appr.denied_boarding.amounts[1]), '48 h'],
  ['9 h ou plus', h.cad(h.P.appr.denied_boarding.amounts[2]), '48 h'],
], 'Article 20 du Règlement, refus d’embarquement sous le contrôle du transporteur', ['l', 'r', 'r'])}
<p>La compagnie doit d’abord chercher des volontaires et convenir par écrit de ce qu’ils reçoivent. Le passager refusé contre son gré reçoit par écrit le motif, le barème ci-dessus et, selon la catégorie, un réacheminement et une prise en charge. Si vous vous êtes porté volontaire contre un bon de voyage, vous ne pouvez plus réclamer les montants prévus pour un refus involontaire.</p>
<h2>Vols au départ de l’Europe</h2>
<p>Pour un vol annulé de l’Union européenne vers le Canada, le ${h.src('eu261', 'règlement européen')} peut donner davantage : ${h.eur(h.P.eu261.amounts[2])} pour Paris–Toronto, ${h.km('CDG', 'YYZ')}, rien si vous avez été prévenu au moins 14 jours avant. Vous pouvez invoquer l’un ou l’autre régime, sans être payé deux fois pour le même événement (${h.src('cta-act', 'paragraphe 86.11(3)')}).</p>
`,
  },
});
