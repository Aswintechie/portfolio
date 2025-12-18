/**
 * @file SkillsSection.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Modern skills section component showcasing technical expertise and capabilities
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Zap, Cpu, Cloud, Sparkles } from 'lucide-react';

// Modern Skills Section Component
const SkillsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const skills = [
    {
      icon: <Code size={48} />,
      title: 'Software Development',
      description: 'Full-stack development, application architecture, and software engineering',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50',
    },
    {
      icon: <Zap size={48} />,
      title: 'Performance Optimization',
      description: 'Profiling, benchmarking, and performance analysis for applications',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50',
    },
    {
      icon: <Cpu size={48} />,
      title: 'System Analysis',
      description: 'System profiling, resource optimization, and performance tuning',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-50',
    },
    {
      icon: <Cloud size={48} />,
      title: 'Cloud Technologies',
      description: 'Cloud deployment, infrastructure, and modern deployment strategies',
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50',
    },
  ];

  return (
    <section
      id='skills'
      className='section-padding bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300'
    >
      {/* Enhanced Background Effects */}
      <div className='absolute inset-0 bg-gradient-to-br from-white via-purple-50/50 to-pink-50/50'></div>
      <div className='absolute top-0 left-0 w-full h-full'>
        <div className='absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-purple-400/12 to-pink-400/12 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-br from-purple-400/8 to-pink-400/8 rounded-full blur-2xl'></div>
        <div className='absolute bottom-1/3 left-1/4 w-36 h-36 bg-gradient-to-br from-pink-300/6 to-purple-300/6 rounded-full blur-xl'></div>
      </div>

      {/* More Prominent Floating Elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-16 left-16 w-12 h-12 border-2 border-purple-200/40 rounded-lg opacity-50 rotate-45'></div>
        <div className='absolute bottom-20 right-24 w-10 h-10 bg-pink-200/35 rounded-full opacity-60'></div>
        <div className='absolute top-1/4 left-1/4 w-8 h-8 border border-pink-200/30 rounded-full opacity-55'></div>
        <div className='absolute bottom-1/3 right-1/3 w-6 h-6 bg-purple-200/40 rounded-full opacity-60'></div>
        <div className='absolute top-1/3 right-1/4 w-14 h-14 border border-purple-200/25 rounded-lg opacity-45 rotate-12'></div>
      </div>

      {/* Additional Mesh Pattern */}
      <div className='absolute inset-0 opacity-25'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.08)_0%,transparent_50%)]'></div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.06)_0%,transparent_50%)]'></div>
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
            className='inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full px-6 py-3 mb-6 backdrop-blur-sm border border-purple-200/30'
          >
            <Sparkles size={16} className='text-purple-500' />
            <span className='text-sm font-semibold text-gray-600 uppercase tracking-wide'>
              Skills & Expertise
            </span>
          </motion.div>

          <h2 className='text-4xl lg:text-5xl font-black mb-6 text-gray-900 dark:text-white'>
            <span className='bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 dark:from-purple-400 dark:via-pink-400 dark:to-purple-400 bg-clip-text text-transparent'>
              What I Do Best
            </span>
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed'>
            Passionate about technologies that drive innovation and create meaningful impact
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className='group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden'
            >
              {/* Simplified background gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${skill.bgColor} opacity-0 group-hover:opacity-80 transition-opacity duration-300`}
              ></div>

              {/* Optimized floating background elements */}
              <div className='absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-gray-200/15 to-gray-300/15 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-200'></div>
              <div className='absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-gray-100/20 to-gray-200/20 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-200'></div>

              {/* Icon container */}
              <div
                className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${skill.color} mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {skill.icon}
              </div>

              {/* Content */}
              <div className='relative z-10'>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300'>
                  {skill.title}
                </h3>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300'>
                  {skill.description}
                </p>
              </div>

              {/* Simplified decorative corner element */}
              <div className='absolute top-4 right-4 w-2 h-2 bg-gray-300 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300'></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
