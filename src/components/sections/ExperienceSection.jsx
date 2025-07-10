/**
 * @file ExperienceSection.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Professional experience section component with timeline and dynamic content
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase } from 'lucide-react';
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
      {/* Enhanced Background Effects */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/60 to-indigo-50/70'></div>
      <div className='absolute top-0 left-0 w-full h-full'>
        <div className='absolute top-32 left-16 w-72 h-72 bg-gradient-to-br from-blue-400/15 to-indigo-400/15 rounded-full blur-3xl'></div>
        <div className='absolute bottom-32 right-16 w-80 h-80 bg-gradient-to-br from-indigo-400/12 to-blue-400/12 rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-br from-slate-400/10 to-blue-400/10 rounded-full blur-2xl'></div>
        <div className='absolute top-20 right-1/3 w-32 h-32 bg-gradient-to-br from-blue-300/8 to-indigo-300/8 rounded-full blur-xl'></div>
      </div>

      {/* More Prominent Floating Elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-20 right-20 w-12 h-12 border-2 border-blue-200/40 rounded-full opacity-60'></div>
        <div className='absolute bottom-40 left-32 w-8 h-8 bg-indigo-200/30 rounded-full opacity-70'></div>
        <div className='absolute top-1/3 right-1/4 w-6 h-6 bg-blue-300/40 rounded-full opacity-60'></div>
        <div className='absolute bottom-1/4 left-1/4 w-10 h-10 border border-indigo-200/35 rounded-lg opacity-50 rotate-45'></div>
        <div className='absolute top-1/4 right-1/3 w-4 h-4 bg-blue-200/40 rounded-full opacity-65'></div>
      </div>

      {/* Additional Mesh Pattern */}
      <div className='absolute inset-0 opacity-30'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.1)_0%,transparent_50%)]'></div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(99,102,241,0.08)_0%,transparent_50%)]'></div>
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
            className='inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full px-6 py-3 mb-6 backdrop-blur-sm border border-blue-200/30'
          >
            <Briefcase size={16} className='text-blue-500' />
            <span className='text-sm font-semibold text-gray-600 uppercase tracking-wide'>
              Professional Journey
            </span>
          </motion.div>

          <h2 className='text-4xl lg:text-5xl font-black mb-6 text-gray-900'>
            <span className='bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent'>
              Experience
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Building innovative solutions and driving technological excellence across diverse
            industries
          </p>
        </motion.div>

        <div className='max-w-4xl mx-auto'>
          <div className='relative' style={{ minHeight: '400px' }}>
            {/* Timeline line - properly contained and mobile responsive */}
            <div
              className='absolute left-5 md:left-8 top-8 w-0.5 bg-secondary-200'
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
