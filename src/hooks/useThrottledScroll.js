/**
 * @file useThrottledScroll.js
 * @author Aswin
 * @copyright © 2024 Aswin. All rights reserved.
 * @description Custom React hook for optimized throttled scroll event handling
 */

import React from 'react';

// Optimized throttle function for scroll events
export const useThrottledScroll = (callback, delay = 16) => {
  const callbackRef = React.useRef(callback);
  const throttleRef = React.useRef(null);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (throttleRef.current) return;

      throttleRef.current = setTimeout(() => {
        callbackRef.current();
        throttleRef.current = null;
      }, delay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
      }
    };
  }, [delay]);
};
