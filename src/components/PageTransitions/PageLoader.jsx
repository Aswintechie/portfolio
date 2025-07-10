/**
 * @file PageLoader.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Beautiful page loading animation with progress indicators
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Sparkles, Zap, Star } from 'lucide-react';

const PageLoader = ({ isLoading, progress = 0, stage = 'loading', onComplete = () => {} }) => {
  const [dots, setDots] = useState('');
  const [currentTip, setCurrentTip] = useState(0);

  // Loading tips
  const loadingTips = [
    'Crafting beautiful interfaces...',
    'Optimizing performance...',
    'Loading interactive elements...',
    'Preparing smooth animations...',
    'Finalizing user experience...',
  ];

  // Animate dots
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Cycle through tips
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % loadingTips.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading, loadingTips.length]);

  // Handle completion
  useEffect(() => {
    if (progress >= 100 && stage === 'complete') {
      const timer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress, stage, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center'
          style={{
            pointerEvents: progress > 40 ? 'none' : 'auto', // Don't block interactions after 40% progress
          }}
        >
          {/* Background Animation */}
          <div className='absolute inset-0'>
            <div className='absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-pink-900/20' />

            {/* Animated Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className='absolute w-1 h-1 bg-white rounded-full opacity-60'
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0.6, 0.2, 0.6],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className='relative z-10 text-center max-w-md mx-auto px-6'>
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 1,
                ease: 'easeOut',
                type: 'spring',
                stiffness: 100,
              }}
              className='mb-8'
            >
              <div className='relative'>
                <div className='w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4'>
                  <Code size={40} className='text-white' />
                </div>

                {/* Rotating Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className='absolute inset-0 w-28 h-28 border-2 border-transparent border-t-blue-400 border-r-purple-400 rounded-full mx-auto'
                />
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className='text-4xl font-bold text-white mb-2'
            >
              Aswin
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className='text-xl text-gray-300 mb-8'
            >
              Portfolio
            </motion.p>

            {/* Progress Bar */}
            <div className='mb-6'>
              <div className='bg-white/10 rounded-full h-2 mb-3 overflow-hidden'>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className='h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full relative'
                >
                  <div className='absolute inset-0 bg-white/20 rounded-full animate-pulse' />
                </motion.div>
              </div>

              <div className='flex justify-between text-sm text-gray-400'>
                <span>{Math.round(progress)}%</span>
                <span>{stage === 'complete' ? 'Ready!' : 'Loading...'}</span>
              </div>
            </div>

            {/* Loading Tips */}
            <motion.div
              key={currentTip}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className='mb-4'
            >
              <p className='text-gray-300 text-sm'>
                {loadingTips[currentTip]}
                {dots}
              </p>
            </motion.div>

            {/* Animated Icons */}
            <div className='flex justify-center space-x-4'>
              {[Sparkles, Zap, Star].map((Icon, index) => (
                <motion.div
                  key={index}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  className='text-gray-400'
                >
                  <Icon size={16} />
                </motion.div>
              ))}
            </div>

            {/* Completion Animation */}
            {stage === 'complete' && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className='mt-4'
              >
                <div className='w-8 h-8 mx-auto bg-green-500 rounded-full flex items-center justify-center'>
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <svg
                      className='w-4 h-4 text-white'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <motion.path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Decoration */}
          <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2'>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className='text-gray-500 text-xs'
            >
              <div className='flex items-center space-x-1'>
                <div className='w-2 h-2 bg-gray-500 rounded-full animate-bounce' />
                <div
                  className='w-2 h-2 bg-gray-500 rounded-full animate-bounce'
                  style={{ animationDelay: '0.1s' }}
                />
                <div
                  className='w-2 h-2 bg-gray-500 rounded-full animate-bounce'
                  style={{ animationDelay: '0.2s' }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Simple loading spinner component
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`border-2 border-transparent border-t-current border-r-current rounded-full ${sizes[size]}`}
      />
    </div>
  );
};

// Progress bar component
export const ProgressBar = ({
  progress = 0,
  showPercentage = true,
  className = '',
  color = 'blue',
}) => {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
    yellow: 'from-yellow-500 to-yellow-600',
  };

  return (
    <div className={`relative ${className}`}>
      <div className='bg-gray-200 rounded-full h-2 overflow-hidden'>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${colors[color]} rounded-full`}
        />
      </div>
      {showPercentage && (
        <div className='absolute top-3 right-0 text-xs text-gray-600'>{Math.round(progress)}%</div>
      )}
    </div>
  );
};

export default PageLoader;
