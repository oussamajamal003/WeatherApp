import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorState } from '../../../../src/components/feedback/ErrorState';
import { AppError } from '../../../../src/api/errors';

describe('ErrorState', () => {
  it('renders generic error message when error is a standard Error', () => {
    const error = new Error('Standard Error');
    render(<ErrorState error={error} />);
    
    expect(screen.getByText('Unable to load data')).toBeInTheDocument();
    expect(screen.getByText('Standard Error')).toBeInTheDocument();
  });

  it('renders AppError message', () => {
    const appError = new AppError('Specific API Failure', 'API_ERROR');
    render(<ErrorState error={appError} />);
    
    expect(screen.getByText('Specific API Failure')).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', () => {
    const onRetry = vi.fn();
    const error = new Error('Standard Error');
    
    render(<ErrorState error={error} onRetry={onRetry} />);
    
    const retryButton = screen.getByRole('button', { name: /try again/i });
    expect(retryButton).toBeInTheDocument();
    
    fireEvent.click(retryButton);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('does not render retry button if onRetry is not provided', () => {
    const error = new Error('Standard Error');
    render(<ErrorState error={error} />);
    
    expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument();
  });
});
