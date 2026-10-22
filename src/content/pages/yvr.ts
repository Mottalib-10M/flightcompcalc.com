import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'yvr', group: 'ca', order: 470,
  tool: 'flight', toolArg: { from: 'YVR', to: 'NRT', delay: 600, carrier: 'ca', cause: 'airline' },
  related: ['ca', 'appr', 'yyc', 'yyz', 'ca-plainte'],
  sources: ['appr', 'cta-deadlines', 'cta-act'],
  en: {
    slug: 'vancouver-flight-delay-compensation',
    nav: 'Vancouver (YVR)', card: 'Pacific long haul, US transborder flights and fog: the APPR from Vancouver.',
    title: 'Vancouver flight delay compensation: YVR, Asia and the US',
    description: 'Vancouver (YVR) flight delayed or cancelled: APPR compensation on Pacific long haul and US transborder flights, and why the nine-hour band matters most.',
    h1: 'Vancouver: delays on Pacific, transborder and domestic flights',
    intro: 'From Vancouver the longest flights and the shortest pay the same: what moves the amount is how many hours you lose at the other end.',
    resume: 'Every flight from or to Vancouver International is covered by the Air Passenger Protection Regulations, including a flight to Tokyo on a Japanese airline and a hop to Seattle on an American one. Compensation needs a delay of at least three hours at the destination on your ticket, for a cause within the airline’s control that is not required for safety. Because the Canadian scale ignores distance, the nine-hour band matters most on long haul: a Pacific flight that leaves a day late after a crew shortage reaches the top amount of $1,000 from a large carrier, where a three-hour slip on the same route pays $400. On transborder flights the APPR is the only compensation rule in play, in both directions, because the United States has no equivalent for delays. Fog and Pacific storms are outside the airline’s control: no compensation then, but rebooking within 48 hours on the airline or a partner remains owed, then on any carrier.',
    faqs: [
      { q: 'Is a flight from Vancouver to Seattle covered?', a: 'Yes. The Regulations apply to flights to, from and within Canada, so a transborder flight is covered in both directions whatever the airline. With no federal US compensation rule for delays, the APPR is the only scale available: $400 to $1,000 from a large carrier for three to nine hours or more, if the cause was within the airline’s control.' },
      { q: 'My flight to Asia left the next day. Do I get the top amount?', a: 'If you reached the destination nine hours or more late and the cause was within the airline’s control and not safety-related, a large carrier owes $1,000. A crew rest problem or an aircraft swap for commercial reasons fall in that category. A mechanical fault found before departure is usually treated as safety: rebooking and care, no compensation.' },
      { q: 'Who counts as a large carrier on Pacific routes?', a: 'Any airline that carried two million passengers or more worldwide in each of the two previous calendar years. The major Asian and North American airlines meet that test easily. The calculator assumes a large carrier unless you choose otherwise in the options, because that is the usual case on long haul.' },
      { q: 'Do I need to claim before leaving Vancouver?', a: 'No. You have until the first anniversary of the flight to send your request in writing. Note the cause given at the airport, the actual arrival time and keep the boarding pass: they are enough to write the claim later. For bags, the deadlines are much shorter: seven days for damage, 21 days for a delay.' },
    ],
    body: (h) => `
<h2>Distance does not move the Canadian amount</h2>
${h.table(['From Vancouver to', 'Distance', '3 h late', '9 h late'], ['SEA', 'YYC', 'YYZ', 'LAX', 'NRT', 'HKG', 'SYD'].map((c) => [h.ap(c), h.km('YVR', c), h.cad(h.P.appr.delay.large[0]), h.cad(h.P.appr.delay.large[2])]), 'APPR, large carrier, cause within its control and not required for safety', ['l', 'r', 'r', 'r'])}
<p>The seven routes above span from under 200 kilometres to more than 12,000, and the payment is identical. This is the opposite of the European logic, where distance alone sets the amount. On a long-haul route, the point to watch is therefore the nine-hour line, not the three-hour one.</p>
${h.mini('appr', { d: { h: 9, s: 0 }, t: 'Vancouver: the nine-hour band' })}
<h2>Transborder flights: one regime only</h2>
<p>Seattle, Los Angeles, San Francisco: on these flights the APPR applies on the way out and on the way back. If the airline cancels for a reason within its control and you take a refund rather than a new flight, the flat amount is ${h.cad(h.P.appr.refund_instead.large)} from a large carrier.</p>
${h.mini('route', { from: 'YVR', to: ['SEA', 'LAX', 'SFO', 'YYZ', 'NRT', 'LHR'] })}
<h2>Fog, storms and the knock-on rule</h2>
<p>Weather that makes the flight unsafe is outside the airline’s control under section 10 of the ${h.src('appr', 'Regulations')}. A later flight delayed by that earlier disruption also counts as outside its control, but only if the airline took all reasonable measures to limit the knock-on effects. If your evening departure is blamed on morning fog while the airline had hours to bring in another aircraft or crew, that condition is worth questioning in your written request; the ${h.src('cta-deadlines', 'Agency’s guidance')} explains the 30-day wait before a complaint.</p>
`,
  },
  fr: {
    slug: 'aeroport-vancouver-retard',
    nav: 'Vancouver (YVR)', card: 'Long-courriers du Pacifique, vols transfrontaliers et brouillard : le RPPA depuis Vancouver.',
    title: 'Retard de vol à Vancouver (YVR) : indemnité RPPA, Asie, USA',
    description: 'Vol retardé ou annulé à Vancouver (YVR) : indemnité du RPPA sur les vols du Pacifique et vers les États-Unis, et pourquoi le palier de neuf heures compte.',
    h1: 'Vancouver : retards sur les vols du Pacifique, transfrontaliers et intérieurs',
    intro: 'Depuis Vancouver, le plus long vol et le plus court paient la même chose : seul compte le nombre d’heures perdues à l’arrivée.',
    resume: 'Tout vol au départ ou à destination de l’aéroport international de Vancouver relève du Règlement sur la protection des passagers aériens, y compris un vol vers Tokyo sur une compagnie japonaise ou un saut vers Seattle sur une compagnie américaine. L’indemnité exige un retard d’au moins trois heures à la destination du billet, pour une cause sous le contrôle du transporteur et sans lien avec la sécurité. Comme le barème canadien ignore la distance, le palier de neuf heures pèse surtout sur les long-courriers : un vol vers l’Asie qui part le lendemain à cause d’un manque d’équipage atteint le montant maximal de 1 000 $ d’un gros transporteur, alors qu’un retard de trois heures sur le même trajet donne 400 $. Sur les vols transfrontaliers, le RPPA est la seule règle d’indemnisation, dans les deux sens, car les États-Unis n’ont pas d’équivalent pour les retards. Le brouillard et les tempêtes du Pacifique sont hors du contrôle du transporteur : pas d’indemnité, mais un réacheminement reste dû.',
    faqs: [
      { q: 'Un vol Vancouver–Seattle est-il couvert ?', a: 'Oui. Le Règlement vise les vols à destination, en provenance ou à l’intérieur du Canada : un vol transfrontalier est couvert dans les deux sens, quelle que soit la compagnie. Faute de règle fédérale américaine d’indemnisation des retards, le RPPA est le seul barème : 400 $ à 1 000 $ d’un gros transporteur si la cause relevait de lui.' },
      { q: 'Mon vol pour l’Asie est parti le lendemain. Ai-je droit au maximum ?', a: 'Si vous êtes arrivé avec neuf heures de retard ou plus et que la cause relevait de la compagnie sans lien avec la sécurité, un gros transporteur doit 1 000 $. Un problème de repos d’équipage ou un changement d’appareil pour raison commerciale entrent dans cette catégorie ; une panne constatée avant le départ est en général traitée comme un motif de sécurité.' },
      { q: 'Qui est un gros transporteur sur les lignes du Pacifique ?', a: 'Toute compagnie qui a transporté au moins deux millions de passagers dans le monde au cours de chacune des deux années civiles précédentes. Les grandes compagnies asiatiques et nord-américaines remplissent ce critère sans peine. Le calculateur suppose un gros transporteur, sauf si vous changez l’option, car c’est le cas habituel sur les long-courriers.' },
      { q: 'Dois-je réclamer avant de quitter Vancouver ?', a: 'Non. Vous avez jusqu’au premier anniversaire du vol pour envoyer votre demande écrite. Notez la cause donnée à l’aéroport et l’heure réelle d’arrivée, gardez la carte d’embarquement : cela suffit pour écrire plus tard. Pour les bagages, les délais sont bien plus courts : sept jours pour un dommage, 21 jours pour un retard.' },
    ],
    body: (h) => `
<h2>La distance ne change pas le montant canadien</h2>
${h.table(['De Vancouver à', 'Distance', '3 h de retard', '9 h de retard'], ['SEA', 'YYC', 'YUL', 'LAX', 'NRT', 'HKG', 'SYD'].map((c) => [h.ap(c), h.km('YVR', c), h.cad(h.P.appr.delay.large[0]), h.cad(h.P.appr.delay.large[2])]), 'RPPA, gros transporteur, cause sous son contrôle et sans lien avec la sécurité', ['l', 'r', 'r', 'r'])}
<p>Ces sept trajets vont de moins de 200 kilomètres à plus de 12 000, et le paiement est le même. C’est l’inverse de la logique européenne, où la distance fixe seule le montant. Sur un long-courrier, la limite à surveiller est donc celle des neuf heures, pas celle des trois heures.</p>
${h.mini('appr', { d: { h: 9, s: 0 }, t: 'Vancouver : le palier de neuf heures' })}
<h2>Vols transfrontaliers : un seul régime</h2>
<p>Seattle, Los Angeles, San Francisco : sur ces vols, le RPPA s’applique à l’aller comme au retour. Si la compagnie annule pour une cause qui relève d’elle et que vous choisissez le remboursement plutôt qu’un autre vol, le montant forfaitaire est de ${h.cad(h.P.appr.refund_instead.large)} pour un gros transporteur.</p>
${h.mini('route', { from: 'YVR', to: ['SEA', 'LAX', 'SFO', 'YUL', 'NRT', 'CDG'] })}
<h2>Brouillard, tempêtes et retards en cascade</h2>
<p>Une météo qui rend le vol dangereux est hors du contrôle du transporteur selon l’article 10 du ${h.src('appr', 'Règlement')}. Un vol plus tardif retardé par cette perturbation l’est aussi, mais seulement si la compagnie a pris toutes les mesures raisonnables pour en limiter les effets. Si votre départ du soir est imputé au brouillard du matin alors que la compagnie avait des heures pour trouver un autre appareil ou un autre équipage, cette condition mérite d’être soulevée dans votre demande ; les ${h.src('cta-deadlines', 'consignes de l’Office')} précisent l’attente de 30 jours avant une plainte.</p>
`,
  },
});
