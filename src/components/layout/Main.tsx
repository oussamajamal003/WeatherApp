import type { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
  className?: string;
}

export function Main({ children, className = '' }: MainProps) {
  return (
    <main 
      id="main-content"
      tabIndex={-1}
      className={`flex-1 w-full max-w-[1280px] mx-auto px-8 pt-6 pb-4 md:px-12 md:py-8 lg:px-16 lg:py-12 outline-none ${className}`}
    >
      {children}
    </main>
  );
}
