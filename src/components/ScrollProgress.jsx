/**
 * @file ScrollProgress.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Scroll progress indicator component
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Top scroll progress bar */}
      <motion.div
        className='fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 transform origin-left z-[9999]'
        style={{ scaleX }}
      />

      {/* Glow effect */}
      <motion.div
        className='fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500/50 via-purple-500/50 to-cyan-500/50 blur-sm transform origin-left z-[9998]'
        style={{ scaleX }}
      />
    </>
  );
};

export default ScrollProgress;
