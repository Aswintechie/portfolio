import React, { useState } from 'react';
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
} from 'lucide-react';

// Personal Projects Section Component
const PersonalProjectsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredProject, setHoveredProject] = useState(null);

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
      icon: <Server size={48} />,
      status: 'Active',
      access: 'Private (requires credentials)',
      domain: 'watch.aswinlocal.in',
      link: 'https://watch.aswinlocal.in',
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
      icon: <Cloud size={48} />,
      status: 'Active',
      access: 'Private (requires credentials)',
      domain: 'cloud.aswinlocal.in',
      link: 'https://cloud.aswinlocal.in',
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
      icon: <Cpu size={48} />,
      status: 'Active',
      access: 'Private (requires credentials)',
      domain: 'ubuntu.aswinlocal.in',
      link: 'https://ubuntu.aswinlocal.in',
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
      icon: <Zap size={48} />,
      status: 'Active',
      access: 'Private (requires credentials)',
      domain: 'torrent.aswinlocal.in',
      link: 'https://torrent.aswinlocal.in',
    },
  ];

  return (
    <section id='personal-projects' className='section-padding relative overflow-hidden'>
      {/* Modern Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-orange-50'></div>
      <div className='absolute top-0 left-0 w-full h-full'>
        <div className='absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-orange-400/10 to-red-400/10 rounded-full blur-2xl'></div>
        <div className='absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-red-400/10 to-orange-400/10 rounded-full blur-2xl'></div>
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
            className='inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full px-6 py-3 mb-6 backdrop-blur-sm border border-orange-200/50'
          >
            <Server size={16} className='text-orange-500' />
            <span className='text-sm font-semibold text-gray-600 uppercase tracking-wide'>
              Self-Hosted Solutions
            </span>
          </motion.div>

          <h2 className='text-4xl lg:text-5xl font-black mb-6 text-gray-900'>
            <span className='bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent'>
              Personal Infrastructure
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Self-hosted services and infrastructure projects I maintain with enterprise-grade
            reliability
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-8'>
          {personalProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className='group relative h-full'
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Glassmorphism Card */}
              <div className='relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col'>
                {/* Animated Background Gradient */}
                <div className='absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                {/* Floating Orbs */}
                <div className='absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                <div className='absolute -bottom-16 -left-16 w-24 h-24 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>

                {/* Project Header */}
                <div className='flex items-start justify-between mb-6 relative z-10'>
                  <motion.div
                    animate={hoveredProject === index ? { scale: 1.02 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className='relative p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl text-white shadow-lg'
                  >
                    {project.icon}
                    <div className='absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
                  </motion.div>
                  <div className='flex flex-col items-end space-y-2'>
                    <span className='px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full border border-green-200'>
                      {project.status}
                    </span>
                    <span className='px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full border border-gray-200'>
                      {project.access}
                    </span>
                  </div>
                </div>

                {/* Project Title and Domain */}
                <div className='mb-6 relative z-10'>
                  <h3 className='text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-200'>
                    {project.title}
                  </h3>
                  {project.domain && (
                    <div className='flex items-center justify-between mb-4'>
                      <span className='text-sm text-gray-500 font-mono bg-gray-100 px-3 py-1 rounded-lg border'>
                        {project.domain}
                      </span>
                      <motion.a
                        href={project.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label={`Visit ${project.title} infrastructure`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-200 group/button'
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
                <p className='text-gray-600 leading-relaxed mb-6 relative z-10 flex-shrink-0'>
                  {project.description}
                </p>

                {/* Content Area - Flexible */}
                <div className='flex-1 flex flex-col relative z-10'>
                  {/* Technologies */}
                  <div className='mb-6'>
                    <h4 className='text-sm font-semibold text-gray-900 mb-3 flex items-center'>
                      <Code size={16} className='mr-2 text-orange-600' />
                      Technologies
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.3, delay: index * 0.1 + techIndex * 0.03 }}
                          className='px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 text-sm font-bold rounded-full border border-orange-200 hover:shadow-sm transition-all duration-200'
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className='flex-1'>
                    <h4 className='text-sm font-semibold text-gray-900 mb-3 flex items-center'>
                      <Zap size={16} className='mr-2 text-red-600' />
                      Key Features
                    </h4>
                    <div className='space-y-2'>
                      {project.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.3, delay: index * 0.1 + featureIndex * 0.05 }}
                          className='flex items-center space-x-3 p-2 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:shadow-sm transition-all duration-200'
                        >
                          <div className='p-1 bg-gradient-to-br from-red-500 to-orange-500 rounded-full'>
                            <Shield size={12} className='text-white' />
                          </div>
                          <span className='text-gray-700 font-medium text-sm'>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note about access */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='mt-12 text-center'
        >
          <div className='inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-200/50 shadow-lg'>
            <Shield size={20} className='text-orange-600 mr-3' />
            <p className='text-gray-700 font-medium'>
              These services are private and require authentication. Contact me for access
              credentials.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalProjectsSection;
