import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../foundation/Button/Button';
import { AppError } from '../../api/errors';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service here
    console.error('Uncaught error in ErrorBoundary:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      const errorMessage =
        this.state.error instanceof AppError
          ? this.state.error.message
          : this.state.error?.message || 'An unexpected application error occurred.';

      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 p-6 max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
            <AlertTriangle className="w-10 h-10" />
          </div>
          
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold text-text">Something went wrong</h1>
            <p className="text-muted-foreground">{errorMessage}</p>
          </div>

          <Button onClick={this.handleRetry} variant="primary" className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
