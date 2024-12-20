"use client";
import React, { useState } from 'react';

const TooltipProvider = ({ children }) => {
  return <>{children}</>;
};

const Tooltip = ({ children }) => {
  return <>{children}</>;
};

const TooltipTrigger = ({ children, asChild = false }) => {
  return <>{children}</>;
};

const TooltipContent = React.forwardRef(({ 
  children,
  className = '',
  sideOffset = 4,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`absolute z-50 rounded-md border bg-white px-3 py-1.5 text-sm text-gray-900 shadow-md ${className}`}
      style={{ 
        top: `calc(100% + ${sideOffset}px)`,
        left: '50%',
        transform: 'translateX(-50%)'
      }}
      {...props}
    >
      {children}
    </div>
  );
});

TooltipContent.displayName = 'TooltipContent';

const CustomTooltip = ({ trigger, content, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {trigger}
      </div>
      {isVisible && (
        <div className={`absolute z-50 rounded-md border bg-white px-3 py-1.5 text-sm text-gray-900 shadow-md ${className}`}>
          {content}
        </div>
      )}
    </div>
  );
};

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  CustomTooltip
};