import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Create a client
const queryClient = new QueryClient();

function Home() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold text-primary">WeatherApp</h1>
      <p className="mt-4 text-gray-600">The application is successfully initialized.</p>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
