/**
 * @file AboutSection.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Cosmic about section showcasing professional background with holographic design and stellar effects
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Rocket, Zap, Orbit, Circle, Sparkles, Star, Atom } from 'lucide-react';
import { useExperienceCalculator } from '../../hooks';

// Cosmic About Section Component
const AboutSection = React.memo(() => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const experience = useExperienceCalculator();

  const cosmicStats = [
    {
      id: 'experience',
      value: experience,
      label: 'Years',
      description: 'Professional Experience',
      icon: <Rocket size={28} />,
      color: 'from-energy-electric to-energy-quantum',
      glow: 'energy-electric',
    },
    {
      id: 'systems',
      value: 'Full Stack',
      label: 'Development',
      description: 'Modern Technologies',
      icon: <Atom size={28} />,
      color: 'from-energy-plasma to-energy-cosmic',
      glow: 'energy-plasma',
    },
    {
      id: 'architecture',
      value: 'Cloud',
      label: 'Architecture',
      description: 'Scalable Infrastructure',
      icon: <Orbit size={28} />,
      color: 'from-energy-nuclear to-energy-solar',
      glow: 'energy-nuclear',
    },
  ];

  return (
    <section
      id='about'
      className='section-padding relative overflow-hidden bg-gradient-to-br from-galaxy-center via-galaxy-arm to-galaxy-dust'
    >
      {/* Cosmic Background Effects */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-cosmic opacity-30'></div>
        <div className='absolute inset-0 bg-gradient-energy opacity-20'></div>

        {/* Nebula Formations */}
        <div className='absolute top-20 left-20 w-96 h-96 bg-gradient-radial from-nebula-purple/15 to-transparent rounded-full blur-3xl animate-pulse-slow'></div>
        <div className='absolute bottom-20 right-20 w-80 h-80 bg-gradient-radial from-nebula-cyan/12 to-transparent rounded-full blur-3xl animate-pulse-slow animation-delay-400'></div>
        <div className='absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-radial from-nebula-blue/10 to-transparent rounded-full blur-2xl animate-pulse-slow animation-delay-800'></div>
      </div>

      {/* Cosmic Particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-stellar-400/60 rounded-full'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Holographic Grid */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='w-full h-full'
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className='container-custom relative z-10'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='inline-flex items-center space-x-3 holographic rounded-full px-8 py-4 mb-8'
          >
            <motion.div
              className='w-2 h-2 bg-energy-nuclear rounded-full'
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className='text-sm font-cosmic text-stellar-200 uppercase tracking-widest'>
              About Me
            </span>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Circle size={12} className='text-energy-electric' />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='text-4xl lg:text-6xl font-cosmic font-black mb-6 text-cosmic'
          >
            ABOUT ME
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='text-xl text-stellar-300 max-w-3xl mx-auto leading-relaxed'
          >
            Passionate about building innovative software solutions and cloud architectures
          </motion.p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          {/* Bio Data */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='relative'
          >
            <div className='holographic rounded-2xl p-8 relative overflow-hidden'>
              {/* Holographic Header */}
              <div className='flex items-center space-x-3 mb-6'>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles size={24} className='text-energy-electric' />
                </motion.div>
                <h3 className='text-2xl font-cosmic font-bold text-cosmic'>PROFILE</h3>
              </div>

              {/* Bio Data Streams */}
              <div className='space-y-6'>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className='relative'
                >
                  <div className='absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-energy-electric to-energy-plasma rounded-full'></div>
                  <div className='pl-6'>
                    <div className='flex items-center space-x-2 mb-2'>
                      <Zap size={16} className='text-energy-electric' />
                      <span className='text-stellar-200 font-cosmic text-sm uppercase tracking-wide'>
                        Role
                      </span>
                    </div>
                    <p className='text-stellar-100 text-lg leading-relaxed'>
                      I am a{' '}
                      <span className='text-energy-electric font-semibold'>Software Engineer</span>{' '}
                      specializing in building modern applications and architecting cloud
                      infrastructures that deliver exceptional user experiences.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className='relative'
                >
                  <div className='absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-energy-plasma to-energy-cosmic rounded-full'></div>
                  <div className='pl-6'>
                    <div className='flex items-center space-x-2 mb-2'>
                      <Orbit size={16} className='text-energy-plasma' />
                      <span className='text-stellar-200 font-cosmic text-sm uppercase tracking-wide'>
                        Location
                      </span>
                    </div>
                    <p className='text-stellar-100 text-lg leading-relaxed'>
                      Based in <span className='text-energy-plasma font-semibold'>Pondicherry</span>
                      , I work with expertise in{' '}
                      <span className='text-energy-nuclear font-semibold'>cloud technologies</span>{' '}
                      and modern development frameworks.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className='relative'
                >
                  <div className='absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-energy-cosmic to-energy-nuclear rounded-full'></div>
                  <div className='pl-6'>
                    <div className='flex items-center space-x-2 mb-2'>
                      <Star size={16} className='text-energy-nuclear' />
                      <span className='text-stellar-200 font-cosmic text-sm uppercase tracking-wide'>
                        Mission
                      </span>
                    </div>
                    <p className='text-stellar-100 text-lg leading-relaxed'>
                      My mission is{' '}
                      <span className='text-energy-solar font-semibold'>continuous learning</span>{' '}
                      and creating solutions that bridge the gap between innovation and practical
                      implementation.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Holographic Scan Lines */}
              <motion.div
                className='absolute inset-0 pointer-events-none'
                animate={{
                  background: [
                    'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.1) 50%, transparent 100%)',
                    'linear-gradient(90deg, transparent 100%, rgba(0,212,255,0.1) 50%, transparent 0%)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Cosmic Statistics */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='grid gap-6'
          >
            {cosmicStats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                className='group relative holographic rounded-xl p-6 overflow-hidden'
                whileHover={{ scale: 1.02, rotateY: 5 }}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`}
                ></div>

                {/* Glow Effect */}
                <motion.div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  style={{
                    background: `radial-gradient(circle, var(--tw-gradient-stops))`,
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0,212,255,0.2) 0%, transparent 70%)`,
                  }}
                />

                {/* Content */}
                <div className='relative z-10 flex items-center space-x-4'>
                  {/* Icon */}
                  <motion.div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-${stat.glow}`}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    {stat.icon}
                  </motion.div>

                  {/* Stats */}
                  <div className='flex-1'>
                    <div
                      className={`text-3xl font-cosmic font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                    >
                      {stat.value}
                    </div>
                    <div className='text-stellar-200 font-space text-sm uppercase tracking-wide mb-1'>
                      {stat.label}
                    </div>
                    <div className='text-stellar-400 text-xs'>{stat.description}</div>
                  </div>

                  {/* Orbital Animation */}
                  <motion.div
                    className='w-8 h-8 border border-stellar-400/30 rounded-full flex items-center justify-center'
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    <motion.div
                      className='w-2 h-2 bg-energy-electric rounded-full'
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </div>

                {/* Scan Lines */}
                <motion.div
                  className='absolute inset-0 pointer-events-none'
                  animate={{
                    background: [
                      'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
                      'linear-gradient(45deg, transparent 100%, rgba(255,255,255,0.03) 50%, transparent 0%)',
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className='mt-16 text-center'
        >
          <div className='holographic rounded-2xl p-8 max-w-2xl mx-auto'>
            <div className='flex items-center justify-center space-x-3 mb-4'>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                <Atom size={20} className='text-energy-quantum' />
              </motion.div>
              <span className='text-stellar-200 font-cosmic text-sm uppercase tracking-wider'>
                Quote
              </span>
            </div>
            <p className='text-stellar-100 text-lg leading-relaxed'>
              "Code is like humor. When you have to explain it, it's bad. Focus on writing clean,
              simple solutions that speak for themselves."
            </p>
            <div className='mt-4 text-energy-electric font-cosmic text-sm'>- Aswin</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
