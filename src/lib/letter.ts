/**
 * Anspruchsschreiben / claim letter / lettre de réclamation, composé dans le navigateur.
 * Les données personnelles (nom, réservation, IBAN) ne vont JAMAIS dans l'adresse de la page ni
 * ailleurs : elles vivent dans l'état React et disparaissent à la fermeture de l'onglet.
 */
import type { Lang } from './format';
import { formatMoney, displayDate, TAG } from './format';
import type { RegimeResult, EventKind } from './engine/flight';

export interface LetterData {
  name: string; address: string; booking: string; flight: string; airline: string; date: string;
  fromLabel: string; toLabel: string; event: EventKind; delayMin: number; passengers: number; iban: string; today: string;
}
const hm = (min: number, lang: Lang) => { const h = Math.floor(min / 60), m = Math.round(min % 60); return lang === 'de' ? `${h} Std. ${m} Min.` : lang === 'fr' ? `${h} h ${String(m).padStart(2, '0')}` : `${h} h ${m} min`; };

const LAW: Record<string, Record<Lang, string>> = {
  eu261: { de: 'Art. 5, 6 und 7 der Verordnung (EG) Nr. 261/2004 in Verbindung mit dem Urteil des EuGH vom 19.11.2009 (C-402/07, Sturgeon)', en: 'Articles 5, 6 and 7 of Regulation (EC) No 261/2004 and the CJEU judgment in Sturgeon (C-402/07)', fr: 'articles 5, 6 et 7 du règlement (CE) n° 261/2004 et arrêt Sturgeon de la CJUE (C-402/07)' },
  eu2027: { de: 'Art. 5, 6 und 7 der Verordnung (EG) Nr. 261/2004 in der Fassung der Verordnung (EU) 2026/2202', en: 'Articles 5, 6 and 7 of Regulation (EC) No 261/2004 as amended by Regulation (EU) 2026/2202', fr: 'articles 5, 6 et 7 du règlement (CE) n° 261/2004 modifié par le règlement (UE) 2026/2202' },
  uk261: { de: 'Art. 5, 6 und 7 der Verordnung (EG) Nr. 261/2004 in der im Vereinigten Königreich geltenden Fassung (UK261)', en: 'Articles 5, 6 and 7 of Regulation (EC) No 261/2004 as it forms part of UK domestic law (UK261)', fr: 'articles 5, 6 et 7 du règlement (CE) n° 261/2004 tel que maintenu en droit britannique (UK261)' },
  appr: { de: 'Art. 12, 19 und 20 der Air Passenger Protection Regulations (SOR/2019-150)', en: 'sections 12, 19 and 20 of the Air Passenger Protection Regulations (SOR/2019-150)', fr: 'articles 12, 19 et 20 du Règlement sur la protection des passagers aériens (DORS/2019-150)' },
};
const EV: Record<Lang, Record<EventKind, string>> = {
  de: { delay: 'erreichte das Endziel mit einer Verspätung von', cancel: 'wurde annulliert; ich erreichte das Endziel mit einer Verspätung von', denied: 'wurde mir die Beförderung gegen meinen Willen verweigert; ich erreichte das Endziel mit einer Verspätung von' },
  en: { delay: 'reached the final destination late by', cancel: 'was cancelled; I reached the final destination late by', denied: 'I was denied boarding against my will; I reached the final destination late by' },
  fr: { delay: 'est arrivé à destination finale avec un retard de', cancel: 'a été annulé ; je suis arrivé à destination finale avec un retard de', denied: 'l’embarquement m’a été refusé contre mon gré ; je suis arrivé à destination finale avec un retard de' },
};

