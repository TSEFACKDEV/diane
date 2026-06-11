import React from 'react';

interface FadeInUpProps {
  children: React.ReactNode;
  className?: string;
}

export function FadeInUp({ children, className = '' }: FadeInUpProps) {
  return (

    <div className={`animate-fade-up ${className}`}>
      {children}
    </div>
  );
}