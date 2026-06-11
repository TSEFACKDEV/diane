'use client';

import React from 'react';
import { FadeInUp } from '@/components/ui/FadeInUp';

export function NewsletterSection() {
  return (
    <section className="relative bg-burgundy-900 py-12 px-6 overflow-hidden rounded-3xl max-w-6xl mx-auto border border-gold-400/20 shadow-xl">
      
      {/* Motifs décoratifs subtils en arrière-plan */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-cover bg-center" 
           style={{ backgroundImage: `url('/images/hero_bg.png')` }} />
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gold-400/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-rose-500/10 blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
        <FadeInUp>
          <span className="text-xs font-body font-bold tracking-widest text-gold-400 uppercase">
            Veille Stratégique & Insights
          </span>
        </FadeInUp>

        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Rejoignez le cercle des <span className="text-gradient-gold">dirigeants éclairés</span>
          </h2>
        </FadeInUp>

        <FadeInUp>
          <p className="font-body text-rose-100/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Recevez chaque mois les décryptages exclusifs de Diane Ndeuna sur la gouvernance d'excellence, le leadership exécutif et les dynamiques stratégiques en Afrique.
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}