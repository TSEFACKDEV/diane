'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  number?: string | number;
  title: string;
  description: string;
  className?: string;
}

export function Card({ number, title, description, className = '' }: CardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`bg-surface border border-border p-6 rounded-lg shadow-card-sm hover:shadow-card-lg cursor-pointer flex flex-col justify-between h-full ${className}`}
    >
      <div>
        {/* Bulle avec le numéro de l'étape si fourni */}
        {number && (
          <div className="w-8 h-8 rounded-full bg-burgundy-700 text-white font-display font-bold flex items-center justify-center text-sm mb-4">
            {number}
          </div>
        )}
        
        {/* Titre en Playfair Display */}
        <h3 className="font-display font-semibold text-text-strong text-xl mb-3">
          {title}
        </h3>
        
        {/* Corps du texte en DM Sans */}
        <p className="font-body text-text text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Lien "En savoir plus" discret de la charte */}
      <div className="mt-6 font-body text-xs font-semibold text-burgundy-700 flex items-center gap-1 hover:underline">
        En savoir plus <span className="text-gold-400">→</span>
      </div>
    </motion.div>
  );
}