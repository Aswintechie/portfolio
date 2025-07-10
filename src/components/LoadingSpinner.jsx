/**
 * @file LoadingSpinner.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Modern loading spinner component for lazy-loaded sections
 */

import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', showText = true, text = 'Loading...', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5',
  };

  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
      {/* Animated Loading Dots */}
      <div className={`relative ${sizeClasses[size]} mb-4`}>
        {[0, 1, 2].map(index => (
          <motion.div
            key={index}
            className={`absolute ${dotSizes[size]} bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full`}
            style={{
              left: `${index * 25}%`,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.2,
            }}
          />
        ))}
      </div>

      {/* Loading Text */}
      {showText && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='text-gray-600 text-sm font-medium'
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;
