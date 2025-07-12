/**
 * @file HeroSection.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Ultra-modern hero section with bento grid layout and advanced glassmorphism
 */

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Sparkles, Star, ArrowRight, Code, Cpu, Cloud } from 'lucide-react';
import { useExperienceCalculator, useThrottledScroll } from '../../hooks';
import { AnimatedParticles, FloatingElements } from '../background';
import { useMicroInteractions } from '../../utils/microInteractions';

// Modern Hero Section Component with Bento Grid
const HeroSection = React.memo(function HeroSection() {
  const experience = useExperienceCalculator();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const { createRipple } = useMicroInteractions();
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
      className='min-h-screen relative overflow-hidden'
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
      }}
    >
      {/* Dark gradient background with deeper blacks */}
      <div className='absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black'></div>
      
      {/* Enhanced background overlay for better text contrast */}
      <div className='absolute inset-0 bg-black/30'></div>

      {/* Enhanced Dynamic Background */}
      <div className='absolute inset-0'>
        {/* Animated Gradient Orbs */}
        <motion.div
          className='absolute top-20 left-20 w-96 h-96 opacity-30'
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className='w-full h-full rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-600/20 blur-3xl' />
        </motion.div>

        <motion.div
          className='absolute bottom-20 right-20 w-80 h-80 opacity-25'
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className='w-full h-full rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl' />
        </motion.div>

        <motion.div
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-20'
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className='w-full h-full rounded-full bg-gradient-to-r from-emerald-400/20 to-teal-500/20 blur-2xl' />
        </motion.div>

        {/* Animated Grid Pattern */}
        <div className='absolute inset-0 opacity-5'>
          <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]' />
        </div>
      </div>

      {/* Enhanced Particles */}
      <AnimatedParticles />
      <FloatingElements />

      {/* Main Content - No Card, Direct Content */}
      <div className='container-custom relative z-10 min-h-screen flex items-center py-20'>
        <div className='w-full'>
          {/* Content Without Card Container */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='relative max-w-6xl mx-auto'
          >
            {/* Content */}
            <div className='relative z-10'>
              {/* Modern Greeting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='flex items-center justify-center space-x-3 mb-8'
              >
                <div className='w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-white/20 flex items-center justify-center'>
                  <motion.div
                    animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                    transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 4 }}
                    className='text-2xl'
                  >
                    👋
                  </motion.div>
                </div>
                <span className='text-xl font-medium text-white/80'>Hello, I'm</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                className='text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight text-center'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className='relative inline-block'>
                  <span className='bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent'>
                    Aswin
                  </span>
                  {/* Neon glow effect */}
                  <motion.div
                    className='absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-lg blur-lg'
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.div
                className='text-2xl sm:text-3xl lg:text-4xl mb-8 font-bold text-center'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className='text-white/90'>Software Developer</span>
                <br />
                <span className='bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent'>
                  Engineer
                </span>
              </motion.div>

              {/* Description */}
              <motion.div
                className='text-lg text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed text-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <motion.span
                  initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                  className='inline-block'
                >
                  Passionate about software development and modern technologies.
                </motion.span>
                {' '}
                <motion.span
                  initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                  className='inline-block'
                >
                  Specializing in building efficient software solutions with a keen interest in cloud infrastructure.
                </motion.span>
                {' '}
                <motion.span
                  initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 1.0, duration: 0.8, ease: 'easeOut' }}
                  className='inline-block'
                >
                  Based in the beautiful city of <span className='text-indigo-300 font-semibold'>Pondicherry</span> with <span className='text-cyan-300 font-semibold'>{experience}</span> of professional experience.
                </motion.span>
              </motion.div>

              {/* Experience Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className='flex items-center justify-center mb-8'
              >
                <div className='flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20'>
                  <motion.div 
                    className='w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-500/20 border border-white/20 flex items-center justify-center'
                    animate={{ 
                      rotateY: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: 'easeInOut' 
                    }}
                  >
                    <Code size={24} className='text-emerald-300' />
                  </motion.div>
                  <div className='text-center'>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1, delay: 0.7, type: 'spring' }}
                      className='text-2xl font-black text-white'
                    >
                      {experience}
                    </motion.div>
                    <div className='text-white/70 text-sm font-medium'>Years Experience</div>
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className='flex flex-col sm:flex-row gap-4 mb-8 justify-center'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.a
                  ref={contactButtonRef}
                  href='#contact'
                  onClick={handleContactClick}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className='group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/25 transition-all duration-300'
                >
                  <span className='relative z-10 flex items-center space-x-2'>
                    <Sparkles size={20} />
                    <span>Let's Connect</span>
                    <ArrowRight size={20} className='group-hover:translate-x-1 transition-transform' />
                  </span>
                  <div className='absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity' />
                </motion.a>

                <motion.a
                  ref={workButtonRef}
                  href='#experience'
                  onClick={handleWorkClick}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className='group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300'
                >
                  <span className='flex items-center space-x-2'>
                    <Star size={20} />
                    <span>View Work</span>
                  </span>
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className='flex items-center justify-center space-x-6 mb-8'
              >
                {[
                  { icon: Github, href: 'https://github.com/Aswin-coder', label: 'GitHub', color: 'from-gray-400 to-gray-600' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/aswin4122001/', label: 'LinkedIn', color: 'from-blue-400 to-blue-600' },
                  { icon: Mail, href: 'mailto:contact@aswinlocal.in', label: 'Email', color: 'from-red-400 to-red-600' },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    whileHover={{ 
                      scale: 1.2, 
                      y: -6,
                      rotateZ: [0, 5, -5, 0]
                    }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 2 + index * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.2
                    }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </motion.div>

              {/* Quick Info Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className='flex flex-wrap items-center justify-center gap-4'
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className='bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/10'
                >
                  <div className='flex items-center space-x-3'>
                    <motion.div 
                      className='w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400/20 to-pink-400/20 flex items-center justify-center'
                      animate={{ 
                        rotate: [0, 360] 
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        ease: 'linear' 
                      }}
                    >
                      <Cpu size={16} className='text-purple-300' />
                    </motion.div>
                    <div>
                      <div className='text-white font-semibold text-sm'>Tech Enthusiast</div>
                      <div className='text-white/60 text-xs'>Always Learning</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className='bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/10'
                >
                  <div className='flex items-center space-x-3'>
                    <motion.div 
                      className='w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400/20 to-cyan-400/20 flex items-center justify-center'
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotateY: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: 'easeInOut' 
                      }}
                    >
                      <Cloud size={16} className='text-blue-300' />
                    </motion.div>
                    <div>
                      <div className='text-white font-semibold text-sm'>Cloud Expert</div>
                      <div className='text-white/60 text-xs'>Modern Infrastructure</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className='bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/10'
                >
                  <div className='flex items-center space-x-3'>
                    <motion.div 
                      className='w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400/20 to-cyan-400/20 flex items-center justify-center'
                      animate={{ 
                        rotateY: [0, 360] 
                      }}
                      transition={{ 
                        duration: 6, 
                        repeat: Infinity, 
                        ease: 'linear' 
                      }}
                    >
                      <span className='text-lg'>💡</span>
                    </motion.div>
                    <div>
                      <div className='text-white font-semibold text-sm'>Innovation Focus</div>
                      <div className='text-white/60 text-xs'>Creative Solutions</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className='bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/10'
                >
                  <div className='flex items-center space-x-3'>
                    <motion.div 
                      className='w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400/20 to-purple-400/20 flex items-center justify-center'
                      animate={{ 
                        y: [0, -2, 0],
                        rotate: [0, 5, -5, 0] 
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: 'easeInOut' 
                      }}
                    >
                      <span className='text-lg'>📍</span>
                    </motion.div>
                    <div>
                      <div className='text-white font-semibold text-sm'>Based in</div>
                      <div className='text-indigo-300 text-xs font-bold'>Pondicherry, India</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollIndicator ? 1 : 0 }}
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20'
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className='w-6 h-10 border-2 border-white/30 rounded-full flex justify-center'
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className='w-1 h-3 bg-white/50 rounded-full mt-2'
          />
        </motion.div>
      </motion.div>
    </section>
  );
});

export default HeroSection;
