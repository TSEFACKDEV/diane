import React from 'react';

interface GoldDividerProps {
  className?: string;
}

export function GoldDivider({ className = '' }: GoldDividerProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Ligne principale Or Champagne (#C9A84C) */}
      <div className="h-[2px] w-12 bg-gold-400 rounded-full" />
      {/* Un petit point central pour la touche élégante et raffinée */}
      <div className="h-1.5 w-1.5 rounded-full bg-gold-400" />
    </div>
  );
}