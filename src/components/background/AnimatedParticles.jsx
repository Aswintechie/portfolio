/**
 * @file AnimatedParticles.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Enhanced cosmic starfield background with twinkling stars, depth layers, and space effects
 */

import React from 'react';
import { motion } from 'framer-motion';

// Enhanced Cosmic Starfield Background Component
const AnimatedParticles = React.memo(() => {
  // Create different layers of stars for depth
  const starLayers = React.useMemo(() => {
    const layers = [];

    // Layer 1: Distant stars (small, slow) - OPTIMIZED
    layers.push({
      name: 'distant',
      count: 15,
      sizeRange: [0.5, 1.5],
      opacityRange: [0.3, 0.8],
      animationDuration: [3, 6],
      color: '#ffffff',
      blur: 0,
    });

    // Layer 2: Medium stars (medium, moderate speed) - OPTIMIZED
    layers.push({
      name: 'medium',
      count: 10,
      sizeRange: [1, 2.5],
      opacityRange: [0.4, 0.9],
      animationDuration: [2, 4],
      color: '#e0f2fe',
      blur: 0.5,
    });

    // Layer 3: Close stars (larger, faster) - OPTIMIZED
    layers.push({
      name: 'close',
      count: 8,
      sizeRange: [1.5, 3],
      opacityRange: [0.5, 1],
      animationDuration: [1, 3],
      color: '#bfdbfe',
      blur: 1,
    });

    // Layer 4: Bright stars (special twinkling) - OPTIMIZED
    layers.push({
      name: 'bright',
      count: 5,
      sizeRange: [2, 4],
      opacityRange: [0.6, 1],
      animationDuration: [0.5, 2],
      color: '#3b82f6',
      blur: 2,
    });

    return layers.map(layer => ({
      ...layer,
      stars: Array.from({ length: layer.count }, (_, i) => ({
        id: `${layer.name}-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]) + layer.sizeRange[0],
        opacity:
          Math.random() * (layer.opacityRange[1] - layer.opacityRange[0]) + layer.opacityRange[0],
        duration:
          Math.random() * (layer.animationDuration[1] - layer.animationDuration[0]) +
          layer.animationDuration[0],
        delay: Math.random() * 5,
        pulseOffset: Math.random() * Math.PI * 2,
      })),
    }));
  }, []);

  // Shooting stars - OPTIMIZED
  const shootingStars = React.useMemo(
    () =>
      Array.from({ length: 2 }, (_, i) => ({
        id: `shooting-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 10 + 5,
        angle: Math.random() * 60 - 30, // -30 to 30 degrees
      })),
    []
  );

  // Cosmic dust particles - OPTIMIZED
  const cosmicDust = React.useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: `dust-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 10,
        drift: Math.random() * 2 - 1, // -1 to 1
      })),
    []
  );

  return (
    <div
      className='absolute inset-0 overflow-hidden pointer-events-none'
      style={{ willChange: 'transform' }}
    >
      {/* Nebula Background Glow - OPTIMIZED */}
      <div className='absolute inset-0'>
        <div className='absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-nebula-purple/8 to-transparent rounded-full blur-2xl animate-pulse-slow'></div>
        <div className='absolute bottom-1/3 right-1/3 w-64 h-64 bg-gradient-radial from-nebula-blue/6 to-transparent rounded-full blur-2xl animate-pulse-slow animation-delay-400'></div>
      </div>

      {/* Star Layers */}
      {starLayers.map(layer => (
        <div
          key={layer.name}
          className='absolute inset-0'
          style={{ filter: `blur(${layer.blur}px)` }}
        >
          {layer.stars.map(star => (
            <motion.div
              key={star.id}
              className='absolute rounded-full'
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: layer.color,
                boxShadow: `0 0 ${star.size * 2}px ${layer.color}`,
              }}
              animate={{
                opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>
      ))}

      {/* Shooting Stars */}
      {shootingStars.map(star => (
        <motion.div
          key={star.id}
          className='absolute'
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: '2px',
            height: '2px',
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            filter: 'blur(0.5px)',
          }}
          animate={{
            x: [0, 200],
            y: [0, 100],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: 10,
            ease: 'easeOut',
          }}
        >
          {/* Shooting star tail */}
          <div
            className='absolute w-20 h-px bg-gradient-to-r from-white to-transparent'
            style={{
              left: '-20px',
              top: '1px',
              transform: `rotate(${star.angle}deg)`,
              transformOrigin: 'right center',
            }}
          />
        </motion.div>
      ))}

      {/* Cosmic Dust */}
      <div className='absolute inset-0 opacity-60'>
        {cosmicDust.map(dust => (
          <motion.div
            key={dust.id}
            className='absolute rounded-full bg-stellar-400/20'
            style={{
              left: `${dust.x}%`,
              top: `${dust.y}%`,
              width: `${dust.size}px`,
              height: `${dust.size}px`,
            }}
            animate={{
              x: [0, dust.drift * 50],
              y: [0, -20],
              opacity: [0, dust.opacity, dust.opacity, 0],
            }}
            transition={{
              duration: dust.duration,
              delay: dust.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Constellation Lines (subtle) */}
      <svg className='absolute inset-0 w-full h-full' style={{ opacity: 0.1 }}>
        <defs>
          <linearGradient id='constellation-gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' style={{ stopColor: '#3b82f6', stopOpacity: 0.3 }} />
            <stop offset='100%' style={{ stopColor: '#8b5cf6', stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>

        {/* Example constellation lines */}
        <motion.path
          d='M 20,30 L 40,20 L 60,35 L 80,25'
          stroke='url(#constellation-gradient)'
          strokeWidth='1'
          fill='none'
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, delay: 2, repeat: Infinity, repeatDelay: 15 }}
        />

        <motion.path
          d='M 30,70 L 50,60 L 70,75 L 90,65 L 85,85'
          stroke='url(#constellation-gradient)'
          strokeWidth='1'
          fill='none'
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 6, delay: 5, repeat: Infinity, repeatDelay: 20 }}
        />
      </svg>

      {/* Pulsing Energy Orbs */}
      <div className='absolute inset-0'>
        <motion.div
          className='absolute w-32 h-32 rounded-full border border-energy-electric/20'
          style={{
            left: '10%',
            top: '20%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className='absolute w-24 h-24 rounded-full border border-energy-plasma/20'
          style={{
            right: '15%',
            bottom: '25%',
            background: 'radial-gradient(circle, rgba(255,0,110,0.05) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            delay: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Cosmic Grid (very subtle) */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='w-full h-full'
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>
    </div>
  );
});

AnimatedParticles.displayName = 'AnimatedParticles';

export default AnimatedParticles;
