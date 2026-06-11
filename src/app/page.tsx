'use client';

import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { ContactForm } from '@/components/forms/ContactForm';
import { OrganizationForm } from '@/components/forms/OrganizationForm';
import { DiagnosticForm } from '@/components/forms/DiagnosticForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-cream space-y-20 pb-20">
      
      {/* 1. La Hero Section premium */}
      <HeroSection />

      {/* 2. L'écrin textuel de la Newsletter (Sans le champ à l'intérieur) */}
      <NewsletterSection />

      {/* Zone de test : Tous tes composants s'alignent de manière individuelle */}
      <div className="max-w-4xl mx-auto px-6 space-y-20">
        
        <section className="space-y-4 bg-burgundy-900 p-8 rounded-2xl">
          <h2 className="text-center font-display font-bold text-xs text-gold-400 tracking-widest uppercase mb-4">
            [ Formulaire de Newsletter ]
          </h2>
          <div className="flex justify-center">
            <NewsletterForm />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-center font-display font-bold text-xs text-burgundy-400 tracking-widest uppercase">
            [ Formulaire de Contact ]
          </h2>
          <ContactForm />
        </section>

        <section className="space-y-4">
          <h2 className="text-center font-display font-bold text-xs text-burgundy-400 tracking-widest uppercase">
            [ Formulaire de Diagnostic ]
          </h2>
          <DiagnosticForm />
        </section>

        <section className="space-y-4">
          <h2 className="text-center font-display font-bold text-xs text-burgundy-400 tracking-widest uppercase">
            [ Formulaire d'Inscription Organisation ]
          </h2>
          <OrganizationForm />
        </section>

      </div>
    </main>
  );
}