import { definePage, type Helpers } from '../../lib/page-types';

type C = 'gb' | 'eu' | 'other';
const CASES: Array<[string, string, string, C]> = [
  ['London Gatwick to Faro, UK airline', 'LGW', 'FAO', 'gb'],
  ['Faro to London Gatwick, UK airline', 'FAO', 'LGW', 'gb'],
  ['Faro to London Gatwick, EU airline', 'FAO', 'LGW', 'eu'],
  ['New York to London Heathrow, UK airline', 'JFK', 'LHR', 'gb'],
  ['New York to London Heathrow, US airline', 'JFK', 'LHR', 'other'],
  ['Manchester to Dubai, any airline', 'MAN', 'DXB', 'other'],
  ['Edinburgh to Amsterdam, UK airline', 'EDI', 'AMS', 'gb'],
];
const cell = (h: Helpers, f: string, t: string, c: C, reg: string) => {
  const r = h.owed(f, t, 250, { carrier: c }).find((x) => x.regime.startsWith(reg));
  return r && r.amount !== '–' ? r.amount : 'no';
};

export default definePage({
  id: 'uk261', group: 'uk', order: 300,
  tool: 'flight', toolArg: { from: 'LGW', to: 'FAO', event: 'delay', delay: 200, cause: 'technical', carrier: 'gb' },
  related: ['lhr', 'lgw', 'man', 'stn', 'edi', 'drei-stunden'],
  sources: ['uk261', 'caa-delays', 'caa-cancel', 'caa-adr', 'limitation-ew', 'limitation-sc', 'money-claim'],
  en: {
    slug: 'uk261-flight-delay-compensation',
    nav: 'UK261 compensation', card: 'The UK version of the EU rules: £220, £350 or £520, which flights it covers, and how to escalate a refusal.',
    title: 'UK261 flight delay compensation: £220, £350 or £520',
    description: 'UK261 flight delay compensation explained: which flights are covered, £220 to £520 by distance, refunds after five hours, ADR and court, six years to claim.',
    h1: 'UK261: compensation for delayed and cancelled flights from the UK',
    intro: 'Since Brexit the UK has kept the EU passenger rules as its own law, with the same three hours and the amounts converted into pounds.',
    resume: 'UK261 is Regulation (EC) No 261/2004 as retained in UK law at the end of the Brexit transition period and amended since. It covers every flight departing from a UK airport, whatever the airline, and flights arriving in the UK from abroad when a UK or EU airline operates them. If you reach your final destination three hours or more late, or your flight is cancelled less than 14 days before departure, each passenger is owed £220 for flights up to 1,500 km, £350 from 1,500 to 3,500 km and £520 beyond, which the airline may halve to £260 when a long-haul delay stays under four hours. Nothing is owed when the cause was an extraordinary circumstance such as weather or air traffic control restrictions, but a technical fault or a sick crew member is the airline’s problem under UK case law. After five hours of delay you may choose a refund instead of flying. Claims can be brought for six years in England and Wales and five years in Scotland, through the airline first, then an approved ADR body or the Civil Aviation Authority, then the courts.',
    faqs: [
      { q: 'Is a flight from Spain to the UK covered by UK261 or EU261?', a: 'Often both. A flight leaving the EU is covered by EU261 whatever the airline, paid in euros. If a UK or EU airline operates it, UK261 also applies on arrival in the UK, paid in pounds. You can claim under one of them for the delay, not both; choose the one with the higher amount on the day.' },
      { q: 'Does a technical fault count as an extraordinary circumstance in the UK?', a: 'Generally not. The Court of Appeal held in Huzar v Jet2.com in 2014 that a technical problem arising in the normal operation of an aircraft is part of the airline’s ordinary business. In Lipton v BA CityFlyer in 2021 it reached the same view for a pilot who fell ill. These judgments bind lower courts in England and Wales.' },
      { q: 'What can I do if the airline ignores my claim?', a: 'After eight weeks without a final answer, or after a refusal, take the complaint to the approved ADR body the airline has signed up to, AviationADR or CEDR, or to the CAA’s Passenger Advice and Complaints Team if it has none. ADR decisions bind the airline if you accept them. You can still go to court afterwards.' },
      { q: 'Are the amounts going to change?', a: 'Nothing has been adopted in the UK. The EU amended its own regulation in 2026 for flights from October 2027, but that change does not apply to UK261, which stays as it is unless Parliament or the government amends it. The figures on this page are those of the retained text in force on the date shown.' },
    ],
    body: (h) => `
<h2>Which flights UK261 covers</h2>
<p>The table runs the site’s engine on seven typical cases with an arrival delay of four hours and ten minutes and a cause within the airline’s control. It shows how often two regimes overlap since 2021.</p>
${h.table(['Flight', 'Distance', 'UK261', 'EU261'], CASES.map(([label, f, t, c]) => [label, h.km(f, t), cell(h, f, t, c, 'UK'), cell(h, f, t, c, 'EU')]), 'Compensation per passenger, delay of 4 h 10 at arrival, cause within the airline’s control', ['l', 'r', 'r', 'r'])}
<p>Three rules explain every line. First, any departure from the UK is covered by ${h.src('uk261', 'UK261')}. Second, an arrival in the UK is covered only if a UK or EU airline operates the flight, so a US airline from New York is outside it. Third, EU261 still applies on its own terms to flights leaving the EU, so the Faro to Gatwick leg carries a euro amount whatever the airline.</p>
${h.mini('band', { d: { km: 1688 }, t: 'UK261 and EU261 by distance' })}
<h2>The amounts in detail</h2>
${h.table(['Distance', 'Delay at arrival', 'Compensation'], [
  ['Up to 1,500 km', '3 h or more', h.gbp(h.P.uk261.amounts[0])],
  ['1,500 to 3,500 km, and flights within the UK over 1,500 km', '3 h or more', h.gbp(h.P.uk261.amounts[1])],
  ['Over 3,500 km', '3 h to under 4 h', h.gbp(h.P.uk261.amounts[2] / 2)],
  ['Over 3,500 km', '4 h or more', h.gbp(h.P.uk261.amounts[2])],
], 'Article 7 of Regulation 261/2004 as retained in UK law', ['l', 'l', 'r'])}
<p>The distance is measured on the great circle between the first departure airport and the final destination on one booking, not along the route flown. The delay is counted until a door opens and passengers may leave, as in the ${h.src('caa-delays', 'Civil Aviation Authority’s guidance')}. A cancellation pays the same amounts, unless you were told at least 14 days before, or were offered a replacement close to your original times, as set out in the ${h.src('caa-cancel', 'CAA’s page on cancellations')}.</p>
${h.mini('delay', { d: { h: 3.5, b: 2 }, t: 'Long haul: the four-hour line' })}
<h2>What the airline owes besides money</h2>
<p>From two hours of delay on short flights, three on medium and four on long ones, the airline must offer food and drink in proportion to the wait, and a hotel with transfers if you are stuck overnight. Keep receipts: reasonable expenses you paid yourself because the airline did not provide care are claimed separately from the fixed compensation. After five hours you can give up the journey and get the unused part of the ticket refunded, with a flight back to your starting point if you are mid-trip.</p>
<h2>How to escalate</h2>
<p>Write to the airline that operated the flight first; the letter generator above prepares the text with the right article and amount. If the airline refuses, or has not given a final answer after eight weeks, the next step depends on whether it belongs to an approved scheme. Most large airlines use ${h.src('caa-adr', 'AviationADR or CEDR')}; their decision binds the airline if you accept it, and you have twelve months from the airline’s final response to apply. Airlines outside any scheme are handled by the CAA’s Passenger Advice and Complaints Team, which can press the airline but cannot impose a decision.</p>
<p>Court is the last step. In England and Wales a claim of this size goes on the small claims track and can be filed with ${h.src('money-claim', 'Money Claim Online')}; the time limit is six years under ${h.src('limitation-ew', 'section 9 of the Limitation Act 1980')}. In Scotland the limit is five years under the ${h.src('limitation-sc', 'Prescription and Limitation (Scotland) Act 1973')}, and claims go through the simple procedure in the sheriff court.</p>
${h.box('Claims companies', '<p>A claims company files the same letter, then the same ADR form, and keeps a share of the payment. Every step above is free for passengers, apart from a court fee that the airline is usually ordered to repay if you win. ADR bodies say they decide most cases within three months.</p>')}
`,
  },
});
