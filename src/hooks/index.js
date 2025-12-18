/**
 * @file index.js
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Central export file for custom React hooks
 */

export { useExperienceCalculator } from './useExperienceCalculator.js';
export { useThrottledScroll } from './useThrottledScroll.js';
export { use3DTilt, with3DTilt, tiltPresets } from './use3DTilt.jsx';
export {
  default as useErrorReporting,
  ERROR_SEVERITY,
  ERROR_CATEGORIES,
} from './useErrorReporting.js';
export {
  default as usePageTransitions,
  useScrollAnimations,
  useStaggeredAnimations,
  usePageLoading,
} from './usePageTransitions.js';
export { useRipple } from './useRipple.jsx';
