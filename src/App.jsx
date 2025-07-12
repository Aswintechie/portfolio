/**
 * @file App.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Main application component with routing and cosmic space theme architecture
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import SearchModal from './components/SearchModal.jsx';
import NotFound from './components/NotFound.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
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

// Home Page Component (Main Portfolio)
const HomePage = () => {
  return (
    <div className='relative bg-deep-space'>
      {/* Cosmic Background Layer */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-deep-space'></div>
        <div className='absolute inset-0 bg-gradient-cosmic opacity-60'></div>
        <div className='starfield'></div>
      </div>

      {/* Content Layer */}
      <div className='relative z-10'>
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
    </div>
  );
};

// Layout Component (Wraps all pages with cosmic navigation)
const Layout = ({ children }) => {
  return (
    <div className='min-h-screen bg-deep-space'>
      {/* Cosmic Background */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-deep-space'></div>
        <div className='absolute inset-0 bg-gradient-cosmic opacity-60'></div>
        <div className='starfield'></div>

        {/* Cosmic Atmosphere */}
        <div className='absolute inset-0 opacity-20'>
          <div className='absolute top-0 left-0 w-full h-full bg-gradient-energy'></div>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,212,255,0.1)_0%,transparent_50%)]'></div>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,0,110,0.1)_0%,transparent_50%)]'></div>
        </div>
      </div>

      {/* Navigation */}
      <ErrorBoundary level='component' fallbackComponent='Navigation'>
        <Navigation />
      </ErrorBoundary>

      {/* Page Content */}
      <div className='relative z-10'>{children}</div>

      {/* Search Modal */}
      <ErrorBoundary level='component' fallbackComponent='Search Modal'>
        <SearchModal />
      </ErrorBoundary>
    </div>
  );
};

// Main App Component with Routing
const App = () => {
  // Skip loading screen in test environment
  const isTestEnvironment = import.meta.env.MODE === 'test' || import.meta.env.VITEST;

  // Only show loading on initial page load, not on route changes
  const [isInitialLoad, setIsInitialLoad] = React.useState(() => {
    return !isTestEnvironment && !sessionStorage.getItem('hasLoadedBefore');
  });

  const { isLoading, loadingProgress, loadingStage, completeLoading } = usePageLoading();

  // Only use loading screen for initial load and not in tests
  const shouldShowLoading = !isTestEnvironment && isInitialLoad && isLoading;

  useEffect(() => {
    initAnalytics();

    // Only show loading screen on initial load
    if (isInitialLoad) {
      // Auto-complete loading to show beautiful interface
      const autoComplete = setTimeout(() => {
        completeLoading();
        // Mark that we've loaded before
        sessionStorage.setItem('hasLoadedBefore', 'true');
        setIsInitialLoad(false);
      }, 3000); // Show loading screen for 3 seconds

      return () => {
        clearTimeout(autoComplete);
      };
    }
  }, [completeLoading, isInitialLoad]);

  return (
    <GlobalErrorHandler>
      <ErrorBoundary level='app' fallbackComponent='Portfolio Application'>
        <Router>
          {/* Page Loader - Only on initial load */}
          {shouldShowLoading && (
            <PageLoader
              isLoading={shouldShowLoading}
              progress={loadingProgress}
              stage={loadingStage}
              onComplete={() => {}}
            />
          )}

          {/* Main App Content with Routing */}
          {!shouldShowLoading && (
            <Layout>
              <Routes>
                {/* Main Portfolio Page */}
                <Route path='/' element={<HomePage />} />

                {/* Privacy Policy Page */}
                <Route
                  path='/privacy'
                  element={
                    <ErrorBoundary level='page' fallbackComponent='Privacy Policy'>
                      <PrivacyPolicy />
                    </ErrorBoundary>
                  }
                />

                {/* 404 Not Found Page */}
                <Route
                  path='*'
                  element={
                    <ErrorBoundary level='page' fallbackComponent='404 Page'>
                      <NotFound />
                    </ErrorBoundary>
                  }
                />
              </Routes>
            </Layout>
          )}
        </Router>
      </ErrorBoundary>
    </GlobalErrorHandler>
  );
};

export default App;
