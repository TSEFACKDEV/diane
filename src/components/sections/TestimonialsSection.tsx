'use client';

import React from 'react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { FadeInUp } from '@/components/ui/FadeInUp';

const TESTIMONIALS_DATA = [
  {
    quote: "Diane nous a aidées à structurer notre gouvernance et à passer d'une association informelle à une organisation reconnue par nos bailleurs.",
    author: "Présidente, Réseau des Femmes Entrepreneures",
    location: "Cameroun",
  },
  {
    quote: "Son approche est rigoureuse, exigeante, mais profondément humaine. Elle nous a donné les outils pour tenir sans elle.",
    author: "Directrice Exécutive, ONG partenaire",
    location: "Sénégal",
  },
  {
    quote: "Grâce à l'accompagnement de Diane, nous avons obtenu notre premier financement international.",
    author: "Coordinatrice de projet",
    location: "Côte d'Ivoire",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section bg-cream">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Ce qu'elles en disent"
          subtitle="Témoignages d'organisations et de leaders accompagnées."
          align="center"
        />

        <FadeInUp className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {TESTIMONIALS_DATA.map((t, index) => (
            <Card key={index} className="flex flex-col h-full">
              <p className="font-quote italic text-burgundy-700 text-base leading-relaxed mb-4">
                « {t.quote} »
              </p>
              <div className="mt-auto pt-4 border-t border-rose-100">
                <p className="font-body font-semibold text-sm text-text-strong">{t.author}</p>
                <p className="font-body text-xs text-text-muted">{t.location}</p>
              </div>
            </Card>
          ))}
        </FadeInUp>
      </div>
    </section>
  );
}