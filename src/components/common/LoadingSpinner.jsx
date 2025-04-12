import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'orange', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    orange: 'text-orange-600',
    white: 'text-white',
    gray: 'text-gray-600'
  };

  const spinnerClasses = `
    animate-spin rounded-full 
    border-2 border-current border-t-transparent
    ${sizeClasses[size]} 
    ${colorClasses[color]}
  `;

  const spinner = (
    <div 
      role="status"
      className="inline-flex items-center justify-center"
    >
      <div className={spinnerClasses}>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner; 