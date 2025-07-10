/**
 * @file Navigation.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Performance-optimized navigation component with mobile menu and search functionality
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, Search, Code, Home, User, Briefcase, Folder } from 'lucide-react';
import PropTypes from 'prop-types';
import SearchModal from './SearchModal.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { useThrottledScroll } from '../hooks';

// Performance-optimized Navigation component
const Navigation = React.memo(function Navigation({ onOpenChat }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Optimized scroll handler with throttling
  const handleScroll = React.useCallback(() => {
    const isScrolled = window.scrollY > 50;
    setScrolled(isScrolled);
  }, []);

  useThrottledScroll(handleScroll);

  // Memoized navigation items
  const navigationItems = React.useMemo(
    () => [
      { href: '#home', label: 'Home', icon: Home },
      { href: '#about', label: 'About', icon: User },
      { href: '#experience', label: 'Experience', icon: Briefcase },
      { href: '#skills', label: 'Skills', icon: Code },
      { href: '#projects', label: 'Projects', icon: Folder },
      { href: '#contact', label: 'Contact', icon: Mail },
    ],
    []
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-gray-900/85 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20'
          : 'bg-black/5 dark:bg-gray-900/20 backdrop-blur-sm'
      }`}
    >
      <div className='container-custom'>
        <div className='flex items-center justify-between h-16'>
          {/* Optimized Logo */}
          <motion.a
            href='#home'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center space-x-3 text-xl font-bold transition-all duration-200 hover:scale-105 ${
              scrolled ? 'text-primary-900 dark:text-white' : 'text-white dark:text-gray-100'
            }`}
          >
            <div className='relative'>
              <Code size={28} className='text-secondary-500' />
              <motion.div
                className='absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full'
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
            <span className='bg-gradient-to-r from-secondary-500 to-accent-500 bg-clip-text text-transparent'>
              Portfolio
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {navigationItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  scrolled
                    ? 'text-gray-700 dark:text-gray-300 hover:text-secondary-600 dark:hover:text-secondary-400'
                    : 'text-white/90 dark:text-gray-100 hover:text-white'
                }`}
              >
                {item.label}
                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary-500 to-accent-500 transition-all duration-200 group-hover:w-full' />
              </motion.a>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className='hidden md:flex items-center space-x-4'>
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Search Button */}
            <motion.button
              onClick={() => setIsSearchOpen(true)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                scrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-white/90 dark:text-gray-100 hover:bg-white/10'
              }`}
              aria-label='Search'
            >
              <Search size={18} />
            </motion.button>

            {/* Chat Button */}
            <motion.button
              onClick={onOpenChat}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className='px-4 py-2 bg-gradient-to-r from-secondary-500 to-accent-500 text-white rounded-full font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg'
            >
              Chat
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className='md:hidden flex items-center space-x-3'>
            {/* Theme Toggle for Mobile */}
            <ThemeToggle />

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                scrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-white dark:text-gray-100 hover:bg-white/10'
              }`}
              aria-label='Toggle menu'
            >
              <AnimatePresence mode='wait'>
                {isMenuOpen ? (
                  <motion.div
                    key='close'
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key='menu'
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/20 dark:border-gray-700/20'
          >
            <div className='container-custom py-4'>
              <div className='flex flex-col space-y-4'>
                {navigationItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsMenuOpen(false)}
                      className='flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'
                    >
                      <IconComponent size={20} />
                      <span className='font-medium'>{item.label}</span>
                    </motion.a>
                  );
                })}

                <div className='flex items-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
                  <motion.button
                    onClick={() => {
                      setIsSearchOpen(true);
                      setIsMenuOpen(false);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className='flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'
                  >
                    <Search size={20} />
                    <span className='font-medium'>Search</span>
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      onOpenChat();
                      setIsMenuOpen(false);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className='px-4 py-2 bg-gradient-to-r from-secondary-500 to-accent-500 text-white rounded-full font-medium transition-all duration-200 hover:scale-105'
                  >
                    Chat
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
    </nav>
  );
});

Navigation.propTypes = {
  onOpenChat: PropTypes.func.isRequired,
};

export default Navigation;
