/** Accès aux aéroports. Côté serveur (build, pages) : la liste complète. Les îlots React n'importent
 *  que `airports-top.json` et chargent la liste complète à la demande (AirportField). */
import ALL from '../data/airports.json';
import { toAirport, type AirportRow, type Airport } from './engine/flight';
const BY = new Map((ALL as AirportRow[]).map((r) => [r[0], r]));
export function airport(iata: string): Airport {
  const r = BY.get(iata.toUpperCase());
  if (!r) throw new Error(`Unknown airport ${iata}`);
  return toAirport(r);
}
export const hasAirport = (iata: string) => BY.has(iata.toUpperCase());
export const AIRPORT_COUNT = (ALL as AirportRow[]).length;
