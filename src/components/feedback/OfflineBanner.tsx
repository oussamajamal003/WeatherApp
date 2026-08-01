import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/use-online-status';
import { cn } from '../../utils/cn';

export function OfflineBanner({ className }: { className?: string }) {
  const isOnline = useOnlineStatus();

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'w-full bg-yellow-500/10 border-b border-yellow-500/20 text-yellow-600 flex items-center justify-center gap-3 transition-all duration-300 overflow-hidden',
        isOnline ? 'max-h-0 opacity-0 border-transparent py-0' : 'max-h-16 opacity-100 py-3',
        className
      )}
    >
      <WifiOff className="w-5 h-5 shrink-0" aria-hidden={isOnline} />
      <span className="text-sm font-medium">
        You are currently offline. Displayed data may be outdated.
      </span>
    </div>
  );
}
