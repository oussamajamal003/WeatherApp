import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { OfflineBanner } from '../../../../src/components/feedback/OfflineBanner';
import * as useOnlineStatusModule from '../../../../src/hooks/use-online-status';

describe('OfflineBanner', () => {
  it('is visually hidden when online', () => {
    vi.spyOn(useOnlineStatusModule, 'useOnlineStatus').mockReturnValue(true);
    render(<OfflineBanner />);
    expect(screen.getByRole('alert')).toHaveClass('max-h-0', 'opacity-0');
  });

  it('renders correctly when offline', () => {
    vi.spyOn(useOnlineStatusModule, 'useOnlineStatus').mockReturnValue(false);
    render(<OfflineBanner />);
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/You are currently offline/i)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    vi.spyOn(useOnlineStatusModule, 'useOnlineStatus').mockReturnValue(false);
    render(<OfflineBanner className="custom-class" />);
    
    expect(screen.getByRole('alert')).toHaveClass('custom-class');
  });
});
