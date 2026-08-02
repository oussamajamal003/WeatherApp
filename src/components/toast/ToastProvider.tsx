import * as React from 'react';
import { ToastContainer } from './ToastContainer';
import type { ToastMessage, ToastAPI, ToastType } from '../../types/toast';

interface ToastContextValue {
  toast: ToastAPI;
  removeToast: (id: string) => void;
}

export const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const toastBase = React.useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const toast = React.useMemo(() => {
    const fn = (message: string, type?: ToastType) => toastBase(message, type);
    return Object.assign(fn, {
      success: (message: string) => toastBase(message, 'success'),
      error: (message: string) => toastBase(message, 'error'),
      warning: (message: string) => toastBase(message, 'warning'),
      info: (message: string) => toastBase(message, 'info'),
    }) as ToastAPI;
  }, [toastBase]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}
