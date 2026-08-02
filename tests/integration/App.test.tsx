import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

describe('App Component', () => {
  it('renders the WeatherApp home page with providers', async () => {
    render(<App />);
    expect(screen.getAllByRole('navigation').length).toBeGreaterThan(0);
    // Find either the English string or the i18next key depending on init timing
    expect(await screen.findByText(/Welcome to WeatherApp|emptyStates\.welcomeTitle/i)).toBeInTheDocument();
  });
});
