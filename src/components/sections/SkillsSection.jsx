/**
 * @file SkillsSection.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Modern skills section component showcasing technical expertise and capabilities
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Zap, Cpu, Cloud, Sparkles, Brain, Server, Database } from 'lucide-react';

// Modern Skills Section Component
const SkillsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const skills = [
    {
      icon: <Code size={32} />,
      title: 'Software Development',
      description: 'Full-stack development, application architecture, and software engineering',
      color: 'from-cyan-400 to-purple-500',
      bgColor: 'from-cyan-500/10 to-purple-500/10',
    },
    {
      icon: <Zap size={32} />,
      title: 'Performance Optimization',
      description: 'Profiling, benchmarking, and performance analysis for applications',
      color: 'from-purple-400 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10',
    },
    {
      icon: <Cpu size={32} />,
      title: 'System Analysis',
      description: 'System profiling, resource optimization, and performance tuning',
      color: 'from-pink-400 to-cyan-500',
      bgColor: 'from-pink-500/10 to-cyan-500/10',
    },
    {
      icon: <Cloud size={32} />,
      title: 'Cloud Technologies',
      description: 'Cloud deployment, infrastructure, and modern deployment strategies',
      color: 'from-cyan-400 to-purple-500',
      bgColor: 'from-cyan-500/10 to-purple-500/10',
    },
    {
      icon: <Brain size={32} />,
      title: 'AI & Machine Learning',
      description: 'Neural networks, deep learning, and intelligent system development',
      color: 'from-purple-400 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10',
    },
    {
      icon: <Server size={32} />,
      title: 'DevOps & Infrastructure',
      description: 'Container orchestration, CI/CD pipelines, and infrastructure as code',
      color: 'from-pink-400 to-cyan-500',
      bgColor: 'from-pink-500/10 to-cyan-500/10',
    },
    {
      icon: <Database size={32} />,
      title: 'Database Engineering',
      description: 'Database optimization, NoSQL, and distributed data systems',
      color: 'from-cyan-400 to-purple-500',
      bgColor: 'from-cyan-500/10 to-purple-500/10',
    },
  ];

  const mainSkills = skills.slice(0, 4);
  const additionalSkills = skills.slice(4);

  return (
    <section id='skills' className='section-padding relative overflow-hidden'>
      {/* Darker gradient background for better text contrast */}
      <div className='absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black'></div>
      <div className='absolute inset-0 bg-black/20'></div>
      
      {/* Animated gradient orbs */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
        <div className='absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-2000'></div>
      </div>

      {/* Floating elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-16 left-16 w-2 h-2 bg-cyan-400 rounded-full animate-pulse'></div>
        <div className='absolute bottom-20 right-24 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-500'></div>
        <div className='absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-1000'></div>
        <div className='absolute bottom-1/3 right-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-1500'></div>
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
            <Sparkles size={16} className='text-cyan-400' />
            <span className='text-sm font-semibold text-gray-300 uppercase tracking-wide'>
              Skills & Expertise
            </span>
          </motion.div>

          <h2 className='text-4xl lg:text-5xl font-black mb-6 text-white'>
            <span className='bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
              Technical Mastery
            </span>
          </h2>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
            Passionate about technologies that drive innovation and create meaningful impact
          </p>
        </motion.div>

        {/* Bento grid layout */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-8'>
          {/* Main skills - larger cards */}
          {mainSkills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className='group relative lg:col-span-3 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 overflow-hidden'
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

              {/* Floating orbs */}
              <div className='absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-white/10 to-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              <div className='absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-white/5 to-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

              {/* Icon container */}
              <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${skill.color} mb-6 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                {skill.icon}
              </div>

              {/* Content */}
              <div className='relative z-10'>
                <h3 className='text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300'>
                  {skill.title}
                </h3>
                <p className='text-gray-300 leading-relaxed text-sm'>
                  {skill.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional skills - smaller cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {additionalSkills.map((skill, index) => (
            <motion.div
              key={index + 4}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: (index + 4) * 0.1 }}
              className='group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300 overflow-hidden'
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

              {/* Icon container */}
              <div className={`relative inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${skill.color} mb-4 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                {skill.icon}
              </div>

              {/* Content */}
              <div className='relative z-10'>
                <h3 className='text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300'>
                  {skill.title}
                </h3>
                <p className='text-gray-300 leading-relaxed text-sm'>
                  {skill.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
