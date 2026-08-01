import { useState, useCallback } from 'react';
import { SearchHistoryService } from '../../../services/search-history.service';
import type { SearchHistoryItem } from '../types';
import type { Location } from '../../../types/weather';

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>(() => 
    SearchHistoryService.getHistory()
  );

  const addSearch = useCallback((location: Location) => {
    const updated = SearchHistoryService.addSearch(location);
    setHistory(updated);
  }, []);

  const removeSearch = useCallback((id: string) => {
    const updated = SearchHistoryService.removeSearch(id);
    setHistory(updated);
  }, []);

  const clearHistory = useCallback(() => {
    SearchHistoryService.clearHistory();
    setHistory([]);
  }, []);

  return {
    history,
    addSearch,
    removeSearch,
    clearHistory,
  };
}
