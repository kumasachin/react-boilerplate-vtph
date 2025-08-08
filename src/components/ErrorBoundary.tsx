import { Component, type ErrorInfo, type ReactNode } from 'react';
import styled from 'styled-components';
import { Button, Card, Heading, Text } from '../styles/components';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

const ErrorContainer = styled(Card)`
  margin: 20px;
  padding: 30px;
  border-left: 4px solid ${({ theme }) => theme.colors.danger};
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;

const ErrorDetails = styled.details`
  margin-top: 16px;

  summary {
    cursor: pointer;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray[700]};
    margin-bottom: 8px;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ErrorStack = styled.pre`
  background-color: ${({ theme }) => theme.colors.gray[900]};
  color: ${({ theme }) => theme.colors.gray[100]};
  padding: 16px;
  border-radius: 8px;
  font-size: 12px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
`;

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });

    // Log to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      console.error('Error caught by boundary:', error, errorInfo);
      // Here you would typically send to Sentry, LogRocket, etc.
    }
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorContainer>
          <Heading level={2} style={{ color: '#dc3545', marginBottom: '16px' }}>
            🚨 Something went wrong
          </Heading>

          <Text style={{ marginBottom: '20px' }}>
            We&apos;re sorry! Something unexpected happened. This error has been logged and
            we&apos;ll look into it.
          </Text>

          <Button variant="primary" onClick={this.handleReset} style={{ marginRight: '12px' }}>
            Try Again
          </Button>

          <Button variant="secondary" onClick={() => window.location.reload()}>
            Reload Page
          </Button>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <ErrorDetails>
              <summary>Error Details (Development Only)</summary>
              <Text size="sm" style={{ marginBottom: '12px' }}>
                <strong>Error:</strong> {this.state.error.message}
              </Text>

              {this.state.error.stack && (
                <div>
                  <Text size="sm" weight="semibold" style={{ marginBottom: '8px' }}>
                    Stack Trace:
                  </Text>
                  <ErrorStack>{this.state.error.stack}</ErrorStack>
                </div>
              )}

              {this.state.errorInfo && (
                <div style={{ marginTop: '16px' }}>
                  <Text size="sm" weight="semibold" style={{ marginBottom: '8px' }}>
                    Component Stack:
                  </Text>
                  <ErrorStack>{this.state.errorInfo.componentStack}</ErrorStack>
                </div>
              )}
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
