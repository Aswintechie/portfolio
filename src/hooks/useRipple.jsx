/**
 * @file useRipple.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Custom hook for material design ripple effect on buttons
 */

import { useCallback } from 'react';

export const useRipple = () => {
  const createRipple = useCallback((event, element) => {
    const button = element || event.currentTarget;
    const rect = button.getBoundingClientRect();

    // Get click position relative to button
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculate ripple size (diameter should cover button diagonally)
    const size = Math.max(rect.width, rect.height);
    const rippleSize = size * 2;

    // Create ripple element
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    ripple.style.width = `${rippleSize}px`;
    ripple.style.height = `${rippleSize}px`;
    ripple.style.left = `${x - rippleSize / 2}px`;
    ripple.style.top = `${y - rippleSize / 2}px`;
    ripple.style.pointerEvents = 'none';
    ripple.style.transform = 'scale(0)';
    ripple.style.opacity = '1';
    ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
    ripple.style.zIndex = '1000';

    // Ensure button has relative positioning
    const position = window.getComputedStyle(button).position;
    if (position !== 'relative' && position !== 'absolute') {
      button.style.position = 'relative';
    }

    // Ensure overflow is hidden
    button.style.overflow = 'hidden';

    // Add ripple to button
    button.appendChild(ripple);

    // Trigger animation
    requestAnimationFrame(() => {
      ripple.style.transform = 'scale(1)';
      ripple.style.opacity = '0';
    });

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }, []);

  return { createRipple };
};

export default useRipple;
