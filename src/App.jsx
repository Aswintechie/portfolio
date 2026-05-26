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
import ScrollProgress from './components/ScrollProgress.jsx';
import CursorTrail from './components/CursorTrail.jsx';

// Get the base path for GitHub Pages support
const getBasename = () => {
  // Returns the base URL configured in vite.config.js
  // In production GitHub Pages, this will be the repository path (e.g., /portfolio/)
  // In local dev or other deployments, this will be /
  return import.meta.env.BASE_URL || '/';
};

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
      {/* Cursor Trail Effect */}
      <CursorTrail />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

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
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <GlobalErrorHandler>
      <ErrorBoundary level='app' fallbackComponent='Portfolio Application'>
        <Router
          basename={getBasename()}
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Layout>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route
                path='/privacy'
                element={
                  <ErrorBoundary level='page' fallbackComponent='Privacy Policy'>
                    <PrivacyPolicy />
                  </ErrorBoundary>
                }
              />
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
        </Router>
      </ErrorBoundary>
    </GlobalErrorHandler>
  );
};

export default App;
