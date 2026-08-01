import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../foundation/Button/Button';
import { AppError } from '../../api/errors';
import { cn } from '../../utils/cn';

interface ErrorStateProps {
  error: Error | AppError | null;
  onRetry?: () => void;
  className?: string;
  title?: string;
}

export function ErrorState({ error, onRetry, className, title }: ErrorStateProps) {
  const errorMessage =
    error instanceof AppError
      ? error.message
      : error?.message || 'An unexpected error occurred. Please try again.';

  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center p-6 text-center gap-4 bg-background border border-border rounded-xl max-w-md mx-auto',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-2">
        <AlertCircle className="w-6 h-6" />
      </div>
      
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-text">
          {title || 'Unable to Load Data'}
        </h3>
        <p className="text-sm text-muted-foreground">{errorMessage}</p>
      </div>

      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="mt-2" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      )}
    </div>
  );
}
