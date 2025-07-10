/**
 * @file pwa.js
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description PWA utilities for service worker registration and install prompts
 */

// Service Worker registration
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });

      console.log('Service Worker registered successfully:', registration);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, show update notification
              showUpdateNotification(newWorker);
            }
          });
        }
      });

      // Listen for SW messages
      navigator.serviceWorker.addEventListener('message', event => {
        if (event.data && event.data.type === 'SW_UPDATE_AVAILABLE') {
          showUpdateNotification();
        }
      });

      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  } else {
    console.warn('Service Worker not supported');
    return null;
  }
};

// Unregister service worker
export const unregisterServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.unregister();
        console.log('Service Worker unregistered successfully');
        return true;
      }
    } catch (error) {
      console.error('Service Worker unregistration failed:', error);
    }
  }
  return false;
};

// Install prompt handling
let deferredPrompt = null;

export const setupInstallPrompt = () => {
  // Listen for beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', event => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();

    // Save the event for later use
    deferredPrompt = event;

    // Show custom install button
    showInstallButton();
  });

  // Listen for app installation
  window.addEventListener('appinstalled', () => {
    console.log('PWA installed successfully');
    hideInstallButton();

    // Track installation
    if (window.gtag) {
      window.gtag('event', 'pwa_install', {
        event_category: 'engagement',
        event_label: 'PWA Installation',
      });
    }
  });
};

// Show install button
const showInstallButton = () => {
  const installButton = document.getElementById('pwa-install-button');
  if (installButton) {
    installButton.style.display = 'block';
    installButton.classList.add('animate-fadeIn');
  }

  // Create dynamic install button if not exists
  if (!installButton) {
    createInstallButton();
  }
};

// Hide install button
const hideInstallButton = () => {
  const installButton = document.getElementById('pwa-install-button');
  if (installButton) {
    installButton.style.display = 'none';
  }
};

// Create dynamic install button
const createInstallButton = () => {
  const button = document.createElement('button');
  button.id = 'pwa-install-button';
  button.innerHTML = `
    <div class="flex items-center gap-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8l-8-8-8 8" />
      </svg>
      <span>Install App</span>
    </div>
  `;
  button.className = `
    fixed bottom-4 right-4 z-50 
    bg-gradient-to-r from-blue-500 to-purple-600 
    text-white px-6 py-3 rounded-full 
    shadow-lg hover:shadow-xl 
    transform hover:scale-105 
    transition-all duration-200 
    font-medium text-sm
    hidden
  `;

  button.addEventListener('click', promptInstall);
  document.body.appendChild(button);
};

// Prompt for installation
export const promptInstall = async () => {
  if (deferredPrompt) {
    try {
      // Show the install prompt
      deferredPrompt.prompt();

      // Wait for user response
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }

      // Clear the deferred prompt
      deferredPrompt = null;
      hideInstallButton();
    } catch (error) {
      console.error('Install prompt failed:', error);
    }
  }
};

// Check if app is installed
export const isAppInstalled = () => {
  // Check if running in standalone mode
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }

  // Check if running in PWA mode on iOS
  if (window.navigator.standalone === true) {
    return true;
  }

  // Check if running in TWA (Trusted Web Activity)
  if (document.referrer.includes('android-app://')) {
    return true;
  }

  return false;
};

// Show update notification
const showUpdateNotification = (newWorker = null) => {
  // Create update notification
  const notification = document.createElement('div');
  notification.id = 'pwa-update-notification';
  notification.innerHTML = `
    <div class="flex items-center justify-between p-4 bg-blue-500 text-white rounded-lg shadow-lg">
      <div class="flex items-center gap-3">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <div>
          <p class="font-medium">New version available!</p>
          <p class="text-sm opacity-90">Refresh to get the latest features</p>
        </div>
      </div>
      <div class="flex gap-2">
        <button id="pwa-update-dismiss" class="px-3 py-1 text-sm bg-white/20 rounded hover:bg-white/30 transition-colors">
          Later
        </button>
        <button id="pwa-update-refresh" class="px-3 py-1 text-sm bg-white text-blue-500 rounded hover:bg-gray-100 transition-colors">
          Refresh
        </button>
      </div>
    </div>
  `;

  notification.className = `
    fixed top-4 right-4 z-50 
    max-w-md animate-slideIn
  `;

  // Add event listeners
  notification.addEventListener('click', event => {
    if (event.target.id === 'pwa-update-refresh') {
      if (newWorker) {
        newWorker.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      } else {
        window.location.reload();
      }
    } else if (event.target.id === 'pwa-update-dismiss') {
      notification.remove();
    }
  });

  document.body.appendChild(notification);

  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 10000);
};

// Get app info
export const getAppInfo = async () => {
  try {
    const registration = await navigator.serviceWorker.getRegistration();
    return {
      isInstalled: isAppInstalled(),
      hasServiceWorker: !!registration,
      isOnline: navigator.onLine,
      canInstall: !!deferredPrompt,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      language: navigator.language,
      connection: navigator.connection
        ? {
            effectiveType: navigator.connection.effectiveType,
            downlink: navigator.connection.downlink,
            rtt: navigator.connection.rtt,
          }
        : null,
    };
  } catch (error) {
    console.error('Failed to get app info:', error);
    return null;
  }
};

// Handle offline/online status
export const setupNetworkStatus = () => {
  const showNetworkStatus = isOnline => {
    const existingStatus = document.getElementById('network-status');
    if (existingStatus) {
      existingStatus.remove();
    }

    if (!isOnline) {
      const statusDiv = document.createElement('div');
      statusDiv.id = 'network-status';
      statusDiv.innerHTML = `
        <div class="flex items-center justify-center gap-2 p-2 bg-orange-500 text-white text-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2v6m0 8v6m-8-8h6m8 0h6" />
          </svg>
          <span>You're offline. Some features may be limited.</span>
        </div>
      `;
      statusDiv.className = 'fixed top-0 left-0 right-0 z-50 animate-slideDown';
      document.body.appendChild(statusDiv);
    }
  };

  window.addEventListener('online', () => {
    showNetworkStatus(true);
    console.log('Network: Online');
  });

  window.addEventListener('offline', () => {
    showNetworkStatus(false);
    console.log('Network: Offline');
  });

  // Initial check
  showNetworkStatus(navigator.onLine);
};

// Initialize PWA features
export const initializePWA = async () => {
  try {
    // Register service worker
    await registerServiceWorker();

    // Setup install prompt
    setupInstallPrompt();

    // Setup network status monitoring
    setupNetworkStatus();

    // Log app info
    const appInfo = await getAppInfo();
    console.log('PWA initialized:', appInfo);

    return true;
  } catch (error) {
    console.error('PWA initialization failed:', error);
    return false;
  }
};
