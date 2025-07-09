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
    <section id='experience' className='section-padding'>
      <div className='container-custom'>
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
            className='inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full px-6 py-3 mb-6'
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
