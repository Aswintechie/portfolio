import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console (in production, you'd send this to an error reporting service)
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen bg-gray-50 flex items-center justify-center py-20'>
          <div className='container-custom'>
            <div className='text-center max-w-2xl mx-auto'>
              {/* Error Icon */}
              <div className='mb-8'>
                <div className='inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full text-white mb-6'>
                  <AlertTriangle size={48} />
                </div>
              </div>

              {/* Error Text */}
              <h1 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-4'>
                Something went wrong
              </h1>

              <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
                We're sorry, but something unexpected happened. This error has been logged and we're
                working to fix it.
              </p>

              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
                <button
                  onClick={this.handleReload}
                  className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-secondary-600 to-accent-600 text-white rounded-lg hover:from-secondary-700 hover:to-accent-700 transition-all duration-300 transform hover:scale-105 shadow-lg'
                  aria-label='Reload the page'
                >
                  <RefreshCw size={20} className='mr-2' />
                  Reload Page
                </button>

                <a
                  href='/'
                  className='inline-flex items-center px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-secondary-500 transition-all duration-300 transform hover:scale-105 shadow-lg'
                  aria-label='Go back to homepage'
                >
                  <Home size={20} className='mr-2' />
                  Go Home
                </a>
              </div>

              {/* Error Details (only in development) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className='mt-8 text-left bg-white p-6 rounded-lg shadow-lg'>
                  <summary className='cursor-pointer font-semibold text-gray-900 mb-4'>
                    Error Details (Development Only)
                  </summary>
                  <div className='space-y-4'>
                    <div>
                      <h4 className='font-medium text-gray-900 mb-2'>Error:</h4>
                      <pre className='bg-gray-100 p-3 rounded text-sm text-red-600 overflow-x-auto'>
                        {this.state.error.toString()}
                      </pre>
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <h4 className='font-medium text-gray-900 mb-2'>Component Stack:</h4>
                        <pre className='bg-gray-100 p-3 rounded text-sm text-gray-600 overflow-x-auto'>
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Contact Info */}
              <div className='mt-8 text-center'>
                <p className='text-gray-500 mb-2'>If this problem persists, please contact me:</p>
                <a
                  href='mailto:contact@aswinlocal.in'
                  className='text-secondary-600 hover:text-secondary-700 font-medium transition-colors duration-200'
                  aria-label='Send email to contact@aswinlocal.in'
                >
                  contact@aswinlocal.in
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
