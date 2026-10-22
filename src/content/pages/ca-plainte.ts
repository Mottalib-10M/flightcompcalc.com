import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'ca-plainte', group: 'ca', order: 440,
  tool: 'deadline', toolArg: { date: '2026-03-14', law: 'ca' },
  related: ['ca', 'appr', 'ca-annulation', 'ca-bagages'],
  sources: ['cta-complaints', 'cta-deadlines', 'appr', 'cta-act'],
  en: {
    slug: 'cta-complaint',
    nav: 'Complaint to the CTA', card: 'When and how to take an unpaid claim to the Canadian Transportation Agency.',
    title: 'CTA complaint for a flight delay: steps, proof, deadlines',
    description: 'CTA complaint after a refused or unanswered APPR claim: write to the airline first, wait 30 days, keep proof, then file with the Transportation Agency online.',
    h1: 'Taking an unpaid flight claim to the Canadian Transportation Agency',
    intro: 'The Agency only steps in after the airline has had its chance: the order of the steps matters as much as the claim.',
    resume: 'The Canadian Transportation Agency resolves disputes between passengers and airlines over the Air Passenger Protection Regulations and the airlines’ tariffs. It does not replace the claim to the airline: you first have to write to the carrier that operated the flight, before the first anniversary of the delay or cancellation, and give it 30 days to reply, which is also the period the Regulations give it to pay or explain a refusal. If the claim is still unresolved after those 30 days, or the answer does not apply the rules, you can file a complaint with the Agency online and attach proof of your written request. The Agency can order the airline to pay what the Regulations require. Its process takes time: news reports in 2025 described a backlog of tens of thousands of complaints and waits measured in months. Filing costs nothing, needs no lawyer, and a claims company adds nothing to the file except its fee.',
    faqs: [
      { q: 'Do I have to wait 30 days before complaining?', a: 'Yes, in principle. The Agency asks passengers to contact the airline in writing first and give it 30 days to respond, and to keep proof of that contact. Section 19 of the Regulations sets the same 30 days for the airline to pay or explain why compensation is not payable, so a complaint filed earlier is usually sent back.' },
      { q: 'What should the complaint file contain?', a: 'The booking confirmation, the boarding pass, the flight number and date, your written request to the airline with its date, the airline’s answer if there is one, and any message stating the cause of the disruption. Add receipts for meals or hotels you paid yourself, and say clearly what amount you are asking for and under which section.' },
      { q: 'Can I go to small claims court instead?', a: 'You can bring a claim before a provincial court instead of, or after, a complaint to the Agency, under the rules of your province. Courts set their own limits and fees. Do not pursue both for the same amount at once: compensation cannot be collected twice for the same event.' },
      { q: 'Does the Agency handle flights from Europe?', a: 'It handles complaints about flights to, from and within Canada under the Canadian rules. For compensation under the EU regulation on a flight leaving Europe, the national enforcement body of the departure country or a European court is competent. The calculator shows which regime applies to your flight.' },
    ],
    body: (h) => `
<h2>The order of the steps</h2>
<ol>
<li>Write to the airline that operated the flight, before the first anniversary of the delay or cancellation. The letter produced by the ${h.a('ca', 'calculator')} contains everything required.</li>
<li>Wait 30 days. The airline must pay or explain why it considers nothing is owed.</li>
<li>No answer, or a refusal that misreads the rules: file a complaint with the ${h.src('cta-complaints', 'Canadian Transportation Agency')}, with proof of step 1.</li>
</ol>
<p>The deadline calculator above shows the last day to send your request for a flight on the date you enter, under each regime. For a flight on 14 March 2026, the APPR request must reach the airline by ${h.day('2027-03-13')}.</p>
${h.mini('deadline', { d: { y: 2026, m: 3 } })}
<h2>What the Agency looks at</h2>
<p>The question is usually the category of the cause. An airline that refuses because of “safety” or “circumstances beyond our control” must be able to show which situation of section 10 or which safety decision applied. Ask for that explanation in writing; section 13 of the ${h.src('appr', 'Regulations')} obliges the airline to state the reason. A complaint that sets out the airline’s stated cause next to the facts you saw is easier to decide.</p>
<h2>What it does not do</h2>
<p>It does not give compensation for stress or lost earnings beyond the Regulations and tariffs, and it does not pay twice when you were already compensated under another regime (${h.src('cta-act', 'section 86.11(3)')}). For damage beyond the fixed amounts, a court is the route. Baggage has its own short deadlines: see ${h.a('ca-bagages', 'delayed and lost baggage')}.</p>
`,
  },
  fr: {
    slug: 'plainte-office-transports-canada',
    nav: 'Plainte à l’Office des transports', card: 'Quand et comment porter une demande impayée devant l’Office des transports du Canada.',
    title: 'Plainte à l’Office des transports du Canada : étapes, délais',
    description: 'Plainte à l’Office des transports du Canada après un refus ou un silence de la compagnie : écrire, attendre 30 jours, garder la preuve, déposer en ligne.',
    h1: 'Porter une demande d’indemnité impayée devant l’Office des transports du Canada',
    intro: 'L’Office n’intervient qu’après que la compagnie a eu sa chance : l’ordre des démarches compte autant que la demande elle-même.',
    resume: 'L’Office des transports du Canada règle les différends entre passagers et compagnies aériennes sur le Règlement sur la protection des passagers aériens et les tarifs des transporteurs. Il ne remplace pas la demande au transporteur : il faut d’abord écrire à la compagnie qui exploitait le vol, avant le premier anniversaire du retard ou de l’annulation, et lui laisser 30 jours pour répondre, soit le délai que le Règlement lui donne pour payer ou motiver un refus. Si la demande n’est toujours pas réglée après ces 30 jours, ou si la réponse n’applique pas les règles, vous pouvez déposer une plainte en ligne auprès de l’Office en joignant la preuve de votre demande écrite. L’Office peut ordonner au transporteur de payer ce que prévoit le Règlement. La procédure est longue : en 2025, la presse faisait état d’un arriéré de plusieurs dizaines de milliers de plaintes et d’attentes de plusieurs mois. Le dépôt est gratuit, sans avocat, et une société de réclamation n’ajoute au dossier que sa commission.',
    faqs: [
      { q: 'Faut-il vraiment attendre 30 jours avant de porter plainte ?', a: 'En principe, oui. L’Office demande de communiquer d’abord par écrit avec la compagnie, de lui laisser 30 jours pour répondre et de garder la preuve de cette démarche. L’article 19 du Règlement donne le même délai au transporteur pour payer ou expliquer pourquoi rien n’est dû : une plainte déposée trop tôt est généralement renvoyée.' },
      { q: 'Que mettre dans le dossier de plainte ?', a: 'La confirmation de réservation, la carte d’embarquement, le numéro et la date du vol, votre demande écrite datée, la réponse de la compagnie s’il y en a une et tout message indiquant la cause. Ajoutez les reçus de repas ou d’hôtel payés vous-même, et précisez le montant demandé et l’article du Règlement invoqué.' },
      { q: 'Peut-on plutôt aller à la Cour des petites créances ?', a: 'Vous pouvez saisir un tribunal provincial au lieu de l’Office, ou après lui, selon les règles de votre province, qui fixent leurs propres plafonds et frais. Évitez de mener les deux démarches en même temps pour le même montant : on ne peut pas être indemnisé deux fois pour le même événement.' },
      { q: 'L’Office traite-t-il les vols au départ de l’Europe ?', a: 'Il traite les plaintes sur les vols à destination, en provenance ou à l’intérieur du Canada selon les règles canadiennes. Pour une indemnité du règlement européen sur un vol au départ de l’Europe, c’est l’organisme national du pays de départ ou un tribunal européen qui est compétent. Le calculateur indique quel régime s’applique.' },
    ],
    body: (h) => `
<h2>Les démarches, dans l’ordre</h2>
<ol>
<li>Écrire à la compagnie qui exploitait le vol, avant le premier anniversaire du retard ou de l’annulation. La lettre produite par le ${h.a('ca', 'calculateur')} contient tout ce qu’il faut.</li>
<li>Attendre 30 jours : la compagnie doit payer ou expliquer pourquoi elle estime ne rien devoir.</li>
<li>Sans réponse, ou devant un refus mal fondé : déposer une plainte auprès de l’${h.src('cta-complaints', 'Office des transports du Canada')}, avec la preuve de l’étape 1.</li>
</ol>
<p>Le calculateur de délais ci-dessus donne le dernier jour pour envoyer votre demande selon chaque régime. Pour un vol du 14 mars 2026, la demande au titre du RPPA doit parvenir au transporteur au plus tard le ${h.day('2027-03-13')}.</p>
${h.mini('deadline', { d: { y: 2026, m: 3 } })}
<h2>Ce que l’Office examine</h2>
<p>La question porte le plus souvent sur la catégorie de la cause. Une compagnie qui refuse au nom de la « sécurité » ou de « circonstances indépendantes de sa volonté » doit pouvoir dire quelle situation de l’article 10 ou quelle décision de sécurité s’appliquait. Demandez cette explication par écrit : l’article 13 du ${h.src('appr', 'Règlement')} oblige le transporteur à donner la raison. Une plainte qui met la cause invoquée en regard des faits observés se tranche plus facilement.</p>
<h2>Ce qu’il ne fait pas</h2>
<p>Il n’accorde pas d’indemnité pour le stress ou une perte de revenus au-delà du Règlement et des tarifs, et ne paie pas deux fois si vous avez déjà été indemnisé sous un autre régime (${h.src('cta-act', 'paragraphe 86.11(3)')}). Pour un préjudice supérieur aux montants fixes, il faut passer par un tribunal. Les bagages ont leurs propres délais, courts : voir ${h.a('ca-bagages', 'bagage retardé ou perdu')}.</p>
`,
  },
});
