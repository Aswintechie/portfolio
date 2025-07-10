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
} from 'lucide-react';
import { featuredProjects, allProjects } from '../../data/projects.jsx';

// Projects Section Component
const ProjectsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  const id = useId();
  const projectsSectionListId = `projects-list-${id}`;

  return (
    <section id='projects' className='section-padding relative overflow-hidden' ref={ref}>
      {/* Modern Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100'></div>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]'></div>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,119,198,0.05),transparent_50%)]'></div>

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
            className='inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-full px-8 py-4 mb-8 border border-emerald-200/50'
          >
            <Sparkles size={18} className='text-emerald-500' />
            <span className='text-sm font-bold text-gray-700 uppercase tracking-wider'>
              Featured Work
            </span>
          </motion.div>

          <h2 className='text-5xl lg:text-6xl font-black mb-8 text-gray-900 leading-tight'>
            <span className='bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent'>
              Featured Projects
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed'>
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
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className='group relative'
            >
              {/* Optimized Glassmorphism Card */}
              <div className='relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/30 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden'>
                {/* Optimized Background Gradient */}
                <div className='absolute inset-0 bg-gradient-to-br from-secondary-500/3 via-accent-500/3 to-emerald-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                {/* Optimized Floating Orbs - Reduced blur */}
                <div className='absolute -top-20 -right-20 w-32 h-32 bg-gradient-to-br from-secondary-400/15 to-accent-400/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                <div className='absolute -bottom-20 -left-20 w-24 h-24 bg-gradient-to-br from-emerald-400/15 to-teal-400/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                <div className='relative z-10 grid lg:grid-cols-5 gap-8 lg:gap-12'>
                  {/* Project Icon and Title */}
                  <div className='lg:col-span-2'>
                    <div className='flex items-center justify-center lg:justify-start mb-6'>
                      <motion.div
                        animate={hoveredProject === project.id ? { scale: 1.05 } : { scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className='relative p-4 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl text-white shadow-lg'
                      >
                        {project.icon}
                        <div className='absolute inset-0 bg-white/15 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
                      </motion.div>
                    </div>

                    <h3 className='text-3xl lg:text-4xl font-black text-gray-900 mb-3 text-center lg:text-left group-hover:text-secondary-600 transition-colors duration-300'>
                      {project.title}
                    </h3>

                    <div className='flex items-center justify-center lg:justify-start space-x-3 mb-6'>
                      <span className='text-sm text-gray-500 font-medium'>{project.domain}</span>
                      <div className='flex items-center space-x-1'>
                        <Circle size={8} className='text-green-500 fill-current' />
                        <span className='px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs font-bold rounded-full border border-green-200'>
                          {project.status}
                        </span>
                      </div>
                    </div>

                    <div className='flex justify-center lg:justify-start'>
                      <motion.a
                        href={project.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label={`Visit ${project.title} project`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='inline-flex items-center px-8 py-4 bg-gradient-to-r from-secondary-500 via-accent-500 to-secondary-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-shadow duration-200 group/button'
                      >
                        <ExternalLink
                          size={20}
                          className='mr-2 group-hover/button:rotate-6 transition-transform duration-200'
                        />
                        View Project
                        <div className='absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-200'></div>
                      </motion.a>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className='lg:col-span-3'>
                    <p className='text-gray-700 text-lg leading-relaxed mb-8 font-medium'>
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className='mb-8'>
                      <h4 className='text-xl font-bold text-gray-900 mb-4 flex items-center'>
                        <div className='p-2 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-lg mr-3'>
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
                            className='px-4 py-2 bg-gradient-to-r from-secondary-100 to-accent-100 text-secondary-800 text-sm font-bold rounded-full border border-secondary-200 hover:shadow-md transition-shadow duration-200'
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h4 className='text-xl font-bold text-gray-900 mb-4 flex items-center'>
                        <div className='p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg mr-3'>
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
                            className='flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-sm transition-shadow duration-200'
                          >
                            <div className='p-1 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-full'>
                              <GitPullRequest size={14} className='text-white' />
                            </div>
                            <span className='text-gray-700 font-medium'>{feature}</span>
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
          <motion.button
            type='button'
            onClick={() => setShowMoreProjects(!showMoreProjects)}
            aria-expanded={showMoreProjects}
            aria-controls={projectsSectionListId}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-secondary-500 to-accent-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-shadow duration-200 group/btn'
          >
            {showMoreProjects ? 'View Less Projects' : 'View More Projects'}
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-200 group-hover/btn:scale-105 ${showMoreProjects ? 'rotate-180' : ''}`}
              aria-hidden='true'
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
