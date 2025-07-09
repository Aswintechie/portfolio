/**
 * @file Footer.jsx
 * @author Aswin
 * @copyright © 2024 Aswin. All rights reserved.
 * @description Footer component with social links and copyright information
 */

import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-900 text-white py-12'>
      <div className='container-custom'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-4 md:mb-0'>
            <p className='text-gray-400'>© {currentYear} Aswin. All rights reserved.</p>
            <div className='mt-2 flex space-x-4 text-sm'>
              <a
                href='/privacy'
                className='text-gray-500 hover:text-secondary-600 transition-colors duration-200'
              >
                Privacy Policy
              </a>
              <a
                href='https://github.com/Aswintechie/portfolio'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-500 hover:text-secondary-600 transition-colors duration-200'
              >
                Source Code
              </a>
            </div>
          </div>
          <div className='flex space-x-4'>
            <a
              href='mailto:contact@aswinlocal.in'
              className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-secondary-600 transition-colors duration-200'
              title='Email'
              aria-label='Send email to contact@aswinlocal.in'
            >
              <Mail size={20} />
            </a>
            <a
              href='https://www.linkedin.com/in/aswin4122001/'
              target='_blank'
              rel='noopener noreferrer'
              className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-secondary-600 transition-colors duration-200'
              title='LinkedIn'
              aria-label="Visit Aswin's LinkedIn profile"
            >
              <Linkedin size={20} />
            </a>
            <a
              href='https://github.com/Aswin-coder'
              target='_blank'
              rel='noopener noreferrer'
              className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-secondary-600 transition-colors duration-200'
              title='GitHub'
              aria-label="Visit Aswin's GitHub profile"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
