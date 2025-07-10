/**
 * Service Worker for Aswin Portfolio PWA
 * Implements advanced caching strategies and offline functionality
 */

/* eslint-env serviceworker */

const CACHE_NAME = 'aswin-portfolio-v1.0.0';
const STATIC_CACHE_NAME = `${CACHE_NAME}-static`;
const DYNAMIC_CACHE_NAME = `${CACHE_NAME}-dynamic`;
const IMAGE_CACHE_NAME = `${CACHE_NAME}-images`;

// Resources to cache immediately
const STATIC_RESOURCES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/og-image.svg',
  '/robots.txt',
  '/sitemap.xml',
  // Add other static assets as needed
];

// Image resources for special caching
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico'];

// Cache size limits
const CACHE_LIMITS = {
  static: 50,
  dynamic: 100,
  images: 60,
};

// Install event - cache static resources
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');

  event.waitUntil(
    Promise.all([
      // Cache static resources
      caches.open(STATIC_CACHE_NAME).then(cache => {
        console.log('Service Worker: Caching static resources');
        return cache.addAll(STATIC_RESOURCES);
      }),

      // Skip waiting to activate immediately
      self.skipWaiting(),
    ])
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (
              cacheName !== STATIC_CACHE_NAME &&
              cacheName !== DYNAMIC_CACHE_NAME &&
              cacheName !== IMAGE_CACHE_NAME
            ) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),

      // Take control of all pages
      self.clients.claim(),
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip Chrome extensions and other non-HTTP requests
  if (!request.url.startsWith('http')) {
    return;
  }

  // Skip API calls to external services
  if (
    url.hostname !== location.hostname &&
    !url.hostname.includes('fonts.googleapis.com') &&
    !url.hostname.includes('fonts.gstatic.com')
  ) {
    return;
  }

  event.respondWith(handleRequest(request));
});

// Main request handler with different strategies
async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    // Strategy 1: Cache First for static resources
    if (
      STATIC_RESOURCES.includes(pathname) ||
      pathname.endsWith('.css') ||
      pathname.endsWith('.js')
    ) {
      return await cacheFirst(request, STATIC_CACHE_NAME);
    }

    // Strategy 2: Cache First for images
    if (isImage(pathname)) {
      return await cacheFirst(request, IMAGE_CACHE_NAME);
    }

    // Strategy 3: Network First for Google Fonts
    if (
      url.hostname.includes('fonts.googleapis.com') ||
      url.hostname.includes('fonts.gstatic.com')
    ) {
      return await networkFirst(request, STATIC_CACHE_NAME);
    }

    // Strategy 4: Network First for HTML pages
    if (pathname === '/' || pathname.endsWith('.html') || !pathname.includes('.')) {
      return await networkFirst(request, DYNAMIC_CACHE_NAME);
    }

    // Strategy 5: Network First for other resources
    return await networkFirst(request, DYNAMIC_CACHE_NAME);
  } catch (error) {
    console.error('Service Worker: Request failed:', error);

    // Return offline fallback
    return await getOfflineFallback(request);
  }
}

// Cache First strategy
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);

    if (cached) {
      // Return cached version
      return cached;
    }

    // Fetch from network and cache
    const response = await fetch(request);

    if (response.ok) {
      const responseClone = response.clone();
      await cache.put(request, responseClone);
      await limitCacheSize(cacheName);
    }

    return response;
  } catch (error) {
    console.error('Service Worker: Cache First failed:', error);
    throw error;
  }
}

// Network First strategy
async function networkFirst(request, cacheName) {
  try {
    // Try network first
    const response = await fetch(request);

    if (response.ok) {
      // Cache the response
      const cache = await caches.open(cacheName);
      const responseClone = response.clone();
      await cache.put(request, responseClone);
      await limitCacheSize(cacheName);
    }

    return response;
  } catch (error) {
    // Network failed, try cache
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    throw error;
  }
}

// Check if request is for an image
function isImage(pathname) {
  return IMAGE_EXTENSIONS.some(ext => pathname.toLowerCase().endsWith(ext));
}

// Limit cache size
async function limitCacheSize(cacheName) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  let limit = CACHE_LIMITS.dynamic;
  if (cacheName.includes('static')) limit = CACHE_LIMITS.static;
  if (cacheName.includes('images')) limit = CACHE_LIMITS.images;

  if (keys.length > limit) {
    // Remove oldest entries
    const keysToDelete = keys.slice(0, keys.length - limit);
    await Promise.all(keysToDelete.map(key => cache.delete(key)));
  }
}

// Offline fallback
async function getOfflineFallback(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Try to get from any cache
  const cacheNames = await caches.keys();
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
  }

  // Return offline page for HTML requests
  if (pathname === '/' || pathname.endsWith('.html') || !pathname.includes('.')) {
    const cache = await caches.open(STATIC_CACHE_NAME);
    return cache.match('/') || cache.match('/index.html');
  }

  // Return a basic offline response for other requests
  return new Response('Offline', {
    status: 503,
    statusText: 'Service Unavailable',
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

// Handle background sync
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync triggered');

  if (event.tag === 'portfolio-sync') {
    event.waitUntil(
      // Implement background sync logic here
      Promise.resolve()
    );
  }
});

// Handle push notifications (optional)
self.addEventListener('push', event => {
  console.log('Service Worker: Push notification received');

  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/favicon.svg',
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/favicon.svg',
      },
    ],
  };

  event.waitUntil(self.registration.showNotification('Portfolio Update', options));
});

// Handle notification click
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification clicked');

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(self.clients.openWindow('/'));
  }
});

// Handle message events
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      type: 'VERSION',
      version: CACHE_NAME,
    });
  }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'portfolio-update') {
    event.waitUntil(
      // Check for updates
      Promise.resolve()
    );
  }
});

console.log('Service Worker: Loaded successfully');
