import { definePage } from '../../lib/page-types';

const NEAR = ['BGY', 'BCN', 'MAD', 'KRK', 'PMI', 'WAW', 'IBZ', 'BUD', 'CIA', 'ALC', 'LIS', 'RIX', 'VNO', 'AGP', 'FAO'];

export default definePage({
  id: 'stn', group: 'uk', order: 340,
  tool: 'flight', toolArg: { from: 'STN', to: 'ALC', event: 'delay', delay: 190, cause: 'technical', carrier: 'eu' },
  related: ['uk261', 'lgw', 'man', 'distanz', 'schlichtung'],
  sources: ['uk261', 'eu261', 'caa-delays', 'caa-adr', 'money-claim'],
  en: {
    slug: 'stansted-flight-delay-compensation',
    nav: 'Stansted (STN)', card: 'Low-cost Europe, routes a few kilometres from 1,500 km and EU airlines: what UK261 pays at Stansted.',
    title: 'Stansted flight delay compensation: STN, the 1,500 km line',
    description: 'Stansted (STN) flight delay compensation: routes just under or over 1,500 km, £220 or £350, EU airlines from London, low fares, and what to do after a refusal.',
    h1: 'Stansted: delay compensation on low-cost European routes',
    intro: 'Many Stansted routes sit within a few dozen kilometres of 1,500 km, the line that separates £220 from £350.',
    resume: 'Stansted is a low-cost airport, with most flights to Spain, Italy, Poland, the Baltic states and Central Europe. UK261 covers every departure, whatever the airline, including airlines licensed in the EU that base aircraft in London. An arrival three hours or more late pays £220 per passenger up to 1,500 km and £350 beyond, and the distance is the great circle between the two airports, not the flown route. That puts many Stansted routes close to the line. Ibiza, Budapest and Rome Ciampino are 1,450 to 1,460 km away and pay £220; Alicante, at about 1,514 km, pays £350. On the way back, EU261 applies to any airline leaving the EU, in euros, and UK261 adds a sterling right for UK and EU airlines. The fare does not matter: a £25 ticket and a £250 ticket give the same amount. Low-cost airlines often refuse first claims, which is why the ADR step, free of charge for passengers, matters at Stansted.',
    faqs: [
      { q: 'Stansted to Alicante: £220 or £350?', a: 'About 1,514 km on the great circle, so £350 per passenger for an arrival three hours or more late, if the cause was within the airline’s control. Airlines sometimes quote a lower band by using a different distance; the regulation uses the great circle, which the calculator computes from the airport coordinates.' },
      { q: 'Does UK261 apply to an EU airline flying from Stansted?', a: 'Yes. UK261 covers every flight departing from the UK, whatever the airline’s nationality. An EU airline flying back to Stansted from Spain is covered by both EU261, because the flight leaves the EU, and UK261, because it lands in the UK on an EU carrier. One payment per flight.' },
      { q: 'The airline rejected my claim in two lines. What next?', a: 'Ask for the specific cause and evidence, then wait for the final answer or eight weeks. Then file with the airline’s approved ADR body; for passengers it costs nothing. If the airline is not in a scheme, the CAA’s complaints team can take the case up. Court remains open after either step.' },
      { q: 'Is a delay caused by crew shortages compensated?', a: 'Yes. Staff planning is the airline’s ordinary business, and an absent or sick crew is not an extraordinary circumstance; the Court of Appeal confirmed this in 2021 for a pilot’s illness. Only external causes, such as air traffic control restrictions or weather, excuse the airline.' },
    ],
    body: (h) => `
<h2>Fifteen routes around the 1,500 km line</h2>
${h.table(['Destination', 'Distance from STN', 'UK261', 'EU261 on the way back'], NEAR.map((c) => [h.ap(c), h.km('STN', c), h.owed('STN', c, 200, { carrier: 'eu' }).find((r) => r.regime.startsWith('UK'))?.amount ?? '–', h.owed(c, 'STN', 200, { carrier: 'eu' }).find((r) => r.regime.startsWith('EU'))?.amount ?? '–']), 'Per passenger, arrival 3 h 20 late, cause within the airline’s control, EU airline', ['l', 'r', 'r', 'r'])}
<p>Rome Ciampino, ${h.km('STN', 'CIA')}, and Alicante, ${h.km('STN', 'ALC')}, are about 55 km apart in distance and £130 apart in compensation. The line is the same under the ${h.src('eu261', 'EU regulation')} on the way back, with ${h.eur(h.P.eu261.amounts[0])} and ${h.eur(h.P.eu261.amounts[1])}. The distance page explains how the great circle is computed (${h.a('distanz', 'flight distance')}).</p>
${h.mini('band', { d: { km: 1514 }, t: 'Stansted: try a distance near 1,500 km' })}
<h2>Why a low fare does not reduce the claim</h2>
<p>The compensation in ${h.src('uk261', 'UK261')} is a fixed sum per passenger, set by distance only. It is not a refund and has no link with what you paid. On a route where tickets sell for £20, a three-hour delay is worth more than ten times the fare. That is also why first replies from low-cost airlines tend to be refusals citing air traffic control or weather: ask for the specific cause, the time it occurred and how it affected your aircraft.</p>
${h.mini('route', { t: 'From Stansted: pick a destination', from: 'STN', to: ['KRK', 'BUD', 'ALC', 'PMI', 'LIS', 'WAW'], d: { h: 3.33 } })}
<h2>Escalating a refusal</h2>
<p>After a refusal or eight weeks of silence, the airline’s approved ${h.src('caa-adr', 'ADR body')} reviews the file and its decision binds the airline if you accept it. During the delay the airline must also give care from two hours on routes up to 1,500 km and three hours beyond, as the ${h.src('caa-delays', 'CAA explains')}. The last step is a small claim through ${h.src('money-claim', 'Money Claim Online')}; the full route is on the ${h.a('uk261', 'UK261 page')}.</p>
`,
  },
});
