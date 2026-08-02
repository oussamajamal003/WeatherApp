import type { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { OfflineBanner } from '../feedback/OfflineBanner';
import { Main } from './Main';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background text-text font-sans antialiased">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium shadow-md outline-none ring-2 ring-primary ring-offset-2 ring-offset-background"
      >
        Skip to main content
      </a>
      <Navigation />
      
      <div className="flex-1 flex flex-col min-w-0 pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left,0px)] md:pl-0">
        <div className="sticky top-0 z-50 flex flex-col w-full">
          <OfflineBanner />
          <Header />
        </div>
        
        <Main>
          {children}
        </Main>
        
        <Footer />
        
        {/* Mobile Spacer for Fixed Bottom Nav */}
        <div className="md:hidden h-[80px] pb-[env(safe-area-inset-bottom,34px)] box-content shrink-0" />
      </div>
    </div>
  );
}
