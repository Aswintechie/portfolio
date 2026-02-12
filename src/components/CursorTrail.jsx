/**
 * @file CursorTrail.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Animated cursor trail effect with particles
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorTrail = () => {
  const [particles, setParticles] = useState([]);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device is touch-enabled
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkTouch();

    // Don't show trail on touch devices
    if (isTouch) return;

    let particleId = 0;
    let lastX = 0;
    let lastY = 0;
    let throttleTimer = null;

    const handleMouseMove = e => {
      // Throttle particle creation for performance
      if (throttleTimer) return;

      throttleTimer = setTimeout(() => {
        throttleTimer = null;
      }, 30); // Create particle every 30ms

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only create particles if mouse is moving
      if (distance > 5) {
        const newParticle = {
          id: particleId++,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 6 + 4, // Random size between 4-10px
          color: `hsl(${Math.random() * 60 + 280}, 70%, 60%)`, // Purple to pink hues
        };

        setParticles(prev => [...prev.slice(-20), newParticle]); // Keep only last 20 particles
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [isTouch]);

  // Don't render on touch devices
  if (isTouch) return null;

  return (
    <div className='fixed inset-0 pointer-events-none z-[10000]'>
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x - particle.size / 2,
              y: particle.y - particle.size / 2,
              opacity: 0.8,
              scale: 1,
            }}
            animate={{
              opacity: 0,
              scale: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
            style={{
              position: 'fixed',
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              pointerEvents: 'none',
            }}
            onAnimationComplete={() => {
              setParticles(prev => prev.filter(p => p.id !== particle.id));
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorTrail;
