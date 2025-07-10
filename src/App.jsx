/**
 * @file App.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Main application component with modular architecture and floating chat functionality
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useThrottledScroll } from './hooks';
import Navigation from './components/Navigation.jsx';
import SearchModal from './components/SearchModal.jsx';
import {
  HeroSection,
  AboutSection,
  ExperienceSection,
  SkillsSection,
  ProjectsSection,
  PersonalProjectsSection,
  TechnologiesSection,
  ContactSection,
  Footer,
} from './components/sections';
import { initAnalytics } from './utils/analytics.js';

// Floating Chat Button Component
const FloatingChatButton = React.memo(({ isOpen, onOpen, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  // Handle scroll to show/hide and expand/collapse button
  const handleScroll = React.useCallback(() => {
    const scrollY = window.scrollY;
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    // For mobile: always show floating button, just expand/collapse based on scroll
    // For desktop: show floating button after scrolling past header
    const shouldShowFloating = isMobile ? true : scrollY > 100;
    const shouldExpand = scrollY > 200; // Expand when scrolled more

    setShowFloatingButton(shouldShowFloating);
    setIsExpanded(shouldExpand);
  }, []);

  useThrottledScroll(handleScroll);

  // Handle window resize to update mobile behavior
  React.useEffect(() => {
    const handleResize = () => {
      handleScroll(); // Recalculate on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleScroll]);

  // Set initial state on mount
  React.useEffect(() => {
    handleScroll(); // Set initial state based on current scroll position
  }, [handleScroll]);

  // Handle keyboard events
  React.useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={onOpen}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showFloatingButton ? 1 : 0,
          scale: showFloatingButton ? 1 : 0.8,
          width: isExpanded
            ? typeof window !== 'undefined' && window.innerWidth <= 768
              ? '120px'
              : '140px'
            : '56px',
        }}
        whileHover={{
          scale: showFloatingButton ? (isExpanded ? 1.02 : 1.1) : 0.8,
          boxShadow: showFloatingButton ? '0 6px 25px rgba(102,126,234,0.6)' : 'none',
        }}
        whileTap={{ scale: showFloatingButton ? 0.95 : 0.8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className='fixed bottom-5 right-5 z-50 bg-gradient-to-br from-blue-500 to-purple-600 text-white border-none shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer overflow-hidden'
        style={{
          height: '56px',
          borderRadius: isExpanded ? '28px' : '50%',
          paddingLeft: isExpanded ? '16px' : '0',
          paddingRight: isExpanded ? '16px' : '0',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          boxShadow: '0 4px 20px rgba(102,126,234,0.4)',
          touchAction: 'manipulation',
          pointerEvents: showFloatingButton ? 'auto' : 'none',
        }}
        aria-label='Open live chat'
      >
        {!isExpanded && (
          <span
            className='text-xl absolute'
            style={{
              lineHeight: '1',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            💬
          </span>
        )}
        {isExpanded && (
          <span className='font-semibold text-sm whitespace-nowrap'>💬 Live Chat</span>
        )}
      </motion.button>

      {/* Chat Modal */}
      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className='bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden'
          >
            <div className='p-6 border-b border-gray-200 flex justify-between items-center'>
              <h3 className='text-lg font-semibold text-gray-900'>Live Chat</h3>
              <button
                onClick={onClose}
                className='text-gray-400 hover:text-gray-600 text-2xl font-light'
                aria-label='Close chat modal'
              >
                ×
              </button>
            </div>

            <div className='p-6'>
              <div className='space-y-4'>
                <div className='bg-gray-100 rounded-lg p-4'>
                  <p className='text-gray-800 text-sm'>
                    👋 Hi! I'm Aswin. Thanks for visiting my portfolio!
                  </p>
                </div>

                <div className='space-y-3'>
                  <p className='text-gray-700 text-sm'>I'd love to chat with you about:</p>
                  <ul className='text-sm text-gray-600 space-y-2 ml-4'>
                    <li>• Projects and collaborations</li>
                    <li>• Technical discussions</li>
                    <li>• Career opportunities</li>
                    <li>• Any questions about my work</li>
                  </ul>
                </div>

                <div className='space-y-3 pt-4 border-t border-gray-200'>
                  <p className='text-gray-700 text-sm font-medium'>Let's connect:</p>

                  <div className='space-y-2'>
                    <a
                      href='mailto:contact@aswinlocal.in'
                      className='flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200'
                    >
                      <span className='text-blue-600'>📧</span>
                      <span className='text-sm text-blue-700 font-medium'>
                        Email: contact@aswinlocal.in
                      </span>
                    </a>

                    <a
                      href='https://www.linkedin.com/in/aswin4122001/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200'
                    >
                      <span className='text-blue-600'>💼</span>
                      <span className='text-sm text-blue-700 font-medium'>LinkedIn Profile</span>
                    </a>
                  </div>
                </div>

                <div className='pt-4 border-t border-gray-200'>
                  <p className='text-xs text-gray-500 text-center'>
                    I typically respond within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
});

FloatingChatButton.displayName = 'FloatingChatButton';

FloatingChatButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

// Main App Component
const App = () => {
  const [showChatModal, setShowChatModal] = useState(false);

  useEffect(() => {
    initAnalytics();
  }, []);

  // Chat functions that will be passed to Navigation
  const openChat = React.useCallback(() => {
    setShowChatModal(true);
  }, []);

  const closeChat = React.useCallback(() => {
    setShowChatModal(false);
  }, []);

  return (
    <div className='min-h-screen bg-white'>
      {/* Navigation */}
      <Navigation onOpenChat={openChat} />

      {/* Main Content */}
      <div className='relative'>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <PersonalProjectsSection />
        <TechnologiesSection />
        <ContactSection />
        <Footer />
      </div>

      {/* Floating Chat Button */}
      <FloatingChatButton isOpen={showChatModal} onOpen={openChat} onClose={closeChat} />

      {/* Search Modal */}
      <SearchModal />
    </div>
  );
};

export default App;
