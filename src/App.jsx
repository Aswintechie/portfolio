/**
 * @file App.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Main application component with modular architecture and floating chat functionality
 */

import React, { useEffect, Suspense, lazy } from 'react';
import Navigation from './components/Navigation.jsx';
import SearchModal from './components/SearchModal.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import { HeroSection, AboutSection, Footer } from './components/sections';
import { initAnalytics } from './utils/analytics.js';

// Lazy load below-the-fold sections for better initial performance
const ExperienceSection = lazy(() => import('./components/sections/ExperienceSection.jsx'));
const SkillsSection = lazy(() => import('./components/sections/SkillsSection.jsx'));
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection.jsx'));
const PersonalProjectsSection = lazy(
  () => import('./components/sections/PersonalProjectsSection.jsx')
);
const TechnologiesSection = lazy(() => import('./components/sections/TechnologiesSection.jsx'));
const ContactSection = lazy(() => import('./components/sections/ContactSection.jsx'));

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
        {/* Above-the-fold sections - load immediately */}
        <HeroSection />
        <AboutSection />

        {/* Below-the-fold sections - lazy loaded for better performance */}
        <Suspense fallback={<LoadingSpinner text='Loading experience...' />}>
          <ExperienceSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner text='Loading skills...' />}>
          <SkillsSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner text='Loading projects...' />}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner text='Loading personal projects...' />}>
          <PersonalProjectsSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner text='Loading technologies...' />}>
          <TechnologiesSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner text='Loading contact...' />}>
          <ContactSection />
        </Suspense>

        <Footer />
      </div>

      {/* Search Modal */}
      <SearchModal />
    </div>
  );
};

export default App;
