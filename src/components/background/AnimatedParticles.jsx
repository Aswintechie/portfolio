/**
 * @file AnimatedParticles.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Optimized animated background particles component for visual enhancement
 */

import React from 'react';
import { motion } from 'framer-motion';

// Optimized Animated Background Particles Component
const AnimatedParticles = React.memo(() => {
  // Optimized particle count for better performance
  const particles = React.useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1, // Reduced max size
        duration: Math.random() * 15 + 8, // Reduced duration range
        delay: Math.random() * 3, // Reduced delay range
      })),
    []
  );

  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className='absolute rounded-full bg-white/8' // Reduced opacity
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -15, 0], // Reduced movement
            opacity: [0.2, 0.6, 0.2], // Reduced opacity range
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
});

AnimatedParticles.displayName = 'AnimatedParticles';

export default AnimatedParticles;
