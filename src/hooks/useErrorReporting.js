/**
 * @file useErrorReporting.js
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Custom hook for error reporting and analytics tracking
 */

import { useCallback, useEffect, useState } from 'react';

// Error severity levels
export const ERROR_SEVERITY = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  FATAL: 'fatal',
};

// Error categories
export const ERROR_CATEGORIES = {
  NETWORK: 'network',
  COMPONENT: 'component',
  ASYNC: 'async',
  USER_ACTION: 'user_action',
  PERFORMANCE: 'performance',
  SECURITY: 'security',
};

// Custom hook for error reporting
export const useErrorReporting = () => {
  const [errorStats, setErrorStats] = useState({
    totalErrors: 0,
    lastError: null,
    errorsByCategory: {},
    errorsBySeverity: {},
  });

  // Load error statistics from localStorage on mount
  useEffect(() => {
    try {
      const errors = JSON.parse(localStorage.getItem('portfolio_errors') || '[]');
      const stats = calculateErrorStats(errors);
      setErrorStats(stats);
    } catch (e) {
      console.warn('Failed to load error stats from localStorage:', e);
    }
  }, [calculateErrorStats]);

  // Calculate error statistics
  const calculateErrorStats = useCallback(errors => {
    const stats = {
      totalErrors: errors.length,
      lastError: errors[errors.length - 1] || null,
      errorsByCategory: {},
      errorsBySeverity: {},
    };

    errors.forEach(error => {
      // Count by category
      const category = error.category || 'unknown';
      stats.errorsByCategory[category] = (stats.errorsByCategory[category] || 0) + 1;

      // Count by severity
      const severity = error.severity || 'error';
      stats.errorsBySeverity[severity] = (stats.errorsBySeverity[severity] || 0) + 1;
    });

    return stats;
  }, []);

  // Report error function
  const reportError = useCallback(
    (error, options = {}) => {
      const {
        severity = ERROR_SEVERITY.ERROR,
        category = ERROR_CATEGORIES.COMPONENT,
        context = {},
        tags = [],
        userId = null,
        silent = false,
      } = options;

      // Create standardized error object
      const errorData = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        timestamp: new Date().toISOString(),
        message: error.message || 'Unknown error',
        stack: error.stack || '',
        severity,
        category,
        context,
        tags,
        userId: userId || localStorage.getItem('portfolio_user_id') || 'anonymous',
        sessionId: getSessionId(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        performance: getPerformanceMetrics(),
      };

      // Log to console (unless silent)
      if (!silent) {
        const consoleMethod =
          severity === ERROR_SEVERITY.FATAL
            ? 'error'
            : severity === ERROR_SEVERITY.ERROR
              ? 'error'
              : severity === ERROR_SEVERITY.WARNING
                ? 'warn'
                : 'info';

        console.group(`🚨 ${severity.toUpperCase()} Error Report`);
        console[consoleMethod]('Message:', errorData.message);
        console[consoleMethod]('Category:', errorData.category);
        console[consoleMethod]('Context:', errorData.context);
        console[consoleMethod]('Full Error:', errorData);
        console.groupEnd();
      }

      // Store in localStorage
      try {
        const errors = JSON.parse(localStorage.getItem('portfolio_errors') || '[]');
        errors.push(errorData);

        // Keep only last 100 errors
        if (errors.length > 100) {
          errors.splice(0, errors.length - 100);
        }

        localStorage.setItem('portfolio_errors', JSON.stringify(errors));

        // Update error stats
        const stats = calculateErrorStats(errors);
        setErrorStats(stats);
      } catch (e) {
        console.warn('Failed to store error in localStorage:', e);
      }

      // Send to analytics if available
      if (typeof gtag !== 'undefined') {
        // eslint-disable-next-line no-undef
        gtag('event', 'exception', {
          description: errorData.message,
          fatal: severity === ERROR_SEVERITY.FATAL,
          custom_map: {
            error_id: errorData.id,
            error_category: errorData.category,
            error_severity: errorData.severity,
            error_context: JSON.stringify(errorData.context),
            error_tags: errorData.tags.join(','),
          },
        });
      }

      // Send to custom analytics endpoint
      if (import.meta.env.VITE_ANALYTICS_ENDPOINT) {
        fetch(import.meta.env.VITE_ANALYTICS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(errorData),
        }).catch(e => console.warn('Failed to send error to analytics:', e));
      }

      return errorData;
    },
    [calculateErrorStats]
  );

  // Track user action
  const trackUserAction = useCallback((action, context = {}) => {
    const actionData = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      timestamp: new Date().toISOString(),
      action,
      context,
      userId: localStorage.getItem('portfolio_user_id') || 'anonymous',
      sessionId: getSessionId(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    // Log to console in development
    if (import.meta.env.DEV) {
      console.log('🔍 User Action:', actionData);
    }

    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
      // eslint-disable-next-line no-undef
      gtag('event', 'user_action', {
        action_name: action,
        custom_map: {
          action_id: actionData.id,
          action_context: JSON.stringify(context),
        },
      });
    }

    return actionData;
  }, []);

  // Clear error history
  const clearErrorHistory = useCallback(() => {
    localStorage.removeItem('portfolio_errors');
    setErrorStats({
      totalErrors: 0,
      lastError: null,
      errorsByCategory: {},
      errorsBySeverity: {},
    });
  }, []);

  // Get error history
  const getErrorHistory = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem('portfolio_errors') || '[]');
    } catch (e) {
      console.warn('Failed to load error history:', e);
      return [];
    }
  }, []);

  // Export error history
  const exportErrorHistory = useCallback(() => {
    const errors = getErrorHistory();
    const blob = new Blob([JSON.stringify(errors, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-errors-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [getErrorHistory]);

  return {
    reportError,
    trackUserAction,
    clearErrorHistory,
    getErrorHistory,
    exportErrorHistory,
    errorStats,
    ERROR_SEVERITY,
    ERROR_CATEGORIES,
  };
};

// Helper functions
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('portfolio_session_id');
  if (!sessionId) {
    sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    sessionStorage.setItem('portfolio_session_id', sessionId);
  }
  return sessionId;
};

const getPerformanceMetrics = () => {
  if (typeof performance !== 'undefined' && performance.getEntriesByType) {
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      return {
        domContentLoaded:
          navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        domInteractive: navigation.domInteractive - navigation.navigationStart,
        firstPaint: performance.getEntriesByType('paint').find(p => p.name === 'first-paint')
          ?.startTime,
        firstContentfulPaint: performance
          .getEntriesByType('paint')
          .find(p => p.name === 'first-contentful-paint')?.startTime,
      };
    }
  }
  return {};
};

// Export both named and default exports for compatibility
export { useErrorReporting as default };
