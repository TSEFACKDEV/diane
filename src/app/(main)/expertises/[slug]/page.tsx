import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FadeInUp } from '@/components/ui/FadeInUp';
import { EXPERTISES } from '../page';

// Contenu détaillé par expertise (slides 10-13)
const EXPERTISE_DETAILS: Record<string, {
  intro: string;
  sections: { title: string; description?: string; items?: string[] }[];
  cta?: { label: string; href: string };
}> = {
  'structuration': {
    intro:
      "La structuration est le fondement de toute organisation durable. J'accompagne les organisations féminines dans la définition de leur gouvernance, de leurs statuts, de leurs procédures internes et de leur modèle de fonctionnement. Mon approche est adaptée aux réalités du contexte africain et aux exigences des bailleurs de fonds internationaux.",
    sections: [
      {
        title: 'Ce que nous faisons',
        items: [
          'Diagnostic organisationnel et analyses',
          'Planification stratégique',
          'Mise en place de mécanismes de suivi-évaluation',
          'Élaboration de statuts et règlements intérieurs',
          "Mise en place de Conseils d'administration et comités",
          'Structuration financière et comptable',
          'Certification et conformité légale',
          "Accompagnement au processus d'accréditation auprès des instances internationales",
        ],
      },
    ],
  },
  'projets': {
    intro:
      "De l'idée à l'institution, j'accompagne les femmes dans le développement complet de leurs projets — depuis la conception jusqu'au déploiement à grande échelle. Ma méthodologie intègre les dimensions stratégiques, opérationnelles et financières pour garantir la viabilité et l'impact de chaque projet.",
    sections: [
      {
        title: 'Conception',
        description: "Identification du besoin et des opportunités, cadrage stratégique et élaboration de la note conceptuelle.",
      },
      {
        title: 'Montage',
        description: "Élaboration du projet, business plan, modèle économique, plan d'action, budget prévisionnel et cadre logique.",
      },
      {
        title: 'Financement',
        description: "Recherche de financements, rédaction de dossiers de subvention et pitch investisseurs.",
      },
      {
        title: 'Déploiement',
        description: "Mise en œuvre opérationnelle, suivi-évaluation et mise à l'échelle.",
      },
      {
        title: 'Secteurs accompagnés',
        description: "J'ai accompagné le développement de projets dans des secteurs variés : agriculture, éducation, technologie, artisanat, environnement et gouvernance locale. Chaque projet bénéficie d'un suivi personnalisé tout au long de son cycle de vie.",
      },
      {
        title: 'Réseautage et mobilisation de partenariats',
      },
    ],
  },
  'formation': {
    intro:
      "Je conçois et anime des programmes de formation adaptés aux besoins spécifiques des femmes leaders africaines. Mes formations combinent rigueur académique et approche pratique, avec un fort accent sur l'applicabilité immédiate dans le contexte professionnel des participantes.",
    sections: [
      {
        title: 'Nos Programmes de Formation',
        items: [
          'Leadership institutionnel — Gouvernance, prise de décision et représentation',
          'Gestion de projet — Méthodologies, outils et suivi-évaluation',
          'Mobilisation de ressources — Fundraising, subventions et partenariats',
        ],
      },
      {
        title: 'Notre Approche Coaching',
        description:
          "Le coaching individuel et collectif est au cœur de mon accompagnement. Je crois que chaque femme leader possède un potentiel unique qui mérite d'être révélé, renforcé et déployé avec confiance. Ma méthode de coaching est spécialisée dans l'accompagnement des femmes en contexte africain.",
        items: [
          'Coaching individuel sur mesure',
          "Coaching d'équipe et des équipes de direction",
          'Mentorat par des expertes seniors',
          'Groupes de pairs et cercles de leadership',
          'Coaching en prise de parole publique',
          'Accompagnement à la transition de rôle',
        ],
      },
    ],
  },
  'conseil': {
    intro:
      "J'offre un accompagnement stratégique de haut niveau aux organisations féminines qui souhaitent renforcer leur positionnement institutionnel, optimiser leur performance et maximiser leur impact social. J'interviens comme partenaire de confiance, aux côtés des dirigeantes, pour les aider à naviguer dans des environnements complexes.",
    sections: [
      {
        title: 'Conseil Stratégique',
        description: "Élaboration de plans stratégiques, analyses SWOT, positionnement institutionnel et feuilles de route pour la croissance organisationnelle.",
      },
      {
        title: 'Accompagnement Institutionnel',
        description: "Relations avec les bailleurs, partenaires institutionnels et autorités publiques. Préparation aux évaluations et audits externes.",
      },
      {
        title: 'Mise en Réseau',
        description: "Accès à mon réseau continental de partenaires, d'investisseurs et d'institutions. Mise en relation stratégique et opportunités de collaboration.",
      },
      {
        title: 'Conformité & Certification',
        description: "Accompagnement dans les démarches de conformité légale, d'accréditation et de certification auprès des instances nationales et internationales.",
      },
    ],
    cta: {
      label: 'Faire mon auto-diagnostic : mon organisation est-elle prête pour un financement international ?',
      href: '/diagnostic',
    },
  },
};

export function generateStaticParams() {
  return EXPERTISES.map((e) => ({ slug: e.slug }));
}

export default async function ExpertiseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const expertise = EXPERTISES.find((e) => e.slug === slug);
  const details = EXPERTISE_DETAILS[slug];

  if (!expertise || !details) {
    notFound();
  }

  return (
    <>
      {/* ───────── HEADER EXPERTISE ───────── */}
      <section className="section bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInUp>
            <div className="mb-4 flex justify-center">
              <Badge variant="gold">{expertise.badge}</Badge>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-burgundy-700 leading-tight mb-6">
              {expertise.title}
            </h1>
            <p className="font-body text-text text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              {details.intro}
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* ───────── SECTIONS DÉTAILLÉES ───────── */}
      <section className="section bg-surface border-t border-rose-100">
        <div className="max-w-4xl mx-auto space-y-8">
          {details.sections.map((sec, index) => (
            <FadeInUp key={index}>
              <Card>
                <h2 className="font-display text-xl md:text-2xl font-bold text-burgundy-700 mb-3">
                  {sec.title}
                </h2>

                {sec.description && (
                  <p className="font-body text-sm md:text-base text-text-muted leading-relaxed mb-4">
                    {sec.description}
                  </p>
                )}

                {sec.items && (
                  <ul className="space-y-2">
                    {sec.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 font-body text-sm md:text-base text-text">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </FadeInUp>
          ))}

          {/* CTA Diagnostic (uniquement sur Conseil & Accompagnement) */}
          {details.cta && (
            <FadeInUp>
              <Card className="bg-gradient-burgundy text-white text-center">
                <p className="font-display text-lg md:text-xl font-bold text-gold-300 mb-4 leading-relaxed">
                  {details.cta.label}
                </p>
                <Link href={details.cta.href} className="btn-gold inline-flex items-center gap-2">
                  Commencer mon diagnostic
                </Link>
              </Card>
            </FadeInUp>
          )}
        </div>
      </section>

      {/* ───────── NAVIGATION RETOUR ───────── */}
      <section className="section bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/expertises" className="btn-secondary inline-flex items-center gap-2">
            ← Retour à toutes les expertises
          </Link>
        </div>
      </section>
    </>
  );
}