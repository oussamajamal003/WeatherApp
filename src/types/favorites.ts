import type { Location } from './weather';

export interface FavoriteLocation extends Location {
  /** Unique identifier for the favorite (e.g. `${lat},${lon}`) */
  id: string;
  /** Timestamp when the favorite was added */
  favoritedAt: number;
}
