import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.stubEnv('VITE_OPENWEATHER_API_KEY', 'test_dummy_key');
vi.stubEnv('VITE_OPENWEATHER_BASE_URL', 'https://api.openweathermap.org/data/2.5');
vi.stubEnv('VITE_OPENWEATHER_GEO_URL', 'http://api.openweathermap.org/geo/1.0');

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
import '../src/i18n/config';