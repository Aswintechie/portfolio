/**
 * @file PersonalProjectsSection.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Personal infrastructure projects section showcasing self-hosted solutions
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
  Sparkles,
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
      icon: <Monitor size={32} />,
      status: 'Active',
      access: 'Private (requires credentials)',
      domain: 'plex.aswinlocal.in',
      link: 'https://plex.aswinlocal.in',
      color: 'from-purple-500 to-pink-500',
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
      icon: <Database size={32} />,
      status: 'Active',
      access: 'Private (requires credentials)',
      domain: 'truenas.aswinlocal.in',
      link: 'https://truenas.aswinlocal.in',
      color: 'from-cyan-500 to-purple-500',
    },
    {
      title: 'Jellyfin Media Server',
      description:
        'Open-source alternative to Plex, providing media streaming without licensing restrictions. Self-hosted solution for personal media library management.',
      technologies: ['Docker', 'Linux', 'Web Interface', 'Mobile Apps', 'Transcoding'],
      features: [
        'No licensing fees or restrictions',
        'Web-based media interface',
        'Mobile and TV client apps',
        'Hardware-accelerated transcoding',
        'Multi-user support',
      ],
      icon: <Server size={32} />,
      status: 'Active',
      access: 'Private (requires credentials)',
      domain: 'watch.aswinlocal.in',
      link: 'https://watch.aswinlocal.in',
      color: 'from-pink-500 to-cyan-500',
    },
    {
      title: 'Cloud Storage Server',
      description:
        'Personal cloud storage solution with Nextcloud, providing file synchronization, sharing, and collaboration tools similar to Google Drive or Dropbox.',
      technologies: ['Nextcloud', 'Docker', 'Linux', 'SSL/TLS', 'Database'],
      features: [
        'File synchronization across devices',
        'Secure file sharing and collaboration',
        'Calendar and contact sync',
        'Mobile apps for all platforms',
        'End-to-end encryption support',
      ],
      icon: <Cloud size={32} />,
      status: 'Active',
      access: 'Private (requires credentials)',
      domain: 'cloud.aswinlocal.in',
      link: 'https://cloud.aswinlocal.in',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Ubuntu VPS Server',
      description:
        'Virtual Private Server running Ubuntu for hosting various services, development environments, and infrastructure management. Provides a robust foundation for self-hosted applications.',
      technologies: ['Ubuntu', 'SSH', 'Docker', 'Nginx', 'SSL/TLS', 'Server Management'],
      features: [
        'Remote server administration via SSH',
        'Containerized application deployment',
        'Reverse proxy and load balancing',
        'Automated SSL certificate management',
        'System monitoring and maintenance',
      ],
      icon: <Cpu size={32} />,
      status: 'Active',
      access: 'Private (requires credentials)',
      domain: 'ubuntu.aswinlocal.in',
      link: 'https://ubuntu.aswinlocal.in',
      color: 'from-cyan-500 to-purple-500',
    },
    {
      title: 'qBittorrent Download Server',
      description:
        'Web-based BitTorrent client for remote torrent management and file downloads. Provides secure access to download and manage torrents from anywhere with a web interface.',
      technologies: ['qBittorrent', 'Docker', 'Web UI', 'BitTorrent', 'SSL/TLS', 'Remote Access'],
      features: [
        'Web-based torrent management interface',
        'Remote download monitoring and control',
        'Automatic download scheduling',
        'Bandwidth and speed limiting',
        'Secure remote access via HTTPS',
      ],
      icon: <Zap size={32} />,
      status: 'Active',
      access: 'Private (requires credentials)',
      domain: 'torrent.aswinlocal.in',
      link: 'https://torrent.aswinlocal.in',
      color: 'from-pink-500 to-cyan-500',
    },
  ];

  return (
    <section id='personal-projects' className='section-padding relative overflow-hidden'>
      {/* Darker gradient background for better text contrast */}
      <div className='absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black'></div>
      <div className='absolute inset-0 bg-black/20'></div>
      
      {/* Animated gradient orbs */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
        <div className='absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 right-1/3 w-80 h-80 bg-gradient-to-br from-pink-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-2000'></div>
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
            <Server size={16} className='text-cyan-400' />
            <span className='text-sm font-semibold text-gray-300 uppercase tracking-wide'>
              Self-Hosted Solutions
            </span>
          </motion.div>

          <h2 className='text-4xl lg:text-5xl font-black mb-6 text-white'>
            <span className='bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
              Personal Infrastructure
            </span>
          </h2>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
            Self-hosted services and infrastructure projects I maintain with enterprise-grade
            reliability
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8' id={personalProjectsListId}>
          {(showAllProjects ? personalProjects : personalProjects.slice(0, 3)).map(
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
                {/* Modern glassmorphism card */}
                <div className='relative bg-white/12 backdrop-blur-xl rounded-3xl p-8 border border-white/25 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden h-full flex flex-col'>
                  {/* Animated background gradient */}
                  <div className='absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/50 to-gray-900/70 rounded-3xl'></div>
                  <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-purple-500/8 to-pink-500/8 opacity-100 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl'></div>

                  {/* Floating orbs */}
                  <div className='absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-cyan-400/25 to-purple-400/25 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                  <div className='absolute -bottom-16 -left-16 w-24 h-24 bg-gradient-to-br from-purple-400/25 to-pink-400/25 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>

                  {/* Project Header */}
                  <div className='flex items-start justify-between mb-6 relative z-10'>
                    <motion.div
                      animate={hoveredProject === index ? { scale: 1.05, rotate: 3 } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`relative p-4 bg-gradient-to-br ${project.color} rounded-2xl text-white shadow-xl`}
                    >
                      {project.icon}
                      <div className='absolute inset-0 bg-white/15 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
                    </motion.div>
                    <div className='flex flex-col items-end space-y-2'>
                      <span className='px-3 py-1 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-300 text-xs font-bold rounded-full border border-cyan-400/30'>
                        {project.status}
                      </span>
                      <span className='px-3 py-1 bg-white/15 backdrop-blur-sm text-gray-200 text-xs font-bold rounded-full border border-white/20'>
                        {project.access}
                      </span>
                    </div>
                  </div>

                  {/* Project Title and Domain */}
                  <div className='mb-6 relative z-10 flex-grow'>
                    <h3 className='text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-200 drop-shadow-lg'>
                      {project.title}
                    </h3>
                    <p className='text-gray-200 leading-relaxed mb-4 text-sm drop-shadow-sm'>
                      {project.description}
                    </p>
                    {project.domain && (
                      <div className='flex items-center justify-between mb-4'>
                        <span className='text-sm text-gray-300 font-mono bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/20'>
                          {project.domain}
                        </span>
                        <motion.a
                          href={project.link}
                          target='_blank'
                          rel='noopener noreferrer'
                          aria-label={`Visit ${project.title} infrastructure`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${project.color} text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 group/button`}
                        >
                          <ExternalLink
                            size={16}
                            className='mr-2 group-hover/button:rotate-12 transition-transform duration-200'
                          />
                          Visit
                          <div className='absolute inset-0 bg-white/15 rounded-xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-200'></div>
                        </motion.a>
                      </div>
                    )}
                  </div>

                  {/* Technologies */}
                  <div className='mb-6 relative z-10'>
                    <h4 className='text-sm font-bold text-white mb-3 flex items-center drop-shadow-sm'>
                      <Code size={14} className='mr-2 text-cyan-400' />
                      Technologies
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-2 py-1 bg-gradient-to-r ${project.color}/30 text-white text-xs font-bold rounded-full border border-white/20 backdrop-blur-sm`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className='px-2 py-1 bg-white/15 backdrop-blur-sm text-gray-200 text-xs font-bold rounded-full border border-white/20'>
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className='relative z-10'>
                    <h4 className='text-sm font-bold text-white mb-3 flex items-center drop-shadow-sm'>
                      <Shield size={14} className='mr-2 text-purple-400' />
                      Key Features
                    </h4>
                    <div className='space-y-2'>
                      {project.features.slice(0, 3).map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className='flex items-center space-x-2 text-gray-200 text-sm'
                        >
                          <div className='w-1.5 h-1.5 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full shadow-sm'></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                      {project.features.length > 3 && (
                        <div className='flex items-center space-x-2 text-gray-300 text-sm'>
                          <div className='w-1.5 h-1.5 bg-gray-400 rounded-full'></div>
                          <span>+{project.features.length - 3} more features</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* Enhanced Show More/Less Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='text-center mt-12'
        >
          <button
            type='button'
            onClick={() => setShowAllProjects(!showAllProjects)}
            aria-expanded={showAllProjects}
            aria-controls={personalProjectsListId}
            className='relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group/btn overflow-hidden'
          >
            {showAllProjects ? 'Show Less Projects' : 'Show All Projects'}
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 group-hover/btn:rotate-12 ${showAllProjects ? 'rotate-180' : ''}`}
              aria-hidden='true'
            />
            <div className='absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300'></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalProjectsSection;
