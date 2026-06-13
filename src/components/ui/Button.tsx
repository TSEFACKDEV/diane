import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  
  // Styles de base (Police DM Sans, transition douce, focus élégant)
  const baseStyles = 'font-body inline-flex items-center justify-center font-semibold rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  // Alignement exact sur la charte et les tokens Tailwind
  const variants = {
    primary: 'bg-burgundy-700 text-white hover:bg-burgundy-600 focus:ring-rose-200',
    secondary: 'border-2 border-burgundy-700 text-burgundy-700 bg-transparent hover:bg-rose-100 focus:ring-burgundy-700',
    gold: 'bg-gold-400 text-text-strong hover:bg-gold-300 hover:shadow-gold focus:ring-gold-200',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-6 py-3',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <span className="animate-spin">⏳</span> : children}
    </button>
  );
}