import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AirQuality } from '../../../../../src/components/weather/metrics/AirQuality';
import { UVIndex } from '../../../../../src/components/weather/metrics/UvIndex';

describe('Metric Components Empty States', () => {
  it('renders "N/A" gracefully for AirQuality when value is missing', () => {
    // Render with undefined value
    render(<AirQuality value={undefined} />);
    
    // The label should still be there
    expect(screen.getByText('Air Quality')).toBeInTheDocument();
    
    // The placeholder should be N/A
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('renders "N/A" gracefully for UVIndex when value is missing', () => {
    // Render with undefined value
    render(<UVIndex value={undefined} />);
    
    // The label should still be there
    expect(screen.getByText('UV Index')).toBeInTheDocument();
    
    // The placeholder should be N/A
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });
});
