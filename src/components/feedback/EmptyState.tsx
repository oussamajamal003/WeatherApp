import { FileQuestion } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTranslation } from 'react-i18next';

interface EmptyStateProps {
  title?: string;
  message?: string;
  className?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ 
  title, 
  message, 
  className,
  icon,
  action
}: EmptyStateProps) {
  const { t } = useTranslation();
  
  const displayTitle = title || t('emptyStates.noData');
  const displayMessage = message || t('emptyStates.noDataDesc');

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
          {displayTitle}
        </h3>
        <p className="text-sm text-muted-foreground">{displayMessage}</p>
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
