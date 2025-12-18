/**
 * @file RippleButton.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Reusable button component with ripple effect
 */

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useRipple } from '../hooks';

const RippleButton = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  href,
  type = 'button',
  ...props
}) => {
  const buttonRef = useRef(null);
  const { createRipple } = useRipple();

  const handleClick = e => {
    createRipple(e, buttonRef.current);
    if (onClick) {
      onClick(e);
    }
  };

  const baseClasses =
    'relative inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 overflow-hidden';

  const variantClasses = {
    primary:
      'px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105',
    secondary:
      'px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20',
    outline: 'px-6 py-3 bg-transparent border-2 border-current hover:bg-white/5',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        ref={buttonRef}
        href={href}
        onClick={handleClick}
        className={combinedClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      className={combinedClasses}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default RippleButton;
