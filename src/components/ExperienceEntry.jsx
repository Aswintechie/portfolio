import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Experience Entry Component
function ExperienceEntryComponent({
  period,
  title,
  company,
  logo,
  description,
  experience,
  inView,
  delay = 0.1,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className='relative mb-12'
    >
      {/* Timeline dot */}
      <div
        aria-hidden='true'
        className='absolute left-6 top-8 w-5 h-5 bg-secondary-600 rounded-full border-4 border-white shadow-lg z-10'
      ></div>

      <div className='ml-20 card p-8'>
        <div className='text-sm text-secondary-600 font-semibold mb-2'>{period}</div>
        <div className='flex items-center gap-4 mb-4'>
          <img
            src={logo}
            alt={`Company logo for ${company}`}
            width={48}
            height={48}
            loading='lazy'
            className='w-12 h-12 object-contain rounded-lg shadow-sm'
          />
          <div>
            <h3 className='text-2xl font-bold text-gray-900 mb-1'>{title}</h3>
            <h4 className='text-lg text-gray-600'>{company}</h4>
          </div>
        </div>
        <p className='text-gray-700 leading-relaxed mb-6'>{description}</p>
        <div className='inline-flex items-center px-4 py-2 bg-gradient-to-r from-secondary-500 to-accent-500 text-white rounded-full text-sm font-medium'>
          {experience}
        </div>
      </div>
    </motion.div>
  );
}

const ExperienceEntry = React.memo(ExperienceEntryComponent);

// PropTypes for type safety
ExperienceEntry.propTypes = {
  period: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  experience: PropTypes.string.isRequired,
  inView: PropTypes.bool,
  delay: PropTypes.number,
};

ExperienceEntry.defaultProps = {
  delay: 0.1,
  inView: false,
};

export default ExperienceEntry;
