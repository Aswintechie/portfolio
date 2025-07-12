/**
 * @file ProjectsSection.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Featured projects section component with interactive cards and expandable content
 */

import React, { useState, useId } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Sparkles,
  Code,
  Star,
  GitPullRequest,
  ExternalLink,
  ChevronDown,
  Circle,
  Zap,
} from 'lucide-react';
import { featuredProjects, allProjects } from '../../data/projects.jsx';

// Projects Section Component
const ProjectsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [showMoreProjects, setShowMoreProjects] = useState(false);

  const id = useId();
  const projectsSectionListId = `projects-list-${id}`;

  return (
    <section id='projects' className='section-padding relative overflow-hidden' ref={ref}>
      {/* Darker gradient background for better text contrast */}
      <div className='absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black'></div>
      <div className='absolute inset-0 bg-black/20'></div>
      
      {/* Animated gradient orbs */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
        <div className='absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-pink-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-2000'></div>
      </div>

      {/* Floating elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-16 left-16 w-2 h-2 bg-purple-400 rounded-full animate-pulse'></div>
        <div className='absolute bottom-20 right-24 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse delay-500'></div>
        <div className='absolute top-1/4 left-1/4 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-1000'></div>
        <div className='absolute bottom-1/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-1500'></div>
      </div>

      <div className='container-custom relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='text-center mb-20'
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='inline-flex items-center space-x-2 bg-white/5 backdrop-blur-xl rounded-full px-8 py-4 mb-8 border border-white/10'
          >
            <Sparkles size={18} className='text-purple-400' />
            <span className='text-sm font-bold text-gray-300 uppercase tracking-wider'>
              Featured Work
            </span>
          </motion.div>

          <h2 className='text-5xl lg:text-6xl font-black mb-8 text-white leading-tight'>
            <span className='bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent'>
              Featured Projects
            </span>
          </h2>
          <p className='text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed'>
            Innovative solutions powered by machine learning and cutting-edge technology
          </p>
        </motion.div>

        <div className='grid gap-12' id={projectsSectionListId}>
          {(showMoreProjects ? allProjects : featuredProjects).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className='group relative'
            >
              {/* Modern glassmorphism card */}
              <div className='relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden'>
                {/* Enhanced animated background gradients */}
                <div className='absolute inset-0 bg-gradient-to-br from-gray-900/80 via-purple-900/40 to-gray-900/80 rounded-3xl'></div>
                <div className='absolute inset-0 bg-gradient-to-br from-purple-500/8 via-pink-500/8 to-cyan-500/8 opacity-100 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl'></div>
                <div className='absolute inset-0 bg-gradient-to-tl from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl'></div>

                {/* Enhanced floating orbs */}
                <div className='absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400/30 via-pink-400/30 to-cyan-400/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700'></div>
                <div className='absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-br from-cyan-400/30 via-purple-400/30 to-pink-400/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-900'></div>

                <div className='relative z-10 grid lg:grid-cols-5 gap-8 lg:gap-12'>
                  {/* Project Icon and Title */}
                  <div className='lg:col-span-2'>
                    <div className='flex items-center justify-center lg:justify-start mb-6'>
                      <div className='relative p-4 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl text-white shadow-xl group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300'>
                        {project.icon}
                        <div className='absolute inset-0 bg-white/15 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                      </div>
                    </div>

                    <h3 className='text-2xl lg:text-3xl font-bold text-white mb-3 text-center lg:text-left group-hover:text-purple-300 transition-colors duration-300 drop-shadow-lg'>
                      {project.title}
                    </h3>

                    <div className='flex items-center justify-center lg:justify-start space-x-3 mb-6'>
                      <span className='text-sm text-gray-300 font-medium'>{project.domain}</span>
                      <div className='flex items-center space-x-1'>
                        <Circle size={8} className='text-cyan-400 fill-current' />
                        <span className='px-3 py-1 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-300 text-xs font-bold rounded-full border border-cyan-400/30'>
                          {project.status}
                        </span>
                      </div>
                    </div>

                    <div className='flex justify-center lg:justify-start'>
                      <a
                        href={project.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label={`Visit ${project.title} project`}
                        className='relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group/button overflow-hidden'
                      >
                        <ExternalLink
                          size={20}
                          className='mr-2 group-hover/button:rotate-12 transition-transform duration-300'
                        />
                        View Project
                        <div className='absolute inset-0 bg-white/15 rounded-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-300'></div>
                      </a>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className='lg:col-span-3'>
                    <p className='text-gray-200 text-lg leading-relaxed mb-8 font-medium drop-shadow-sm'>
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className='mb-8'>
                      <h4 className='text-xl font-bold text-white mb-4 flex items-center drop-shadow-sm'>
                        <div className='p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mr-3 shadow-lg'>
                          <Code size={18} className='text-white' />
                        </div>
                        Technologies
                      </h4>
                      <div className='flex flex-wrap gap-3'>
                        {project.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.3, delay: index * 0.05 + techIndex * 0.02 }}
                            className='px-4 py-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 text-sm font-bold rounded-full border border-purple-400/30 hover:border-purple-400/50 hover:shadow-md transition-all duration-200 backdrop-blur-sm'
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h4 className='text-xl font-bold text-white mb-4 flex items-center drop-shadow-sm'>
                        <div className='p-2 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg mr-3 shadow-lg'>
                          <Star size={18} className='text-white' />
                        </div>
                        Key Features
                      </h4>
                      <div className='grid md:grid-cols-2 gap-3'>
                        {project.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.05 + featureIndex * 0.05,
                            }}
                            className='flex items-center space-x-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:border-pink-400/40 hover:shadow-md transition-all duration-200'
                          >
                            <div className='p-1 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-full shadow-sm'>
                              <Zap size={14} className='text-white' />
                            </div>
                            <span className='text-gray-200 font-medium'>{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced View More/Less Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='text-center mt-16'
        >
          <button
            type='button'
            onClick={() => setShowMoreProjects(!showMoreProjects)}
            aria-expanded={showMoreProjects}
            aria-controls={projectsSectionListId}
            className='relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group/btn overflow-hidden'
          >
            {showMoreProjects ? 'View Less Projects' : 'View More Projects'}
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 group-hover/btn:rotate-12 ${showMoreProjects ? 'rotate-180' : ''}`}
              aria-hidden='true'
            />
            <div className='absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300'></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
