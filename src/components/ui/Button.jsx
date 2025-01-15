import React from 'react';
import { motion } from 'framer-motion';

// yo dis button be bussin frfr
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary',
  icon,
  className = '',
  disabled = false,
  ...props 
}) => {
  // no cap these classez make da button look fire
  const baseClasses = 'flex items-center justify-center space-x-2 rounded-lg font-medium transition-all duration-200';
  
  // lowkey different button stylz n stuff
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    filter: 'filter-button',
  };

  // finna render dis slay button rn
  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;
