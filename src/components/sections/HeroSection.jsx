/**
 * @file HeroSection.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Modern hero section component with animated background and interactive elements
 */

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Sparkles, Star } from 'lucide-react';
import { useExperienceCalculator, useThrottledScroll, useRipple } from '../../hooks';
import { AnimatedParticles, FloatingElements, AnimatedMeshGradient } from '../background';
import { useMicroInteractions } from '../../utils/microInteractions';

// Modern Hero Section Component
const HeroSection = React.memo(function HeroSection() {
  const experience = useExperienceCalculator();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const { variants } = useMicroInteractions();
  const { createRipple } = useRipple();
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
    createRipple(e, contactButtonRef.current);
  };

  const handleWorkClick = e => {
    createRipple(e, workButtonRef.current);
  };

  return (
    <section
      id='home'
      className='min-h-screen flex items-center justify-center relative overflow-hidden pt-16 md:pt-0'
    >
      {/* Advanced Animated Mesh Gradient Background */}
      <AnimatedMeshGradient />

      {/* Additional background extension to prevent white bars */}
      <div className='absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none'></div>

      {/* Animated Particles */}
      <AnimatedParticles />

      {/* Floating Elements */}
      <FloatingElements />

      {/* Content */}
      <div className='container-custom relative z-10'>
        <div className='flex items-center justify-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-white text-center max-w-5xl'
          >
            {/* Modern Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className='flex items-center justify-center space-x-2 mb-4'
            >
              <motion.div
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatDelay: 3 }}
                className='text-2xl'
              >
                👋
              </motion.div>
              <span className='text-xl font-medium text-gray-300'>Hello, I'm</span>
            </motion.div>

            {/* Modern Name with Enhanced Gradient */}
            <motion.h1
              className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 leading-tight'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className='relative'>
                <span className='bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse'>
                  Aswin
                </span>
                <motion.div
                  className='absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full'
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
              </span>
            </motion.h1>

            {/* Modern Title with Typing Effect */}
            <motion.div
              className='text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 font-bold'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className='bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent'>
                Software Developer Engineer
              </span>
              <motion.span
                className='inline-block w-1 h-8 bg-gradient-to-r from-pink-400 to-cyan-400 ml-1'
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>

            {/* Enhanced Description */}
            <motion.p
              className='text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-gray-300 leading-relaxed max-w-3xl mx-auto px-4 sm:px-0'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Passionate about{' '}
              <span className='text-pink-400 font-semibold'>software development</span> and{' '}
              <span className='text-cyan-400 font-semibold'>modern technologies</span>. Specializing
              in building efficient software solutions with a keen interest in{' '}
              <span className='text-purple-400 font-semibold'>cloud infrastructure</span>. Based in
              the beautiful city of Pondicherry with{' '}
              <span className='text-emerald-400 font-semibold'>{experience}</span> of professional
              experience.
            </motion.p>

            {/* Modern CTA Buttons */}
            <motion.div
              className='flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8 justify-center px-4 sm:px-0 hero-buttons'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.a
                ref={contactButtonRef}
                href='#contact'
                onClick={handleContactClick}
                whileHover={variants.buttonHover}
                whileTap={variants.buttonTap}
                className='group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 overflow-hidden'
                aria-label='Navigate to contact section'
                style={{ position: 'relative' }}
              >
                <span className='relative z-10 flex items-center justify-center space-x-2'>
                  <motion.div whileHover={variants.iconHover} whileTap={variants.iconTap}>
                    <Sparkles size={20} />
                  </motion.div>
                  <span>Get In Touch</span>
                </span>
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700'
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.a
                ref={workButtonRef}
                href='#experience'
                onClick={handleWorkClick}
                whileHover={variants.buttonHover}
                whileTap={variants.buttonTap}
                className='group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden'
                aria-label='Navigate to experience section'
                style={{ position: 'relative' }}
              >
                <span className='flex items-center justify-center space-x-2'>
                  <motion.div whileHover={variants.iconHover} whileTap={variants.iconTap}>
                    <Star size={20} />
                  </motion.div>
                  <span>View My Work</span>
                </span>
              </motion.a>
            </motion.div>

            {/* Modern Social Links */}
            <motion.div
              className='flex items-center gap-4 md:gap-6 justify-center mb-8 md:mb-16 px-4 sm:px-0'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              {[
                { icon: Github, href: 'https://github.com/Aswin-coder', label: 'GitHub' },
                {
                  icon: Linkedin,
                  href: 'https://www.linkedin.com/in/aswin4122001/',
                  label: 'LinkedIn',
                },
                { icon: Mail, href: 'mailto:contact@aswincloud.com', label: 'Email' },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  whileHover={{
                    scale: 1.2,
                    y: -8,
                    rotateY: 5,
                    boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)',
                  }}
                  whileTap={{
                    scale: 0.9,
                    rotateY: -5,
                  }}
                  className='group relative p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300'
                  aria-label={`Visit ${social.label} profile`}
                >
                  <motion.div whileHover={variants.iconHover} whileTap={variants.iconTap}>
                    <social.icon
                      size={24}
                      className='text-white group-hover:text-pink-400 transition-colors duration-300'
                    />
                  </motion.div>
                  <motion.div className='absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modern Scroll Indicator - Positioned right after social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollIndicator ? 1 : 0 }}
        transition={{ delay: showScrollIndicator ? 1.5 : 0, duration: 0.5 }}
        className='absolute bottom-12 md:bottom-8 left-1/2 transform -translate-x-1/2 z-40'
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className='flex flex-col items-center space-y-2 text-white/90'
        >
          <span className='text-sm md:text-sm font-medium'>Scroll to explore</span>
          <motion.div className='w-6 h-9 md:w-6 md:h-10 border-2 border-white/60 rounded-full flex justify-center'>
            <motion.div
              className='w-1 h-3 md:h-3 bg-white/90 rounded-full mt-2 md:mt-2'
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
});

export default HeroSection;
