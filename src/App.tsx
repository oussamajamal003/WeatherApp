import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import { AppShell } from './components/layout/AppShell';

import { Home, Search, Settings, About } from './pages';

import { queryClient } from './api/query-client';

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppShell>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </AppShell>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
