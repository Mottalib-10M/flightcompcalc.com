import { definePage } from '../../lib/page-types';

const DEST = ['LHR', 'DUB', 'AMS', 'CDG', 'KEF', 'BCN', 'PMI', 'AGP', 'TFS', 'EWR', 'YYZ', 'DXB'];

export default definePage({
  id: 'edi', group: 'uk', order: 350,
  tool: 'flight', toolArg: { from: 'EDI', to: 'PMI', event: 'delay', delay: 210, cause: 'airline', carrier: 'gb' },
  related: ['uk261', 'lhr', 'man', 'verjaehrung', 'anschluss'],
  sources: ['uk261', 'limitation-sc', 'limitation-ew', 'caa-delays', 'caa-adr'],
  en: {
    slug: 'edinburgh-airport-flight-delay-compensation',
    nav: 'Edinburgh (EDI)', card: 'Five years to claim, the simple procedure and transatlantic routes: what UK261 pays at Edinburgh.',
    title: 'Edinburgh Airport flight delay compensation: EDI, UK261',
    description: 'Edinburgh Airport (EDI) flight delay compensation: UK261 amounts for 12 routes, the five-year limit in Scotland, simple procedure and connections via London.',
    h1: 'Edinburgh Airport: delay compensation and the Scottish rules',
    intro: 'The amounts are the same across the UK. What differs in Scotland is how long you have and which court hears the claim.',
    resume: 'Flights from Edinburgh follow UK261 like any UK departure: an arrival three hours or more late, for a cause within the airline’s control, pays £220 per passenger up to 1,500 km, £350 up to 3,500 km and £520 beyond, halved to £260 on long haul when the delay stays under four hours. Edinburgh’s position shifts the bands for some routes. Palma de Mallorca, under 1,500 km from London, is well over it from here, and Reykjavík, at about 1,390 km, is the only short trip north. Two things are specific to Scotland. The limit for court claims is five years under the Prescription and Limitation (Scotland) Act 1973, not six as in England and Wales, and ADR bodies apply the same five years to passengers living in Scotland. A court claim of this size uses the simple procedure in the sheriff court. Passengers connecting through London on one booking are measured from Edinburgh to the final destination.',
    faqs: [
      { q: 'Do I have five or six years to claim for an Edinburgh flight?', a: 'Plan on five years, the period under Scots law, measured from the flight. It applies to claims brought in Scotland, which is where most passengers living there will sue, and it is shorter than the six years available in England and Wales, so do not wait until the last months. ADR bodies apply five years to passengers living in Scotland.' },
      { q: 'Where do I take an airline to court in Scotland?', a: 'In the sheriff court, using the simple procedure designed for claims of modest value. The forms can be filed online through the Scottish courts’ civil online service. In England and Wales the comparable route is Money Claim Online, which an Edinburgh passenger may also use against an airline based in England.' },
      { q: 'I missed a connection at Heathrow from Edinburgh. Which distance counts?', a: 'On a single booking, the distance from Edinburgh to your final destination and the delay at that destination. Edinburgh to New York through Heathrow is measured on the great circle Edinburgh to New York, about 5,230 km, so the top band. Separate tickets are assessed one flight at a time.' },
      { q: 'Is fog at Edinburgh an extraordinary circumstance?', a: 'Weather that makes operation unsafe or triggers air traffic control restrictions is outside the airline’s control. The question is whether your delay really came from it. If other flights left on time, or your aircraft was late for an unrelated reason, ask the airline for the specific cause and the times involved before accepting a refusal.' },
    ],
    body: (h) => `
<h2>Twelve routes from Edinburgh</h2>
${h.table(['Destination', 'Distance', '3 h 30 late', '4 h 30 late'], DEST.map((c) => [h.ap(c), h.km('EDI', c), h.owed('EDI', c, 210, { carrier: 'gb' }).find((r) => r.regime.startsWith('UK'))?.amount ?? '–', h.owed('EDI', c, 270, { carrier: 'gb' }).find((r) => r.regime.startsWith('UK'))?.amount ?? '–']), 'UK261 per passenger, cause within the airline’s control', ['l', 'r', 'r', 'r'])}
<p>London, Dublin, Amsterdam, Paris and Reykjavík are short-haul. Barcelona, ${h.km('EDI', 'BCN')}, Palma and Málaga sit in the middle band, and the transatlantic and Gulf routes in the top one, with the halving between three and four hours.</p>
${h.mini('route', { t: 'From Edinburgh: pick a destination', from: 'EDI', to: ['LHR', 'AMS', 'PMI', 'AGP', 'EWR', 'DXB'], d: { h: 3.5 } })}
<h2>Five years, not six</h2>
<p>${h.src('uk261', 'UK261')} sets no deadline of its own. National law fills the gap: six years under the ${h.src('limitation-ew', 'Limitation Act 1980')} in England and Wales, five years under the ${h.src('limitation-sc', 'Prescription and Limitation (Scotland) Act 1973')}. The ${h.src('caa-adr', 'CAA’s ADR guidance')} reflects the difference, accepting complaints about incidents within five years for passengers who live in Scotland. The deadline calculator below shows the date for each regime.</p>
${h.mini('deadline', { t: 'Last day to claim' })}
<h2>Care on the ground</h2>
<p>From two hours on short flights, three on medium routes and four on long haul, the airline must offer meals and refreshments, and a hotel with transport when the delay runs overnight, as the ${h.src('caa-delays', 'CAA explains')}. Winter mornings with fog or snow are the classic case at Edinburgh: no compensation if the weather was the real cause, but the care is owed regardless of the reason.</p>
<p>For connections, everything on one booking counts as one journey. A delay on the shuttle to London that makes you miss a long-haul flight is assessed at the final destination; the ${h.a('anschluss', 'missed connection page')} covers the details, and the ${h.a('uk261', 'UK261 page')} the full claim route.</p>
`,
  },
});
