import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'ca-bagages', group: 'ca', order: 430,
  tool: 'baggage', toolArg: { cur: 'CAD', fare: 1800 },
  related: ['ca', 'appr', 'ca-plainte', 'gepaeck'],
  sources: ['appr', 'cta-deadlines', 'cta-montreal', 'icao-limits', 'imf-sdr'],
  en: {
    slug: 'baggage-delay-compensation-canada',
    nav: 'Delayed or lost baggage in Canada', card: 'Montreal Convention limit in dollars, baggage fees refunded, 7 and 21-day deadlines.',
    title: 'Baggage delay compensation in Canada: limits and deadlines',
    description: 'Delayed, lost or damaged baggage on a Canadian flight: the 1,519 SDR limit in Canadian dollars, baggage fees refunded, and the 7 and 21-day deadlines to write.',
    h1: 'Delayed, lost or damaged baggage on a flight to or from Canada',
    intro: 'Your bag is worth what you can prove, up to the Montreal Convention limit, plus the fees you paid to check it.',
    resume: 'For baggage, Canada’s Air Passenger Protection Regulations do not set their own scale. Section 23 requires the airline to pay at least the baggage fees you paid plus the compensation due under the Carriage by Air Act, which gives effect to the Montreal Convention, or the same amount on a domestic flight. Since 28 December 2024 the Convention limit is 1,519 special drawing rights per passenger, close to 2,900 Canadian dollars at the IMF rates of October 2026 (the calculator shows the exact figure and its date); it is a ceiling, not a flat amount, and you are paid the documented value of the loss or the reasonable cost of essentials bought while waiting. A bag counts as lost after 21 days, or earlier if the airline admits the loss. Write to the airline within 7 days of receiving a damaged bag, within 21 days of getting back a delayed one, and as soon as possible for a lost one; a court action must be brought within two years.',
    faqs: [
      { q: 'What can I claim while my bag is delayed?', a: 'Reasonable, documented costs of essentials: toiletries, a change of clothes, a charger, items you needed for the purpose of the trip. Keep every receipt and the property irregularity report the airline gave you at the airport. Buying a full new wardrobe is rarely accepted; replacing what you needed for the days without the bag usually is.' },
      { q: 'Are the baggage fees refunded when a bag is lost?', a: 'Yes. Section 23 of the Regulations lists the fees paid for that baggage as part of the minimum compensation, on top of the amount under the Montreal Convention rules. This applies to a bag lost for more than 21 days, a bag the airline admits is lost, a damaged bag, and a bag delayed for 21 days or less.' },
      { q: 'Why is the limit in SDR rather than dollars?', a: 'The Montreal Convention uses the special drawing right, a unit defined by the International Monetary Fund, so the limit is the same in every country. Its value in Canadian dollars moves each day. The calculator above converts 1,519 SDR with the IMF rate stored in the site and shows the date of that rate.' },
      { q: 'Can I declare a higher value at check-in?', a: 'Under the Convention, a passenger who makes a special declaration of interest in delivery at check-in, and pays any supplementary sum the airline asks, can raise the limit to the declared amount. Ask the airline before departure; for valuables, travel insurance or carrying them in the cabin is usually simpler.' },
    ],
    body: (h) => `
<h2>The limit, converted</h2>
<p>The Convention limit is ${h.n(h.P.montreal.baggage_sdr)} special drawing rights per passenger, revised by ICAO (${h.src('icao-limits', 'table certified in UK SI 2025/123')}) with effect from ${h.day(h.P.montreal.in_force)}. At the ${h.src('imf-sdr', 'IMF')} rate of ${h.day(h.P.sdr.cad_date)}, that is ${h.cad(h.P.montreal.baggage_sdr * h.P.sdr.cad)}, or ${h.eur(h.P.montreal.baggage_sdr * h.P.sdr.eur)} and ${h.gbp(h.P.montreal.baggage_sdr * h.P.sdr.gbp)} for the same bag in Europe or the UK. The ${h.src('cta-montreal', 'Canadian Transportation Agency')} notified carriers of the new limits.</p>
${h.mini('baggage', { d: { v: 3500, c: 2 } })}
<h2>Deadlines that cannot be missed</h2>
${h.table(['Situation', 'Write to the airline within', 'Note'], [
  ['Damaged bag', '7 days of receipt', 'photos, repair quote'],
  ['Delayed bag', '21 days of getting it back', 'receipts for essentials'],
  ['Lost bag', 'as soon as possible', 'lost after 21 days, or when admitted'],
  ['Court action', '2 years', 'from arrival or scheduled arrival'],
], 'Deadlines published by the Canadian Transportation Agency and set by the Montreal Convention', ['l', 'l', 'l'])}
<p>The ${h.src('cta-deadlines', 'Agency’s deadline page')} gives the same periods. Missing the 7 or 21-day window can end the claim entirely, whatever the value of the bag, so send a short written notice first and complete it later with receipts.</p>
<h2>A bag delayed and a flight delayed</h2>
<p>A late bag and a late flight are separate claims. The flight compensation of ${h.cad(h.P.appr.delay.large[0])} to ${h.cad(h.P.appr.delay.large[2])} depends on the cause and the hours lost (${h.a('ca', 'calculator for delays in Canada')}); the bag claim depends on what you spent or lost. Send them as two requests so that a refusal of one does not hold up the other, and quote the same booking reference in both.</p>
`,
  },
  fr: {
    slug: 'bagage-retarde-perdu-canada',
    nav: 'Bagage retardé ou perdu', card: 'Limite de la Convention de Montréal en dollars, frais de bagages remboursés, délais de 7 et 21 jours.',
    title: 'Bagage retardé ou perdu au Canada : indemnité et délais',
    description: 'Bagage retardé, perdu ou endommagé sur un vol canadien : limite de 1 519 DTS en dollars, frais de bagages remboursés, délais de 7 et 21 jours pour réclamer.',
    h1: 'Bagage retardé, perdu ou endommagé sur un vol au Canada',
    intro: 'Votre bagage vaut ce que vous pouvez prouver, jusqu’à la limite de la Convention de Montréal, plus les frais payés pour l’enregistrer.',
    resume: 'Pour les bagages, le Règlement sur la protection des passagers aériens ne fixe pas de barème propre. Son article 23 oblige la compagnie à verser au moins les frais de bagages payés, plus l’indemnité prévue par la Loi sur le transport aérien, qui met en œuvre la Convention de Montréal, ou le même montant sur un vol intérieur. Depuis le 28 décembre 2024, la limite de la Convention est de 1 519 droits de tirage spéciaux par passager, soit près de 2 900 dollars canadiens aux cours du FMI d’octobre 2026 (le calculateur donne le chiffre exact et sa date). C’est un plafond et non un forfait : vous êtes remboursé de la valeur prouvée de la perte ou du coût raisonnable des articles essentiels achetés pendant l’attente. Un bagage est réputé perdu après 21 jours, ou plus tôt si la compagnie l’admet. Écrivez dans les 7 jours suivant la réception d’un bagage endommagé, dans les 21 jours suivant la remise d’un bagage retardé, au plus tôt pour un bagage perdu ; une poursuite doit être intentée dans les deux ans.',
    faqs: [
      { q: 'Que puis-je réclamer pendant que mon bagage est retardé ?', a: 'Le coût raisonnable et prouvé des articles essentiels : produits de toilette, vêtements de rechange, chargeur, objets indispensables au but du voyage. Gardez chaque reçu et le rapport d’irrégularité remis à l’aéroport. Une garde-robe complète est rarement acceptée ; remplacer ce dont vous aviez besoin pendant les jours sans bagage l’est en général.' },
      { q: 'Les frais de bagages sont-ils remboursés en cas de perte ?', a: 'Oui. L’article 23 du Règlement inclut les frais payés pour ce bagage dans l’indemnité minimale, en plus du montant prévu selon la Convention de Montréal. La règle vaut pour un bagage perdu plus de 21 jours, un bagage dont la perte est admise, un bagage endommagé et un bagage retardé 21 jours ou moins.' },
      { q: 'Pourquoi la limite est-elle en DTS et non en dollars ?', a: 'La Convention de Montréal utilise le droit de tirage spécial, une unité définie par le Fonds monétaire international, pour que la limite soit la même partout. Sa valeur en dollars canadiens varie chaque jour. Le calculateur ci-dessus convertit 1 519 DTS au cours du FMI enregistré sur le site et affiche la date de ce cours.' },
      { q: 'Peut-on déclarer une valeur plus élevée à l’enregistrement ?', a: 'Selon la Convention, le passager qui fait une déclaration spéciale d’intérêt à la livraison lors de l’enregistrement, et paie le supplément éventuel demandé, relève la limite au montant déclaré. Renseignez-vous auprès de la compagnie avant le départ ; pour des objets de valeur, l’assurance voyage ou le bagage de cabine est souvent plus simple.' },
    ],
    body: (h) => `
<h2>La limite, convertie</h2>
<p>La limite de la Convention est de ${h.n(h.P.montreal.baggage_sdr)} droits de tirage spéciaux par passager, révisée par l’OACI (${h.src('icao-limits', 'tableau certifié par le règlement britannique SI 2025/123')}) à compter du ${h.day(h.P.montreal.in_force)}. Au cours du ${h.src('imf-sdr', 'FMI')} du ${h.day(h.P.sdr.cad_date)}, cela représente ${h.cad(h.P.montreal.baggage_sdr * h.P.sdr.cad)}, soit ${h.eur(h.P.montreal.baggage_sdr * h.P.sdr.eur)} pour le même bagage en Europe. L’${h.src('cta-montreal', 'Office des transports du Canada')} a avisé les transporteurs de ces nouvelles limites.</p>
${h.mini('baggage', { d: { v: 3500, c: 2 } })}
<h2>Des délais à ne pas manquer</h2>
${h.table(['Situation', 'Écrire à la compagnie dans les', 'À joindre'], [
  ['Bagage endommagé', '7 jours suivant la réception', 'photos, devis de réparation'],
  ['Bagage retardé', '21 jours suivant la remise', 'reçus des achats essentiels'],
  ['Bagage perdu', 'meilleurs délais', 'perdu après 21 jours, ou dès l’aveu'],
  ['Poursuite en justice', '2 ans', 'à compter de l’arrivée prévue ou réelle'],
], 'Délais publiés par l’Office des transports du Canada et fixés par la Convention de Montréal', ['l', 'l', 'l'])}
<p>La ${h.src('cta-deadlines', 'page des délais de l’Office')} donne les mêmes périodes. Manquer le délai de 7 ou de 21 jours peut éteindre la réclamation, quelle que soit la valeur du bagage : envoyez d’abord un court avis écrit, puis complétez avec les reçus.</p>
<h2>Bagage en retard et vol en retard</h2>
<p>Un bagage retardé et un vol retardé sont deux demandes distinctes. L’indemnité de vol, de ${h.cad(h.P.appr.delay.large[0])} à ${h.cad(h.P.appr.delay.large[2])}, dépend de la cause et des heures perdues (${h.a('ca', 'calculateur des retards au Canada')}) ; la demande pour le bagage dépend de ce que vous avez dépensé ou perdu. Envoyez deux demandes séparées pour qu’un refus ne bloque pas l’autre.</p>
`,
  },
});
