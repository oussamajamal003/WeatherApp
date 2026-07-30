import type { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
  className?: string;
}

export function Main({ children, className = '' }: MainProps) {
  return (
    <main className={`flex-1 w-full max-w-[1280px] mx-auto px-4 pt-3 pb-2 md:px-6 md:py-4 lg:px-8 lg:py-6 ${className}`}>
      {children}
    </main>
  );
}
