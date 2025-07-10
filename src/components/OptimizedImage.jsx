/**
 * @file OptimizedImage.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description High-level optimized image component with presets for common use cases
 */

import React from 'react';
import PropTypes from 'prop-types';
import LazyImage from './LazyImage.jsx';

// Predefined image presets
const imagePresets = {
  avatar: {
    width: 80,
    height: 80,
    quality: 90,
    className: 'rounded-full',
    priority: false,
  },
  logo: {
    width: 56,
    height: 56,
    quality: 90,
    className: 'object-contain',
    priority: false,
  },
  project: {
    width: 600,
    height: 400,
    quality: 85,
    className: 'rounded-lg',
    priority: false,
  },
  hero: {
    width: 1200,
    height: 800,
    quality: 90,
    className: 'w-full h-full object-cover',
    priority: true,
  },
  thumbnail: {
    width: 200,
    height: 150,
    quality: 80,
    className: 'rounded-md',
    priority: false,
  },
  banner: {
    width: 1000,
    height: 300,
    quality: 85,
    className: 'w-full h-full object-cover',
    priority: false,
  },
  icon: {
    width: 24,
    height: 24,
    quality: 95,
    className: 'object-contain',
    priority: false,
  },
};

const OptimizedImage = React.memo(
  ({
    preset = 'default',
    src,
    alt,
    className: customClassName,
    priority: customPriority,
    quality: customQuality,
    width: customWidth,
    height: customHeight,
    ...props
  }) => {
    // Get preset configuration
    const presetConfig = imagePresets[preset] || {};

    // Merge preset with custom props (custom props take precedence)
    const finalProps = {
      src,
      alt,
      width: customWidth || presetConfig.width,
      height: customHeight || presetConfig.height,
      quality: customQuality || presetConfig.quality || 85,
      priority: customPriority !== undefined ? customPriority : presetConfig.priority,
      className: customClassName || presetConfig.className || '',
      ...props,
    };

    return <LazyImage {...finalProps} />;
  }
);

OptimizedImage.displayName = 'OptimizedImage';

OptimizedImage.propTypes = {
  preset: PropTypes.oneOf([
    'avatar',
    'logo',
    'project',
    'hero',
    'thumbnail',
    'banner',
    'icon',
    'default',
  ]),
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  priority: PropTypes.bool,
  quality: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

// Export individual preset components for convenience
export const AvatarImage = React.memo(props => <OptimizedImage preset='avatar' {...props} />);

export const LogoImage = React.memo(props => <OptimizedImage preset='logo' {...props} />);

export const ProjectImage = React.memo(props => <OptimizedImage preset='project' {...props} />);

export const HeroImage = React.memo(props => <OptimizedImage preset='hero' {...props} />);

export const ThumbnailImage = React.memo(props => <OptimizedImage preset='thumbnail' {...props} />);

export const BannerImage = React.memo(props => <OptimizedImage preset='banner' {...props} />);

export const IconImage = React.memo(props => <OptimizedImage preset='icon' {...props} />);

// Set display names for debugging
AvatarImage.displayName = 'AvatarImage';
LogoImage.displayName = 'LogoImage';
ProjectImage.displayName = 'ProjectImage';
HeroImage.displayName = 'HeroImage';
ThumbnailImage.displayName = 'ThumbnailImage';
BannerImage.displayName = 'BannerImage';
IconImage.displayName = 'IconImage';

export default OptimizedImage;
