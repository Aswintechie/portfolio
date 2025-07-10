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

// Note: Chat functionality restored to HTML implementation in index.html

// Main App Component
const App = () => {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <div className='min-h-screen bg-white'>
      {/* Navigation */}
      <Navigation />

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

      {/* Search Modal */}
      <SearchModal />
    </div>
  );
};

export default App;
