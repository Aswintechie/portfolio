/**
 * @file Footer.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Cosmic footer component with holographic design and stellar social links
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Star, Orbit } from 'lucide-react';

// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: 'mailto:contact@aswinlocal.in',
      icon: Mail,
      label: 'Email',
      color: 'from-energy-electric to-energy-quantum',
      glow: 'energy-electric',
    },
    {
      href: 'https://www.linkedin.com/in/aswin4122001/',
      icon: Linkedin,
      label: 'LinkedIn',
      color: 'from-energy-plasma to-energy-cosmic',
      glow: 'energy-plasma',
    },
    {
      href: 'https://github.com/Aswin-coder',
      icon: Github,
      label: 'GitHub',
      color: 'from-energy-nuclear to-energy-solar',
      glow: 'energy-nuclear',
    },
  ];

  return (
    <footer className='relative bg-gradient-to-br from-galaxy-center via-galaxy-arm to-galaxy-dust py-12 overflow-hidden'>
      {/* Cosmic Background Effects */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-cosmic opacity-40'></div>
        <div className='absolute inset-0 bg-gradient-energy opacity-25'></div>

        {/* Nebula Formations */}
        <div className='absolute top-10 left-10 w-64 h-64 bg-gradient-radial from-nebula-purple/10 to-transparent rounded-full blur-2xl animate-pulse-slow'></div>
        <div className='absolute bottom-10 right-10 w-48 h-48 bg-gradient-radial from-nebula-cyan/8 to-transparent rounded-full blur-2xl animate-pulse-slow animation-delay-600'></div>
      </div>

      {/* Cosmic Particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {Array.from({ length: 4 }, (_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-stellar-400/40 rounded-full'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Holographic Grid */}
      <div className='absolute inset-0 opacity-3'>
        <div
          className='w-full h-full'
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className='container-custom relative z-10'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          {/* Copyright and Links */}
          <motion.div
            className='mb-4 md:mb-0'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className='text-stellar-300 font-cosmic mb-2'>
              © {currentYear} Aswin. All rights reserved.
            </p>
            <div className='flex space-x-6 text-sm'>
              <motion.a
                href='/privacy'
                className='text-stellar-400 hover:text-energy-electric transition-colors duration-300 font-cosmic'
                whileHover={{ scale: 1.05 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href='https://github.com/Aswintechie/portfolio'
                target='_blank'
                rel='noopener noreferrer'
                className='text-stellar-400 hover:text-energy-electric transition-colors duration-300 font-cosmic'
                whileHover={{ scale: 1.05 }}
              >
                Source Code
              </motion.a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className='flex space-x-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : '_self'}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className='group relative'
                title={social.label}
                aria-label={`Visit ${social.label}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${social.color} rounded-2xl flex items-center justify-center shadow-${social.glow} transition-all duration-300 group-hover:shadow-energy relative overflow-hidden`}
                >
                  <social.icon size={20} className='text-white relative z-10' />

                  {/* Holographic overlay */}
                  <div className='absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                  {/* Orbital animation */}
                  <motion.div
                    className='absolute top-1 right-1 w-2 h-2 bg-white/60 rounded-full'
                    animate={{
                      rotate: [0, 360],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: index * 0.5,
                    }}
                  />
                </div>

                {/* Glow effect on hover */}
                <motion.div
                  className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300'
                  style={{
                    background: `radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)`,
                    filter: 'blur(8px)',
                  }}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Cosmic Divider */}
        <motion.div
          className='mt-8 pt-8 border-t border-stellar-400/20'
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className='flex items-center justify-center space-x-3'>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Star size={16} className='text-energy-electric' />
            </motion.div>
            <span className='text-stellar-400 font-cosmic text-sm tracking-wider'>
              Made with passion in Pondicherry
            </span>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              <Orbit size={16} className='text-energy-plasma' />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Stellar Edge */}
      <div className='absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-galaxy-center to-transparent pointer-events-none' />
    </footer>
  );
};

export default Footer;
