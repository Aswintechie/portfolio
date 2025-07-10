/**
 * @file PageTransition.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Page transition system with Framer Motion for smooth animations
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Transition variants
export const pageTransitionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5, ease: 'easeInOut' }
  },
  
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  
  slideDown: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  
  slideLeft: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  
  slideRight: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  
  scaleRotate: {
    initial: { opacity: 0, scale: 0.8, rotate: -10 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.8, rotate: 10 },
    transition: { duration: 0.7, ease: 'easeOut' }
  },
  
  blur: {
    initial: { opacity: 0, filter: 'blur(10px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(10px)' },
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

// Stagger variants for container elements
export const staggerVariants = {
  container: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }
};

// Page transition component
const PageTransition = ({ 
  children, 
  variant = 'fadeIn', 
  className = '', 
  delay = 0,
  ...props 
}) => {
  const transition = pageTransitionVariants[variant] || pageTransitionVariants.fadeIn;
  
  return (
    <motion.div
      initial={transition.initial}
      animate={transition.animate}
      exit={transition.exit}
      transition={{
        ...transition.transition,
        delay: delay
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Section transition component with intersection observer
export const SectionTransition = ({ 
  children, 
  variant = 'slideUp', 
  className = '', 
  threshold = 0.1,
  triggerOnce = true,
  ...props 
}) => {
  const transition = pageTransitionVariants[variant] || pageTransitionVariants.slideUp;
  
  return (
    <motion.div
      initial={transition.initial}
      whileInView={transition.animate}
      exit={transition.exit}
      transition={transition.transition}
      viewport={{ once: triggerOnce, amount: threshold }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Staggered animation component
export const StaggeredTransition = ({ 
  children, 
  className = '', 
  staggerDelay = 0.1,
  delay = 0.2,
  ...props 
}) => {
  return (
    <motion.div
      variants={staggerVariants.container}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        staggerChildren: staggerDelay,
        delayChildren: delay
      }}
      className={className}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={staggerVariants.item}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Route transition wrapper
export const RouteTransition = ({ children, location }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Smooth scroll transition
export const ScrollTransition = ({ 
  children, 
  className = '', 
  offset = 100,
  duration = 0.6,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Advanced transition with custom timing
export const CustomTransition = ({ 
  children, 
  initial = { opacity: 0 }, 
  animate = { opacity: 1 }, 
  exit = { opacity: 0 },
  transition = { duration: 0.5 },
  className = '',
  ...props 
}) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Higher-order component for easy transitions
export const withTransition = (Component, transitionProps = {}) => {
  return React.forwardRef((props, ref) => {
    const {
      variant = 'fadeIn',
      delay = 0,
      className = '',
      ...restTransitionProps
    } = transitionProps;

    return (
      <PageTransition
        variant={variant}
        delay={delay}
        className={className}
        {...restTransitionProps}
      >
        <Component ref={ref} {...props} />
      </PageTransition>
    );
  });
};

export default PageTransition; 