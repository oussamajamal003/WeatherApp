import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SearchBar } from '../weather/search/SearchBar';

export const HeaderSearch = React.memo(function HeaderSearch() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleNavigateToSearch = (val: string) => {
    if (val.trim()) {
      navigate(`/search?q=${encodeURIComponent(val)}`);
    } else {
      navigate('/search');
    }
  };

  const handleChange = (val: string) => {
    setQuery(val);
    handleNavigateToSearch(val);
  };

  const handleFocus = () => {
    handleNavigateToSearch(query);
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <SearchBar
      value={query}
      onChange={handleChange}
      onFocus={handleFocus}
      onClear={handleClear}
      placeholder={t('search.placeholder')}
      className="h-11 py-0 pl-12 rounded-full text-body bg-surface/50 border-border shadow-none"
      iconClassName="left-4 w-5 h-5"
      data-testid="header-search-input"
    />
  );
});
