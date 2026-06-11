'use client';

import React from 'react';
import { FadeInUp } from '@/components/ui/FadeInUp';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-cream px-6 py-20 overflow-hidden">
      
      {/* 1. L'IMAGE DE FOND (Grand angle africain moderne) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat  mixed-blend-multiply"
        style={{ 
          backgroundImage: `url('/images/hero_bg.png')` 
        }} 
      />

      {/* 2. OVERLAY DÉGRADÉ : Assure la lisibilité parfaite du texte à gauche (60%) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-cream via-cream/90 to-transparent lg:from-cream lg:via-cream/70 lg:to-transparent" />

      {/* 3. CONTENU PRINCIPAL (Superposé grâce au z-10) */}
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Grille Asymétrique : 60% à gauche, 40% à droite sur grands écrans */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-center">
          
          {/* ZONE 60% : Textes et Boutons d'action */}
          <FadeInUp>
            <div className="flex flex-col space-y-6 text-left">
              <span className="text-xs font-body font-bold tracking-widest text-gold-600 uppercase">
                Gouvernance & Leadership Exécutif
              </span>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-burgundy-700 leading-tight tracking-tight">
                Bâtir une gouvernance <br />
                <span className="text-gradient-gold">d'excellence</span> pour l'Afrique.
              </h1>

              <p className="font-body text-gray-700 text-base md:text-lg max-w-xl leading-relaxed font-medium">
                Accompagnement stratégique sur mesure et parcours immersifs de haute performance pour transformer la posture des dirigeants et sécuriser l'impact de vos décisions.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <a 
                  href="#expertises" 
                  className="btn-primary py-4 px-8 text-sm font-semibold rounded-lg shadow-sm hover:shadow-md text-center transition-all cursor-pointer"
                >
                  Découvrir nos expertises
                </a>
                <a 
                  href="#contact" 
                  className="py-4 px-8 text-sm font-semibold font-body text-burgundy-700 hover:text-burgundy-600 border border-rose-300 hover:border-burgundy-400 bg-surface/80 backdrop-blur-sm rounded-lg text-center transition-all cursor-pointer"
                >
                  Prendre contact
                </a>
              </div>
            </div>
          </FadeInUp>

          {/* ZONE 40% : Portrait de Diane avec bordure en dégradé doré */}
          <FadeInUp>
            {/* Conteneur externe : Le p-[2px] combiné avec le bg-gradient crée la bordure dorée épaisse et lumineuse */}
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:max-w-none rounded-2xl bg-gradient-to-tr from-gold-600 via-gold-200 to-gold-400 p-[2.5px] shadow-2xl group overflow-hidden">
              
              {/* Conteneur interne qui encapsule l'image et la signature */}
              <div className="relative w-full h-full rounded-[14px] bg-burgundy-950 overflow-hidden">
                <img 
                  src="/images/Diane1.jpg" 
                  alt="Diane Ndeuna" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
                
                {/* Bandeau de signature : Opacité et contrastes renforcés pour une lisibilité maximale */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-burgundy-950 via-burgundy-950/80 via-burgundy-900/50 to-transparent p-6 pt-16 text-center z-10">
                  <p className="font-display font-black text-gold-300 text-xl tracking-wide uppercase drop-shadow-sm">
                    Diane Ndeuna
                  </p>
                  <p className="font-body text-xs font-bold text-white tracking-widest uppercase mt-1 drop-shadow-sm">
                    Architecte de Systèmes Organisationnels
                  </p>
                </div>
              </div>

              {/* Effet lumineux subtil au survol en CSS Pur */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </FadeInUp>

        </div>
      </div>
    </section>
  );
}