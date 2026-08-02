import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import { GeolocationProvider } from './context/GeolocationProvider';
import { AppShell } from './components/layout/AppShell';
import { ErrorBoundary } from './components/feedback/ErrorBoundary';

import { lazy, Suspense } from 'react';
import { RouteLoader } from './components/layout/RouteLoader';
import { queryClient } from './api/query-client';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Search = lazy(() => import('./pages/Search').then(m => ({ default: m.Search })));
const Settings = lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <GeolocationProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <AppShell>
                  <Suspense fallback={<RouteLoader />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/about" element={<About />} />
                    </Routes>
                  </Suspense>
              </AppShell>
            </ErrorBoundary>
          </BrowserRouter>
        </GeolocationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
