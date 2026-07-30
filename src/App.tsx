import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import { useTheme } from './hooks/useTheme';

// Create a client
const queryClient = new QueryClient();

function Home() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="p-8 text-center min-h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-displayL font-display text-primary">WeatherApp</h1>
      <p className="mt-4 text-text-secondary font-sans">The application is successfully initialized.</p>
      
      <div className="mt-8 flex gap-4">
        <button 
          onClick={() => setTheme('light')}
          className={`px-4 py-2 rounded-md font-sans text-button ${theme === 'light' ? 'bg-primary text-primary-fg' : 'bg-surface text-text border border-border hover:bg-card-subtle'}`}
        >
          Light
        </button>
        <button 
          onClick={() => setTheme('dark')}
          className={`px-4 py-2 rounded-md font-sans text-button ${theme === 'dark' ? 'bg-primary text-primary-fg' : 'bg-surface text-text border border-border hover:bg-card-subtle'}`}
        >
          Dark
        </button>
        <button 
          onClick={() => setTheme('system')}
          className={`px-4 py-2 rounded-md font-sans text-button ${theme === 'system' ? 'bg-primary text-primary-fg' : 'bg-surface text-text border border-border hover:bg-card-subtle'}`}
        >
          System
        </button>
      </div>
      
      <div className="mt-8 p-6 bg-card border border-border rounded-2xl shadow-sm">
        <p className="font-mono text-muted text-sm">JetBrains Mono Example - Lat: 40.7128° N</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
