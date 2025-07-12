/**
 * @file TechnologiesSection.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Technologies and platforms section component showcasing technical stack
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cloud, Monitor, Wifi, Server, Sparkles, Zap } from 'lucide-react';

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
      color: 'from-cyan-500 to-purple-500',
      bgColor: 'from-cyan-500/10 to-purple-500/10',
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
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10',
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
      color: 'from-pink-500 to-cyan-500',
      bgColor: 'from-pink-500/10 to-cyan-500/10',
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
      color: 'from-cyan-500 to-purple-500',
      bgColor: 'from-cyan-500/10 to-purple-500/10',
      items: [
        { name: 'VPS Management', description: 'Virtual Private Server setup and maintenance' },
        { name: 'Server Administration', description: 'Server deployment and management' },
        { name: 'Infrastructure as Code', description: 'Automated infrastructure deployment' },
        { name: 'DevOps Practices', description: 'CI/CD and deployment automation' },
      ],
    },
  ];

  return (
    <section id='technologies' className='section-padding relative overflow-hidden'>
      {/* Darker gradient background for better text contrast */}
      <div className='absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black'></div>
      <div className='absolute inset-0 bg-black/20'></div>
      
      {/* Animated gradient orbs */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
        <div className='absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-pink-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-2000'></div>
      </div>

      {/* Floating elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-16 left-16 w-2 h-2 bg-cyan-400 rounded-full animate-pulse'></div>
        <div className='absolute bottom-20 right-24 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-500'></div>
        <div className='absolute top-1/4 left-1/4 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-1000'></div>
        <div className='absolute bottom-1/3 right-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-1500'></div>
      </div>

      <div className='container-custom relative z-10'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className='inline-flex items-center space-x-2 bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 mb-6 border border-white/10'
          >
            <Monitor size={16} className='text-pink-400' />
            <span className='text-sm font-semibold text-gray-300 uppercase tracking-wide'>
              Technical Stack
            </span>
          </motion.div>

          <h2 className='text-4xl md:text-5xl font-black mb-6 text-white'>
            <span className='bg-gradient-to-r from-pink-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent'>
              Technologies & Platforms
            </span>
          </h2>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
            Comprehensive experience across cloud platforms, operating systems, networking, and
            infrastructure technologies.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
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
                {/* Modern glassmorphism card */}
                <div className='relative bg-white/12 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden'>
                  {/* Enhanced background layers */}
                  <div className='absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/50 to-gray-900/70 rounded-3xl'></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-100 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`}></div>

                  {/* Floating orbs */}
                  <div className='absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-cyan-400/25 to-purple-400/25 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                  <div className='absolute -bottom-16 -left-16 w-24 h-24 bg-gradient-to-br from-purple-400/25 to-pink-400/25 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>

                  {/* Category Header */}
                  <div className='relative z-10 mb-6'>
                    <motion.div
                      animate={hoveredCategory === categoryIndex ? { scale: 1.02 } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className='flex items-center mb-4'
                    >
                      <div className={`relative p-3 bg-gradient-to-br ${category.color} rounded-2xl text-white shadow-xl mr-4`}>
                        <IconComponent className='w-6 h-6' />
                        <div className='absolute inset-0 bg-white/15 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
                      </div>
                      <h3 className='text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-200 drop-shadow-lg'>
                        {category.category}
                      </h3>
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
                        className='flex items-start space-x-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 hover:border-pink-400/30 hover:shadow-md transition-all duration-200'
                      >
                        <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${category.color}/30 rounded-xl flex items-center justify-center border border-white/20`}>
                          <IconComponent className='w-5 h-5 text-white' />
                        </div>
                        <div className='flex-1'>
                          <h4 className='font-bold text-white mb-1 drop-shadow-sm'>{item.name}</h4>
                          <p className='text-sm text-gray-300 leading-relaxed'>
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='text-center'
        >
          <div className='relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl overflow-hidden'>
            {/* Enhanced background layers */}
            <div className='absolute inset-0 bg-gradient-to-br from-gray-900/80 via-purple-900/40 to-gray-900/80 rounded-3xl'></div>
            <div className='absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-cyan-500/5 rounded-3xl'></div>
            
            {/* Floating orbs */}
            <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl'></div>

            <div className='relative z-10'>
              <div className='inline-flex items-center space-x-2 bg-white/5 backdrop-blur-xl rounded-full px-4 py-2 mb-4 border border-white/10'>
                <Sparkles size={16} className='text-cyan-400' />
                <span className='text-sm font-semibold text-gray-300 uppercase tracking-wide'>
                  Always Growing
                </span>
              </div>
              <h3 className='text-2xl font-bold mb-4 text-white drop-shadow-lg'>
                <span className='bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                  Continuous Learning
                </span>
              </h3>
              <p className='text-lg text-gray-300 max-w-2xl mx-auto drop-shadow-sm'>
                I'm constantly exploring new technologies and platforms to stay current with
                industry trends and expand my technical capabilities across different domains.
              </p>
              
              {/* Enhanced decorative elements */}
              <div className='flex justify-center items-center space-x-4 mt-6'>
                <div className='flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10'>
                  <Zap size={16} className='text-yellow-400' />
                  <span className='text-sm text-gray-300 font-medium'>Always Learning</span>
                </div>
                <div className='flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10'>
                  <Server size={16} className='text-purple-400' />
                  <span className='text-sm text-gray-300 font-medium'>Tech Evolution</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
