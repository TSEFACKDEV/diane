import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'burgundy' | 'rose' | 'gold' | 'lavender' | 'sage';
  className?: string;
}

export function Badge({ children, variant = 'burgundy', className = '' }: BadgeProps) {
  
  const variants = {
    burgundy: 'bg-burgundy-50 text-burgundy-700',
    rose: 'bg-rose-100 text-rose-500',
    gold: 'bg-gold-100 text-gold-500',
    lavender: 'bg-purple-100 text-purple-700', // Couleurs de secours classiques pour le test
    sage: 'bg-green-100 text-green-700',
  };

  return (
    <span className={`font-body text-xs font-medium px-3 py-1 rounded-full tracking-wide transition-all ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}