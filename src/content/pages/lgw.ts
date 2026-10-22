import { definePage } from '../../lib/page-types';

const DEST = ['NCE', 'BCN', 'MAD', 'PMI', 'ALC', 'LIS', 'AGP', 'FAO', 'ATH', 'TFS'];

export default definePage({
  id: 'lgw', group: 'uk', order: 320,
  tool: 'flight', toolArg: { from: 'LGW', to: 'FAO', event: 'delay', delay: 195, cause: 'technical', carrier: 'gb' },
  related: ['uk261', 'lhr', 'stn', 'streik', 'annullierung'],
  sources: ['uk261', 'eu261', 'caa-delays', 'caa-cancel', 'caa-adr'],
  en: {
    slug: 'gatwick-flight-delay-compensation',
    nav: 'Gatwick (LGW)', card: 'Short-haul holidays, the 1,500 km line and return flights from Europe: what UK261 and EU261 pay at Gatwick.',
    title: 'Gatwick flight delay compensation: LGW, £220 or £350',
    description: 'Gatwick (LGW) flight delay compensation: £220 or £350 on European routes, destinations near the 1,500 km line, return flights under EU261, ATC delays.',
    h1: 'Gatwick: delay compensation on European holiday routes',
    intro: 'Gatwick is a short-haul airport, and for many of its routes the only question is which side of 1,500 km the destination lies.',
    resume: 'From Gatwick, most flights go to Spain, Portugal, Italy, Greece and France, operated mainly by UK low-cost and leisure airlines. UK261 covers every departure: an arrival three hours or more late pays £220 per passenger up to 1,500 km and £350 from 1,500 to 3,500 km. Several popular destinations sit close to the line. Palma and Alicante are just under, Lisbon, Málaga and Faro just over, so the same delay is worth £130 more to the Algarve than to Mallorca. On the way home, a flight from Faro or Málaga to Gatwick is covered by EU261 because it leaves the EU, whatever the airline, with €250 or €400, and by UK261 as well when a UK or EU airline operates it. You claim once, under the regime that pays more. Days of air traffic control restrictions, such as the UK network failure of 28 August 2023, are extraordinary circumstances: rebooking and care, no compensation.',
    faqs: [
      { q: 'Gatwick to Faro arrived three hours late. How much?', a: 'The great-circle distance is about 1,690 km, over 1,500, so UK261 gives £350 per passenger if the cause was within the airline’s control. On the way back, Faro to Gatwick, EU261 also applies and gives €400. You can claim either amount for a given flight, not both.' },
      { q: 'Are air traffic control delays ever compensated?', a: 'Not when the restriction comes from air traffic control itself, such as a capacity limit or a system failure, because it is outside the airline’s control. If the airline blames air traffic control but the slot was lost because the aircraft or crew was late, the original cause counts. Ask the airline for the reason and the slot time in writing.' },
      { q: 'My Gatwick flight was cancelled five days before. Is money owed?', a: 'Yes, unless the airline offered a replacement that left no more than one hour earlier and arrived less than two hours later than planned. With less than 14 days of notice, the cancellation pays like a delay under UK261: £220 or £350 on European routes, depending on distance, plus a refund or rebooking.' },
      { q: 'Is the amount per booking or per passenger?', a: 'Per passenger, including children with their own seat. A family of four delayed more than three hours on a Gatwick to Lisbon flight can claim four times £350. Passengers travelling free of charge, such as some infants on a parent’s lap, are excluded by Article 3(3).' },
    ],
    body: (h) => `
<h2>Ten destinations either side of 1,500 km</h2>
${h.table(['Destination', 'Distance', 'UK261 from Gatwick', 'EU261 back to Gatwick'], DEST.map((c) => [h.ap(c), h.km('LGW', c), h.owed('LGW', c, 200, { carrier: 'gb' }).find((r) => r.regime.startsWith('UK'))?.amount ?? '–', h.owed(c, 'LGW', 200, { carrier: 'gb' }).find((r) => r.regime.startsWith('EU'))?.amount ?? '–']), 'Arrival delay of 3 h 20, cause within the airline’s control, UK airline', ['l', 'r', 'r', 'r'])}
<p>The line falls between Alicante, ${h.km('LGW', 'ALC')}, and Lisbon, ${h.km('LGW', 'LIS')}. On the return leg the euro amounts of the ${h.src('eu261', 'EU regulation')} follow the same bands, so Faro to Gatwick pays ${h.eur(h.P.eu261.amounts[1])}. Tenerife, almost 3,000 km away, stays in the middle band under both regimes.</p>
${h.mini('band', { d: { km: Math.round(h.dist('LGW', 'FAO')) }, t: 'Gatwick: distance and amount' })}
<h2>Air traffic control days</h2>
<p>Gatwick has one main runway, and its summer schedule leaves little slack. When air traffic control limits flows, the first delays roll on through the day. Under ${h.src('uk261', 'UK261')} such a restriction is an extraordinary circumstance for the flight it directly affects. For later flights, the airline has to show that the delay still followed from the restriction and that it took reasonable measures, such as a spare aircraft or crew. The ${h.src('caa-delays', 'CAA’s guidance')} sets out what it must provide meanwhile: food and drink, and a hotel when the wait runs overnight.</p>
${h.mini('route', { t: 'From Gatwick: pick a destination', from: 'LGW', to: ['PMI', 'ALC', 'LIS', 'FAO', 'AGP', 'ATH'], d: { h: 3.25 } })}
<h2>Cancelled holidays</h2>
<p>If the airline cancels a few days before departure and moves you to a flight the next day, compensation is owed unless the new times are within the limits in the ${h.src('caa-cancel', 'CAA’s cancellation guidance')}. A package booked with a tour operator adds rights against the operator, but the fixed amount is still claimed from the airline. Refusals go to the airline’s ${h.src('caa-adr', 'ADR body')} after eight weeks; the steps are on the ${h.a('uk261', 'UK261 page')}.</p>
`,
  },
});
