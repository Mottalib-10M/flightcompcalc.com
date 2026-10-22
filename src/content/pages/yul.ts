import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'yul', group: 'ca', order: 460,
  tool: 'flight', toolArg: { from: 'YUL', to: 'PUJ', delay: 380, carrier: 'ca', cause: 'airline' },
  related: ['ca', 'ca-annulation', 'ca-bagages', 'yyz', 'appr'],
  sources: ['appr', 'eu261', 'cta-deadlines', 'cta-act'],
  en: {
    slug: 'montreal-flight-delay-compensation',
    nav: 'Montréal-Trudeau (YUL)', card: 'Sun flights, Paris and the Canadian rules from Montréal.',
    title: 'Montréal flight delay compensation: YUL, sun trips, Paris',
    description: 'Montréal-Trudeau (YUL) flight delayed or cancelled: APPR amounts on winter sun flights, the Paris route under two regimes, and what a package holiday changes.',
    h1: 'Montréal-Trudeau: compensation for delayed winter sun and Paris flights',
    intro: 'Two kinds of trips dominate claims from Montréal: a week in the sun that starts six hours late, and the Paris route, covered by two sets of rules.',
    resume: 'From Montréal-Trudeau, a delayed flight to Punta Cana, Cancún or Fort Lauderdale is a flight from Canada, so the Air Passenger Protection Regulations apply whatever the airline: a large carrier owes $400, $700 or $1,000 when you reach the destination three, six or nine hours late for a reason within its control, and the return flight to Montréal is covered too, because it is a flight to Canada. Buying the flight as part of a package does not change the airline’s obligations. The Paris route adds a second layer: Paris to Montréal leaves the European Union, so the EU regulation applies on top and pays €600 for that distance, halved to €300 if the delay stays under four hours, while Montréal to Paris is covered by the EU regulation only when a European airline operates it. You claim under one regime for the same event, not both. Requests under the Canadian rules must reach the airline within one year.',
    faqs: [
      { q: 'Does a package holiday change my rights on the flight?', a: 'Not for compensation. The Regulations bind the airline operating the flight, whether you bought the seat alone or in a package with a hotel. The tour operator may owe you other things under Quebec consumer law, such as a price reduction for lost holiday days, but the delay compensation is claimed from the airline.' },
      { q: 'My Punta Cana return flight was six hours late. What is owed?', a: 'A flight to Canada is covered by the APPR. If the cause was within the airline’s control and not required for safety, a large carrier owes $700 for six to nine hours, a small carrier $250. The Dominican Republic has its own rules on the outbound side, which do not affect the Canadian amount.' },
      { q: 'Is Montréal to Paris covered by the EU regulation?', a: 'Only if a European airline operates it, because the EU regulation covers flights arriving in the Union from outside only on EU carriers. A Canadian airline on that route is covered by the APPR alone. On the way back, Paris to Montréal is always covered by the EU regulation, whatever the airline.' },
      { q: 'How do I prove the time I actually arrived in Montréal?', a: 'The Regulations define arrival as the moment a door is opened to let passengers leave. Note that time, photograph the arrivals board, keep your boarding pass and any delay notice sent by the airline. These are the elements an airline or the Agency will look at when the delay is close to three, six or nine hours.' },
    ],
    body: (h) => `
<h2>Sun destinations: same scale, whatever the distance</h2>
${h.table(['Route', 'Distance', 'Large carrier, 6 h 20 late', 'Small carrier'], [
  ['Montréal to Punta Cana', h.km('YUL', 'PUJ'), h.cad(h.P.appr.delay.large[1]), h.cad(h.P.appr.delay.small[1])],
  ['Montréal to Cancún', h.km('YUL', 'CUN'), h.cad(h.P.appr.delay.large[1]), h.cad(h.P.appr.delay.small[1])],
  ['Montréal to Fort Lauderdale', h.km('YUL', 'FLL'), h.cad(h.P.appr.delay.large[1]), h.cad(h.P.appr.delay.small[1])],
  ['Montréal to Paris', h.km('YUL', 'CDG'), h.cad(h.P.appr.delay.large[1]), h.cad(h.P.appr.delay.small[1])],
], 'APPR, section 19, cause within the carrier’s control', ['l', 'r', 'r', 'r'])}
<p>The Canadian amounts never vary with distance: a short hop and a transatlantic flight pay the same for the same hours lost. What changes the figure is the size of the airline and the time you reach the destination on your ticket.</p>
${h.mini('appr', { d: { h: 6.33, s: 0 }, t: 'Montréal: amount by hours of delay' })}
<h2>The Paris route under two regimes</h2>
<p>Paris to Montréal, ${h.km('CDG', 'YUL')}, leaves the European Union: the ${h.src('eu261', 'EU regulation')} applies to every airline on that leg, ${h.eur(h.P.eu261.amounts[2])} for a delay of four hours or more. The APPR applies too, because the flight arrives in Canada. Claim the higher one; ${h.src('cta-act', 'section 86.11(3)')} prevents a second payment for the same event.</p>
${h.mini('route', { from: 'YUL', to: ['CDG', 'PUJ', 'CUN', 'YVR', 'YYC', 'LHR'] })}
<h2>Winter at Trudeau</h2>
<p>Snowstorms and freezing rain are outside the airline’s control, so they give no compensation, but rebooking remains owed and, during a long tarmac wait, the airline must keep food, water, ventilation and toilets available. When the airline cites the weather while other departures to the same destination leave on time, ask for the specific cause in writing, with the flight number of a departure that did leave, before accepting the refusal; the ${h.src('cta-deadlines', 'Agency')} expects that written exchange before any complaint.</p>
`,
  },
  fr: {
    slug: 'aeroport-montreal-trudeau-retard',
    nav: 'Montréal-Trudeau (YUL)', card: 'Vols soleil, Paris et règles canadiennes au départ de Montréal.',
    title: 'Retard de vol à Montréal-Trudeau : indemnité, vols soleil',
    description: 'Vol retardé ou annulé à Montréal-Trudeau (YUL) : montants du RPPA pour les vols soleil, la ligne de Paris sous deux régimes, et ce que change un forfait voyage.',
    h1: 'Montréal-Trudeau : indemnité pour les vols soleil et la ligne de Paris',
    intro: 'Deux voyages reviennent sans cesse au départ de Montréal : la semaine au soleil qui commence six heures en retard, et Paris, couvert par deux régimes.',
    resume: 'Au départ de Montréal-Trudeau, un vol retardé vers Punta Cana, Cancún ou Fort Lauderdale est un vol en provenance du Canada : le Règlement sur la protection des passagers aériens s’applique, quelle que soit la compagnie. Un gros transporteur doit 400 $, 700 $ ou 1 000 $ quand vous arrivez avec trois, six ou neuf heures de retard pour une cause sous son contrôle, et le vol de retour est couvert lui aussi, puisqu’il s’agit d’un vol à destination du Canada. Acheter le vol dans un forfait ne change pas les obligations de la compagnie aérienne. La ligne de Paris ajoute un second régime : Paris–Montréal part de l’Union européenne, le règlement européen s’applique donc aussi et paie 600 € pour cette distance, ou 300 € si le retard reste sous quatre heures, tandis que Montréal–Paris n’en relève que si une compagnie européenne exploite le vol. Pour un même événement, vous réclamez sous un seul régime. Selon les règles canadiennes, la demande doit parvenir au transporteur dans l’année.',
    faqs: [
      { q: 'Un forfait voyage change-t-il mes droits pour le vol ?', a: 'Pas pour l’indemnité. Le Règlement lie la compagnie qui exploite le vol, que vous ayez acheté le siège seul ou avec l’hôtel. Le voyagiste peut vous devoir autre chose en vertu des lois du Québec sur la protection du consommateur, par exemple pour des journées de vacances perdues, mais l’indemnité de retard se réclame à la compagnie aérienne.' },
      { q: 'Mon retour de Punta Cana a eu six heures de retard. Que me doit-on ?', a: 'Un vol à destination du Canada relève du RPPA. Si la cause relevait de la compagnie et n’était pas liée à la sécurité, un gros transporteur doit 700 $ pour six à neuf heures, un petit 250 $. La République dominicaine a ses propres règles pour l’aller, sans effet sur le montant canadien.' },
      { q: 'Le vol Montréal–Paris relève-t-il du règlement européen ?', a: 'Seulement si une compagnie européenne l’exploite : le règlement européen ne couvre les vols qui arrivent dans l’Union depuis l’extérieur que sur une compagnie de l’Union. Une compagnie canadienne sur cette ligne relève du seul RPPA. Au retour, Paris–Montréal relève toujours du règlement européen, quelle que soit la compagnie.' },
      { q: 'Comment prouver mon heure d’arrivée réelle à Montréal ?', a: 'Le Règlement définit l’arrivée comme le moment où une porte s’ouvre pour laisser sortir les passagers. Notez cette heure, photographiez l’écran des arrivées, gardez la carte d’embarquement et tout avis de retard de la compagnie. Ce sont les éléments examinés quand le retard frôle trois, six ou neuf heures.' },
    ],
    body: (h) => `
<h2>Destinations soleil : même barème, quelle que soit la distance</h2>
${h.table(['Trajet', 'Distance', 'Gros transporteur, 6 h 20 de retard', 'Petit transporteur'], [
  ['Montréal–Punta Cana', h.km('YUL', 'PUJ'), h.cad(h.P.appr.delay.large[1]), h.cad(h.P.appr.delay.small[1])],
  ['Montréal–Cancún', h.km('YUL', 'CUN'), h.cad(h.P.appr.delay.large[1]), h.cad(h.P.appr.delay.small[1])],
  ['Montréal–Fort Lauderdale', h.km('YUL', 'FLL'), h.cad(h.P.appr.delay.large[1]), h.cad(h.P.appr.delay.small[1])],
  ['Montréal–Paris', h.km('YUL', 'CDG'), h.cad(h.P.appr.delay.large[1]), h.cad(h.P.appr.delay.small[1])],
], 'RPPA, article 19, cause sous le contrôle du transporteur', ['l', 'r', 'r', 'r'])}
<p>Les montants canadiens ne varient jamais avec la distance : un vol court et un vol transatlantique paient la même chose pour les mêmes heures perdues. Ce qui change le chiffre, c’est la taille de la compagnie et l’heure d’arrivée à la destination du billet.</p>
${h.mini('appr', { d: { h: 6.33, s: 0 }, t: 'Montréal : montant selon les heures de retard' })}
<h2>La ligne de Paris sous deux régimes</h2>
<p>Paris–Montréal, ${h.km('CDG', 'YUL')}, part de l’Union européenne : le ${h.src('eu261', 'règlement européen')} s’applique à toutes les compagnies sur ce trajet, ${h.eur(h.P.eu261.amounts[2])} pour quatre heures de retard ou plus. Le RPPA s’applique aussi, puisque le vol arrive au Canada. Réclamez le plus élevé ; le ${h.src('cta-act', 'paragraphe 86.11(3)')} empêche un second paiement pour le même événement.</p>
${h.mini('route', { from: 'YUL', to: ['CDG', 'PUJ', 'CUN', 'YYZ', 'YVR', 'YQB'] })}
<h2>L’hiver à Trudeau</h2>
<p>Tempêtes de neige et pluie verglaçante sont hors du contrôle du transporteur : pas d’indemnité, mais le réacheminement reste dû et, pendant une longue attente sur le tarmac, la compagnie doit fournir nourriture, eau, ventilation et toilettes. Si la compagnie invoque la météo alors que d’autres vols vers la même destination partent à l’heure, demandez la cause précise par écrit avant d’accepter le refus ; l’${h.src('cta-deadlines', 'Office')} attend cet échange écrit avant toute plainte.</p>
`,
  },
});
