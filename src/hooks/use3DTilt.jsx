/**
 * @file use3DTilt.js
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Custom hook for 3D tilt effects with mouse position tracking
 */

import { useRef, useEffect, useState } from 'react';

/**
 * Custom hook for 3D tilt effects
 * @param {Object} options - Configuration options
 * @param {number} options.maxTilt - Maximum tilt angle in degrees (default: 15)
 * @param {number} options.perspective - Perspective value for 3D effect (default: 1000)
 * @param {number} options.scale - Scale factor on hover (default: 1.02)
 * @param {number} options.speed - Animation speed (default: 300)
 * @param {boolean} options.glare - Enable glare effect (default: true)
 * @param {number} options.glareMaxOpacity - Maximum glare opacity (default: 0.15)
 * @returns {Object} Hook returns
 */
export const use3DTilt = (options = {}) => {
  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.02,
    speed = 300,
    glare = true,
    glareMaxOpacity = 0.15,
  } = options;

  const elementRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });
  const [glareStyle, setGlareStyle] = useState({
    opacity: 0,
    left: '50%',
    top: '50%',
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = e => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation based on mouse position
      const rotateX = ((y - centerY) / centerY) * maxTilt;
      const rotateY = ((centerX - x) / centerX) * maxTilt;

      setTransform({
        rotateX: -rotateX, // Negative for natural tilt direction
        rotateY: rotateY,
        scale: scale,
      });

      // Calculate glare effect
      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        const glareOpacity = Math.min(
          glareMaxOpacity,
          (Math.abs(rotateX) / maxTilt) * glareMaxOpacity +
            (Math.abs(rotateY) / maxTilt) * glareMaxOpacity
        );

        setGlareStyle({
          opacity: glareOpacity,
          left: `${glareX}%`,
          top: `${glareY}%`,
        });
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTransform({
        rotateX: 0,
        rotateY: 0,
        scale: 1,
      });
      setGlareStyle({
        opacity: 0,
        left: '50%',
        top: '50%',
      });
    };

    // Add event listeners
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, scale, glare, glareMaxOpacity]);

  // Generate CSS styles
  const tiltStyle = {
    transform: `perspective(${perspective}px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
    transition: isHovered ? 'none' : `transform ${speed}ms ease-out`,
  };

  const glareElementStyle = {
    position: 'absolute',
    top: glareStyle.top,
    left: glareStyle.left,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
    borderRadius: 'inherit',
    opacity: glareStyle.opacity,
    transform: 'translate(-50%, -50%)',
    transition: isHovered ? 'none' : `opacity ${speed}ms ease-out`,
    pointerEvents: 'none',
    zIndex: 1,
  };

  return {
    elementRef,
    tiltStyle,
    glareElementStyle,
    isHovered,
  };
};

/**
 * Higher-order component for 3D tilt effects
 * @param {React.Component} Component - Component to wrap
 * @param {Object} options - Tilt options
 * @returns {React.Component} Enhanced component with 3D tilt
 */
export const with3DTilt = (Component, options = {}) => {
  return function TiltWrapper(props) {
    const { elementRef, tiltStyle, glareElementStyle, isHovered } = use3DTilt(options);

    return (
      <div ref={elementRef} style={tiltStyle} className='relative'>
        <Component {...props} />
        {options.glare !== false && <div style={glareElementStyle} />}
      </div>
    );
  };
};

/**
 * Utility function to create 3D tilt configuration presets
 */
export const tiltPresets = {
  subtle: {
    maxTilt: 8,
    scale: 1.01,
    speed: 400,
    glare: false,
  },
  moderate: {
    maxTilt: 15,
    scale: 1.02,
    speed: 300,
    glare: true,
    glareMaxOpacity: 0.1,
  },
  dramatic: {
    maxTilt: 25,
    scale: 1.05,
    speed: 200,
    glare: true,
    glareMaxOpacity: 0.2,
  },
  card: {
    maxTilt: 12,
    scale: 1.03,
    speed: 350,
    glare: true,
    glareMaxOpacity: 0.15,
  },
  button: {
    maxTilt: 6,
    scale: 1.01,
    speed: 250,
    glare: false,
  },
};

export default use3DTilt;
