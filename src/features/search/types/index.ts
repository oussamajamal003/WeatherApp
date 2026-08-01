import type { Location } from '../../../types/weather';

export interface SearchHistoryItem extends Location {
  id: string; // Unique identifier for the history item (e.g., lat-lon combo)
  timestamp: number;
}
