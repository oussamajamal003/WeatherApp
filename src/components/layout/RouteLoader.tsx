import { Loader2 } from 'lucide-react';

export function RouteLoader() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] gap-4 w-full">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <span className="text-body text-muted-foreground animate-pulse">Loading...</span>
    </div>
  );
}
