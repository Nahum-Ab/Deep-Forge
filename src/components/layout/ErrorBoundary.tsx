import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="p-8 my-8 bg-brand-surface-raised border border-brand-danger/20 rounded-2xl flex items-start gap-4">
          <AlertCircle className="text-brand-danger shrink-0 mt-1" size={24} />
          <div>
            <h3 className="text-lg font-medium text-brand-danger mb-2">Component Error</h3>
            <p className="text-brand-text-secondary text-sm">
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
