'use client';

import React from 'react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FadeInUp } from '@/components/ui/FadeInUp';

// 4 cartes d'expertises conformes aux specs
const EXPERTISES_DATA = [
  {
    badge: "Conseil",
    title: "Gouvernance",
    description: "Audit et optimisation des structures de conseils d'administration.",
    points: ["Alignement stratégique", "Gestion des risques"]
  },
  {
    badge: "Immersion",
    title: "Formations",
    description: "Parcours immersifs de haute performance pour dirigeants.",
    points: ["Simulations de crise", "Masterclasses"]
  },
  {
    badge: "Stratégie",
    title: "Accompagnement",
    description: "Coaching de posture et développement du leadership exécutif.",
    points: ["Mentoring de leaders", "Prise de décision"]
  },
  {
    badge: "Impact",
    title: "RSE & Éthique",
    description: "Intégration des critères durables dans les décisions stratégiques.",
    points: ["Gouvernance éthique", "Feuille de route RSE"]
  }
];

export function ExpertiseSection() {
  return (
    <section id="expertises" className="section bg-cream py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle 
          title="Nos Domaines d'Expertise"
          subtitle="Des solutions d'excellence adaptées aux exigences des conseils d'administration."
          align="center"
        />

        {/* Grille de 4 cartes sur grand écran */}
        <FadeInUp className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {EXPERTISES_DATA.map((expertise, index) => (
            <Card key={index} className="flex flex-col h-full justify-between group p-6">
              <div>
                <div className="mb-4">
                  <Badge variant={index % 2 === 0 ? "burgundy" : "gold"}>
                    {expertise.badge}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold font-display text-burgundy-700 mb-2">
                  {expertise.title}
                </h3>

                <p className="font-body text-gray-600 text-xs leading-relaxed mb-4">
                  {expertise.description}
                </p>
              </div>

              <ul className="space-y-1 border-y border-rose-100 py-3 my-3 mt-auto">
                {expertise.points.map((point, pIndex) => (
                  <li key={pIndex} className="flex items-center text-[11px] font-body text-gray-500">
                    <span className="w-1 h-1 bg-gold-400 rounded-full mr-1.5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-end text-[11px] font-body font-semibold text-burgundy-700 hover:text-burgundy-600 transition-colors cursor-pointer">
                <span>En savoir plus</span>
                <svg className="w-3.5 h-3.5 ml-1 transform transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Card>
          ))}
        </FadeInUp>
      </div>
    </section>
  );
}