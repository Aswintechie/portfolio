/**
 * @file LazyImage.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Performance-optimized lazy loading image component with intersection observer
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const LazyImage = React.memo(
  ({
    src,
    alt,
    className = '',
    placeholderSrc = null,
    blurDataURL = null,
    width,
    height,
    quality = 75,
    priority = false,
    onLoad,
    onError,
    threshold = 0.1,
    rootMargin = '50px',
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const imgRef = useRef(null);

    // Intersection Observer for lazy loading
    useEffect(() => {
      if (priority || isInView) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        {
          threshold,
          rootMargin,
        }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }, [priority, isInView, threshold, rootMargin]);

    // Handle image loading
    const handleLoad = () => {
      setIsLoaded(true);
      setIsLoading(false);
      if (onLoad) onLoad();
    };

    // Handle image error
    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
      if (onError) onError();
    };

    // Start loading when in view
    useEffect(() => {
      if (isInView && !isLoading && !isLoaded && !hasError) {
        setIsLoading(true);
      }
    }, [isInView, isLoading, isLoaded, hasError]);

    // Generate optimized image URL (placeholder for CDN integration)
    const getOptimizedImageUrl = (url, w, h, q) => {
      if (!url) return url;

      // This is a placeholder for CDN optimization
      // In a real implementation, you would integrate with your CDN
      // e.g., Cloudinary, Vercel, or custom optimization service
      const params = new URLSearchParams();
      if (w) params.append('w', w);
      if (h) params.append('h', h);
      if (q) params.append('q', q);

      return params.toString() ? `${url}?${params.toString()}` : url;
    };

    const optimizedSrc = getOptimizedImageUrl(src, width, height, quality);

    return (
      <div
        ref={imgRef}
        className={`relative overflow-hidden ${className}`}
        style={{ width, height }}
      >
        {/* Blur placeholder */}
        {blurDataURL && !isLoaded && (
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm scale-110'
            style={{
              backgroundImage: `url(${blurDataURL})`,
            }}
          />
        )}

        {/* Loading placeholder */}
        {!isLoaded && !hasError && (
          <div className='absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center'>
            {isLoading ? (
              <div className='w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin' />
            ) : (
              <div className='w-12 h-12 text-gray-400 dark:text-gray-500'>
                <svg fill='currentColor' viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            )}
          </div>
        )}

        {/* Error placeholder */}
        {hasError && (
          <div className='absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center'>
            <div className='text-center text-gray-500 dark:text-gray-400'>
              <div className='w-12 h-12 mx-auto mb-2'>
                <svg fill='currentColor' viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <p className='text-sm'>Failed to load image</p>
            </div>
          </div>
        )}

        {/* Actual image */}
        {isInView && (
          <motion.img
            src={optimizedSrc}
            alt={alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            decoding='async'
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Placeholder image */}
        {placeholderSrc && !isInView && (
          <img
            src={placeholderSrc}
            alt={alt}
            className='absolute inset-0 w-full h-full object-cover filter blur-sm'
            loading='eager'
          />
        )}
      </div>
    );
  }
);

LazyImage.displayName = 'LazyImage';

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholderSrc: PropTypes.string,
  blurDataURL: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quality: PropTypes.number,
  priority: PropTypes.bool,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
};

export default LazyImage;
