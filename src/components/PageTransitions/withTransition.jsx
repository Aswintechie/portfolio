/**
 * @file withTransition.js
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Higher-order component for adding transitions to components
 */

import React from 'react';
import PageTransition from './PageTransition';

// Higher-order component for adding transitions
export const withTransition = (Component, transitionProps = {}) => {
  const TransitionWrapper = props => {
    return (
      <PageTransition {...transitionProps}>
        <Component {...props} />
      </PageTransition>
    );
  };

  TransitionWrapper.displayName = `withTransition(${Component.displayName || Component.name})`;
  return TransitionWrapper;
};

export default withTransition;
