/**
 * @file PersonalProjectsSection.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Cosmic personal infrastructure projects section with holographic cards and stellar effects
 */

import React, { useState, useId } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Monitor,
  Database,
  Server,
  Cloud,
  Cpu,
  Zap,
  Code,
  Shield,
  ExternalLink,
  ChevronDown,
  Orbit,
  Star,
} from 'lucide-react';

// Personal Projects Section Component
const PersonalProjectsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredProject, setHoveredProject] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const id = useId();
  const personalProjectsListId = `personal-projects-list-${id}`;

  const personalProjects = [
    {
      title: 'Plex Media Server',
      description:
        'Self-hosted media streaming server for movies, TV shows, and music. Features transcoding, remote access, and mobile apps for seamless media consumption across all devices.',
      technologies: ['Docker', 'Linux', 'Media Transcoding', 'Remote Access', 'Mobile Apps'],
      features: [
        '4K HDR content streaming',
        'Automatic media organization',
        'Remote access from anywhere',
        'Mobile and TV apps support',
        'Hardware transcoding enabled',
      ],
      icon: <Monitor size={48} />,
      status: 'Active',
      access: 'Private (requires credentials)',
      domain: 'plex.aswinlocal.in',
      link: 'https://plex.aswinlocal.in',
      color: 'from-energy-electric to-energy-quantum',
      glow: 'energy-electric',
    },
    {
      title: 'TrueNAS Storage Server',
      description:
        'Enterprise-grade network-attached storage (NAS) system with ZFS file system. Provides reliable data storage, backup solutions, and virtualization capabilities.',
      technologies: ['ZFS', 'FreeBSD', 'RAID', 'Virtualization', 'Backup Solutions'],
      features: [
        'ZFS file system with data integrity',
        'RAID-Z2 redundancy',
        'Automated backup scheduling',
        'Virtual machine hosting',
        'SMB/NFS file sharing',
      ],
      icon: <Database size={48} />,
      status: 'Active',
      access: 'Private (requires credentials)',
      domain: 'truenas.aswinlocal.in',
      link: 'https://truenas.aswinlocal.in',
      color: 'from-energy-plasma to-energy-cosmic',
      glow: 'energy-plasma',
    },
    {
      title: 'Proxmox Virtualization',
      description:
        'Enterprise virtualization platform running multiple virtual machines and containers. Provides scalable infrastructure for development, testing, and production workloads.',
      technologies: ['Proxmox VE', 'KVM', 'LXC', 'Clustering', 'High Availability'],
      features: [
        'VM and container management',
        'Live migration capabilities',
        'Backup and snapshot features',
        'Web-based management interface',
        'High availability clustering',
      ],
      icon: <Server size={48} />,
      status: 'Active',
      access: 'Private (requires credentials)',
      domain: 'proxmox.aswinlocal.in',
      link: 'https://proxmox.aswinlocal.in',
      color: 'from-energy-nuclear to-energy-solar',
      glow: 'energy-nuclear',
    },
    {
      title: 'Cloudflare Integration',
      description:
        'Global CDN and security services integration for enhanced performance and protection. Provides DNS management, SSL certificates, and advanced security features.',
      technologies: ['Cloudflare', 'CDN', 'DNS', 'SSL/TLS', 'Security Rules'],
      features: [
        'Global CDN acceleration',
        'DDoS protection',
        'SSL/TLS encryption',
        'DNS management',
        'Analytics and monitoring',
      ],
      icon: <Cloud size={48} />,
      status: 'Active',
      access: 'Public (with security)',
      domain: 'cloudflare.com',
      link: 'https://cloudflare.com',
      color: 'from-nebula-purple to-nebula-pink',
      glow: 'nebula-purple',
    },
  ];

  return (
    <section
      id='personal-projects'
      className='section-padding relative overflow-hidden bg-gradient-to-br from-galaxy-center via-galaxy-arm to-galaxy-dust'
    >
      {/* Cosmic Background Effects */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-cosmic opacity-30'></div>
        <div className='absolute inset-0 bg-gradient-energy opacity-20'></div>

        {/* Nebula Formations */}
        <div className='absolute top-20 left-20 w-96 h-96 bg-gradient-radial from-nebula-orange/12 to-transparent rounded-full blur-3xl animate-pulse-slow'></div>
        <div className='absolute bottom-20 right-20 w-80 h-80 bg-gradient-radial from-nebula-red/10 to-transparent rounded-full blur-3xl animate-pulse-slow animation-delay-400'></div>
        <div className='absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-radial from-nebula-cyan/8 to-transparent rounded-full blur-2xl animate-pulse-slow animation-delay-800'></div>
        <div className='absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-radial from-energy-electric/6 to-transparent rounded-full blur-xl animate-pulse-slow animation-delay-1200'></div>
      </div>

      {/* Cosmic Particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {Array.from({ length: 18 }, (_, i) => (
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
          className='absolute w-56 h-56 border border-energy-electric/10 rounded-full'
          style={{
            left: '20%',
            top: '15%',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.div
          className='absolute w-40 h-40 border border-energy-plasma/8 rounded-full'
          style={{
            right: '25%',
            bottom: '20%',
          }}
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 22,
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
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className='inline-flex items-center space-x-3 holographic rounded-full px-8 py-4 mb-8'
          >
            <motion.div
              className='w-2 h-2 bg-energy-nuclear rounded-full'
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className='text-sm font-cosmic text-stellar-200 uppercase tracking-widest'>
              Infrastructure
            </span>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Server size={12} className='text-energy-electric' />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-4xl lg:text-6xl font-cosmic font-black mb-6 text-cosmic'
          >
            PERSONAL INFRASTRUCTURE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='text-xl text-stellar-300 max-w-3xl mx-auto leading-relaxed'
          >
            Self-hosted services and infrastructure projects I maintain with enterprise-grade
            reliability
          </motion.p>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-8' id={personalProjectsListId}>
          {(showAllProjects ? personalProjects : personalProjects.slice(0, 2)).map(
            (project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className='group relative h-full'
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Holographic Card */}
                <div className='relative holographic rounded-3xl p-8 transition-all duration-300 overflow-hidden h-full flex flex-col'>
                  {/* Animated Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5 group-hover:opacity-15 transition-opacity duration-300`}
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

                  {/* Project Header */}
                  <div className='flex items-start justify-between mb-6 relative z-10'>
                    <motion.div
                      animate={hoveredProject === index ? { scale: 1.02 } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={`relative p-4 bg-gradient-to-br ${project.color} rounded-2xl text-white shadow-${project.glow}`}
                    >
                      {project.icon}
                      <div className='absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
                    </motion.div>
                    <div className='flex flex-col items-end space-y-2'>
                      <span className='px-3 py-1 bg-gradient-to-r from-energy-electric/20 to-energy-plasma/20 text-energy-electric text-xs font-cosmic font-bold rounded-full border border-energy-electric/30'>
                        {project.status}
                      </span>
                      <span className='px-3 py-1 glass-cosmic text-stellar-300 text-xs font-cosmic font-bold rounded-full border border-stellar-400/30'>
                        {project.access}
                      </span>
                    </div>
                  </div>

                  {/* Project Title and Domain */}
                  <div className='mb-6 relative z-10'>
                    <h3 className='text-2xl font-cosmic font-bold text-stellar-100 mb-3 group-hover:text-cosmic transition-colors duration-200'>
                      {project.title}
                    </h3>
                    {project.domain && (
                      <div className='flex items-center justify-between mb-4'>
                        <span className='text-sm text-stellar-300 font-mono glass-cosmic px-3 py-1 rounded-lg border border-stellar-400/20'>
                          {project.domain}
                        </span>
                        <motion.a
                          href={project.link}
                          target='_blank'
                          rel='noopener noreferrer'
                          aria-label={`Visit ${project.title} infrastructure`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${project.color} text-white rounded-xl font-cosmic font-bold shadow-${project.glow} hover:shadow-energy transition-all duration-200 group/button`}
                        >
                          <ExternalLink
                            size={16}
                            className='mr-2 group-hover/button:rotate-3 transition-transform duration-200'
                          />
                          Visit
                          <div className='absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-200'></div>
                        </motion.a>
                      </div>
                    )}
                  </div>

                  {/* Project Description */}
                  <p className='text-stellar-300 leading-relaxed mb-6 relative z-10 flex-shrink-0'>
                    {project.description}
                  </p>

                  {/* Content Area - Flexible */}
                  <div className='flex-1 flex flex-col space-y-6 relative z-10'>
                    {/* Technologies */}
                    <div>
                      <h4 className='text-lg font-cosmic font-bold text-stellar-100 mb-3 flex items-center'>
                        <div className={`p-2 bg-gradient-to-br ${project.color} rounded-lg mr-3`}>
                          <Code size={16} className='text-white' />
                        </div>
                        Technologies
                      </h4>
                      <div className='flex flex-wrap gap-2'>
                        {project.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.3, delay: index * 0.05 + techIndex * 0.02 }}
                            className='px-3 py-1 holographic text-stellar-200 text-xs font-cosmic font-bold rounded-full border border-energy-electric/30'
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className='flex-1'>
                      <h4 className='text-lg font-cosmic font-bold text-stellar-100 mb-3 flex items-center'>
                        <div className={`p-2 bg-gradient-to-br ${project.color} rounded-lg mr-3`}>
                          <Star size={16} className='text-white' />
                        </div>
                        Features
                      </h4>
                      <div className='grid gap-2'>
                        {project.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.05 + featureIndex * 0.05,
                            }}
                            className='flex items-center space-x-3 p-2 glass-cosmic rounded-lg border border-stellar-400/20'
                          >
                            <div className={`p-1 bg-gradient-to-br ${project.color} rounded-full`}>
                              <Shield size={12} className='text-white' />
                            </div>
                            <span className='text-stellar-300 text-sm font-medium'>{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
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
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  />
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* View More/Less Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='text-center mt-12'
        >
          <motion.button
            onClick={() => setShowAllProjects(!showAllProjects)}
            aria-expanded={showAllProjects}
            aria-controls={personalProjectsListId}
            className='relative inline-flex items-center gap-2 px-8 py-4 glass-cosmic text-stellar-100 rounded-2xl font-cosmic font-bold border-2 border-energy-electric/30 hover:border-energy-electric/50 hover:shadow-energy transition-all duration-300 group/btn overflow-hidden'
            whileHover={{ scale: 1.05, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAllProjects ? 'View Less Infrastructure' : 'View More Infrastructure'}
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 group-hover/btn:rotate-3 ${showAllProjects ? 'rotate-180' : ''}`}
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

export default PersonalProjectsSection;
