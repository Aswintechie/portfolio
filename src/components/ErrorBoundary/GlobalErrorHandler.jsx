/**
 * @file GlobalErrorHandler.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Global error handler for unhandled promise rejections and uncaught errors
 */

/* eslint-disable no-undef */
import { useEffect } from 'react';

// Global Error Handler Component
const GlobalErrorHandler = ({ children }) => {
  useEffect(() => {
    // Handle unhandled promise rejections
    const handleUnhandledRejection = event => {
      console.error('Unhandled Promise Rejection:', event.reason);

      // Create error data
      const errorData = {
        type: 'unhandled_promise_rejection',
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack || '',
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        reason: event.reason,
      };

      // Log to console
      console.group('🚨 Unhandled Promise Rejection');
      console.error('Reason:', event.reason);
      console.error('Full Error Data:', errorData);
      console.groupEnd();

      // Log to localStorage
      try {
        const errors = JSON.parse(localStorage.getItem('portfolio_errors') || '[]');
        errors.push(errorData);

        // Keep only last 50 errors
        if (errors.length > 50) {
          errors.splice(0, errors.length - 50);
        }

        localStorage.setItem('portfolio_errors', JSON.stringify(errors));
      } catch (e) {
        console.warn('Failed to log error to localStorage:', e);
      }

      // Log to analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
          description: errorData.message,
          fatal: false,
          custom_map: {
            error_type: 'unhandled_promise_rejection',
            error_context: 'global_handler',
          },
        });
      }

      // Prevent default browser behavior
      event.preventDefault();
    };

    // Handle uncaught JavaScript errors
    const handleUncaughtError = event => {
      console.error('Uncaught JavaScript Error:', event.error);

      // Create error data
      const errorData = {
        type: 'uncaught_javascript_error',
        message: event.error?.message || event.message || 'Uncaught JavaScript Error',
        stack: event.error?.stack || '',
        filename: event.filename || '',
        lineno: event.lineno || 0,
        colno: event.colno || 0,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        error: event.error,
      };

      // Log to console
      console.group('🚨 Uncaught JavaScript Error');
      console.error('Error:', event.error);
      console.error('File:', event.filename, 'Line:', event.lineno, 'Col:', event.colno);
      console.error('Full Error Data:', errorData);
      console.groupEnd();

      // Log to localStorage
      try {
        const errors = JSON.parse(localStorage.getItem('portfolio_errors') || '[]');
        errors.push(errorData);

        // Keep only last 50 errors
        if (errors.length > 50) {
          errors.splice(0, errors.length - 50);
        }

        localStorage.setItem('portfolio_errors', JSON.stringify(errors));
      } catch (e) {
        console.warn('Failed to log error to localStorage:', e);
      }

      // Log to analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
          description: errorData.message,
          fatal: false,
          custom_map: {
            error_type: 'uncaught_javascript_error',
            error_context: 'global_handler',
          },
        });
      }
    };

    // Handle resource loading errors
    const handleResourceError = event => {
      const element = event.target;

      if (element && element.tagName) {
        const errorData = {
          type: 'resource_loading_error',
          message: `Failed to load ${element.tagName.toLowerCase()}: ${element.src || element.href}`,
          tagName: element.tagName,
          src: element.src || element.href || '',
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        };

        // Log to console
        console.warn('Resource Loading Error:', errorData);

        // Log to localStorage
        try {
          const errors = JSON.parse(localStorage.getItem('portfolio_errors') || '[]');
          errors.push(errorData);

          // Keep only last 50 errors
          if (errors.length > 50) {
            errors.splice(0, errors.length - 50);
          }

          localStorage.setItem('portfolio_errors', JSON.stringify(errors));
        } catch (e) {
          console.warn('Failed to log error to localStorage:', e);
        }

        // Log to analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'exception', {
            description: errorData.message,
            fatal: false,
            custom_map: {
              error_type: 'resource_loading_error',
              error_context: 'global_handler',
            },
          });
        }
      }
    };

    // Add event listeners
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleUncaughtError);
    window.addEventListener('error', handleResourceError, true); // Capture phase for resource errors

    // Cleanup event listeners
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleUncaughtError);
      window.removeEventListener('error', handleResourceError, true);
    };
  }, []);

  return children;
};

export default GlobalErrorHandler;
