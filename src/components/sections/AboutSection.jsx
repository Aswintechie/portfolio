/**
 * @file AboutSection.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Ultra-modern about section with bento grid layout and advanced glassmorphism
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Code, Cloud, Circle, Users, Target, Lightbulb, Zap, Monitor, Heart, Rocket, Star, Cpu, Brain } from 'lucide-react';
import { useExperienceCalculator } from '../../hooks';

// Modern About Section Component with Bento Grid
const AboutSection = React.memo(() => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const experience = useExperienceCalculator();

  const personalityCards = [
    {
      icon: <Zap size={24} />,
      title: 'Fast Learner',
      description: 'Always adapting to new technologies',
      color: 'from-yellow-400 to-orange-500',
      delay: 0.1
    },
    {
      icon: <Cloud size={24} />,
      title: 'Cloud Enthusiast',
      description: 'Expert in modern cloud infrastructure',
      color: 'from-blue-400 to-cyan-600',
      delay: 0.2
    },
    {
      icon: <Heart size={24} />,
      title: 'Team Player',
      description: 'Collaborative and supportive',
      color: 'from-red-400 to-pink-500',
      delay: 0.3
    },
    {
      icon: <Rocket size={24} />,
      title: 'Innovation Driven',
      description: 'Always seeking creative solutions',
      color: 'from-purple-400 to-blue-500',
      delay: 0.4
    },
    {
      icon: <Monitor size={24} />,
      title: 'Full Stack Developer',
      description: 'Frontend to backend expertise',
      color: 'from-emerald-400 to-teal-500',
      delay: 0.5
    }
  ];

  const skills = [
    { name: 'Software Development', level: 95, color: 'from-blue-400 to-cyan-500' },
    { name: 'Cloud Technologies', level: 85, color: 'from-purple-400 to-pink-500' },
    { name: 'Performance Optimization', level: 90, color: 'from-emerald-400 to-teal-500' },
    { name: 'Problem Solving', level: 95, color: 'from-orange-400 to-red-500' }
  ];

  return (
    <section
      id='about'
      className='section-padding relative overflow-hidden'
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #f1f5f9 75%, #ffffff 100%)',
      }}
    >
      {/* Darker gradient background for better text contrast */}
      <div className='absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black'></div>
      
      {/* Enhanced background overlay */}
      <div className='absolute inset-0 bg-black/20'></div>

      {/* Dynamic Background Elements */}
      <div className='absolute inset-0'>
        <motion.div
          className='absolute top-10 left-10 w-80 h-80 opacity-20'
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className='w-full h-full rounded-full bg-gradient-to-r from-blue-300/30 to-purple-300/30 blur-3xl' />
        </motion.div>

        <motion.div
          className='absolute bottom-20 right-20 w-64 h-64 opacity-15'
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className='w-full h-full rounded-full bg-gradient-to-r from-emerald-300/30 to-teal-300/30 blur-2xl' />
        </motion.div>
        
        {/* Animated Grid */}
        <div className='absolute inset-0 opacity-5'>
          <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]' />
        </div>
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
            className='inline-flex items-center space-x-2 bg-white/60 backdrop-blur-xl rounded-full px-6 py-3 mb-6 border border-white/20 shadow-lg'
          >
            <Circle size={8} className='text-blue-600 fill-current' />
            <span className='text-sm font-bold text-gray-700 uppercase tracking-wide'>
              About Me
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='text-4xl lg:text-6xl font-black mb-6 text-gray-900'
          >
            <span className='bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent'>
              Crafting Digital
            </span>
            <br />
            <span className='bg-gradient-to-r from-purple-500 via-pink-400 to-red-500 bg-clip-text text-transparent'>
              Excellence
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'
          >
            Passionate about building innovative solutions that make a difference in people's lives
          </motion.p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8'>
          
          {/* Main Story Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='lg:col-span-8 relative'
          >
            <div className='h-full bg-white/70 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl'>
              <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5' />
              
              <div className='relative z-10'>
                <div className='flex items-center space-x-3 mb-8'>
                  <motion.div 
                    className='w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center'
                    animate={{ 
                      rotate: [0, 360] 
                    }}
                    transition={{ 
                      duration: 10, 
                      repeat: Infinity, 
                      ease: 'linear' 
                    }}
                  >
                    <Star size={24} className='text-blue-600' />
                  </motion.div>
                  <h3 className='text-2xl font-bold text-gray-900'>My Journey</h3>
                </div>

                <div className='space-y-6 text-lg text-gray-700 leading-relaxed'>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className='relative pl-6'
                  >
                    <div className='absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full' />
                    <p>
                      I'm a passionate{' '}
                      <span className='font-bold text-blue-600'>Software Developer Engineer</span>{' '}
                      based in the vibrant city of Pondicherry. With {experience} of experience, 
                      I specialize in developing efficient, scalable software solutions that solve real-world problems.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className='relative pl-6'
                  >
                    <div className='absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full' />
                    <p>
                      My expertise lies in{' '}
                      <span className='font-bold text-purple-600'>modern application architecture</span>{' '}
                      and <span className='font-bold text-pink-600'>cloud technologies</span>. 
                      I'm passionate about creating solutions that are not only functional but also elegant and maintainable.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className='relative pl-6'
                  >
                    <div className='absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-pink-500 to-red-500 rounded-full' />
                    <p>
                      I believe in{' '}
                      <span className='font-bold text-red-600'>continuous learning</span>{' '}
                      and staying at the forefront of technology. My approach combines technical expertise 
                      with creative problem-solving to deliver exceptional results.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='lg:col-span-4 relative'
          >
            <div className='h-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl'>
              <div className='text-center'>
                <motion.div 
                  className='w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-emerald-400/30 to-teal-500/30 border border-white/30 flex items-center justify-center'
                  animate={{ 
                    rotateY: [0, 360],
                    scale: [1, 1.1, 1] 
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: 'easeInOut' 
                  }}
                >
                  <Briefcase size={36} className='text-emerald-600' />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className='text-5xl font-black text-emerald-600 mb-3'
                >
                  {experience}
                </motion.div>
                <div className='text-gray-700 font-bold text-lg'>Years of Experience</div>
                <div className='text-gray-500 text-sm mt-2'>Building amazing things</div>
              </div>
            </div>
          </motion.div>

          {/* Personality Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='lg:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-4'
          >
            {personalityCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + card.delay }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className='bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300'
              >
                <motion.div 
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-4 shadow-lg`}
                  animate={{ 
                    rotate: [0, 5, -5, 0] 
                  }}
                  transition={{ 
                    duration: 2 + index, 
                    repeat: Infinity, 
                    ease: 'easeInOut' 
                  }}
                >
                  {card.icon}
                </motion.div>
                <h4 className='text-lg font-bold text-gray-900 mb-2'>{card.title}</h4>
                <p className='text-gray-600 text-sm'>{card.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills Progress */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className='lg:col-span-4 relative'
          >
            <div className='h-full bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl'>
              <div className='flex items-center space-x-3 mb-6'>
                <motion.div 
                  className='w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center'
                  animate={{ 
                    scale: [1, 1.2, 1] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: 'easeInOut' 
                  }}
                >
                  <Target size={20} className='text-indigo-600' />
                </motion.div>
                <h3 className='text-xl font-bold text-gray-900'>Core Skills</h3>
              </div>

              <div className='space-y-4'>
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  >
                    <div className='flex justify-between items-center mb-2'>
                      <span className='text-sm font-semibold text-gray-700'>{skill.name}</span>
                      <span className='text-sm font-bold text-gray-900'>{skill.level}%</span>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2 overflow-hidden'>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                      >
                        <div className='absolute inset-0 bg-white/20 rounded-full' />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Cloud Technologies Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className='lg:col-span-6 relative'
          >
            <div className='h-full bg-gradient-to-br from-blue-500/80 to-cyan-500/70 backdrop-blur-xl rounded-3xl p-8 border border-cyan-400/60 shadow-2xl relative overflow-hidden'>
              {/* Bright glow effect */}
              <div className='absolute inset-0 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-3xl blur-sm'></div>
              <div className='absolute inset-0 bg-gradient-to-br from-cyan-300/20 to-blue-300/20 rounded-3xl'></div>
              
              <div className='relative z-10 text-center'>
                <motion.div 
                  className='text-5xl mb-4 drop-shadow-lg'
                  animate={{ 
                    rotateY: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: 'easeInOut' 
                  }}
                >
                  ☁️
                </motion.div>
                <h3 className='text-2xl font-bold text-white mb-2 drop-shadow-lg'>Cloud Expert</h3>
                <motion.div 
                  className='text-xl font-black text-cyan-100 mb-2 drop-shadow-lg'
                  animate={{ 
                    scale: [1, 1.1, 1] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: 'easeInOut' 
                  }}
                >
                  AWS • Azure • GCP
                </motion.div>
                <p className='text-white/90 font-medium drop-shadow-md'>Modern cloud infrastructure</p>
              </div>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className='lg:col-span-6 relative'
          >
            <div className='h-full bg-gradient-to-br from-purple-500/80 to-pink-500/70 backdrop-blur-xl rounded-3xl p-8 border border-pink-400/60 shadow-2xl relative overflow-hidden'>
              {/* Bright glow effect */}
              <div className='absolute inset-0 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-3xl blur-sm'></div>
              <div className='absolute inset-0 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-3xl'></div>
              
              <div className='relative z-10'>
                <div className='flex items-center space-x-3 mb-4'>
                  <motion.div 
                    className='w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400/60 to-purple-400/60 flex items-center justify-center shadow-lg'
                    animate={{ 
                      rotate: [0, 360] 
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity, 
                      ease: 'linear' 
                    }}
                  >
                    <Lightbulb size={24} className='text-white drop-shadow-lg' />
                  </motion.div>
                  <h3 className='text-xl font-bold text-white drop-shadow-lg'>Mission</h3>
                </div>
                <p className='text-white/90 font-medium leading-relaxed drop-shadow-md'>
                  To create innovative software solutions that make technology more accessible and impactful for everyone.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;
