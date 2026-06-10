'use client';

import React, { useState } from 'react';
import { FadeInUp } from '@/components/ui/FadeInUp';

export function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Plus tard, on connectera ça à un service comme Mailchimp ou une API de base de données
    console.log('Email collecté :', email);
    alert('Merci pour votre inscription à notre newsletter !');
    setEmail('');
  };

  return (
    <section id="newsletter" className="py-20 px-6 bg-cream">
      <div className="max-w-4xl mx-auto">
        <FadeInUp>
          {/* Conteneur principal avec une bordure fine et un fond subtil */}
          <div className="bg-surface border border-rose-200/60 rounded-2xl p-8 md:p-12 text-center shadow-sm relative overflow-hidden">
            
            {/* Déco de fond discrète */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gold-200/20 blur-xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-rose-200/20 blur-xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              {/* Petit surtitre */}
              <span className="text-xs font-body font-semibold tracking-widest text-gold-600 uppercase mb-3 inline-block">
                Veille & Perspectives
              </span>

              {/* Titre */}
              <h2 className="font-display text-2xl md:text-3xl font-bold text-burgundy-700 mb-4">
                Rejoignez le cercle des dirigeants avertis
              </h2>

              {/* Description */}
              <p className="font-body text-sm md:text-base text-gray-600 mb-8 leading-relaxed">
                Recevez chaque mois nos analyses exclusives, notes de conjoncture et partages d'expérience directement dans votre boîte mail pour optimiser vos décisions stratégiques.
              </p>

              {/* Formulaire de capture d'email */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Votre adresse email professionnelle"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-rose-200 bg-cream text-sm font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-burgundy-400 focus:ring-1 focus:ring-burgundy-400 transition-all"
                />
                <button
                  type="submit"
                  className="btn-primary py-3 px-6 text-sm font-semibold rounded-lg w-full sm:w-auto transition-all cursor-pointer whitespace-nowrap"
                >
                  S'abonner
                </button>
              </form>

              {/* Note de confidentialité RGPD */}
              <p className="text-[11px] font-body text-gray-400 mt-4">
                Nous respectons votre vie privée. Aucune transmission à des tiers. Désinscription en un clic.
              </p>
            </div>

          </div>
        </FadeInUp>
      </div>
    </section>
  );
}