export function letterText(lang: Lang, d: LetterData, r: RegimeResult): string {
  const total = r.amount * Math.max(1, d.passengers);
  const amt = formatMoney(total, 0, lang, r.currency);
  const per = formatMoney(r.amount, 0, lang, r.currency);
  const day = (iso: string) => (iso ? displayDate(iso, TAG[lang]) : '');
  const ph = (s: string, p: string) => s.trim() || p;
  const pax = Math.max(1, d.passengers);
  const ibanLine = { de: d.iban ? `Bitte überweisen Sie den Betrag auf folgendes Konto: ${d.iban}.` : 'Bitte teilen Sie mir mit, wie Sie die Zahlung leisten, oder überweisen Sie auf das Konto, das ich Ihnen auf Anfrage nenne.', en: d.iban ? `Please pay the amount into the following account: ${d.iban}.` : 'Please tell me how you will make the payment; I will provide bank details on request.', fr: d.iban ? `Merci de verser ce montant sur le compte suivant : ${d.iban}.` : 'Merci de m’indiquer le mode de paiement ; je vous communiquerai mes coordonnées bancaires sur demande.' }[lang];
  if (lang === 'de') return [
    ph(d.name, '[Ihr Name]'), ph(d.address, '[Ihre Anschrift]'), '', `An: ${ph(d.airline, '[Airline]')}, Kundenservice / Fluggastrechte`, '', day(d.today), '',
    `Ausgleichszahlung – Flug ${ph(d.flight, '[Flugnummer]')} vom ${day(d.date)}, Buchung ${ph(d.booking, '[Buchungscode]')}`, '',
    'Sehr geehrte Damen und Herren,', '',
    `der Flug ${ph(d.flight, '[Flugnummer]')} von ${d.fromLabel} nach ${d.toLabel} am ${day(d.date)} ${EV.de[d.event]} ${hm(d.delayMin, 'de')} (Öffnen der Flugzeugtür).`,
    `Nach ${LAW[r.id].de} steht mir eine Ausgleichszahlung von ${per} pro Person zu${pax > 1 ? `, für ${pax} Personen insgesamt ${amt}` : ''}.`, '',
    `Ich fordere Sie auf, diesen Betrag innerhalb von 14 Tagen nach Eingang dieses Schreibens zu zahlen. ${ibanLine}`,
    'Sollten Sie sich auf außergewöhnliche Umstände berufen, bitte ich um eine genaue Darlegung der Ursache und der Maßnahmen, die Sie zu ihrer Vermeidung ergriffen haben, mit Nachweisen.', '',
    'Mit freundlichen Grüßen', ph(d.name, '[Ihr Name]'), '', 'Anlagen: Buchungsbestätigung, Bordkarte(n)',
  ].join('\n');
  if (lang === 'fr') return [
    ph(d.name, '[Votre nom]'), ph(d.address, '[Votre adresse]'), '', `À : ${ph(d.airline, '[Compagnie]')}, service à la clientèle`, '', day(d.today), '',
    `Objet : demande d’indemnité, vol ${ph(d.flight, '[numéro de vol]')} du ${day(d.date)}, réservation ${ph(d.booking, '[code de réservation]')}`, '',
    'Madame, Monsieur,', '',
    `Le vol ${ph(d.flight, '[numéro de vol]')} de ${d.fromLabel} à ${d.toLabel} du ${day(d.date)} ${EV.fr[d.event]} ${hm(d.delayMin, 'fr')} (ouverture d’une porte de l’appareil).`,
    `En application des ${LAW[r.id].fr}, une indemnité de ${per} par passager m’est due${pax > 1 ? `, soit ${amt} pour ${pax} passagers` : ''}.`, '',
    `${r.id === 'appr' ? 'Conformément au paragraphe 19(4) du Règlement, je vous demande de verser cette indemnité dans les 30 jours suivant la réception de la présente demande, ou de m’indiquer pourquoi vous estimez qu’elle n’est pas due.' : 'Je vous demande de verser ce montant dans les 14 jours suivant la réception de la présente.'} ${ibanLine}`,
    'Si vous invoquez une situation hors de votre contrôle ou une circonstance extraordinaire, merci de m’en préciser la nature exacte, pièces à l’appui.', '',
    'Veuillez agréer, Madame, Monsieur, mes salutations distinguées.', ph(d.name, '[Votre nom]'), '', 'Pièces jointes : confirmation de réservation, carte(s) d’embarquement',
  ].join('\n');
  return [
    ph(d.name, '[Your name]'), ph(d.address, '[Your address]'), '', `To: ${ph(d.airline, '[Airline]')}, customer relations`, '', day(d.today), '',
    `Compensation claim: flight ${ph(d.flight, '[flight number]')} on ${day(d.date)}, booking ${ph(d.booking, '[booking reference]')}`, '',
    'Dear Sir or Madam,', '',
    `Flight ${ph(d.flight, '[flight number]')} from ${d.fromLabel} to ${d.toLabel} on ${day(d.date)} ${EV.en[d.event]} ${hm(d.delayMin, 'en')} (aircraft door opened).`,
    `Under ${LAW[r.id].en}, I am entitled to compensation of ${per} per passenger${pax > 1 ? `, ${amt} in total for ${pax} passengers` : ''}.`, '',
    `${r.id === 'appr' ? 'Under subsection 19(4) of the Regulations, please pay this compensation within 30 days of receiving this request, or explain why you consider it is not owed.' : 'Please pay this amount within 14 days of receiving this letter.'} ${ibanLine}`,
    'If you rely on extraordinary circumstances or a situation outside your control, please state the exact cause and the measures you took, with supporting evidence.', '',
    'Yours faithfully,', ph(d.name, '[Your name]'), '', 'Enclosures: booking confirmation, boarding pass(es)',
  ].join('\n');
}
