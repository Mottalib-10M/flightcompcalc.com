/** Réglages d'un calculateur en tête de page (valeurs du premier rendu). */
export interface ToolArg {
  /** Codes IATA de départ et d'arrivée. */
  from?: string; to?: string;
  event?: 'delay' | 'cancel' | 'denied';
  /** Retard à l'arrivée, minutes. */
  delay?: number;
  cause?: string;
  carrier?: 'eu' | 'gb' | 'ca' | 'other';
  /** Date du vol par défaut (AAAA-MM-JJ). */
  date?: string;
  /** Ouvre les options avancées (préavis, réacheminement, taille du transporteur). */
  advanced?: boolean;
  notice?: number;
  size?: 'large' | 'small';
  /** Calculateur bagages : devise d'affichage ; train : prix du billet. */
  cur?: 'EUR' | 'GBP' | 'CAD';
  fare?: number;
  /** Calculateur de délais : droit applicable au premier rendu. */
  law?: 'eu' | 'uk' | 'ca';
}
