import { definePage, type Helpers } from '../../lib/page-types';

const DEST = ['PMI', 'ALC', 'AGP', 'FAO', 'LPA', 'TFS', 'DLM', 'AYT', 'HER', 'DXB', 'MCO'];
const uk = (h: Helpers, f: string, t: string, min: number) => h.owed(f, t, min, { carrier: 'gb' }).find((r) => r.regime.startsWith('UK'))?.amount ?? '–';

export default definePage({
  id: 'man', group: 'uk', order: 330,
  tool: 'flight', toolArg: { from: 'MAN', to: 'PMI', event: 'delay', delay: 240, cause: 'technical', carrier: 'gb' },
  related: ['uk261', 'lgw', 'stn', 'edi', 'gepaeck'],
  sources: ['uk261', 'eu261', 'caa-delays', 'caa-adr', 'money-claim'],
  en: {
    slug: 'manchester-airport-flight-delay-compensation',
    nav: 'Manchester (MAN)', card: 'Holiday charters, package trips and the longer distances from the North: what UK261 pays at Manchester.',
    title: 'Manchester Airport flight delay compensation: MAN, UK261',
    description: 'Manchester Airport (MAN) flight delay compensation: why Palma pays £350 from here but £220 from London, Turkey and Florida, package trips and the claim route.',
    h1: 'Manchester Airport: delay compensation on holiday flights from the North',
    intro: 'From Manchester the same resorts are further away than from London, and that moves several of them into the higher UK261 band.',
    resume: 'Every departure from Manchester is covered by UK261: an arrival three hours or more late, for a cause within the airline’s control, gives £220 per passenger up to 1,500 km, £350 from 1,500 to 3,500 km and £520 beyond, or £260 on long haul if the delay stays under four hours. Because Manchester lies about 250 km north-west of London, the main Spanish destinations cross the 1,500 km line from here: Palma de Mallorca is about 1,580 km away and pays £350, where the same flight from Gatwick pays £220. Turkey and Crete stay in the middle band, Dubai and Orlando in the top one. Most flights from Manchester are holiday flights, often booked as packages with a tour operator; compensation is still claimed from the airline. On the way back, a flight from Spain, Portugal or Greece leaves the EU and is covered by EU261 for any airline, in euros, as well as UK261 for UK and EU airlines; a flight from Turkey is covered only by UK261, and only on a UK or EU airline.',
    faqs: [
      { q: 'Why does Palma pay more from Manchester than from London?', a: 'Because the amount depends only on great-circle distance. Manchester to Palma is about 1,580 km, above the 1,500 km line, so £350; Gatwick to Palma is about 1,310 km, so £220. Alicante shows the same effect: about 1,680 km from Manchester, 1,430 km from Gatwick.' },
      { q: 'My return flight from Dalaman was five hours late. Is anything owed?', a: 'Turkey is outside both the UK and the EU, so the flight back is covered by UK261 only if a UK or EU airline operated it. Then, at about 3,020 km, it is £350 per passenger. On a Turkish airline the fixed compensation does not apply, though the Montreal Convention covers proven costs.' },
      { q: 'Does a package holiday change anything?', a: 'The airline still owes the fixed compensation, whoever sold you the seat. The tour operator is separately responsible for the package under the Package Travel Regulations 2018, for instance if lost holiday time justifies a price reduction. Ask the airline first; what it pays for the same event may be taken into account by the operator.' },
      { q: 'How long do I have for a Manchester flight?', a: 'Six years from the flight under the law of England and Wales, the limit that applies to Manchester. The airline’s ADR scheme accepts complaints within that period, and within twelve months of the airline’s final answer. Waiting gains nothing, though: records such as the door-opening time are easier to obtain early.' },
    ],
    body: (h) => `
<h2>Holiday routes from Manchester</h2>
${h.table(['Destination', 'From Manchester', 'Amount from MAN', 'From Gatwick', 'Amount from LGW'], DEST.map((c) => [h.ap(c), h.km('MAN', c), uk(h, 'MAN', c, 250), h.km('LGW', c), uk(h, 'LGW', c, 250)]), 'UK261 per passenger, arrival 4 h 10 late, cause within the airline’s control', ['l', 'r', 'r', 'r', 'r'])}
<p>Palma and Alicante cross the line between the two columns. For the Canaries, Turkey and Crete the band is the same from both airports, and long haul to Dubai or Orlando reaches ${h.gbp(h.P.uk261.amounts[2])} from either.</p>
${h.mini('route', { t: 'From Manchester: pick a destination', from: 'MAN', to: ['PMI', 'ALC', 'FAO', 'TFS', 'AYT', 'DXB'], d: { h: 4.17 } })}
<h2>Coming home</h2>
<p>For the return leg the departure country decides. From Spain, Portugal, Greece or Cyprus the ${h.src('eu261', 'EU regulation')} applies to every airline, so Palma to Manchester pays ${h.eur(h.P.eu261.amounts[1])} for a delay over three hours, and ${h.src('uk261', 'UK261')} adds a sterling right if a UK or EU airline flies. From Turkey, Egypt or Morocco only UK261 can apply, and only to UK and EU airlines. Claim under the regime that pays more, once.</p>
${h.mini('delay', { d: { h: 3.5, b: 1 }, t: 'Manchester holiday flights: amount by delay' })}
<h2>Overnight delays and care</h2>
<p>Early-morning holiday departures that slip to the evening, or evening flights that move to the next day, are common at Manchester in summer. From three hours of delay on medium routes, the airline must offer meals and refreshments, and a hotel with transfers if you are stuck overnight, as the ${h.src('caa-delays', 'CAA sets out')}. If it does not, buy what is reasonable, keep receipts and claim them alongside the compensation. After five hours you can cancel the trip and get the ticket refunded.</p>
<h2>When the airline says no</h2>
<p>After a refusal, or eight weeks without a final answer, take the complaint to the airline’s ${h.src('caa-adr', 'ADR body')}. If that fails, a claim online through ${h.src('money-claim', 'Money Claim Online')} goes to the small claims track. The complete route is on the ${h.a('uk261', 'UK261 page')}, and lost or damaged bags follow different rules and deadlines (${h.a('gepaeck', 'baggage')}).</p>
`,
  },
});
