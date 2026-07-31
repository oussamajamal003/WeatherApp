import * as React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../../foundation/Input/Input';
import { cn } from '../../../utils/cn';

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange, onClear, className, ...props }, ref) => {
    return (
      <div className={cn('relative w-full', className)}>
        <Input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          icon={<Search className="w-5 h-5 text-muted-foreground" />}
          className="pr-12" // Make room for the clear button
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';
