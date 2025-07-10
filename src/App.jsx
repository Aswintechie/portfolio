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
import { ErrorBoundary, SectionErrorBoundary, GlobalErrorHandler } from './components/ErrorBoundary/';

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
    <GlobalErrorHandler>
      <ErrorBoundary level="app" fallbackComponent="Portfolio Application">
        {/* Main App Content */}
        <div className='min-h-screen bg-white'>
          {/* Navigation */}
          <ErrorBoundary level="component" fallbackComponent="Navigation">
            <Navigation />
          </ErrorBoundary>

          {/* Main Content */}
          <div className='relative'>
            {/* Above-the-fold sections - load immediately */}
            <SectionErrorBoundary sectionName="Hero">
              <HeroSection />
            </SectionErrorBoundary>
            
            <SectionErrorBoundary sectionName="About">
              <AboutSection />
            </SectionErrorBoundary>

            {/* Below-the-fold sections - lazy loaded for better performance */}
            <SectionErrorBoundary sectionName="Experience">
              <Suspense fallback={<LoadingSpinner text='Loading experience...' />}>
                <ExperienceSection />
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary sectionName="Skills">
              <Suspense fallback={<LoadingSpinner text='Loading skills...' />}>
                <SkillsSection />
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary sectionName="Projects">
              <Suspense fallback={<LoadingSpinner text='Loading projects...' />}>
                <ProjectsSection />
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary sectionName="Personal Projects">
              <Suspense fallback={<LoadingSpinner text='Loading personal projects...' />}>
                <PersonalProjectsSection />
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary sectionName="Technologies">
              <Suspense fallback={<LoadingSpinner text='Loading technologies...' />}>
                <TechnologiesSection />
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary sectionName="Contact">
              <Suspense fallback={<LoadingSpinner text='Loading contact...' />}>
                <ContactSection />
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary sectionName="Footer">
              <Footer />
            </SectionErrorBoundary>
          </div>

          {/* Search Modal */}
          <ErrorBoundary level="component" fallbackComponent="Search Modal">
            <SearchModal />
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    </GlobalErrorHandler>
  );
};

export default App;
