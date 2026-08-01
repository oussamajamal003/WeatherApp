import { FileQuestion } from 'lucide-react';
import { cn } from '../../utils/cn';

interface EmptyStateProps {
  title?: string;
  message?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ 
  title = 'No Data Found', 
  message = 'There is currently no data to display.', 
  className,
  icon
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center gap-4 bg-background border border-border rounded-xl max-w-md mx-auto',
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-muted-foreground mb-2">
        {icon || <FileQuestion className="w-8 h-8" />}
      </div>
      
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-text">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
