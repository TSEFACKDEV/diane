import Link from 'next/link';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FadeInUp } from '@/components/ui/FadeInUp';

export const EXPERTISES = [
  {
    slug: 'structuration',
    badge: 'Structuration',
    title: 'Structuration des Organisations Féminines',
    summary:
      "La structuration est le fondement de toute organisation durable. J'accompagne les organisations féminines dans la définition de leur gouvernance, de leurs statuts, de leurs procédures internes et de leur modèle de fonctionnement.",
  },
  {
    slug: 'projets',
    badge: 'Développement',
    title: 'Développement de Projets Féminins',
    summary:
      "De l'idée à l'institution, j'accompagne les femmes dans le développement complet de leurs projets — depuis la conception jusqu'au déploiement à grande échelle.",
  },
  {
    slug: 'formation',
    badge: 'Formation',
    title: 'Formation & Coaching',
    summary:
      "Je conçois et anime des programmes de formation adaptés aux besoins spécifiques des femmes leaders africaines, combinant rigueur académique et approche pratique.",
  },
  {
    slug: 'conseil',
    badge: 'Conseil',
    title: 'Conseil & Accompagnement Stratégique',
    summary:
      "J'offre un accompagnement stratégique de haut niveau aux organisations féminines qui souhaitent renforcer leur positionnement institutionnel et maximiser leur impact social.",
  },
];

export default function ExpertisesPage() {
  return (
    <section className="section bg-cream">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Nos Expertises"
          subtitle="Quatre domaines d'intervention complémentaires pour accompagner les organisations féminines vers l'autonomie institutionnelle."
          align="center"
        />

        <FadeInUp className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {EXPERTISES.map((expertise, index) => (
            <Link key={expertise.slug} href={`/expertises/${expertise.slug}`} className="block group h-full">
              <Card className="flex flex-col h-full justify-between p-6">
                <div>
                  <div className="mb-4">
                    <Badge variant={index % 2 === 0 ? 'burgundy' : 'gold'}>
                      {expertise.badge}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold font-display text-burgundy-700 mb-2">
                    {expertise.title}
                  </h3>

                  <p className="font-body text-gray-600 text-xs leading-relaxed mb-4">
                    {expertise.summary}
                  </p>
                </div>

                <div className="flex items-center justify-end text-[11px] font-body font-semibold text-burgundy-700 group-hover:text-burgundy-600 transition-colors mt-auto">
                  <span>Voir le détail</span>
                  <svg className="w-3.5 h-3.5 ml-1 transform transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Card>
            </Link>
          ))}
        </FadeInUp>
      </div>
    </section>
  );
}