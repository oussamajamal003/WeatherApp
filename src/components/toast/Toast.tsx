import * as React from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { ToastType } from '../../types/toast';

interface ToastProps {
  id: string;
  message: string;
  type?: ToastType;
  onDismiss: (id: string) => void;
}

export function Toast({ id, message, type = 'info', onDismiss }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  const Icon = type === 'success' ? CheckCircle : type === 'error' ? AlertCircle : type === 'warning' ? AlertCircle : Info;

  const baseClasses = 'pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-xl animate-in slide-in-from-bottom-5 fade-in duration-300';
  
  const typeClasses = {
    success: 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400',
    error: 'bg-destructive/10 border-destructive/20 text-destructive',
    warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-700 dark:text-yellow-400',
    info: 'bg-surface/90 border-border text-foreground',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(baseClasses, typeClasses[type])}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 shrink-0" />
        <p className="text-small font-medium">{message}</p>
      </div>
      <button
        onClick={() => onDismiss(id)}
        className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
