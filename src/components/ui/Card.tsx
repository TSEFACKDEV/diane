import React from 'react';

// On définit proprement les types pour TypeScript
interface CardProps {
  children: React.ReactNode; // <-- C'est cette ligne qui donne le droit d'avoir du contenu dans la carte
  className?: string;        // <-- Et celle-ci qui accepte les classes de mise en page (flex, etc.)
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
}