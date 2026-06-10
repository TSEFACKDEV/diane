'use client';

import React from 'react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';

const TESTIMONIALS_DATA = [
  { id: "slide-1", quote: "L'accompagnement en gouvernance a transformé la dynamique de notre CA. Un professionnalisme rare.", author: "Amadou Diallo", role: "DG, Afrik Eco Fund", initials: "AD" },
  { id: "slide-2", quote: "La simulation de crise était d'un réalisme saisissant. Nos cadres en sont sortis transformés.", author: "Nathalie Mfoumou", role: "Administratrice, Sino-Giga", initials: "NM" },
  { id: "slide-3", quote: "Allier impact durable et excellence décisionnelle : c'est ce que ce programme apporte.", author: "Samuel Kone", role: "Président, Innov'Africa", initials: "SK" }
];

export function TestimonialsSection() {
  return (
    <section id="temoignages" className="py-20 px-6 bg-surface border-t border-rose-100">
      <div className="max-w-4xl mx-auto">
        <SectionTitle 
          title="Ce qu'en disent les Leaders"
          subtitle="La preuve sociale de notre impact à travers le continent."
          align="center"
        />

        {/* Conteneur de Carousel en CSS Pur */}
        <div className="relative mt-12">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8 scroll-smooth">
            {TESTIMONIALS_DATA.map((item) => (
              <div key={item.id} id={item.id} className="w-full shrink-0 snap-center px-2">
                <Card className="flex flex-col justify-between p-8 bg-cream border border-rose-100 relative min-h-[220px]">
                  <span className="absolute top-2 right-6 font-display text-7xl text-gold-200/20 select-none">“</span>
                  <p className="font-body text-gray-600 text-sm italic leading-relaxed mb-6 z-10">"{item.quote}"</p>
                  
                  <div className="flex items-center gap-3 border-t border-rose-100 pt-4 mt-auto">
                    <div className="w-9 h-9 rounded-full bg-burgundy-700 flex items-center justify-center shrink-0">
                      <span className="font-display text-xs font-bold text-gold-400">{item.initials}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-body text-xs font-semibold text-burgundy-700">{item.author}</span>
                      <span className="font-body text-[11px] text-gray-400">{item.role}</span>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation par puces (CSS Pur via ancres) */}
          <div className="flex justify-center gap-2 mt-4">
            {TESTIMONIALS_DATA.map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                className="w-2.5 h-2.5 rounded-full bg-rose-200 hover:bg-burgundy-400 transition-colors"
                aria-label={`Voir le témoignage ${item.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}