
import React from 'react';

// Define the ButtonProps interface to support standard button attributes
interface ButtonProps {
  children: React.ReactNode;
  // Updated onClick to accept MouseEvent and allow Promise return type for async handlers
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  disabled?: boolean;
  // Added type attribute support (button, submit, reset)
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  disabled = false,
  type = 'button'
}) => {
  const baseStyles = "px-4 py-2 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200",
    secondary: "bg-slate-800 text-white hover:bg-slate-900 shadow-lg shadow-slate-200",
    outline: "border-2 border-slate-200 text-slate-700 hover:bg-slate-50",
    danger: "bg-rose-100 text-rose-700 hover:bg-rose-200"
  };

  return (
    <button 
      // Pass the type prop to the native button element
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
