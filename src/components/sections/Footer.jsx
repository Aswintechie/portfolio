/**
 * @file Footer.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Footer component with social links and copyright information
 */

import React from 'react';
import { Mail, Linkedin, Github, Heart, Code, Sparkles } from 'lucide-react';

// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='relative bg-gray-900 text-white py-12 overflow-hidden'>
      {/* Darker gradient background for better text contrast */}
      <div className='absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black'></div>
      <div className='absolute inset-0 bg-black/15'></div>
      
      {/* Animated gradient orbs */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
        <div className='absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
      </div>

      {/* Floating elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-4 left-4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse'></div>
        <div className='absolute bottom-4 right-4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-500'></div>
        <div className='absolute top-1/2 left-1/4 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-1000'></div>
      </div>

      <div className='container-custom relative z-10'>
        {/* Enhanced glassmorphism container */}
        <div className='bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
          {/* Enhanced background layers */}
          <div className='absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 rounded-3xl'></div>
          <div className='absolute inset-0 bg-gradient-to-r from-cyan-500/3 via-purple-500/3 to-pink-500/3 rounded-3xl'></div>
          
          <div className='relative z-10 flex flex-col md:flex-row justify-between items-center gap-6'>
            {/* Left side - Copyright and links */}
            <div className='text-center md:text-left'>
              <div className='flex items-center justify-center md:justify-start gap-2 mb-2'>
                <span className='text-gray-300'>© {currentYear} Aswin. Made with</span>
                <Heart size={16} className='text-pink-400 animate-pulse' />
                <span className='text-gray-300'>and</span>
                <Code size={16} className='text-cyan-400' />
              </div>
              
              <div className='flex flex-wrap justify-center md:justify-start gap-4 text-sm'>
                <a
                  href='/privacy'
                  className='text-gray-400 hover:text-purple-400 transition-colors duration-200 hover:drop-shadow-lg'
                >
                  Privacy Policy
                </a>
                <a
                  href='https://github.com/Aswintechie/portfolio'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-400 hover:text-cyan-400 transition-colors duration-200 hover:drop-shadow-lg'
                >
                  Source Code
                </a>
              </div>
            </div>

            {/* Right side - Social links */}
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10'>
                <Sparkles size={16} className='text-purple-400' />
                <span className='text-sm text-gray-300 font-medium'>Connect</span>
              </div>
              
              <div className='flex gap-3'>
                <a
                  href='mailto:contact@aswinlocal.in'
                  className='group relative w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500 border border-white/20 hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg'
                  title='Email'
                  aria-label='Send email to contact@aswinlocal.in'
                >
                  <Mail size={20} className='text-gray-300 group-hover:text-white transition-colors duration-200' />
                  <div className='absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </a>
                
                <a
                  href='https://www.linkedin.com/in/aswin4122001/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group relative w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 border border-white/20 hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg'
                  title='LinkedIn'
                  aria-label="Visit Aswin's LinkedIn profile"
                >
                  <Linkedin size={20} className='text-gray-300 group-hover:text-white transition-colors duration-200' />
                  <div className='absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </a>
                
                <a
                  href='https://github.com/Aswin-coder'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group relative w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-cyan-500 border border-white/20 hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg'
                  title='GitHub'
                  aria-label="Visit Aswin's GitHub profile"
                >
                  <Github size={20} className='text-gray-300 group-hover:text-white transition-colors duration-200' />
                  <div className='absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
