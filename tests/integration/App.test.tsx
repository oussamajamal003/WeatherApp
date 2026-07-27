import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

describe('App Component', () => {
  it('renders the WeatherApp home page with providers', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /WeatherApp/i })).toBeInTheDocument();
    expect(screen.getByText(/successfully initialized/i)).toBeInTheDocument();
  });
});
