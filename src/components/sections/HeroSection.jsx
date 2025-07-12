/**
 * @file HeroSection.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Cosmic hero section with space-themed design, stellar animations, and holographic elements
 */

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Rocket, Zap, Sparkles, Star, Orbit } from 'lucide-react';
import { useExperienceCalculator, useThrottledScroll } from '../../hooks';
import { AnimatedParticles, FloatingElements } from '../background';
import { useMicroInteractions } from '../../utils/microInteractions';

// Cosmic Hero Section Component
const HeroSection = React.memo(function HeroSection() {
  const experience = useExperienceCalculator();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const { createRipple, variants } = useMicroInteractions();
  const contactButtonRef = useRef(null);
  const workButtonRef = useRef(null);

  // Optimized scroll handler with throttling
  const handleScrollIndicator = React.useCallback(() => {
    const shouldShow = window.scrollY <= 50;
    setShowScrollIndicator(shouldShow);
  }, []);

  useThrottledScroll(handleScrollIndicator);

  // Handle button clicks with ripple effect
  const handleContactClick = e => {
    if (contactButtonRef.current) {
      createRipple(e, contactButtonRef.current);
    }
  };

  const handleWorkClick = e => {
    if (workButtonRef.current) {
      createRipple(e, workButtonRef.current);
    }
  };

  return (
    <section
      id='home'
      className='min-h-screen flex items-center justify-center relative overflow-hidden'
    >
      {/* Deep Space Background */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-deep-space'></div>
        <div className='absolute inset-0 bg-gradient-cosmic opacity-80'></div>
        <div className='absolute inset-0 bg-gradient-galaxy opacity-30'></div>
      </div>

      {/* Cosmic Mesh Gradient Overlay */}
      <div className='absolute inset-0 opacity-40'>
        <div className='absolute inset-0 bg-gradient-energy'></div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,212,255,0.15)_0%,transparent_50%)]'></div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,0,110,0.12)_0%,transparent_50%)]'></div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_60%_80%,rgba(139,92,246,0.1)_0%,transparent_40%)]'></div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_10%_70%,rgba(6,182,212,0.08)_0%,transparent_35%)]'></div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_90%_90%,rgba(34,197,94,0.06)_0%,transparent_45%)]'></div>
      </div>

      {/* Enhanced Starfield */}
      <AnimatedParticles />

      {/* Cosmic Nebula Effects */}
      <FloatingElements />

      {/* Holographic Grid Background */}
      <div className='absolute inset-0 opacity-10'>
        <div
          className='w-full h-full'
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'cosmic-drift 30s linear infinite',
          }}
        />
      </div>

      {/* Orbital Rings */}
      <div className='absolute inset-0 pointer-events-none'>
        <motion.div
          className='absolute w-96 h-96 border border-energy-electric/20 rounded-full'
          style={{
            left: '50%',
            top: '50%',
            marginLeft: '-192px',
            marginTop: '-192px',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.div
          className='absolute w-64 h-64 border border-energy-plasma/15 rounded-full'
          style={{
            left: '50%',
            top: '50%',
            marginLeft: '-128px',
            marginTop: '-128px',
          }}
          animate={{
            rotate: [360, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Content */}
      <div className='container-custom relative z-10'>
        <div className='flex items-center justify-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center max-w-5xl'
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className='flex items-center justify-center space-x-2 mb-6'
            >
              <div className='holographic rounded-full px-6 py-3 flex items-center space-x-3'>
                <motion.div
                  className='w-2 h-2 bg-energy-nuclear rounded-full'
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className='text-sm font-cosmic text-stellar-200 uppercase tracking-widest'>
                  Available
                </span>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Orbit size={16} className='text-energy-electric' />
                </motion.div>
              </div>
            </motion.div>

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='flex items-center justify-center space-x-3 mb-6'
            >
              <motion.div
                animate={{
                  rotate: [0, 14, -8, 14, -4, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 4 }}
                className='text-3xl'
              >
                👋
              </motion.div>
              <span className='text-xl font-space text-stellar-300 tracking-wide'>Hello, I'm</span>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles size={20} className='text-energy-electric' />
              </motion.div>
            </motion.div>

            {/* Cosmic Name with Holographic Effect */}
            <motion.h1
              className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-cosmic font-black mb-6 leading-tight'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className='relative inline-block'>
                <span className='text-cosmic animate-glow'>ASWIN</span>

                {/* Holographic Overlay */}
                <motion.div
                  className='absolute inset-0 text-cosmic opacity-30'
                  animate={{
                    x: [0, 2, -2, 0],
                    y: [0, -1, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    background:
                      'linear-gradient(45deg, transparent, rgba(0,212,255,0.1), transparent)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  ASWIN
                </motion.div>

                {/* Stellar Particles around name */}
                <motion.div
                  className='absolute -top-4 -right-4 w-3 h-3 bg-energy-nuclear rounded-full'
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <motion.div
                  className='absolute -bottom-2 -left-2 w-2 h-2 bg-energy-plasma rounded-full'
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                />
              </span>
            </motion.h1>

            {/* Title with Typing Effect */}
            <motion.div
              className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 font-cosmic font-bold'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className='text-glow text-stellar-100'>SOFTWARE ENGINEER</span>
              <motion.span
                className='inline-block w-1 h-10 bg-energy-electric ml-2'
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>

            {/* Enhanced Description */}
            <motion.p
              className='text-lg sm:text-xl md:text-2xl mb-8 text-stellar-300 leading-relaxed max-w-4xl mx-auto px-4 sm:px-0'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Building innovative{' '}
              <span className='text-glow-cyan font-semibold'>web applications</span> and{' '}
              <span className='text-glow-pink font-semibold'>cloud solutions</span>.
              <br />
              Specialized in <span className='text-glow font-semibold'>
                modern architectures
              </span>{' '}
              with <span className='text-energy-nuclear font-semibold'>{experience}</span> of
              professional experience from Pondicherry.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className='flex flex-col sm:flex-row gap-4 md:gap-6 mb-8 justify-center px-4 sm:px-0'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.button
                ref={contactButtonRef}
                onClick={handleContactClick}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                className='group relative px-8 py-4 btn-primary font-cosmic font-semibold text-lg rounded-2xl shadow-energy hover:shadow-plasma transition-all duration-300 overflow-hidden'
                style={{ position: 'relative' }}
              >
                <span className='relative z-10 flex items-center justify-center space-x-3'>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Rocket size={24} />
                  </motion.div>
                  <span>GET IN TOUCH</span>
                </span>

                {/* Energy particles */}
                <motion.div
                  className='absolute inset-0 pointer-events-none'
                  animate={{
                    background: [
                      'radial-gradient(circle at 20% 20%, rgba(0,212,255,0.2) 0%, transparent 50%)',
                      'radial-gradient(circle at 80% 80%, rgba(255,0,110,0.2) 0%, transparent 50%)',
                      'radial-gradient(circle at 20% 20%, rgba(0,212,255,0.2) 0%, transparent 50%)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.button>

              <motion.button
                ref={workButtonRef}
                onClick={handleWorkClick}
                whileHover={{ scale: 1.05, rotateY: -5 }}
                whileTap={{ scale: 0.95 }}
                className='group relative px-8 py-4 glass-cosmic font-cosmic font-semibold text-lg rounded-2xl border-2 border-energy-electric/30 hover:border-energy-electric/50 transition-all duration-300 overflow-hidden'
                style={{ position: 'relative' }}
              >
                <span className='flex items-center justify-center space-x-3 text-stellar-100'>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap size={24} />
                  </motion.div>
                  <span>VIEW WORK</span>
                </span>
              </motion.button>
            </motion.div>

            {/* Social Navigation */}
            <motion.div
              className='flex items-center gap-6 justify-center mb-16 px-4 sm:px-0'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              {[
                {
                  icon: Github,
                  href: 'https://github.com/Aswin-coder',
                  label: 'GitHub',
                  color: 'text-stellar-100',
                },
                {
                  icon: Linkedin,
                  href: 'https://www.linkedin.com/in/aswin4122001/',
                  label: 'LinkedIn',
                  color: 'text-energy-electric',
                },
                {
                  icon: Mail,
                  href: 'mailto:contact@aswinlocal.in',
                  label: 'Email',
                  color: 'text-energy-plasma',
                },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  whileHover={{
                    scale: 1.2,
                    y: -10,
                    rotateY: 10,
                  }}
                  whileTap={{
                    scale: 0.9,
                    rotateY: -10,
                  }}
                  className='group relative p-5 holographic rounded-2xl transition-all duration-300'
                  aria-label={social.label}
                >
                  <social.icon
                    size={28}
                    className={`${social.color} group-hover:scale-110 transition-transform duration-300`}
                  />

                  {/* Hover glow effect */}
                  <motion.div
                    className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                    style={{
                      background:
                        'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)',
                      filter: 'blur(10px)',
                    }}
                  />
                </motion.a>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
              initial={{ opacity: 0 }}
              animate={{ opacity: showScrollIndicator ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className='flex flex-col items-center space-y-2'
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className='text-stellar-400 font-space text-sm tracking-wider'>
                  SCROLL DOWN
                </span>
                <motion.div
                  className='w-px h-12 bg-gradient-to-b from-energy-electric to-transparent'
                  animate={{
                    height: [24, 48, 24],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className='w-2 h-2 bg-energy-electric rounded-full'
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stellar Atmosphere Edge */}
      <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-galaxy-center to-transparent pointer-events-none' />
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
