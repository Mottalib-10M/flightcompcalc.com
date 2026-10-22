import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'appr', group: 'ca', order: 410,
  tool: 'flight', toolArg: { from: 'YVR', to: 'YYZ', delay: 560, carrier: 'ca', cause: 'airline', advanced: true },
  related: ['ca', 'ca-annulation', 'ca-bagages', 'ca-plainte', 'yvr'],
  sources: ['appr', 'cta-act', 'cta-deadlines', 'cta-montreal'],
  en: {
    slug: 'air-passenger-protection-regulations',
    nav: 'Air Passenger Protection Regulations', card: 'SOR/2019-150 section by section: what each part requires of the airline.',
    title: 'Air Passenger Protection Regulations: what they require',
    description: 'APPR (SOR/2019-150) section by section: carrier size, the three causes, compensation, rebooking, tarmac delays, baggage, information duties and pending changes.',
    h1: 'The Air Passenger Protection Regulations, section by section',
    intro: 'What SOR/2019-150 actually says, in the order of the text, with the amounts it sets and the gaps it leaves.',
    resume: 'The Air Passenger Protection Regulations, SOR/2019-150, are the rules the Canadian Transportation Agency made under section 86.11 of the Canada Transportation Act. They apply to every flight to, from and within Canada, including connecting flights, and to any airline operating them. They sort each delay, cancellation or denied boarding into three categories: within the carrier’s control, within its control but required for safety, and outside its control. All three oblige the airline to inform passengers and to get them to their destination; only the first one also pays compensation, set in section 19 for delays and cancellations ($400, $700 or $1,000 from a large carrier, $125, $250 or $500 from a small one, by hours of delay at arrival) and in section 20 for denied boarding ($900, $1,800 or $2,400). The text consolidated by Justice Canada is current to 30 September 2026; its last amendment dates from 8 September 2022, and the changes proposed since then are not in force.',
    faqs: [
      { q: 'What makes a carrier “large” under the APPR?', a: 'A large carrier is one that transported a worldwide total of two million passengers or more during each of the two preceding calendar years. Every other carrier is small. The test counts passengers worldwide, so major foreign airlines flying to Canada are large carriers even if they operate only a few Canadian routes. Regional and charter operators may fall under the small carrier amounts.' },
      { q: 'Does the APPR require an airline to explain a delay?', a: 'Yes. Section 13 requires the carrier to tell affected passengers the reason for the delay, cancellation or denied boarding, the compensation they may be entitled to, the standard of treatment and their recourse, including the Agency. During a delay it must give status updates every 30 minutes until a new departure time is set or you are rebooked.' },
      { q: 'What happens during a long tarmac delay?', a: 'On the tarmac the airline must keep working lavatories, ventilation and heating or cooling, a way to communicate, and food and drink. At an airport in Canada it must offer to let passengers off three hours after the doors close or after landing, unless take-off is likely within three hours and 45 minutes and that standard of care continues.' },
      { q: 'Are the APPR amounts a maximum?', a: 'They are minimums. Section 2 says the operating carrier is bound by the Regulations or by its own tariff when the tariff is more favourable to passengers. An airline may therefore pay more under its published conditions of carriage, never less. Check the tariff on the airline’s website if the minimum seems low for your situation.' },
    ],
    body: (h) => `
<h2>Who is bound</h2>
<p>Section 2 makes the operating carrier liable for the main obligations. When one airline flies passengers on behalf of another under a commercial agreement, both are jointly liable for some duties, and the airline that issued the ticket must give the required information. On a codeshare the name on your ticket and the airline in the cockpit may differ: the calculator asks for the airline that operated the flight.</p>
<h2>The three categories and what each triggers</h2>
${h.table(['Category', 'Information', 'Rebooking or refund', 'Food, hotel', 'Compensation'], [
  ['Within control, not safety', 'yes', 'yes, within 9 h first', 'yes, from 2 h', 'yes'],
  ['Within control, required for safety', 'yes', 'yes, within 9 h first', 'yes, from 2 h', 'no'],
  ['Outside control (s. 10)', 'yes', 'yes, within 48 h first', 'no', 'no'],
], 'Obligations by category, large carrier, under sections 10 to 19', ['l', 'l', 'l', 'l', 'l'])}
<p>Section 10 lists what is outside the carrier’s control: war or political instability, illegal acts, weather or natural disasters that make safe operation impossible, air traffic control instructions, NOTAMs, security threats, airport operation issues, medical emergencies, wildlife collisions, labour disruption within the carrier or an essential service provider, manufacturing defects identified by the manufacturer or an authority, and orders from officials. A knock-on delay caused by such a situation counts as outside control too, if the airline took all reasonable measures to limit its effects.</p>
${h.mini('appr', { d: { h: 9.5, s: 0 } })}
<h2>Compensation, in detail</h2>
<p>Section 19 pays by arrival delay at the destination on your original ticket: ${h.cad(h.P.appr.delay.large[0])}, ${h.cad(h.P.appr.delay.large[1])} or ${h.cad(h.P.appr.delay.large[2])} from a large carrier. If the alternate arrangements do not suit you and your ticket is refunded, the flat amount is ${h.cad(h.P.appr.refund_instead.large)} (${h.cad(h.P.appr.refund_instead.small)} for a small carrier). You must file the request before the first anniversary of the delay or cancellation; the carrier then has 30 days to pay or explain. Section 21 requires payment in money unless you choose, in writing, another form worth more that never expires.</p>
<h2>Baggage and the Montreal Convention</h2>
<p>Section 23 adds the baggage fees to the compensation set by the Carriage by Air Act, which gives effect to the Montreal Convention: up to ${h.n(h.P.montreal.baggage_sdr)} special drawing rights, revised on ${h.day(h.P.montreal.in_force)}, about ${h.cad(h.P.montreal.baggage_sdr * h.P.sdr.cad)} at the IMF rate of ${h.day(h.P.sdr.cad_date)}. See ${h.a('ca-bagages', 'delayed and lost baggage in Canada')}.</p>
<h2>What is pending</h2>
<p>Draft amendments were published in Part I of the Canada Gazette in December 2025 and Bill C-31 was tabled on 2 May 2026. None of it is in force: this page and the calculator apply the ${h.src('appr', 'consolidated text')} as it stands, and will change on the day new rules apply.</p>
`,
  },
  fr: {
    slug: 'reglement-protection-passagers-aeriens',
    nav: 'Règlement sur la protection des passagers aériens', card: 'Le DORS/2019-150 article par article : obligations du transporteur.',
    title: 'Règlement protection des passagers aériens : l’essentiel',
    description: 'Le RPPA (DORS/2019-150) article par article : taille du transporteur, trois catégories de causes, indemnités, réacheminement, tarmac, bagages, projets.',
    h1: 'Le Règlement sur la protection des passagers aériens, article par article',
    intro: 'Ce que dit vraiment le DORS/2019-150, dans l’ordre du texte, avec les montants qu’il fixe et ce qu’il laisse de côté.',
    resume: 'Le Règlement sur la protection des passagers aériens, DORS/2019-150, a été pris par l’Office des transports du Canada en vertu de l’article 86.11 de la Loi sur les transports au Canada. Il vise tous les vols à destination, en provenance ou à l’intérieur du Canada, correspondances comprises, et toute compagnie qui les exploite. Chaque retard, annulation ou refus d’embarquement est classé dans l’une de trois catégories : sous le contrôle du transporteur, sous son contrôle mais nécessaire par souci de sécurité, ou hors de son contrôle. Les trois obligent à informer les passagers et à les mener à destination ; seule la première ouvre droit à une indemnité, fixée à l’article 19 pour les retards et annulations (400 $, 700 $ ou 1 000 $ pour un gros transporteur, 125 $, 250 $ ou 500 $ pour un petit, selon les heures de retard à l’arrivée) et à l’article 20 pour le refus d’embarquement (900 $, 1 800 $ ou 2 400 $). Le texte consolidé par Justice Canada est à jour au 30 septembre 2026 ; sa dernière modification date du 8 septembre 2022.',
    faqs: [
      { q: 'Qu’est-ce qu’un gros transporteur au sens du Règlement ?', a: 'C’est un transporteur qui a transporté au moins deux millions de passagers dans le monde au cours de chacune des deux années civiles précédentes. Tous les autres sont de petits transporteurs. Le critère compte les passagers à l’échelle mondiale : une grande compagnie étrangère qui dessert peu de villes canadiennes reste un gros transporteur, alors que certains exploitants régionaux relèvent des montants réduits.' },
      { q: 'La compagnie doit-elle donner la cause du retard ?', a: 'Oui. L’article 13 l’oblige à indiquer aux passagers touchés la raison du retard, de l’annulation ou du refus d’embarquement, l’indemnité à laquelle ils pourraient avoir droit, les normes de traitement et les recours, y compris auprès de l’Office. Pendant un retard, elle doit donner des nouvelles toutes les 30 minutes jusqu’à ce qu’une nouvelle heure soit fixée.' },
      { q: 'Les montants du Règlement sont-ils des plafonds ?', a: 'Non, ce sont des minimums. L’article 2 prévoit que le transporteur est tenu des obligations du Règlement ou de celles de son tarif lorsque ce dernier est plus avantageux pour les passagers. Une compagnie peut donc verser davantage selon ses conditions de transport publiées, jamais moins. Consultez le tarif sur son site si la situation vous semble mal couverte.' },
      { q: 'Que prévoit le Règlement pour un long retard sur le tarmac ?', a: 'Sur le tarmac, la compagnie doit assurer des toilettes en état, la ventilation, le chauffage ou la climatisation, un moyen de communiquer, de la nourriture et des boissons. Dans un aéroport canadien, elle doit offrir de débarquer trois heures après la fermeture des portes ou l’atterrissage, sauf si le décollage est probable avant trois heures 45.' },
    ],
    body: (h) => `
<h2>Qui est responsable</h2>
<p>L’article 2 rend le transporteur exploitant responsable des principales obligations. Quand une compagnie transporte des passagers pour le compte d’une autre en vertu d’un accord commercial, les deux sont solidairement tenues de certaines obligations, et la compagnie qui a émis le billet doit fournir l’information exigée. En partage de code, le nom inscrit sur le billet et celui de l’équipage peuvent différer : le calculateur demande la compagnie qui a réellement exploité le vol.</p>
<h2>Les trois catégories et leurs effets</h2>
${h.table(['Catégorie', 'Information', 'Réacheminement ou remboursement', 'Repas, hôtel', 'Indemnité'], [
  ['Sous son contrôle, hors sécurité', 'oui', 'oui, d’abord dans les 9 h', 'oui, dès 2 h', 'oui'],
  ['Sous son contrôle, sécurité', 'oui', 'oui, d’abord dans les 9 h', 'oui, dès 2 h', 'non'],
  ['Hors de son contrôle (art. 10)', 'oui', 'oui, d’abord dans les 48 h', 'non', 'non'],
], 'Obligations par catégorie, gros transporteur, articles 10 à 19', ['l', 'l', 'l', 'l', 'l'])}
<p>L’article 10 énumère les situations hors du contrôle du transporteur : guerre ou instabilité politique, actes illicites, conditions météorologiques ou catastrophes naturelles qui rendent l’exploitation sécuritaire impossible, instructions du contrôle aérien, NOTAM, menace à la sûreté, problèmes d’exploitation de l’aéroport, urgence médicale, collision avec un animal, conflit de travail au sein du transporteur ou d’un fournisseur de services essentiels, défaut de fabrication signalé par le constructeur ou une autorité, ordre d’un représentant de l’État. Un retard en cascade causé par l’une de ces situations est aussi hors de son contrôle si la compagnie a pris toutes les mesures raisonnables pour en limiter les effets.</p>
${h.mini('appr', { d: { h: 9.5, s: 1 } })}
<h2>L’indemnité en détail</h2>
<p>L’article 19 paie selon le retard à l’arrivée à la destination du billet d’origine : ${h.cad(h.P.appr.delay.large[0])}, ${h.cad(h.P.appr.delay.large[1])} ou ${h.cad(h.P.appr.delay.large[2])} pour un gros transporteur. Si les autres arrangements ne vous conviennent pas et que le billet est remboursé, le montant forfaitaire est de ${h.cad(h.P.appr.refund_instead.large)} (${h.cad(h.P.appr.refund_instead.small)} pour un petit). La demande se dépose avant le premier anniversaire du retard ou de l’annulation, et le transporteur a 30 jours pour payer ou expliquer son refus. L’article 21 impose un paiement en argent, sauf si vous choisissez par écrit une autre forme d’une valeur supérieure et sans date d’expiration.</p>
<h2>Bagages et Convention de Montréal</h2>
<p>L’article 23 ajoute les frais de bagages à l’indemnité prévue par la Loi sur le transport aérien, qui met en œuvre la Convention de Montréal : jusqu’à ${h.n(h.P.montreal.baggage_sdr)} droits de tirage spéciaux depuis le ${h.day(h.P.montreal.in_force)}, environ ${h.cad(h.P.montreal.baggage_sdr * h.P.sdr.cad)} au cours du FMI du ${h.day(h.P.sdr.cad_date)}. Voir ${h.a('ca-bagages', 'bagages retardés ou perdus')}.</p>
<h2>Ce qui est en projet</h2>
<p>Des modifications ont été publiées en projet dans la Partie I de la Gazette du Canada en décembre 2025, et le projet de loi C-31 a été déposé le 2 mai 2026. Rien de cela n’est en vigueur : cette page et le calculateur appliquent le ${h.src('appr', 'texte consolidé')} tel quel et changeront le jour où de nouvelles règles s’appliqueront.</p>
`,
  },
});
