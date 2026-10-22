import { definePage, type Helpers } from '../../lib/page-types';

const DEST = ['YVR', 'YUL', 'YHZ', 'LHR', 'FRA', 'CDG', 'CUN', 'DEL'];
const rows = (h: Helpers, out: 'en' | 'fr') => DEST.map((c) => {
  const go = h.owed('YYZ', c, 270, { carrier: 'ca' });
  const back = h.owed(c, 'YYZ', 270, { carrier: 'ca' });
  const best = (l: typeof go) => l.filter((r) => r.amount !== '–').map((r) => `${r.amount} (${r.regime})`).join(out === 'fr' ? ' ou ' : ' or ') || '–';
  return [h.ap(c), h.km('YYZ', c), best(go), best(back)];
});

export default definePage({
  id: 'yyz', group: 'ca', order: 450,
  tool: 'flight', toolArg: { from: 'YYZ', to: 'LHR', delay: 270, carrier: 'ca', cause: 'airline' },
  related: ['ca', 'appr', 'yul', 'yvr', 'yyc', 'ca-annulation'],
  sources: ['appr', 'eu261', 'uk261', 'cta-act'],
  en: {
    slug: 'toronto-pearson-flight-delay-compensation',
    nav: 'Toronto Pearson (YYZ)', card: 'Delays from Pearson: APPR at home, EU261 or UK261 on the way back.',
    title: 'Toronto Pearson delay compensation: YYZ flights and APPR',
    description: 'Toronto Pearson (YYZ) flight delayed or cancelled: APPR amounts for each departure, EU261 or UK261 on return flights from Europe, and which one pays more.',
    h1: 'Toronto Pearson: compensation for a delayed or cancelled flight',
    intro: 'From Pearson the Canadian rules apply on every route; on the way back from Europe a second regime often pays more.',
    resume: 'Every flight leaving or arriving at Toronto Pearson is covered by the Air Passenger Protection Regulations, whatever the airline: a delay of three hours or more at your final destination, caused by something within the airline’s control and not required for safety, pays $400, $700 or $1,000 from a large carrier. On transatlantic trips the picture changes with direction. A flight from Pearson to London is also covered by UK261 if a British airline operates it, and a flight from Frankfurt or Paris back to Pearson is always covered by the EU regulation, which pays by distance: €600 beyond 3,500 km, or €300 when the long-haul delay stays under four hours. You choose the regime to claim under, but you cannot be paid twice for the same event. Winter storms and de-icing queues are the classic Pearson case: weather is outside the airline’s control under both Canadian and European rules, but an airline that blames weather for a delay caused by a crew shortage owes the money.',
    faqs: [
      { q: 'Is a de-icing delay at Pearson compensated?', a: 'Usually not when the cause is the weather itself: snow and freezing rain that make safe operation impossible are listed as outside the carrier’s control. The airline must still rebook you and keep you informed. If the de-icing wait is only the visible part and the real cause was a late crew or aircraft, ask for the cause in writing.' },
      { q: 'Which regime pays more on a Toronto to London delay?', a: 'For a four-hour delay, a large carrier owes $400 under the APPR. If a UK airline operates the flight, UK261 also applies and gives £520 for a distance over 3,500 km, or £260 when the delay is under four hours. The calculator shows both amounts; you claim one of them.' },
      { q: 'I connected in Toronto and missed my second flight. What counts?', a: 'If both flights were on one ticket, only your arrival at the final destination counts, and the APPR measures the delay there. A 50-minute late arrival at Pearson that makes you miss a connection to Halifax can turn into a seven-hour delay at destination and the $700 band from a large carrier.' },
      { q: 'Does the APPR cover a flight from Pearson to the United States?', a: 'Yes. A flight from Canada to the United States is a flight from Canada, so the Regulations apply in full, including compensation. The United States has no comparable compensation rule for delays, so the return leg from the US to Toronto is covered only by the APPR, which also applies to flights to Canada.' },
    ],
    body: (h) => `
<h2>Amounts from and to Pearson</h2>
<p>The table applies the engine of the site to a delay of four and a half hours at arrival, cause within the control of the airline, operated by a Canadian airline. On the way back from Europe the EU or UK amount shown assumes the flight leaves from that country.</p>
${h.table(['Airport', 'Distance', 'From Toronto', 'To Toronto'], rows(h, 'en'), 'Delay of 4 h 30 at arrival, Canadian large carrier, cause within its control', ['l', 'r', 'l', 'l'])}
<p>The pattern is clear: on domestic and transborder routes only the ${h.src('appr', 'APPR')} pays, and its amount ignores distance. On flights from Europe, the ${h.src('eu261', 'EU regulation')} adds ${h.eur(h.P.eu261.amounts[2])} or ${h.eur(h.P.eu261.amounts[2] / 2)}, and ${h.src('uk261', 'UK261')} adds ${h.gbp(h.P.uk261.amounts[2])} or ${h.gbp(h.P.uk261.amounts[2] / 2)} from London.</p>
${h.mini('route', { from: 'YYZ', to: ['YVR', 'YHZ', 'LHR', 'FRA', 'CUN', 'DEL'] })}
<h2>Getting home on a different airline</h2>
<p>If your Pearson flight is delayed by a cause within the airline’s control, a large carrier must rebook you on its own or a partner’s next flight leaving within nine hours, then on any airline, including from a nearby airport. In Toronto that can mean a flight from another carrier the same evening rather than the next morning: ask for it at the counter, the obligation is in the Regulations, not a favour.</p>
<h2>Do not claim twice</h2>
<p>On a return trip from Europe you may hold a right under two regimes. Collecting both for the same event is barred by ${h.src('cta-act', 'section 86.11(3) of the Canada Transportation Act')}. Claim the higher amount first, and if it is refused, the other one remains available within its own deadline.</p>
`,
  },
  fr: {
    slug: 'aeroport-toronto-pearson-retard',
    nav: 'Toronto Pearson (YYZ)', card: 'Retards à Pearson : RPPA au départ, règlement européen ou UK261 au retour.',
    title: 'Retard à Toronto Pearson : indemnité des vols YYZ, RPPA',
    description: 'Vol retardé ou annulé à Toronto Pearson (YYZ) : montants du RPPA pour chaque départ, règlement européen ou UK261 au retour d’Europe, et lequel rapporte le plus.',
    h1: 'Toronto Pearson : indemnité pour un vol retardé ou annulé',
    intro: 'À Pearson, les règles canadiennes s’appliquent sur toutes les lignes ; au retour d’Europe, un second régime paie souvent davantage.',
    resume: 'Tout vol au départ ou à l’arrivée de Toronto Pearson relève du Règlement sur la protection des passagers aériens, quelle que soit la compagnie : un retard de trois heures ou plus à la destination finale, causé par une situation sous le contrôle du transporteur et sans lien avec la sécurité, rapporte 400 $, 700 $ ou 1 000 $ d’un gros transporteur. Sur les vols transatlantiques, tout dépend du sens. Un vol Pearson–Londres relève aussi de UK261 si une compagnie britannique l’exploite, et un vol Francfort–Toronto ou Paris–Toronto relève toujours du règlement européen, qui paie selon la distance : 600 € au-delà de 3 500 km, ou 300 € si le retard reste sous quatre heures. Vous choisissez le régime, mais vous ne pouvez pas être payé deux fois pour le même événement. Les tempêtes d’hiver et les files de dégivrage sont le cas typique : la météo est hors du contrôle du transporteur au Canada comme en Europe, mais une compagnie qui invoque la météo pour masquer un manque d’équipage doit l’indemnité.',
    faqs: [
      { q: 'Un retard dû au dégivrage à Pearson est-il indemnisé ?', a: 'En général non quand la cause est la météo elle-même : neige et pluie verglaçante qui empêchent une exploitation sécuritaire sont hors du contrôle du transporteur. La compagnie doit tout de même vous réacheminer et vous informer. Si le dégivrage cache un équipage ou un appareil en retard, demandez la cause exacte par écrit.' },
      { q: 'Quel régime paie le plus pour un retard Toronto–Londres ?', a: 'Pour quatre heures de retard, un gros transporteur doit 400 $ selon le RPPA. Si une compagnie britannique exploite le vol, UK261 s’applique aussi et donne 520 £ au-delà de 3 500 km, ou 260 £ sous quatre heures de retard. Le calculateur affiche les deux montants ; vous en réclamez un seul.' },
      { q: 'J’ai manqué ma correspondance à Toronto. Qu’est-ce qui compte ?', a: 'Si les deux vols figurent sur le même billet, seule compte l’arrivée à la destination finale. Une arrivée à Pearson avec 50 minutes de retard qui vous fait manquer le vol pour Halifax peut devenir sept heures de retard à destination, soit le palier de 700 $ pour un gros transporteur.' },
      { q: 'Le RPPA couvre-t-il un vol Pearson–États-Unis ?', a: 'Oui. Un vol du Canada vers les États-Unis est un vol en provenance du Canada : le Règlement s’applique entièrement, indemnité comprise. Les États-Unis n’ont pas de règle comparable pour les retards ; le vol de retour vers Toronto relève donc du seul RPPA, qui vise aussi les vols à destination du Canada.' },
    ],
    body: (h) => `
<h2>Montants au départ et à l’arrivée de Pearson</h2>
<p>Le tableau applique le moteur du site à un retard de quatre heures et demie à l’arrivée, cause sous le contrôle du transporteur, vol exploité par une compagnie canadienne. Au retour d’Europe, le montant européen ou britannique suppose un départ de ce pays.</p>
${h.table(['Aéroport', 'Distance', 'Au départ de Toronto', 'Vers Toronto'], rows(h, 'fr'), 'Retard de 4 h 30 à l’arrivée, gros transporteur canadien, cause sous son contrôle', ['l', 'r', 'l', 'l'])}
<p>Sur les lignes intérieures et transfrontalières, seul le ${h.src('appr', 'RPPA')} paie, sans égard à la distance. Sur les vols au départ de l’Europe, le ${h.src('eu261', 'règlement européen')} ajoute ${h.eur(h.P.eu261.amounts[2])} ou ${h.eur(h.P.eu261.amounts[2] / 2)}, et ${h.src('uk261', 'UK261')} ${h.gbp(h.P.uk261.amounts[2])} ou ${h.gbp(h.P.uk261.amounts[2] / 2)} depuis Londres.</p>
${h.mini('route', { from: 'YYZ', to: ['YUL', 'YVR', 'YHZ', 'CDG', 'FRA', 'CUN'] })}
<h2>Rentrer avec une autre compagnie</h2>
<p>Si votre vol à Pearson est retardé pour une cause sous le contrôle du transporteur, un gros transporteur doit vous placer sur son prochain vol ou celui d’un partenaire partant dans les neuf heures, puis sur n’importe quelle compagnie, y compris depuis un aéroport voisin. À Toronto, cela peut vouloir dire un vol d’une autre compagnie le soir même plutôt que le lendemain matin : demandez-le au comptoir, c’est une obligation du Règlement.</p>
<h2>Ne pas réclamer deux fois</h2>
<p>Au retour d’Europe, vous pouvez avoir un droit sous deux régimes. Les cumuler pour le même événement est interdit par le ${h.src('cta-act', 'paragraphe 86.11(3) de la Loi sur les transports au Canada')}. Réclamez d’abord le montant le plus élevé ; en cas de refus, l’autre reste possible dans son propre délai.</p>
`,
  },
});
