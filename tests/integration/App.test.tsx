import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

describe('App Component', () => {
  it('renders the WeatherApp home page with providers', () => {
    render(<App />);
    expect(screen.getAllByRole('navigation').length).toBeGreaterThan(0);
    expect(screen.getByText(/Local Weather/i)).toBeInTheDocument();
    expect(screen.getByText(/Use My Location/i)).toBeInTheDocument();
  });
});
