/**
 * @file FloatingElements.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Cosmic nebula effects component with flowing clouds, space phenomena, and dynamic cosmic dust
 */

import React from 'react';
import { motion } from 'framer-motion';

// Cosmic Nebula Effects Component
const FloatingElements = React.memo(() => {
  // Nebula cloud configurations
  const nebulaClouds = React.useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: `nebula-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 400 + 200, // 200-600px
        opacity: Math.random() * 0.15 + 0.05, // 0.05-0.2
        duration: Math.random() * 30 + 20, // 20-50s
        delay: Math.random() * 10,
        color: [
          'rgba(59, 130, 246, 0.1)', // Blue
          'rgba(139, 92, 246, 0.1)', // Purple
          'rgba(236, 72, 153, 0.1)', // Pink
          'rgba(6, 182, 212, 0.1)', // Cyan
          'rgba(168, 85, 247, 0.1)', // Violet
          'rgba(14, 165, 233, 0.1)', // Sky blue
          'rgba(251, 146, 60, 0.08)', // Orange
          'rgba(34, 197, 94, 0.08)', // Green
        ][i % 8],
        blurRadius: Math.random() * 50 + 30, // 30-80px blur
      })),
    []
  );

  // Cosmic gas formations
  const cosmicGas = React.useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: `gas-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        width: Math.random() * 300 + 100, // 100-400px
        height: Math.random() * 150 + 50, // 50-200px
        opacity: Math.random() * 0.1 + 0.02, // 0.02-0.12
        duration: Math.random() * 40 + 30, // 30-70s
        delay: Math.random() * 15,
        rotationSpeed: Math.random() * 2 - 1, // -1 to 1
        color: [
          'rgba(59, 130, 246, 0.08)',
          'rgba(139, 92, 246, 0.08)',
          'rgba(236, 72, 153, 0.08)',
          'rgba(6, 182, 212, 0.08)',
        ][i % 4],
      })),
    []
  );

  // Plasma streams
  const plasmaStreams = React.useMemo(
    () =>
      Array.from({ length: 2 }, (_, i) => ({
        id: `plasma-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        length: Math.random() * 200 + 100, // 100-300px
        width: Math.random() * 4 + 2, // 2-6px
        opacity: Math.random() * 0.4 + 0.1, // 0.1-0.5
        duration: Math.random() * 8 + 4, // 4-12s
        delay: Math.random() * 10,
        angle: Math.random() * 360,
        color: [
          '#00d4ff', // Electric blue
          '#ff006e', // Plasma pink
          '#8338ec', // Quantum purple
          '#06ffa5', // Nuclear green
          '#ffbe0b', // Solar yellow
          '#fb8500', // Cosmic orange
        ][i % 6],
      })),
    []
  );

  // Cosmic dust swirls
  const dustSwirls = React.useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: `dust-swirl-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        radius: Math.random() * 60 + 20, // 20-80px
        opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4
        duration: Math.random() * 20 + 15, // 15-35s
        delay: Math.random() * 8,
        rotationDirection: Math.random() > 0.5 ? 1 : -1,
        particles: Math.floor(Math.random() * 8) + 4, // 4-12 particles
      })),
    []
  );

  // Aurora-like energy waves
  const energyWaves = React.useMemo(
    () =>
      Array.from({ length: 2 }, (_, i) => ({
        id: `energy-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        width: Math.random() * 400 + 200, // 200-600px
        height: Math.random() * 100 + 50, // 50-150px
        opacity: Math.random() * 0.2 + 0.05, // 0.05-0.25
        duration: Math.random() * 12 + 8, // 8-20s
        delay: Math.random() * 5,
        waveHeight: Math.random() * 30 + 10, // 10-40px
        gradient: [
          'linear-gradient(90deg, rgba(0,212,255,0.2) 0%, rgba(131,56,236,0.1) 100%)',
          'linear-gradient(90deg, rgba(255,0,110,0.2) 0%, rgba(59,130,246,0.1) 100%)',
          'linear-gradient(90deg, rgba(139,92,246,0.2) 0%, rgba(236,72,153,0.1) 100%)',
          'linear-gradient(90deg, rgba(6,182,212,0.2) 0%, rgba(168,85,247,0.1) 100%)',
        ][i % 4],
      })),
    []
  );

  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      {/* Nebula Clouds */}
      {nebulaClouds.map(cloud => (
        <motion.div
          key={cloud.id}
          className='absolute rounded-full'
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.size}px`,
            height: `${cloud.size}px`,
            background: `radial-gradient(circle, ${cloud.color} 0%, transparent 70%)`,
            filter: `blur(${cloud.blurRadius}px)`,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 15, 0],
            scale: [1, 1.1, 0.9, 1],
            opacity: [cloud.opacity * 0.5, cloud.opacity, cloud.opacity * 0.7, cloud.opacity * 0.5],
          }}
          transition={{
            duration: cloud.duration,
            delay: cloud.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Cosmic Gas Formations */}
      {cosmicGas.map(gas => (
        <motion.div
          key={gas.id}
          className='absolute'
          style={{
            left: `${gas.x}%`,
            top: `${gas.y}%`,
            width: `${gas.width}px`,
            height: `${gas.height}px`,
            background: `radial-gradient(ellipse, ${gas.color} 0%, transparent 60%)`,
            filter: 'blur(25px)',
          }}
          animate={{
            rotate: [0, gas.rotationSpeed * 360],
            x: [0, 40, -30, 0],
            y: [0, -25, 20, 0],
            scaleX: [1, 1.2, 0.8, 1],
            scaleY: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: gas.duration,
            delay: gas.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Plasma Streams */}
      {plasmaStreams.map(stream => (
        <motion.div
          key={stream.id}
          className='absolute'
          style={{
            left: `${stream.x}%`,
            top: `${stream.y}%`,
            width: `${stream.length}px`,
            height: `${stream.width}px`,
            background: `linear-gradient(90deg, ${stream.color} 0%, transparent 100%)`,
            filter: 'blur(1px)',
            transformOrigin: 'left center',
            transform: `rotate(${stream.angle}deg)`,
          }}
          animate={{
            scaleX: [0, 1, 0.3, 1],
            opacity: [0, stream.opacity, stream.opacity * 0.5, stream.opacity],
          }}
          transition={{
            duration: stream.duration,
            delay: stream.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Cosmic Dust Swirls */}
      {dustSwirls.map(swirl => (
        <motion.div
          key={swirl.id}
          className='absolute'
          style={{
            left: `${swirl.x}%`,
            top: `${swirl.y}%`,
            width: `${swirl.radius * 2}px`,
            height: `${swirl.radius * 2}px`,
          }}
          animate={{
            rotate: [0, swirl.rotationDirection * 360],
          }}
          transition={{
            duration: swirl.duration,
            delay: swirl.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Dust particles in swirl */}
          {Array.from({ length: swirl.particles }, (_, i) => (
            <motion.div
              key={i}
              className='absolute w-1 h-1 bg-stellar-400/20 rounded-full'
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: `${swirl.radius}px 0px`,
                transform: `rotate(${(360 / swirl.particles) * i}deg)`,
              }}
              animate={{
                opacity: [0.1, swirl.opacity, 0.1],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: swirl.duration * 0.3,
                delay: swirl.delay + i * 0.1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      ))}

      {/* Aurora-like Energy Waves */}
      {energyWaves.map(wave => (
        <motion.div
          key={wave.id}
          className='absolute'
          style={{
            left: `${wave.x}%`,
            top: `${wave.y}%`,
            width: `${wave.width}px`,
            height: `${wave.height}px`,
            background: wave.gradient,
            filter: 'blur(8px)',
            clipPath: 'polygon(0% 50%, 25% 0%, 50% 80%, 75% 20%, 100% 60%, 100% 100%, 0% 100%)',
          }}
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -wave.waveHeight, wave.waveHeight, 0],
            scaleY: [1, 1.3, 0.7, 1],
            opacity: [wave.opacity * 0.3, wave.opacity, wave.opacity * 0.5, wave.opacity * 0.3],
          }}
          transition={{
            duration: wave.duration,
            delay: wave.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Quantum Field Distortions */}
      <div className='absolute inset-0'>
        <motion.div
          className='absolute w-full h-full'
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(0,212,255,0.03) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255,0,110,0.03) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(139,92,246,0.02) 0%, transparent 50%)
            `,
            filter: 'blur(20px)',
          }}
          animate={{
            background: [
              `radial-gradient(circle at 25% 25%, rgba(0,212,255,0.03) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,0,110,0.03) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(139,92,246,0.02) 0%, transparent 50%)`,
              `radial-gradient(circle at 35% 35%, rgba(0,212,255,0.04) 0%, transparent 50%), radial-gradient(circle at 65% 65%, rgba(255,0,110,0.04) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(139,92,246,0.03) 0%, transparent 50%)`,
              `radial-gradient(circle at 25% 25%, rgba(0,212,255,0.03) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,0,110,0.03) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(139,92,246,0.02) 0%, transparent 50%)`,
            ],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Cosmic Void Areas (darker spots) */}
      <div className='absolute inset-0'>
        <motion.div
          className='absolute w-32 h-32 rounded-full'
          style={{
            left: '20%',
            top: '30%',
            background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, transparent 70%)',
            filter: 'blur(15px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className='absolute w-24 h-24 rounded-full'
          style={{
            right: '25%',
            bottom: '40%',
            background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)',
            filter: 'blur(12px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 22,
            delay: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Wormhole Effect (very subtle) */}
      <motion.div
        className='absolute w-16 h-16 rounded-full border border-energy-electric/10'
        style={{
          left: '70%',
          top: '60%',
          background: 'radial-gradient(circle, transparent 30%, rgba(0,212,255,0.05) 100%)',
        }}
        animate={{
          scale: [1, 2, 1],
          rotate: [0, 360],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
});

FloatingElements.displayName = 'FloatingElements';

export default FloatingElements;
