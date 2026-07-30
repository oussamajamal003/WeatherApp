import { Search } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-surface/80 backdrop-blur-xl border-b border-border-subtle h-[52px] md:h-[64px] lg:h-[56px] shrink-0">
      <div className="h-full w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
        <div className="font-display text-text text-h4 lg:text-h3">WeatherApp</div>
        
        {/* Placeholder for global search on Tablet/Desktop */}
        <div className="hidden md:flex items-center bg-background rounded-full px-4 py-2 border border-border focus-within:border-primary transition-colors min-w-[240px] max-w-[400px] w-full">
          <Search className="w-4 h-4 text-muted mr-2 shrink-0" />
          <input 
            type="text" 
            placeholder="Search location..." 
            className="bg-transparent border-none outline-none text-text text-body w-full placeholder:text-muted"
          />
        </div>
      </div>
    </header>
  );
}
