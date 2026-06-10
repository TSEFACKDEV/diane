'use client';

import React from 'react';
import { FadeInUp } from '@/components/ui/FadeInUp';

// Les 4 compteurs animés officiels de tes spécifications
const STATS_DATA = [
  { value: '200+', label: 'Projets Accompagnés', description: 'Entreprises et organisations guidées vers l’excellence.' },
  { value: '85%', label: 'Taux de Croissance', description: 'Constaté chez nos partenaires après immersion.' },
  { value: '2000+', label: 'Cadres & Leaders Formés', description: 'Dirigeants impactés à travers tout le continent.' },
  { value: '50+', label: 'Partenaires Stratégiques', description: 'Institutions et grands groupes nous faisant confiance.' },
];

export function StatsSection() {
  return (
    <section className="bg-surface border-y border-rose-200 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeInUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS_DATA.map((stat, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-4 transition-transform duration-300 hover:scale-105"
              >
                {/* Le grand chiffre officiel en dégradé Or */}
                <span className="font-display text-5xl font-bold text-gradient-gold mb-2 tracking-tight">
                  {stat.value}
                </span>
                
                {/* Le titre de la stat en Bourgogne */}
                <h3 className="font-body text-base font-semibold text-burgundy-700 uppercase tracking-wide mb-1">
                  {stat.label}
                </h3>
                
                {/* Petite description subtile */}
                <p className="font-body text-sm text-gray-500 max-w-[200px]">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}