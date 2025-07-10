/**
 * @file useTheme.js
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Theme hook for accessing theme context
 */

import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext.jsx';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
