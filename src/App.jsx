/**
 * @file App.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Main application component with routing and modular architecture
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import SearchModal from './components/SearchModal.jsx';
import NotFound from './components/NotFound.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
import TermsConditions from './components/TermsConditions.jsx';
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

const getBasename = () => import.meta.env.BASE_URL || '/';

const HomePage = () => {
  return (
    <div className='relative'>
      <SectionErrorBoundary sectionName='Hero'>
        <HeroSection />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName='About'>
        <AboutSection />
      </SectionErrorBoundary>

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

const LEGAL_ROUTES = ['/privacy', '/terms'];

// Chatwoot SDK is loaded async from index.html; if the user lands on /privacy
// before $chatwoot is ready, listen for chatwoot:ready and apply once.
const useChatVisibility = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const apply = () => {
      if (!window.$chatwoot) return false;
      window.$chatwoot.toggleBubbleVisibility(LEGAL_ROUTES.includes(pathname) ? 'hide' : 'show');
      return true;
    };

    if (apply()) return undefined;

    const onReady = () => apply();
    window.addEventListener('chatwoot:ready', onReady);
    return () => window.removeEventListener('chatwoot:ready', onReady);
  }, [pathname]);
};

const Layout = ({ children }) => {
  useChatVisibility();

  return (
    <div className='min-h-screen bg-white text-gray-900'>
      <ScrollProgress />

      <ErrorBoundary level='component' fallbackComponent='Navigation'>
        <Navigation />
      </ErrorBoundary>

      {children}

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
                path='/terms'
                element={
                  <ErrorBoundary level='page' fallbackComponent='Terms & Conditions'>
                    <TermsConditions />
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
