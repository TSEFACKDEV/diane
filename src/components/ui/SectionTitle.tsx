import React from 'react';
import { GoldDivider } from './GoldDivider';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionTitle({ title, subtitle, align = 'left' }: SectionTitleProps) {
  return (
    <div className={`flex flex-col gap-3 ${align === 'center' ? 'items-center text-center' : 'items-start'}`}>
      {/* Titre principal en Playfair Display */}
      <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-text-strong leading-tight">
        {title}
      </h2>
      
      {/* Notre petit séparateur doré */}
      <GoldDivider />
      
      {/* Sous-titre optionnel */}
      {subtitle && (
        <p className="font-body text-sm md:text-base text-text-muted max-w-2xl mt-1 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}