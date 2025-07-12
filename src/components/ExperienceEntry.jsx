/**
 * @file ExperienceEntry.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Individual experience entry component with timeline design and company branding
 */

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Building, Zap, Code, Cpu } from 'lucide-react';
import PropTypes from 'prop-types';
import { use3DTilt, tiltPresets } from '../hooks/use3DTilt.jsx';

// Experience Entry Component
function ExperienceEntryComponent({
  period,
  title,
  company,
  location,
  logo,
  description,
  experience,
  inView = false,
  delay = 0.1,
}) {
  // Define company-specific themes with dark mode colors
  const getCompanyTheme = React.useMemo(
    () => companyName => {
      if (companyName.includes('MulticoreWare')) {
        return {
          gradient: 'from-cyan-500 to-purple-600',
          bgGradient: 'from-cyan-500/10 to-purple-500/10',
          icon: <Cpu size={20} />,
          accentColor: 'text-cyan-400',
          borderColor: 'border-cyan-400/30',
          timelineColor: 'bg-gradient-to-b from-cyan-400 to-purple-400',
          tagBg: 'bg-cyan-500/20',
          tagText: 'text-cyan-300',
          hoverShadow: 'hover:shadow-cyan-500/20',
        };
      } else if (companyName.includes('Lenovo')) {
        return {
          gradient: 'from-purple-500 to-pink-600',
          bgGradient: 'from-purple-500/10 to-pink-500/10',
          icon: <Code size={20} />,
          accentColor: 'text-purple-400',
          borderColor: 'border-purple-400/30',
          timelineColor: 'bg-gradient-to-b from-purple-400 to-pink-400',
          tagBg: 'bg-purple-500/20',
          tagText: 'text-purple-300',
          hoverShadow: 'hover:shadow-purple-500/20',
        };
      }
      // Default theme
      return {
        gradient: 'from-pink-500 to-cyan-600',
        bgGradient: 'from-pink-500/10 to-cyan-500/10',
        icon: <Building size={20} />,
        accentColor: 'text-pink-400',
        borderColor: 'border-pink-400/30',
        timelineColor: 'bg-gradient-to-b from-pink-400 to-cyan-400',
        tagBg: 'bg-pink-500/20',
        tagText: 'text-pink-300',
        hoverShadow: 'hover:shadow-pink-500/20',
      };
    },
    []
  );

  const theme = React.useMemo(() => getCompanyTheme(company), [company, getCompanyTheme]);
  const { elementRef, tiltStyle, glareElementStyle } = use3DTilt(tiltPresets.subtle);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className='relative mb-8 md:mb-12'
    >
      {/* Enhanced Timeline dot with company theme - Hidden on mobile, visible on desktop */}
      <div
        aria-hidden='true'
        className={`hidden md:block absolute top-8 w-5 h-5 ${theme.timelineColor} rounded-full border-4 border-gray-800 shadow-xl z-10`}
        style={{ left: '15px' }}
      ></div>

      {/* Enhanced card with glassmorphism styling - Full width on mobile, left margin on desktop */}
      <motion.div
        ref={elementRef}
        style={tiltStyle}
        className={`md:ml-20 bg-white/15 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl ${theme.hoverShadow} hover:shadow-3xl transition-all duration-300 border ${theme.borderColor} overflow-hidden relative group`}
      >
        {/* 3D Tilt Glare Effect */}
        <div style={glareElementStyle} />
        
        {/* Enhanced background layers */}
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 rounded-2xl'></div>
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGradient} opacity-100 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>

        {/* Enhanced floating orbs */}
        <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${theme.gradient}/20 rounded-full blur-xl group-hover:opacity-100 transition-opacity duration-300`}></div>
        <div className={`absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br ${theme.gradient}/15 rounded-full blur-lg group-hover:opacity-100 transition-opacity duration-300`}></div>

        {/* Content */}
        <div className='relative z-10'>
          {/* Period with enhanced styling */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 ${theme.tagBg} backdrop-blur-sm ${theme.tagText} rounded-full text-sm font-semibold mb-4 border border-white/10`}>
            <Calendar size={16} />
            <span>{period}</span>
          </div>

          {/* Company header with logo and info - Better mobile layout */}
          <div className='flex flex-col sm:flex-row items-start gap-4 mb-6'>
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              className='flex-shrink-0 self-center sm:self-start'
            >
              <img
                src={logo}
                alt={`Company logo for ${company}`}
                width={56}
                height={56}
                loading='lazy'
                className='w-14 h-14 object-contain rounded-xl shadow-xl bg-white/10 backdrop-blur-sm p-2 border border-white/20'
              />
            </motion.div>

            <div className='flex-1 text-center sm:text-left'>
              <h3 className='text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-200 drop-shadow-lg'>
                {title}
              </h3>
              <h4 className={`text-lg font-semibold mb-2 ${theme.accentColor} drop-shadow-sm`}>{company}</h4>
              {location && (
                <div className='flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-300'>
                  <MapPin size={14} />
                  <span>{location}</span>
                </div>
              )}
            </div>

            {/* Company theme icon - Better mobile positioning */}
            <div className={`p-3 rounded-xl bg-gradient-to-br ${theme.gradient} text-white shadow-xl self-center sm:self-start hover:scale-105 transition-transform duration-200`}>
              {theme.icon}
            </div>
          </div>

          {/* Description with better typography */}
          <p className='text-gray-200 leading-relaxed mb-6 text-base sm:text-lg text-center sm:text-left drop-shadow-sm'>
            {description}
          </p>

          {/* Experience badge with theme colors - Centered on mobile */}
          <div className='flex flex-col sm:flex-row items-center sm:justify-between gap-4'>
            <div className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${theme.gradient} text-white rounded-full text-sm font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200`}>
              <Zap size={16} />
              <span>{experience}</span>
            </div>

            {/* Enhanced decorative corner element */}
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${theme.gradient} opacity-30 group-hover:opacity-50 transition-opacity duration-200 shadow-lg`}></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const ExperienceEntry = React.memo(ExperienceEntryComponent);

// PropTypes for type safety
ExperienceEntry.propTypes = {
  period: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  location: PropTypes.string,
  logo: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  experience: PropTypes.string.isRequired,
  inView: PropTypes.bool,
  delay: PropTypes.number,
};

export default ExperienceEntry;
