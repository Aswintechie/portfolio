/**
 * @file ThemeToggle.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Theme toggle button with smooth animations
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className='fixed top-20 right-6 z-50 p-3 rounded-full bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200/20 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300'
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className='relative w-6 h-6'>
        {/* Sun Icon */}
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? 90 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className='absolute inset-0'
        >
          <Sun className='w-6 h-6 text-yellow-500' />
        </motion.div>

        {/* Moon Icon */}
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : -90,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className='absolute inset-0'
        >
          <Moon className='w-6 h-6 text-blue-400' />
        </motion.div>
      </div>

      {/* Glow effect */}
      <motion.div
        className='absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 dark:from-blue-400/20 dark:to-purple-400/20 blur-xl -z-10'
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
