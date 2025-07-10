/**
 * @file Navigation.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Performance-optimized navigation component with routing and mobile menu support
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, Search, Code, Home, User, Briefcase, Folder } from 'lucide-react';
import SearchModal from './SearchModal.jsx';
import { useThrottledScroll, usePageTransitions } from '../hooks';

// Performance-optimized Navigation component
const Navigation = React.memo(function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Page transitions hook for smooth scrolling (only on home page)
  const { navigateToSection, currentSection } = usePageTransitions();

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  // Optimized scroll handler with throttling
  const handleScroll = React.useCallback(() => {
    const isScrolled = window.scrollY > 50;
    setScrolled(isScrolled);
  }, []);

  useThrottledScroll(handleScroll);

  // Handle navigation click - either route navigation or section scrolling
  const handleNavClick = React.useCallback(
    (e, href) => {
      if (href.startsWith('#') && isHomePage) {
        // Section navigation on home page
        e.preventDefault();
        const sectionId = href.replace('#', '');
        navigateToSection(sectionId);
        setIsMenuOpen(false);
      } else if (href.startsWith('#') && !isHomePage) {
        // Navigate to home page with section
        // React Router will handle this, no preventDefault needed
        setIsMenuOpen(false);
      } else {
        // Regular route navigation
        setIsMenuOpen(false);
      }
    },
    [navigateToSection, isHomePage]
  );

  // Memoized navigation items
  const navigationItems = React.useMemo(
    () => [
      { href: '/#home', label: 'Home', icon: Home, section: 'home' },
      { href: '/#about', label: 'About', icon: User, section: 'about' },
      { href: '/#experience', label: 'Experience', icon: Briefcase, section: 'experience' },
      { href: '/#skills', label: 'Skills', icon: Code, section: 'skills' },
      { href: '/#projects', label: 'Projects', icon: Folder, section: 'projects' },
      { href: '/#contact', label: 'Contact', icon: Mail, section: 'contact' },
    ],
    []
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md shadow-lg border-b border-gray-200/20'
          : 'bg-black/5 backdrop-blur-sm'
      }`}
    >
      <div className='container-custom'>
        <div className='flex items-center justify-between h-16'>
          {/* Optimized Logo */}
          <Link
            to='/'
            className={`flex items-center space-x-3 text-xl font-bold transition-all duration-200 hover:scale-105 ${
              scrolled ? 'text-primary-900' : 'text-white'
            }`}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className='relative'
            >
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
            </motion.div>
            <span className='bg-gradient-to-r from-secondary-500 to-accent-500 bg-clip-text text-transparent'>
              Portfolio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-1 transition-all duration-300'>
            {navigationItems.map((item, index) => {
              const isActive = isHomePage && currentSection === item.section;

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {isHomePage ? (
                    <button
                      onClick={e => handleNavClick(e, `#${item.section}`)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                        isActive
                          ? scrolled
                            ? 'bg-secondary-100 text-secondary-700 shadow-sm'
                            : 'bg-white/20 text-white shadow-sm'
                          : scrolled
                            ? 'text-gray-700 hover:text-secondary-600 hover:bg-secondary-50'
                            : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                        scrolled
                          ? 'text-gray-700 hover:text-secondary-600 hover:bg-secondary-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Optimized Action Buttons */}
          <div className='flex items-center space-x-3'>
            <motion.button
              onClick={() => setIsSearchOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-xl transition-all duration-300 ${
                scrolled
                  ? 'text-gray-700 hover:text-secondary-600 hover:bg-secondary-50'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
              aria-label='Search'
            >
              <Search size={20} />
            </motion.button>

            {/* Header Chat Button - Shows when at top of page and on home page */}
            {isHomePage && (
              <motion.button
                onClick={() => {
                  // Trigger the HTML chat modal
                  const chatModalOverlay = document.getElementById('chatModalOverlay');
                  const chatModal = document.getElementById('chatModal');
                  if (chatModalOverlay && chatModal) {
                    chatModalOverlay.style.display = 'block';
                    chatModal.style.display = 'block';
                  }
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: scrolled ? 0 : 1,
                  scale: scrolled ? 0.8 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                whileHover={{
                  scale: scrolled ? 0.8 : 1.05,
                  boxShadow: scrolled ? 'none' : '0 4px 20px rgba(102,126,234,0.4)',
                }}
                whileTap={{ scale: scrolled ? 0.8 : 0.95 }}
                className={`hidden md:flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  scrolled
                    ? 'pointer-events-none'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700'
                }`}
                style={{
                  pointerEvents: scrolled ? 'none' : 'auto',
                  boxShadow: scrolled ? 'none' : '0 4px 15px rgba(102,126,234,0.3)',
                }}
                aria-label='Open live chat'
              >
                <span className='text-lg'>💬</span>
                <span>Live Chat</span>
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`md:hidden p-2 rounded-xl transition-all duration-200 ${
                scrolled
                  ? 'text-gray-700 hover:text-secondary-600 hover:bg-secondary-50'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
              aria-label='Toggle menu'
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Optimized Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className='md:hidden border-t border-gray-200/20 bg-white/90 backdrop-blur-sm'
            >
              <div className='py-4 space-y-2'>
                {navigationItems.map((item, index) => {
                  const isActive = isHomePage && currentSection === item.section;

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {isHomePage ? (
                        <button
                          onClick={e => handleNavClick(e, `#${item.section}`)}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-left ${
                            isActive
                              ? 'bg-secondary-100 text-secondary-700 shadow-sm'
                              : 'text-gray-700 hover:text-secondary-600 hover:bg-secondary-50'
                          }`}
                        >
                          <item.icon size={18} />
                          <span className='font-medium'>{item.label}</span>
                        </button>
                      ) : (
                        <Link
                          to={item.href}
                          className='flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-left text-gray-700 hover:text-secondary-600 hover:bg-secondary-50'
                        >
                          <item.icon size={18} />
                          <span className='font-medium'>{item.label}</span>
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
});

export default Navigation;
