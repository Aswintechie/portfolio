/**
 * @file App.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Main application component with routing and modular architecture
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
  );
};

// Layout Component (Wraps all pages with navigation)
const Layout = ({ children }) => {
  return (
    <div className='min-h-screen bg-white'>
      {/* Navigation */}
      <ErrorBoundary level='component' fallbackComponent='Navigation'>
        <Navigation />
      </ErrorBoundary>

      {/* Page Content */}
      {children}

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
      // Auto-complete loading to show beautiful screen
      const autoComplete = setTimeout(() => {
        completeLoading();
        // Mark that we've loaded before
        sessionStorage.setItem('hasLoadedBefore', 'true');
        setIsInitialLoad(false);
      }, 2000); // Show beautiful loading for 2 seconds

      return () => {
        clearTimeout(autoComplete);
      };
    }
  }, [completeLoading, isInitialLoad]);

  return (
    <GlobalErrorHandler>
      <ErrorBoundary level='app' fallbackComponent='Portfolio Application'>
        <Router>
          {/* Beautiful Page Loader - Only on initial load */}
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
