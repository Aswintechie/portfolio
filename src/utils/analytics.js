/**
 * @file analytics.js
 * @author Aswin
 * @copyright © 2024 Aswin. All rights reserved.
 * @description Analytics utility for tracking user interactions and page views
 */

// Google Analytics configuration
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || 'G-XXXXXXXXXX';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true,
    });
  }
};

// Track page views
export const trackPageView = (page_title, page_location) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title,
      page_location,
      send_page_view: true,
    });
  }
};

// Track custom events
export const trackEvent = (action, category = 'General', label = '', value = 0) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track user interactions
export const trackUserInteraction = (element, section = '') => {
  trackEvent('click', 'User Interaction', `${section ? section + ' - ' : ''}${element}`);
};

// Track form submissions
export const trackFormSubmission = (form_name, success = true) => {
  trackEvent('form_submit', 'Forms', form_name, success ? 1 : 0);
};

// Track social media clicks
export const trackSocialClick = (platform, location = '') => {
  trackEvent('social_click', 'Social Media', `${platform}${location ? ' - ' + location : ''}`);
};

// Track project views
export const trackProjectView = project_name => {
  trackEvent('project_view', 'Projects', project_name);
};

// Track scroll depth (useful for engagement metrics)
export const trackScrollDepth = depth_percentage => {
  trackEvent('scroll_depth', 'Engagement', `${depth_percentage}%`, depth_percentage);
};

// Track download events
export const trackDownload = (file_name, file_type = '') => {
  trackEvent('download', 'Downloads', `${file_name}${file_type ? ' - ' + file_type : ''}`);
};

// Privacy-friendly analytics alternative (simple event tracking without GA)
export const trackSimpleEvent = (event_name, details = {}) => {
  if (typeof window !== 'undefined') {
    // Simple console logging for development
    if (import.meta.env.DEV) {
      console.log(`Analytics Event: ${event_name}`, details);
    }

    // You can extend this to send to your own analytics endpoint
    // or use privacy-friendly alternatives like Plausible, Fathom, etc.
  }
};

// Initialize analytics based on user consent
export const initAnalytics = (hasUserConsent = true) => {
  if (hasUserConsent) {
    initGA();
  } else {
    // Use privacy-friendly alternative
    console.log('Analytics initialized in privacy mode');
  }
};

export default {
  initGA,
  initAnalytics,
  trackPageView,
  trackEvent,
  trackUserInteraction,
  trackFormSubmission,
  trackSocialClick,
  trackProjectView,
  trackScrollDepth,
  trackDownload,
  trackSimpleEvent,
};
