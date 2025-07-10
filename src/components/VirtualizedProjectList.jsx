/**
 * @file VirtualizedProjectList.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Virtual scrolling component for efficient rendering of large project lists
 */

import React, { useState, useMemo, forwardRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Star, GitPullRequest, ExternalLink, Circle } from 'lucide-react';
import { useMicroInteractions } from '../utils/microInteractions';

// Individual project item component
const ProjectItem = forwardRef(({ index, style, data }, ref) => {
  const { projects, hoveredProject, setHoveredProject, inView, variants } = data;
  const project = projects[index];

  if (!project) return null;

  return (
    <div ref={ref} style={style} className='px-4 py-6'>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        whileHover={variants.cardHover}
        onMouseEnter={() => setHoveredProject(project.id)}
        onMouseLeave={() => setHoveredProject(null)}
        className='group relative'
      >
        {/* Optimized Glassmorphism Card */}
        <div className='relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden'>
          {/* Optimized Background Gradient */}
          <div className='absolute inset-0 bg-gradient-to-br from-secondary-500/3 via-accent-500/3 to-emerald-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

          {/* Optimized Floating Orbs */}
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

              <h3 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-3 text-center lg:text-left group-hover:text-secondary-600 transition-colors duration-300'>
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
                  whileHover={variants.buttonHover}
                  className='relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-secondary-500 via-accent-500 to-secondary-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 group/button overflow-hidden'
                >
                  <motion.div whileHover={variants.iconHover} className='mr-2'>
                    <ExternalLink size={20} />
                  </motion.div>
                  View Project
                  <motion.div
                    className='absolute inset-0 bg-white/10 rounded-2xl opacity-0'
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
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
    </div>
  );
});

ProjectItem.displayName = 'ProjectItem';

// Main virtualized project list component
const VirtualizedProjectList = ({ projects, height = 600, itemHeight = 400, className = '' }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredProject, setHoveredProject] = useState(null);
  const { variants } = useMicroInteractions();

  const itemData = useMemo(
    () => ({
      projects,
      hoveredProject,
      setHoveredProject,
      inView,
      variants,
    }),
    [projects, hoveredProject, inView, variants]
  );

  // Calculate optimal height based on project count
  const calculatedHeight = useMemo(() => {
    const maxHeight = Math.min(projects.length * itemHeight, height);
    return Math.max(maxHeight, 400); // Minimum height
  }, [projects.length, itemHeight, height]);

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <div className='relative rounded-lg overflow-hidden'>
        <List
          height={calculatedHeight}
          itemCount={projects.length}
          itemSize={itemHeight}
          itemData={itemData}
          className='scrollbar-thin scrollbar-thumb-secondary-300 scrollbar-track-gray-100'
        >
          {ProjectItem}
        </List>
      </div>
    </div>
  );
};

export default VirtualizedProjectList;
