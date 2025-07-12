/**
 * @file SkillsSection.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Cosmic skills section component showcasing technical expertise with holographic design
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Zap, Cpu, Cloud, Sparkles, Star, Orbit } from 'lucide-react';

// Cosmic Skills Section Component
const SkillsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const skills = [
    {
      icon: <Code size={48} />,
      title: 'Software Development',
      description: 'Full-stack development, application architecture, and software engineering',
      color: 'from-energy-electric to-energy-quantum',
      glow: 'energy-electric',
    },
    {
      icon: <Zap size={48} />,
      title: 'Performance Optimization',
      description: 'Profiling, benchmarking, and performance analysis for applications',
      color: 'from-energy-plasma to-energy-cosmic',
      glow: 'energy-plasma',
    },
    {
      icon: <Cpu size={48} />,
      title: 'System Analysis',
      description: 'System profiling, resource optimization, and performance tuning',
      color: 'from-energy-nuclear to-energy-solar',
      glow: 'energy-nuclear',
    },
    {
      icon: <Cloud size={48} />,
      title: 'Cloud Technologies',
      description: 'Cloud deployment, infrastructure, and modern deployment strategies',
      color: 'from-nebula-purple to-nebula-pink',
      glow: 'nebula-purple',
    },
  ];

  return (
    <section
      id='skills'
      className='section-padding relative overflow-hidden bg-gradient-to-br from-galaxy-center via-galaxy-arm to-galaxy-dust'
    >
      {/* Cosmic Background Effects */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-cosmic opacity-30'></div>
        <div className='absolute inset-0 bg-gradient-energy opacity-20'></div>

        {/* Nebula Formations */}
        <div className='absolute top-20 right-20 w-96 h-96 bg-gradient-radial from-nebula-purple/15 to-transparent rounded-full blur-3xl animate-pulse-slow'></div>
        <div className='absolute bottom-20 left-20 w-80 h-80 bg-gradient-radial from-nebula-pink/12 to-transparent rounded-full blur-3xl animate-pulse-slow animation-delay-400'></div>
        <div className='absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-radial from-nebula-cyan/10 to-transparent rounded-full blur-2xl animate-pulse-slow animation-delay-800'></div>
        <div className='absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-radial from-energy-electric/8 to-transparent rounded-full blur-xl animate-pulse-slow animation-delay-1200'></div>
      </div>

      {/* Cosmic Particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {Array.from({ length: 6 }, (_, i) => (
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

      {/* Orbital Rings */}
      <div className='absolute inset-0 pointer-events-none'>
        <motion.div
          className='absolute w-48 h-48 border border-energy-electric/10 rounded-full'
          style={{
            left: '15%',
            top: '10%',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.div
          className='absolute w-32 h-32 border border-energy-plasma/8 rounded-full'
          style={{
            right: '20%',
            bottom: '15%',
          }}
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
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
              Skills & Expertise
            </span>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={12} className='text-energy-electric' />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='text-4xl lg:text-6xl font-cosmic font-black mb-6 text-cosmic'
          >
            SKILLS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='text-xl text-stellar-300 max-w-3xl mx-auto leading-relaxed'
          >
            Passionate about technologies that drive innovation and create meaningful impact
          </motion.p>
        </motion.div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className='group relative holographic rounded-3xl p-8 transition-all duration-300 overflow-hidden'
              whileHover={{ scale: 1.02, rotateY: 5 }}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-5 group-hover:opacity-15 transition-opacity duration-300`}
              ></div>

              {/* Glow Effect */}
              <motion.div
                className='absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300'
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(0,212,255,0.2) 0%, transparent 70%)`,
                  filter: 'blur(10px)',
                }}
              />

              {/* Floating Elements */}
              <div className='absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-energy-electric/10 to-energy-plasma/10 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-300'></div>
              <div className='absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-energy-nuclear/15 to-energy-solar/15 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-300'></div>

              {/* Icon container */}
              <motion.div
                className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${skill.color} mb-6 text-white shadow-${skill.glow} group-hover:scale-110 transition-transform duration-300`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {skill.icon}
                <div className='absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </motion.div>

              {/* Content */}
              <div className='relative z-10'>
                <h3 className='text-xl font-cosmic font-bold text-stellar-100 mb-3 group-hover:text-cosmic transition-colors duration-300'>
                  {skill.title}
                </h3>
                <p className='text-stellar-300 leading-relaxed group-hover:text-stellar-200 transition-colors duration-300'>
                  {skill.description}
                </p>
              </div>

              {/* Orbital Element */}
              <motion.div
                className='absolute top-4 right-4 w-8 h-8 border border-stellar-400/30 rounded-full flex items-center justify-center'
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <motion.div
                  className='w-2 h-2 bg-energy-electric rounded-full'
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

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
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
