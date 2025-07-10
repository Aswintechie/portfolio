/**
 * @file ThemeContext.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Theme context for dark mode functionality with localStorage persistence
 */

import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const initializeTheme = () => {
      try {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
          setTheme(savedTheme);
        } else {
          // Check system preference
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const initialTheme = systemPrefersDark ? 'dark' : 'light';
          setTheme(initialTheme);
        }
      } catch (error) {
        console.warn('Failed to initialize theme:', error);
        setTheme('light');
      } finally {
        setIsLoading(false);
      }
    };

    initializeTheme();
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isLoading) return;

    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.className = theme;

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#1a1a1a' : '#ffffff');
    }
  }, [theme, isLoading]);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    try {
      localStorage.setItem('portfolio-theme', newTheme);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  };

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = e => {
      // Only update if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  const value = {
    theme,
    toggleTheme,
    isLoading,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeContext;
