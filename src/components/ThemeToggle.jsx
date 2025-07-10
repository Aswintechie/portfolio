/**
 * @file ThemeToggle.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Animated theme toggle component for dark/light mode switching
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme.js';

const ThemeToggle = React.memo(() => {
  const { theme, toggleTheme, isLoading } = useTheme();

  if (isLoading) {
    return <div className='w-12 h-6 bg-gray-200 rounded-full animate-pulse'></div>;
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className='relative w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Background gradient */}
      <div className='absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 dark:opacity-20 transition-opacity duration-300' />

      {/* Toggle switch */}
      <motion.div
        className='relative w-4 h-4 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center'
        animate={{
          x: theme === 'dark' ? 24 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30,
        }}
      >
        {/* Icon container */}
        <div className='relative w-3 h-3 flex items-center justify-center'>
          {/* Sun icon */}
          <motion.div
            className='absolute inset-0 flex items-center justify-center'
            animate={{
              opacity: theme === 'light' ? 1 : 0,
              rotate: theme === 'light' ? 0 : 180,
              scale: theme === 'light' ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          >
            <Sun size={10} className='text-yellow-500' />
          </motion.div>

          {/* Moon icon */}
          <motion.div
            className='absolute inset-0 flex items-center justify-center'
            animate={{
              opacity: theme === 'dark' ? 1 : 0,
              rotate: theme === 'dark' ? 0 : -180,
              scale: theme === 'dark' ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          >
            <Moon size={10} className='text-blue-400' />
          </motion.div>
        </div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className='absolute inset-0 rounded-full'
        animate={{
          boxShadow:
            theme === 'dark'
              ? '0 0 10px rgba(59, 130, 246, 0.3)'
              : '0 0 10px rgba(251, 191, 36, 0.3)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle;
