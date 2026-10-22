import { definePage, type Helpers } from '../../lib/page-types';

const ROUTES: Array<[string, 'gb' | 'other']> = [['JFK', 'gb'], ['JFK', 'other'], ['DXB', 'other'], ['SIN', 'gb'], ['DEL', 'other'], ['YYZ', 'other'], ['MAD', 'gb'], ['EDI', 'gb']];
const amt = (h: Helpers, f: string, t: string, c: 'gb' | 'other', min: number) => h.owed(f, t, min, { carrier: c }).find((r) => r.regime.startsWith('UK'))?.amount ?? '–';

export default definePage({
  id: 'lhr', group: 'uk', order: 310,
  tool: 'flight', toolArg: { from: 'LHR', to: 'JFK', event: 'delay', delay: 225, cause: 'technical', carrier: 'gb' },
  related: ['uk261', 'lgw', 'man', 'anschluss', 'yyz'],
  sources: ['uk261', 'caa-delays', 'caa-adr', 'limitation-ew', 'money-claim'],
  en: {
    slug: 'heathrow-flight-delay-compensation',
    nav: 'Heathrow (LHR)', card: 'Long haul, connections and inbound flights on foreign airlines: what UK261 pays at Heathrow.',
    title: 'Heathrow flight delay compensation: LHR long haul, UK261',
    description: 'Heathrow (LHR) flight delay compensation under UK261: £260 or £520 on long haul, connections through Heathrow, inbound flights on foreign airlines, claims.',
    h1: 'Heathrow: delay compensation on long haul and connecting flights',
    intro: 'At Heathrow most claims involve long haul, where half an hour either side of the four-hour line changes the amount by £260.',
    resume: 'Every flight leaving Heathrow is covered by UK261, whichever airline operates it, so a delayed departure to New York, Dubai or Singapore gives the same rights on a British, Gulf or American airline. Most Heathrow routes are over 3,500 km, which puts them in the top band: £520 per passenger for an arrival four hours or more late, or £260 when the delay is between three and four hours. Inbound flights are different: a flight from New York or Delhi to Heathrow is covered only if a UK or EU airline operates it, so the same delay on a US or Indian airline gives no right under UK261. For connections, the whole booking counts: a passenger flying Edinburgh to Singapore through Heathrow on one ticket is measured over the full distance and at the final arrival in Singapore. The airport’s closure on 21 March 2025, after a fire at an electrical substation, is a typical extraordinary circumstance: no compensation, but care and rebooking remained owed.',
    faqs: [
      { q: 'My Heathrow to New York flight arrived three hours forty late. £260 or £520?', a: 'The airline may pay £260, because for flights over 3,500 km arriving between three and four hours late the amount can be halved. It is an option, not an obligation, and some airlines pay the full £520 when asked. At four hours or more the reduction is no longer possible.' },
      { q: 'I flew into Heathrow from Delhi on an Indian airline. Am I covered?', a: 'Not by UK261, because flights arriving in the UK from outside are covered only when a UK or EU airline operates them. The law of the departure country may give you rights, and the Montreal Convention still covers proven damage from the delay, such as a lost hotel night, up to its limit.' },
      { q: 'Does the March 2025 closure give a right to compensation?', a: 'No. A fire at an external electricity substation that shuts the airport is outside the airlines’ control and counts as an extraordinary circumstance. Airlines still had to provide meals, hotels where needed and the earliest rebooking, or a refund. Expenses you paid yourself because care was not offered can still be claimed.' },
      { q: 'I missed a connection at Heathrow on separate tickets. What can I claim?', a: 'Only for the flight that was itself delayed, measured on its own distance and its own arrival time. A missed onward flight on a separate ticket is your loss unless the airline of the first flight accepts it. On a single booking, by contrast, the final arrival decides everything.' },
    ],
    body: (h) => `
<h2>Long haul from Heathrow: the four-hour line</h2>
${h.table(['Route', 'Airline', 'Distance', '3 h 30 late', '4 h 30 late'], ROUTES.map(([c, k]) => [`LHR to ${h.ap(c)}`, k === 'gb' ? 'UK' : 'non-UK', h.km('LHR', c), amt(h, 'LHR', c, k, 210), amt(h, 'LHR', c, k, 270)]), 'UK261 compensation per passenger on departures from Heathrow, cause within the airline’s control', ['l', 'l', 'r', 'r', 'r'])}
<p>On departures the airline’s nationality makes no difference: ${h.src('uk261', 'UK261')} covers them all. Madrid and Edinburgh, both under 1,500 km, stay at the lowest amount, with no reduction. For long-haul routes the difference between the two columns is the reduction, which only exists between three and four hours.</p>
${h.mini('delay', { d: { h: 3.67, b: 2 }, t: 'Heathrow long haul: amount by delay' })}
<h2>Flights into Heathrow</h2>
${h.table(['From', 'UK airline', 'Non-UK, non-EU airline'], ['JFK', 'DXB', 'DEL', 'SIN', 'YYZ'].map((c) => [h.ap(c), amt(h, c, 'LHR', 'gb', 270), amt(h, c, 'LHR', 'other', 270)]), 'Inbound delay of 4 h 30, cause within the airline’s control', ['l', 'r', 'r'])}
<p>The right column is empty for UK261. A flight from Toronto on a Canadian airline is still covered by the Canadian rules in their own currency, which is why the calculator shows them for that route. Elsewhere, only the Montreal Convention remains, and it pays proven damage rather than a fixed sum.</p>
${h.mini('route', { t: 'From Heathrow: pick a destination', from: 'LHR', to: ['JFK', 'DXB', 'SIN', 'DEL', 'YYZ', 'MAD'], d: { h: 4.5 } })}
<h2>Connections through Heathrow</h2>
<p>On one booking, distance runs from the first airport to the last and delay is measured at the last. Edinburgh to Singapore via Heathrow counts ${h.km('EDI', 'SIN')}, not the ${h.km('EDI', 'LHR')} of the first leg, and a late feeder that makes you miss the Singapore flight gives the long-haul amount if you land four hours or more late. The airline that operated the late flight pays. During the wait it must also provide care, as the ${h.src('caa-delays', 'CAA explains')}.</p>
<h2>Making the claim</h2>
<p>Send the claim to the operating airline. If it refuses, or eight weeks pass without a final answer, go to its ${h.src('caa-adr', 'approved ADR body')}. Court remains possible for six years in England and Wales (${h.src('limitation-ew', 'Limitation Act 1980')}), through ${h.src('money-claim', 'Money Claim Online')}. The full route is set out on the ${h.a('uk261', 'UK261 page')}.</p>
`,
  },
});
