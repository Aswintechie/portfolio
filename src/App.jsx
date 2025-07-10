/**
 * @file App.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Main application component with modular architecture and floating chat functionality
 */

import React, { useEffect } from 'react';
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
import {
  ErrorBoundary,
  SectionErrorBoundary,
  GlobalErrorHandler,
} from './components/ErrorBoundary/';
import { PageLoader } from './components/PageTransitions';
import { usePageLoading } from './hooks';

// Note: Chat functionality restored to HTML implementation in index.html

// Main App Component
const App = () => {
  const { isLoading, loadingProgress, loadingStage, completeLoading } = usePageLoading();

  useEffect(() => {
    initAnalytics();

    // Auto-complete loading to show beautiful screen
    const autoComplete = setTimeout(() => {
      completeLoading();
    }, 2000); // Show beautiful loading for 2 seconds

    return () => {
      clearTimeout(autoComplete);
    };
  }, [completeLoading]);

  return (
    <GlobalErrorHandler>
      <ErrorBoundary level='app' fallbackComponent='Portfolio Application'>
        {/* Beautiful Page Loader */}
        <PageLoader
          isLoading={isLoading}
          progress={loadingProgress}
          stage={loadingStage}
          onComplete={() => {}}
        />

        {/* Main App Content */}
        {!isLoading && (
          <div className='min-h-screen bg-white'>
            {/* Navigation */}
            <ErrorBoundary level='component' fallbackComponent='Navigation'>
              <Navigation />
            </ErrorBoundary>

            {/* Main Content */}
            <div className='relative'>
              {/* Above-the-fold sections - load immediately */}
              <SectionErrorBoundary sectionName='Hero'>
                <HeroSection />
              </SectionErrorBoundary>

              <SectionErrorBoundary sectionName='About'>
                <AboutSection />
              </SectionErrorBoundary>

              {/* All sections - loaded directly for smooth experience */}
              <SectionErrorBoundary sectionName='Experience'>
                <ExperienceSection />
              </SectionErrorBoundary>

              <SectionErrorBoundary sectionName='Skills'>
                <SkillsSection />
              </SectionErrorBoundary>

              <SectionErrorBoundary sectionName='Projects'>
                <ProjectsSection />
              </SectionErrorBoundary>

              <SectionErrorBoundary sectionName='Personal Projects'>
                <PersonalProjectsSection />
              </SectionErrorBoundary>

              <SectionErrorBoundary sectionName='Technologies'>
                <TechnologiesSection />
              </SectionErrorBoundary>

              <SectionErrorBoundary sectionName='Contact'>
                <ContactSection />
              </SectionErrorBoundary>

              <SectionErrorBoundary sectionName='Footer'>
                <Footer />
              </SectionErrorBoundary>
            </div>

            {/* Search Modal */}
            <ErrorBoundary level='component' fallbackComponent='Search Modal'>
              <SearchModal />
            </ErrorBoundary>
          </div>
        )}
      </ErrorBoundary>
    </GlobalErrorHandler>
  );
};

export default App;
