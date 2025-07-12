/**
 * @file ExperienceSection.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Professional experience section component with timeline and dynamic content
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Sparkles } from 'lucide-react';
import { useExperienceCalculator } from '../../hooks';
import { getExperienceData } from '../../data/experienceData.js';
import ExperienceEntry from '../ExperienceEntry.jsx';

// Experience Section Component
const ExperienceSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const experience = useExperienceCalculator();

  const experienceData = useMemo(() => getExperienceData(experience), [experience]);

  return (
    <section id='experience' className='section-padding relative overflow-hidden'>
      {/* Darker gradient background for better text contrast */}
      <div className='absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black'></div>
      <div className='absolute inset-0 bg-black/20'></div>
      
      {/* Animated gradient orbs */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
        <div className='absolute top-32 left-16 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-32 right-16 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-br from-pink-400/15 to-cyan-400/15 rounded-full blur-2xl animate-pulse delay-2000'></div>
        <div className='absolute top-20 right-1/3 w-32 h-32 bg-gradient-to-br from-cyan-300/10 to-purple-300/10 rounded-full blur-xl animate-pulse delay-500'></div>
      </div>

      {/* Enhanced floating elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-20 right-20 w-2 h-2 bg-cyan-400 rounded-full animate-pulse'></div>
        <div className='absolute bottom-40 left-32 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-300'></div>
        <div className='absolute top-1/3 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-600'></div>
        <div className='absolute bottom-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-900'></div>
        <div className='absolute top-1/4 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-1200'></div>
      </div>

      <div className='container-custom relative z-10'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='inline-flex items-center space-x-2 bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 mb-6 border border-white/10'
          >
            <Briefcase size={16} className='text-cyan-400' />
            <span className='text-sm font-semibold text-gray-300 uppercase tracking-wide'>
              Professional Journey
            </span>
          </motion.div>

          <h2 className='text-4xl lg:text-5xl font-black mb-6 text-white'>
            <span className='bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
              Experience
            </span>
          </h2>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
            Building innovative solutions and driving technological excellence across diverse
            industries
          </p>
        </motion.div>

        <div className='max-w-4xl mx-auto'>
          <div className='relative' style={{ minHeight: '400px' }}>
            {/* Enhanced timeline line - Hidden on mobile, visible on desktop */}
            <div
              className='hidden md:block absolute left-6 top-8 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 opacity-50'
              style={{ height: 'calc(100% - 4rem)', bottom: '2rem' }}
            ></div>

            {/* Experience Entries */}
            {experienceData.map(entry => (
              <ExperienceEntry
                key={`${entry.company}-${entry.period}`}
                {...entry}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
