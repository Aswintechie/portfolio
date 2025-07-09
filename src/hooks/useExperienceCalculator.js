import { useState, useEffect } from 'react';

export const useExperienceCalculator = () => {
  const [experience, setExperience] = useState('');

  useEffect(() => {
    const calculateExperience = () => {
      const startDate = new Date('2023-06-01');
      const currentDate = new Date();

      const diffInMonths =
        (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
        (currentDate.getMonth() - startDate.getMonth());

      const years = Math.floor(diffInMonths / 12);
      const months = diffInMonths % 12;

      if (years > 0) {
        setExperience(`${years}+ year${years > 1 ? 's' : ''}`);
      } else if (months > 0) {
        setExperience(`${months} month${months > 1 ? 's' : ''}`);
      } else {
        setExperience('Less than a month');
      }
    };

    calculateExperience();
    const interval = setInterval(calculateExperience, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return experience;
};
