/**
 * @file TechnologiesSection.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Cosmic technologies and platforms section with holographic design and stellar effects
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cloud, Monitor, Wifi, Server, Star, Orbit, Zap } from 'lucide-react';

// Technologies & Platforms Section Component
const TechnologiesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const technologies = [
    {
      category: 'Cloud Platforms',
      icon: Cloud,
      color: 'from-energy-electric to-energy-quantum',
      glow: 'energy-electric',
      items: [
        { name: 'Microsoft Azure', description: 'Cloud computing services and solutions' },
        { name: 'Cloudflare', description: 'CDN, DNS, and edge computing platform' },
        { name: 'Vercel', description: 'Frontend deployment and hosting platform' },
        { name: 'Koyeb', description: 'Serverless deployment platform' },
      ],
    },
    {
      category: 'Operating Systems',
      icon: Monitor,
      color: 'from-energy-plasma to-energy-cosmic',
      glow: 'energy-plasma',
      items: [
        { name: 'Ubuntu', description: 'Linux server administration and development' },
        { name: 'Windows', description: 'Desktop and server environments' },
        { name: 'macOS', description: 'Apple ecosystem development and administration' },
        { name: 'Android', description: 'Mobile development and customization' },
      ],
    },
    {
      category: 'Networking & Security',
      icon: Wifi,
      color: 'from-energy-nuclear to-energy-solar',
      glow: 'energy-nuclear',
      items: [
        { name: 'Tailscale', description: 'Zero-config VPN and mesh networking' },
        { name: 'VPN', description: 'Virtual Private Network setup and management' },
        { name: 'OpenWrt', description: 'Open-source router firmware and networking' },
        { name: 'Network Administration', description: 'Network infrastructure and protocols' },
      ],
    },
    {
      category: 'Infrastructure',
      icon: Server,
      color: 'from-nebula-purple to-nebula-pink',
      glow: 'nebula-purple',
      items: [
        { name: 'VPS Management', description: 'Virtual Private Server setup and maintenance' },
        { name: 'Server Administration', description: 'Server deployment and management' },
        { name: 'Infrastructure as Code', description: 'Automated infrastructure deployment' },
        { name: 'DevOps Practices', description: 'CI/CD and deployment automation' },
      ],
    },
  ];

  return (
    <section
      id='technologies'
      className='section-padding relative overflow-hidden bg-gradient-to-br from-galaxy-center via-galaxy-arm to-galaxy-dust'
    >
      {/* Cosmic Background Effects */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-cosmic opacity-30'></div>
        <div className='absolute inset-0 bg-gradient-energy opacity-20'></div>

        {/* Nebula Formations */}
        <div className='absolute top-20 left-20 w-96 h-96 bg-gradient-radial from-nebula-purple/15 to-transparent rounded-full blur-3xl animate-pulse-slow'></div>
        <div className='absolute bottom-20 right-20 w-80 h-80 bg-gradient-radial from-nebula-blue/12 to-transparent rounded-full blur-3xl animate-pulse-slow animation-delay-400'></div>
        <div className='absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-radial from-nebula-cyan/10 to-transparent rounded-full blur-2xl animate-pulse-slow animation-delay-800'></div>
        <div className='absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-radial from-energy-electric/8 to-transparent rounded-full blur-xl animate-pulse-slow animation-delay-1200'></div>
      </div>

      {/* Cosmic Particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {Array.from({ length: 8 }, (_, i) => (
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
          className='absolute w-64 h-64 border border-energy-electric/10 rounded-full'
          style={{
            left: '10%',
            top: '20%',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.div
          className='absolute w-48 h-48 border border-energy-plasma/8 rounded-full'
          style={{
            right: '15%',
            bottom: '25%',
          }}
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className='container-custom relative z-10'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
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
              Technologies & Platforms
            </span>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Zap size={12} className='text-energy-electric' />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='text-4xl lg:text-6xl font-cosmic font-black mb-6 text-cosmic'
          >
            TECHNOLOGIES
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='text-xl text-stellar-300 max-w-3xl mx-auto leading-relaxed'
          >
            Platforms and technologies that power modern development and infrastructure
          </motion.p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {technologies.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className='group relative'
                onMouseEnter={() => setHoveredCategory(categoryIndex)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Holographic Card */}
                <div className='relative holographic rounded-3xl p-8 transition-all duration-300 overflow-hidden'>
                  {/* Animated Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-15 transition-opacity duration-300`}
                  ></div>

                  {/* Glow Effect */}
                  <motion.div
                    className='absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300'
                    style={{
                      background: `radial-gradient(circle at 50% 50%, rgba(0,212,255,0.2) 0%, transparent 70%)`,
                      filter: 'blur(10px)',
                    }}
                  />

                  {/* Floating Orbs */}
                  <div className='absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-energy-electric/20 to-energy-plasma/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                  <div className='absolute -bottom-16 -left-16 w-24 h-24 bg-gradient-to-br from-energy-nuclear/20 to-energy-solar/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>

                  {/* Category Header */}
                  <div className='flex items-center space-x-4 mb-6 relative z-10'>
                    <motion.div
                      className={`p-4 bg-gradient-to-br ${category.color} rounded-2xl text-white shadow-${category.glow} group-hover:scale-105 transition-transform duration-300`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <IconComponent size={32} />
                      <div className='absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    </motion.div>
                    <div className='flex-1'>
                      <h3 className='text-2xl font-cosmic font-bold text-stellar-100 group-hover:text-cosmic transition-colors duration-300'>
                        {category.category}
                      </h3>
                    </div>

                    {/* Orbital Element */}
                    <motion.div
                      className='w-8 h-8 border border-stellar-400/30 rounded-full flex items-center justify-center'
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    >
                      <motion.div
                        className='w-2 h-2 bg-energy-electric rounded-full'
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>

                  {/* Technology Items */}
                  <div className='space-y-3 relative z-10'>
                    {category.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: categoryIndex * 0.1 + itemIndex * 0.05,
                        }}
                        className='flex items-start space-x-4 p-4 rounded-2xl glass-cosmic border border-stellar-400/20 hover:border-stellar-400/40 hover:shadow-energy transition-all duration-200'
                      >
                        <div
                          className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center border border-stellar-400/30`}
                        >
                          <IconComponent className='w-5 h-5 text-white' />
                        </div>
                        <div className='flex-1'>
                          <h4 className='font-cosmic font-bold text-stellar-100 mb-1'>
                            {item.name}
                          </h4>
                          <p className='text-sm text-stellar-300 leading-relaxed'>
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Scan Lines */}
                  <motion.div
                    className='absolute inset-0 pointer-events-none'
                    animate={{
                      background: [
                        'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
                        'linear-gradient(45deg, transparent 100%, rgba(255,255,255,0.03) 50%, transparent 0%)',
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: categoryIndex * 0.5 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='text-center mt-12'
        >
          <div className='holographic rounded-2xl p-8 max-w-2xl mx-auto'>
            <div className='flex items-center justify-center space-x-3 mb-4'>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                <Star size={20} className='text-energy-quantum' />
              </motion.div>
              <span className='text-stellar-200 font-cosmic text-sm uppercase tracking-wider'>
                Continuous Evolution
              </span>
            </div>
            <p className='text-stellar-100 text-lg leading-relaxed'>
              Always exploring new technologies and platforms to stay at the forefront of innovation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
