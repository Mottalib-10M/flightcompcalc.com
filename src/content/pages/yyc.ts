import { definePage } from '../../lib/page-types';

const ROUTES = ['YEG', 'YVR', 'YYZ', 'YHZ', 'PHX', 'LAS', 'CUN', 'LHR'];

export default definePage({
  id: 'yyc', group: 'ca', order: 480,
  tool: 'flight', toolArg: { from: 'YYC', to: 'YYZ', delay: 400, carrier: 'ca', cause: 'airline', size: 'small' },
  related: ['ca', 'appr', 'yvr', 'ca-annulation', 'ca-plainte'],
  sources: ['appr', 'uk261', 'cta-deadlines', 'cta-act'],
  en: {
    slug: 'calgary-flight-delay-compensation',
    nav: 'Calgary (YYC)', card: 'Large or small carrier, winter domestic flights and sun routes: the APPR from Calgary.',
    title: 'Calgary flight delay compensation: YYC, large vs small',
    description: 'Calgary (YYC) flight delayed or cancelled: APPR amounts from large and small carriers, winter disruption, sun routes, and how to check your airline’s size.',
    h1: 'Calgary: what a delayed flight pays, depending on the airline’s size',
    intro: 'From Calgary the same six-hour delay can pay $700 or $250: the size of the airline counts as much as the hours lost.',
    resume: 'Flights from and to Calgary International follow the Air Passenger Protection Regulations, which split airlines into two categories. A large carrier, one that carried at least two million passengers worldwide in each of the two preceding calendar years, owes $400, $700 or $1,000 when you reach your destination three, six or nine hours late for a cause within its control that is not required for safety. Every other airline counts as a small carrier and owes $125, $250 or $500 for the same delays, with lighter rebooking duties. The category is assessed per airline, not per route, so check which carrier actually operates the flight on your boarding pass. Winter storms on the Prairies and chinook wind shear are outside the airline’s control: no compensation, but rebooking and information remain owed. Requests must reach the airline within one year of the flight.',
    faqs: [
      { q: 'How do I know if my airline is large or small?', a: 'The test is two million passengers worldwide in each of the two previous calendar years. The national carriers and the main leisure airlines exceed it; regional and newer low-cost airlines may not. The Canadian Transportation Agency publishes the classification it relies on, and the airline must say in its tariff which category it falls into.' },
      { q: 'My Calgary to Toronto flight arrived six hours late. What is owed?', a: 'If the cause was within the airline’s control and not required for safety, a large carrier owes $700 and a small carrier $250. The delay is measured at your destination on the ticket, from the time a door opens for passengers to leave, not at departure from Calgary.' },
      { q: 'Is a flight cancelled by a winter storm compensated?', a: 'No. Weather that makes operation unsafe is outside the airline’s control. The airline must still rebook you, within 48 hours on its own or a partner’s flights when it can, then on another carrier for a large airline, or refund the unused ticket if the new plan no longer suits you.' },
      { q: 'Does a sun flight booked through a tour company count?', a: 'Yes. The airline operating the flight is bound by the Regulations whether the seat was sold alone or as part of a holiday package. The amount is claimed from the airline, and a flight from Cancún or Phoenix back to Calgary is covered too because it is a flight to Canada.' },
    ],
    body: (h) => `
<h2>Large and small carriers side by side</h2>
${h.table(['Arrival delay', 'Large carrier', 'Small carrier'], [
  ['3 h to under 6 h', h.cad(h.P.appr.delay.large[0]), h.cad(h.P.appr.delay.small[0])],
  ['6 h to under 9 h', h.cad(h.P.appr.delay.large[1]), h.cad(h.P.appr.delay.small[1])],
  ['9 h or more', h.cad(h.P.appr.delay.large[2]), h.cad(h.P.appr.delay.small[2])],
  ['Refund instead of travel', h.cad(h.P.appr.refund_instead.large), h.cad(h.P.appr.refund_instead.small)],
], 'Section 19 of the Regulations, cause within the carrier’s control and not required for safety', ['l', 'r', 'r'])}
<p>The gap is widest at the top of the scale: a full day lost costs a large airline ${h.cad(h.P.appr.delay.large[2])} and a small one ${h.cad(h.P.appr.delay.small[2])}. The calculator above is set on a small carrier; switch the option to see the large-carrier amount for the same flight.</p>
${h.mini('appr', { d: { h: 6.5, s: 1 }, t: 'Calgary: small carrier, amount by delay' })}
<h2>Routes from Calgary</h2>
${h.table(['Destination', 'Distance', 'Regime'], ROUTES.map((c) => [h.ap(c), h.km('YYC', c), c === 'LHR' ? 'APPR, plus UK261 on a UK airline' : 'APPR']), 'Flights from Calgary, as computed by the site’s engine', ['l', 'r', 'l'])}
<p>On the way back from London, the ${h.src('uk261', 'UK rules')} apply to every airline and may pay more; you claim under one regime only, as ${h.src('cta-act', 'section 86.11(3)')} bars a double payment.</p>
${h.mini('route', { from: 'YYC', to: ['YEG', 'YVR', 'YYZ', 'PHX', 'CUN', 'LHR'] })}
<h2>Winter on the Prairies</h2>
<p>Blizzards, freezing fog and wind shear close the airport for hours and push crews past their duty limits. The first part is weather, outside the airline’s control under section 10 of the ${h.src('appr', 'Regulations')}. A delay the next day blamed on yesterday’s storm only stays outside its control if the airline took all reasonable measures to recover. Ask for that explanation in writing and wait the 30 days set out in the ${h.src('cta-deadlines', 'Agency’s guidance')} before filing a complaint.</p>
`,
  },
  fr: {
    slug: 'aeroport-calgary-retard',
    nav: 'Calgary (YYC)', card: 'Gros ou petit transporteur, vols intérieurs l’hiver et vols soleil : le RPPA depuis Calgary.',
    title: 'Retard de vol à Calgary (YYC) : gros ou petit transporteur',
    description: 'Vol retardé ou annulé à Calgary (YYC) : montants du RPPA selon la taille de la compagnie, hiver des Prairies, vols soleil et façon de vérifier sa catégorie.',
    h1: 'Calgary : ce que rapporte un vol retardé selon la taille de la compagnie',
    intro: 'Depuis Calgary, le même retard de six heures peut rapporter 700 $ ou 250 $ : la taille de la compagnie compte autant que les heures perdues.',
    resume: 'Les vols au départ et à destination de l’aéroport international de Calgary relèvent du Règlement sur la protection des passagers aériens, qui distingue deux catégories de compagnies. Un gros transporteur, qui a transporté au moins deux millions de passagers dans le monde au cours de chacune des deux années civiles précédentes, doit 400 $, 700 $ ou 1 000 $ quand vous arrivez à destination avec trois, six ou neuf heures de retard pour une cause sous son contrôle et sans lien avec la sécurité. Toute autre compagnie est un petit transporteur et doit 125 $, 250 $ ou 500 $ pour les mêmes retards, avec des obligations de réacheminement plus légères. La catégorie s’apprécie par compagnie, pas par ligne : regardez quel transporteur exploite réellement le vol sur votre carte d’embarquement. Les tempêtes des Prairies et le cisaillement du vent lié au chinook sont hors du contrôle du transporteur : pas d’indemnité, mais le réacheminement et l’information restent dus. La demande doit parvenir à la compagnie dans l’année qui suit le vol.',
    faqs: [
      { q: 'Comment savoir si ma compagnie est un gros ou un petit transporteur ?', a: 'Le critère est de deux millions de passagers dans le monde au cours de chacune des deux années civiles précédentes. Les transporteurs nationaux et les grandes compagnies de vacances le dépassent ; certaines compagnies régionales ou récentes non. L’Office des transports du Canada publie la classification retenue, et le tarif de la compagnie indique sa catégorie.' },
      { q: 'Mon vol Calgary–Toronto est arrivé six heures en retard. Que me doit-on ?', a: 'Si la cause relevait de la compagnie sans lien avec la sécurité, un gros transporteur doit 700 $ et un petit 250 $. Le retard se mesure à la destination du billet, au moment où une porte s’ouvre pour laisser sortir les passagers, et non au départ de Calgary.' },
      { q: 'Un vol annulé par une tempête d’hiver est-il indemnisé ?', a: 'Non. Une météo qui rend l’exploitation dangereuse est hors du contrôle du transporteur. La compagnie doit tout de même vous réacheminer, dans les 48 heures sur ses vols ou ceux d’un partenaire si possible, puis sur une autre compagnie pour un gros transporteur, ou rembourser le billet si le nouvel itinéraire ne vous convient plus.' },
      { q: 'Un vol soleil acheté auprès d’un voyagiste est-il couvert ?', a: 'Oui. La compagnie qui exploite le vol est liée par le Règlement, que le siège ait été vendu seul ou dans un forfait. L’indemnité se réclame à la compagnie aérienne, et le retour de Cancún ou de Phoenix vers Calgary est couvert aussi, puisqu’il s’agit d’un vol à destination du Canada.' },
    ],
    body: (h) => `
<h2>Gros et petits transporteurs côte à côte</h2>
${h.table(['Retard à l’arrivée', 'Gros transporteur', 'Petit transporteur'], [
  ['3 h à moins de 6 h', h.cad(h.P.appr.delay.large[0]), h.cad(h.P.appr.delay.small[0])],
  ['6 h à moins de 9 h', h.cad(h.P.appr.delay.large[1]), h.cad(h.P.appr.delay.small[1])],
  ['9 h ou plus', h.cad(h.P.appr.delay.large[2]), h.cad(h.P.appr.delay.small[2])],
  ['Remboursement au lieu du voyage', h.cad(h.P.appr.refund_instead.large), h.cad(h.P.appr.refund_instead.small)],
], 'Article 19 du Règlement, cause sous le contrôle du transporteur et sans lien avec la sécurité', ['l', 'r', 'r'])}
<p>L’écart est le plus grand en haut du barème : une journée perdue coûte ${h.cad(h.P.appr.delay.large[2])} à une grande compagnie et ${h.cad(h.P.appr.delay.small[2])} à une petite. Le calculateur ci-dessus est réglé sur un petit transporteur ; changez l’option pour voir le montant d’un gros transporteur sur le même vol.</p>
${h.mini('appr', { d: { h: 6.5, s: 1 }, t: 'Calgary : petit transporteur, montant selon le retard' })}
<h2>Les lignes au départ de Calgary</h2>
${h.table(['Destination', 'Distance', 'Régime'], ROUTES.map((c) => [h.ap(c), h.km('YYC', c), c === 'LHR' ? 'RPPA, plus UK261 sur une compagnie britannique' : 'RPPA']), 'Vols au départ de Calgary, calculés par le moteur du site', ['l', 'r', 'l'])}
<p>Au retour de Londres, les ${h.src('uk261', 'règles britanniques')} s’appliquent à toutes les compagnies et peuvent rapporter davantage ; vous réclamez sous un seul régime, le ${h.src('cta-act', 'paragraphe 86.11(3)')} interdisant un double paiement.</p>
${h.mini('route', { from: 'YYC', to: ['YEG', 'YVR', 'YUL', 'PHX', 'CUN', 'CDG'] })}
<h2>L’hiver des Prairies</h2>
<p>Blizzards, brouillard givrant et cisaillement du vent ferment l’aéroport pendant des heures et poussent les équipages au-delà de leurs limites de service. La première partie relève de la météo, hors du contrôle du transporteur selon l’article 10 du ${h.src('appr', 'Règlement')}. Un retard le lendemain imputé à la tempête de la veille ne reste hors de son contrôle que si la compagnie a pris toutes les mesures raisonnables pour se rétablir. Demandez cette explication par écrit et attendez les 30 jours prévus par les ${h.src('cta-deadlines', 'consignes de l’Office')} avant de déposer une plainte.</p>
`,
  },
});
