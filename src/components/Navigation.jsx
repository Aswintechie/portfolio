/**
 * @file Navigation.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Cosmic navigation component with holographic design and stellar animations
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Zap, Rocket, Orbit, Sparkles, Star, Circle } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  // Navigation items
  const navigationItems = [
    { id: 'home', label: 'Home', icon: <Rocket size={16} />, href: '#home' },
    { id: 'about', label: 'About', icon: <Circle size={16} />, href: '#about' },
    { id: 'experience', label: 'Experience', icon: <Zap size={16} />, href: '#experience' },
    { id: 'skills', label: 'Skills', icon: <Star size={16} />, href: '#skills' },
    { id: 'projects', label: 'Projects', icon: <Orbit size={16} />, href: '#projects' },
    { id: 'contact', label: 'Contact', icon: <Sparkles size={16} />, href: '#contact' },
  ];

  // Handle scroll for cosmic effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      // Update active section based on scroll position
      const sections = navigationItems.map(item => document.getElementById(item.id));
      const scrollPosition = scrollTop + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigationItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <motion.nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'navbar-cosmic backdrop-cosmic' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Cosmic Navigation Container */}
      <div className='container-custom'>
        <div className='flex items-center justify-between py-4'>
          {/* Cosmic Logo */}
          <motion.div
            className='flex items-center space-x-3'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className='relative'
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className='w-10 h-10 bg-gradient-to-r from-energy-electric to-energy-plasma rounded-full flex items-center justify-center'>
                <Orbit size={20} className='text-white' />
              </div>

              {/* Orbital rings */}
              <motion.div
                className='absolute inset-0 border border-energy-electric/30 rounded-full'
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <div className='hidden sm:block'>
              <h1 className='text-xl font-cosmic font-bold text-cosmic'>ASWIN.SPACE</h1>
              <p className='text-xs text-stellar-400 font-space tracking-wider'>
                SOFTWARE ENGINEER
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center space-x-1'>
            {navigationItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                onClick={e => handleNavClick(e, item.href)}
                className={`relative px-4 py-2 rounded-lg font-space text-sm transition-all duration-300 flex items-center space-x-2 ${
                  activeSection === item.id
                    ? 'text-energy-electric'
                    : 'text-stellar-300 hover:text-energy-electric'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* Active indicator */}
                {activeSection === item.id && (
                  <motion.div
                    className='absolute inset-0 bg-energy-electric/10 rounded-lg border border-energy-electric/30'
                    layoutId='activeTab'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Icon */}
                <motion.div
                  className={`${
                    activeSection === item.id ? 'text-energy-electric' : 'text-stellar-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {item.icon}
                </motion.div>

                {/* Label */}
                <span className='relative z-10 font-medium'>{item.label}</span>

                {/* Hover effect */}
                <motion.div
                  className='absolute inset-0 bg-energy-electric/5 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300'
                  whileHover={{ scale: 1.02 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className='flex items-center space-x-3'>
            {/* Search Button */}
            <motion.button
              className='p-2 rounded-lg glass-cosmic border border-stellar-400/20 hover:border-energy-electric/50 transition-all duration-300'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Trigger search modal
                const searchEvent = new CustomEvent('openSearch');
                window.dispatchEvent(searchEvent);
              }}
            >
              <Search size={18} className='text-stellar-300' />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className='lg:hidden p-2 rounded-lg glass-cosmic border border-stellar-400/20 hover:border-energy-electric/50 transition-all duration-300'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X size={20} className='text-stellar-300' />
              ) : (
                <Menu size={20} className='text-stellar-300' />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='lg:hidden absolute top-full left-0 right-0 backdrop-cosmic border-t border-stellar-400/20'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className='container-custom py-4'>
              <div className='space-y-2'>
                {navigationItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={e => handleNavClick(e, item.href)}
                    className={`block px-4 py-3 rounded-lg font-space text-base transition-all duration-300 flex items-center space-x-3 ${
                      activeSection === item.id
                        ? 'bg-energy-electric/10 text-energy-electric border border-energy-electric/30'
                        : 'text-stellar-300 hover:bg-energy-electric/5 hover:text-energy-electric'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Icon */}
                    <motion.div
                      className={`${
                        activeSection === item.id ? 'text-energy-electric' : 'text-stellar-400'
                      }`}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      {item.icon}
                    </motion.div>

                    {/* Label */}
                    <span className='font-medium'>{item.label}</span>

                    {/* Active indicator */}
                    {activeSection === item.id && (
                      <motion.div
                        className='ml-auto w-2 h-2 bg-energy-electric rounded-full'
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>

              {/* Mobile Action Section */}
              <div className='mt-6 pt-4 border-t border-stellar-400/20'>
                <motion.button
                  className='w-full px-4 py-3 bg-gradient-to-r from-energy-electric to-energy-plasma rounded-lg font-cosmic font-semibold text-white flex items-center justify-center space-x-2 shadow-energy'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsOpen(false);
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <Rocket size={16} />
                  <span>INITIATE CONTACT</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cosmic Navigation Indicator */}
      <motion.div
        className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-energy-electric to-transparent'
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.nav>
  );
};

export default Navigation;
