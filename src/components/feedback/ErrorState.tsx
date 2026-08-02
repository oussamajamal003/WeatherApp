import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../foundation/Button/Button';
import { AppError } from '../../api/errors';
import { cn } from '../../utils/cn';
import { useTranslation } from 'react-i18next';

interface ErrorStateProps {
  error: Error | AppError | null;
  onRetry?: () => void;
  isRetrying?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  title?: string;
}

export function ErrorState({ error, onRetry, isRetrying, action, className, title }: ErrorStateProps) {
  const { t } = useTranslation();
  
  const errorMessage =
    error instanceof AppError
      ? error.message
      : error?.message || t('errors.generic');

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
          {title || t('errors.unableToLoad')}
        </h3>
        <p className="text-sm text-muted-foreground">{errorMessage}</p>
      </div>

      <div className="flex gap-3 mt-2">
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm" disabled={isRetrying}>
            <RefreshCw className={cn('w-4 h-4 mr-2', isRetrying && 'animate-spin')} />
            {isRetrying ? t('errors.retrying') : t('errors.retry')}
          </Button>
        )}
        {action && (
          <Button onClick={action.onClick} variant="primary" size="sm">
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
}
