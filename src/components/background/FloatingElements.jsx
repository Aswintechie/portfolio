/**
 * @file FloatingElements.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Performance-optimized floating background elements with animated gradients
 */

import React from 'react';
import { motion } from 'framer-motion';

// Performance-optimized Floating Elements Component
const FloatingElements = React.memo(() => {
  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      {/* Main gradient orbs */}
      <motion.div
        className='absolute w-64 h-64 rounded-full opacity-12'
        style={{
          background:
            'radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(14,165,233,0.15) 50%, transparent 100%)',
          top: '10%',
          right: '10%',
        }}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary gradient orb */}
      <motion.div
        className='absolute w-48 h-48 rounded-full opacity-8'
        style={{
          background:
            'radial-gradient(circle, rgba(14,165,233,0.25) 0%, rgba(236,72,153,0.12) 50%, transparent 100%)',
          top: '60%',
          left: '5%',
        }}
        animate={{
          scale: [1, 1.08, 1],
          rotate: [360, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className='absolute w-8 h-8 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full'
        style={{ top: '25%', left: '15%' }}
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className='absolute w-6 h-6 bg-gradient-to-br from-secondary-400/15 to-accent-400/15 rounded-full'
        style={{ top: '50%', right: '25%' }}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Additional floating elements */}
      <motion.div
        className='absolute w-4 h-4 bg-gradient-to-br from-cyan-400/25 to-blue-400/25 rounded-full'
        style={{ top: '35%', right: '8%' }}
        animate={{
          y: [0, -12, 0],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className='absolute w-5 h-5 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full'
        style={{ top: '75%', left: '20%' }}
        animate={{
          y: [0, -18, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle diamond shapes */}
      <motion.div
        className='absolute w-3 h-3 bg-gradient-to-br from-yellow-400/15 to-orange-400/15 transform rotate-45'
        style={{ top: '15%', left: '80%' }}
        animate={{
          y: [0, -10, 0],
          rotate: [45, 225, 45],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className='absolute w-2 h-2 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 transform rotate-45'
        style={{ top: '80%', right: '15%' }}
        animate={{
          y: [0, -8, 0],
          rotate: [45, 405, 45],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Animated lines/streaks */}
      <motion.div
        className='absolute w-px h-16 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent'
        style={{ top: '20%', left: '70%' }}
        animate={{
          opacity: [0, 1, 0],
          scaleY: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className='absolute w-px h-12 bg-gradient-to-b from-transparent via-pink-400/25 to-transparent'
        style={{ top: '65%', right: '30%' }}
        animate={{
          opacity: [0, 1, 0],
          scaleY: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Pulsing dots */}
      <motion.div
        className='absolute w-1 h-1 bg-blue-400/40 rounded-full'
        style={{ top: '40%', left: '25%' }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className='absolute w-1 h-1 bg-purple-400/40 rounded-full'
        style={{ top: '70%', right: '40%' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </div>
  );
});

FloatingElements.displayName = 'FloatingElements';

export default FloatingElements;
