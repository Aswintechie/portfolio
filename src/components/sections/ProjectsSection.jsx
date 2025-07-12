/**
 * @file ProjectsSection.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Cosmic featured projects section with holographic cards and stellar animations
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
  Orbit,
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
    <section
      id='projects'
      className='section-padding relative overflow-hidden bg-gradient-to-br from-galaxy-center via-galaxy-arm to-galaxy-dust'
      ref={ref}
    >
      {/* Cosmic Background Effects */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-cosmic opacity-30'></div>
        <div className='absolute inset-0 bg-gradient-energy opacity-20'></div>

        {/* Nebula Formations */}
        <div className='absolute top-20 left-20 w-96 h-96 bg-gradient-radial from-nebula-green/12 to-transparent rounded-full blur-3xl animate-pulse-slow'></div>
        <div className='absolute bottom-20 right-20 w-80 h-80 bg-gradient-radial from-nebula-blue/10 to-transparent rounded-full blur-3xl animate-pulse-slow animation-delay-400'></div>
        <div className='absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-radial from-nebula-cyan/8 to-transparent rounded-full blur-2xl animate-pulse-slow animation-delay-800'></div>
        <div className='absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-radial from-energy-electric/6 to-transparent rounded-full blur-xl animate-pulse-slow animation-delay-1200'></div>
      </div>

      {/* Cosmic Particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {Array.from({ length: 25 }, (_, i) => (
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
          className='absolute w-72 h-72 border border-energy-electric/10 rounded-full'
          style={{
            left: '5%',
            top: '10%',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.div
          className='absolute w-56 h-56 border border-energy-plasma/8 rounded-full'
          style={{
            right: '10%',
            bottom: '15%',
          }}
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className='container-custom relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='text-center mb-20'
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
              Featured Work
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
            PROJECTS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='text-xl text-stellar-300 max-w-4xl mx-auto leading-relaxed'
          >
            Innovative solutions powered by machine learning and cutting-edge technology
          </motion.p>
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
              {/* Holographic Project Card */}
              <div className='relative holographic rounded-3xl p-8 lg:p-12 transition-all duration-500 overflow-hidden'>
                {/* Enhanced Multi-layer Background Gradients */}
                <div className='absolute inset-0 bg-gradient-to-br from-energy-electric/5 via-energy-plasma/5 to-energy-nuclear/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                <div className='absolute inset-0 bg-gradient-to-tl from-nebula-blue/3 via-nebula-purple/3 to-nebula-cyan/3 opacity-0 group-hover:opacity-80 transition-opacity duration-700'></div>
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-stellar-100/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                {/* Enhanced Floating Orbs with Gradient Animation */}
                <div className='absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-energy-electric/20 via-energy-plasma/20 to-energy-nuclear/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700'></div>
                <div className='absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-br from-nebula-cyan/20 via-nebula-blue/20 to-nebula-purple/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-900'></div>
                <div className='absolute top-1/2 right-1/4 w-20 h-20 bg-gradient-to-br from-energy-plasma/15 via-energy-nuclear/15 to-energy-solar/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-600'></div>

                <div className='relative z-10 grid lg:grid-cols-5 gap-8 lg:gap-12'>
                  {/* Project Icon and Title */}
                  <div className='lg:col-span-2'>
                    <div className='flex items-center justify-center lg:justify-start mb-6'>
                      <motion.div
                        className='relative p-4 bg-gradient-to-br from-energy-electric via-energy-plasma to-energy-nuclear rounded-2xl text-white shadow-energy group-hover:shadow-plasma transition-all duration-300'
                        whileHover={{ scale: 1.05, rotate: 5 }}
                      >
                        {project.icon}
                        <div className='absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        <div className='absolute inset-0 bg-gradient-to-tl from-transparent via-energy-electric/20 to-energy-plasma/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                      </motion.div>
                    </div>

                    <h3 className='text-2xl lg:text-3xl font-cosmic font-bold text-stellar-100 mb-3 text-center lg:text-left group-hover:text-cosmic transition-colors duration-300'>
                      {project.title}
                    </h3>

                    <div className='flex items-center justify-center lg:justify-start space-x-3 mb-6'>
                      <span className='text-sm text-stellar-300 font-medium'>{project.domain}</span>
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
                        className='relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-energy-electric via-energy-plasma to-energy-nuclear text-white rounded-2xl font-cosmic font-bold shadow-energy hover:shadow-plasma transition-all duration-300 group/button overflow-hidden'
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink
                          size={20}
                          className='mr-2 group-hover/button:rotate-3 transition-transform duration-300'
                        />
                        View Project
                        <div className='absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-300'></div>
                        <div className='absolute inset-0 bg-gradient-to-br from-transparent via-energy-electric/20 to-energy-plasma/20 rounded-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-500'></div>
                      </motion.a>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className='lg:col-span-3'>
                    <p className='text-stellar-300 text-lg leading-relaxed mb-8 font-medium'>
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className='mb-8'>
                      <h4 className='text-xl font-bold text-stellar-100 mb-4 flex items-center'>
                        <div className='p-2 bg-gradient-to-br from-energy-electric to-energy-plasma rounded-lg mr-3'>
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
                            className='px-4 py-2 holographic text-stellar-100 text-sm font-cosmic font-bold rounded-full border border-energy-electric/30 hover:border-energy-electric/50 hover:shadow-energy transition-all duration-200'
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h4 className='text-xl font-bold text-stellar-100 mb-4 flex items-center'>
                        <div className='p-2 bg-gradient-to-br from-energy-electric to-energy-plasma rounded-lg mr-3'>
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
                            className='flex items-center space-x-3 p-3 glass-cosmic rounded-xl border border-stellar-400/20 hover:border-stellar-400/40 hover:shadow-energy transition-all duration-200'
                          >
                            <div className='p-1 bg-gradient-to-br from-energy-plasma to-energy-nuclear rounded-full'>
                              <GitPullRequest size={14} className='text-white' />
                            </div>
                            <span className='text-stellar-300 font-medium'>{feature}</span>
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
            className='relative inline-flex items-center gap-2 px-8 py-4 glass-cosmic text-stellar-100 rounded-2xl font-cosmic font-bold border-2 border-energy-electric/30 hover:border-energy-electric/50 hover:shadow-energy transition-all duration-300 group/btn overflow-hidden'
            whileHover={{ scale: 1.05, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {showMoreProjects ? 'View Less Projects' : 'View More Projects'}
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 group-hover/btn:rotate-3 ${showMoreProjects ? 'rotate-180' : ''}`}
              aria-hidden='true'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-energy-electric/5 via-energy-plasma/5 to-energy-nuclear/5 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300'></div>

            {/* Orbital Animation */}
            <motion.div
              className='absolute top-2 right-2 w-2 h-2 bg-energy-electric rounded-full'
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
