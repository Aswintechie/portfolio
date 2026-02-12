/**
 * @file SkillBar.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Animated skill bar component with percentage indicator
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SkillBar = ({ skill, percentage, color, delay = 0 }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className='mb-6'>
      {/* Skill name and percentage */}
      <div className='flex justify-between items-center mb-2'>
        <span className='text-gray-700 font-semibold text-sm'>{skill}</span>
        <motion.span
          className={`text-sm font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
        >
          {inView ? `${percentage}%` : '0%'}
        </motion.span>
      </div>

      {/* Progress bar container */}
      <div className='relative h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner'>
        {/* Animated fill */}
        <motion.div
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{
            duration: 1.5,
            delay: delay,
            ease: 'easeOut',
          }}
        >
          {/* Shine effect */}
          <motion.div
            className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent'
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              delay: delay + 1,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${color} rounded-full blur-sm opacity-50`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{
            duration: 1.5,
            delay: delay,
            ease: 'easeOut',
          }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
