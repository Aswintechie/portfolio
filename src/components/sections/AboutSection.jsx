/**
 * @file AboutSection.jsx
 * @author Aswin
 * @copyright © 2024 Aswin. All rights reserved.
 * @description Modern about section component showcasing professional background and statistics
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Code, Cloud, Circle } from 'lucide-react';
import { useExperienceCalculator } from '../../hooks';

// Modern About Section Component
const AboutSection = React.memo(() => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const experience = useExperienceCalculator();

  const stats = [
    {
      number: experience,
      label: 'Years Experience',
      icon: <Briefcase size={24} />,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: 'Software',
      label: 'Development',
      icon: <Code size={24} />,
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: 'Cloud',
      label: 'Technologies',
      icon: <Cloud size={24} />,
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <section
      id='about'
      className='section-padding bg-gradient-to-br from-gray-50 via-white to-gray-50'
    >
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
            className='inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full px-6 py-3 mb-6'
          >
            <Circle size={8} className='text-blue-500 fill-current' />
            <span className='text-sm font-semibold text-gray-600 uppercase tracking-wide'>
              About Me
            </span>
          </motion.div>

          <h2 className='text-4xl lg:text-5xl font-black mb-6 text-gray-900'>
            <span className='bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent'>
              Crafting Digital Excellence
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Passionate about building innovative solutions that make a difference
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-16 items-start'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='relative h-full flex flex-col justify-center'
          >
            <div className='space-y-6 text-lg text-gray-700 leading-relaxed'>
              <div className='relative'>
                <div className='absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full'></div>
                <p className='pl-8'>
                  I'm a passionate{' '}
                  <span className='font-semibold text-blue-600'>Software Developer Engineer</span>{' '}
                  based in Pondicherry, specializing in software development and modern application
                  architecture. My expertise lies in developing efficient software solutions,
                  building scalable applications, and implementing best practices in software
                  engineering.
                </p>
              </div>

              <div className='relative'>
                <div className='absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full'></div>
                <p className='pl-8'>
                  I have a keen interest in{' '}
                  <span className='font-semibold text-purple-600'>cloud technologies</span> and
                  enjoy exploring modern deployment strategies. I combine software engineering
                  skills with cloud infrastructure to create high-quality, scalable applications
                  that leverage the power of{' '}
                  <span className='font-semibold text-pink-600'>cloud computing</span>.
                </p>
              </div>

              <div className='relative'>
                <div className='absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-pink-500 to-emerald-500 rounded-full'></div>
                <p className='pl-8'>
                  My approach focuses on{' '}
                  <span className='font-semibold text-emerald-600'>continuous learning</span> and
                  staying updated with the latest industry trends. I believe in writing clean,
                  maintainable code and creating solutions that not only work efficiently but also
                  provide excellent user experiences and long-term value.
                </p>
              </div>
            </div>

            {/* Removed decorative elements that were causing layout issues */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='grid grid-cols-1 gap-6'
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className='group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-white/20 overflow-hidden'
              >
                {/* Simplified gradient background */}
                <div className='absolute inset-0 opacity-20'>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-30`}
                  ></div>
                  <div className='absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/10'></div>
                </div>

                {/* Hover gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-3 text-white shadow-lg`}
                >
                  {stat.icon}
                </div>

                {/* Content */}
                <div className='relative z-10'>
                  <div
                    className={`text-3xl font-black mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.number}
                  </div>
                  <div className='text-gray-600 font-semibold text-base'>{stat.label}</div>
                </div>

                {/* Simplified decorative elements */}
                <div className='absolute top-3 right-3 w-6 h-6 border border-gray-200 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300'></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
