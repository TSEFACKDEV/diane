import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FadeInUp } from '@/components/ui/FadeInUp';
import { Button } from '@/components/ui/Button';

const ECOSYSTEME = [
  {
    badge: 'Entrepreneuriat Féminin',
    title: "ADEF — Agence de Développement de l'Entrepreneuriat Féminin",
    description:
      "Notre agence spécialisée dans l'accompagnement des entrepreneures africaines, de l'idée à la croissance. Elle offre des services d'incubation, d'accélération, de mise en relation avec des investisseurs et d'accès aux marchés. L'agence dispose de programmes sectoriels ciblés et d'événements dédiés aux femmes entrepreneures.",
    pdf: '/documents/ADEF-plaquette.pdf',
  },
  {
    badge: 'Organisation Panafricaine',
    title: "EDEN AFRICA — Entrepreneurship Development Educational Network in Africa",
    description:
      "Organisation panafricaine engagée dans la transformation économique et sociale du continent à travers l'entrepreneuriat, le renforcement des capacités et l'innovation. Présente sur le terrain depuis 14 ans, son influence s'est étendue sur 15 pays africains avec un seul objectif : mettre les jeunes et les femmes au centre du développement durable. Basée au Cameroun, EDEN AFRICA agit comme un catalyseur de développement combinant formation, coaching, incubation et mise en œuvre de programmes de développement local. EDEN AFRICA est une Organisation Internationale Non Gouvernementale accréditée auprès de l'Organisation Internationale de la Francophonie et ayant assuré la Présidence de la Conférence des Organisations Internationales Non Gouvernementales de la Francophonie (2024-2025), un regroupement de 128 organisations présentes sur l'espace francophone. À travers une approche stratégique et opérationnelle, nous concevons, structurons et déployons des projets à fort potentiel, en particulier dans les domaines de : l'entrepreneuriat féminin, l'employabilité des jeunes, le développement économique local, les programmes à impact systémique.",
    tagline: 'EDEN AFRICA — Structurer. Accélérer. Transformer.',
    pdf: '/documents/EDEN-AFRICA-plaquette.pdf',
  },
  {
    badge: 'Recherche & Plaidoyer',
    title: 'Observatoire de la Société Civile Francophone (OSCF)',
    description:
      "L'Observatoire de la Société Civile Francophone est une plateforme internationale dédiée à l'analyse des dynamiques citoyennes, à la production de connaissances comparatives et à la valorisation des contributions des OSC dans l'espace francophone. Son objectif est d'être une référence pour structurer, accompagner et valoriser l'action des organisations de la société civile dans l'espace francophone. L'Observatoire est notre bras recherche et plaidoyer : il produit des études, des données, des rapports et des analyses sur la place des OSC au sein de l'espace francophone, jouant un rôle crucial dans l'influence des politiques publiques et la production de connaissances au service du mouvement féministe africain.",
    tagline: 'L\'analyse des dynamiques citoyennes au service de la Francophonie',
    pdf: '/documents/OSCF-plaquette.pdf',
  },
  {
    badge: 'Intelligence Artificielle Inclusive',
    title: 'MIA AFRICA — MAMIZA Intelligence Artificielle',
    description:
      "MAMIZA Intelligence Artificielle (MIA) est bien plus qu'un programme : c'est un mouvement face à la sous-représentation des femmes dans les métiers de l'intelligence artificielle, où elles ne représentent que 22% des professionnelles à l'échelle mondiale. Des formations dédiées, du mentorat et la création d'espaces de visibilité pour amplifier les voix de la réussite des femmes dans l'IA, à tous les niveaux de carrière.",
    tagline: 'MIA AFRICA — Africaines Augmentées',
    pdf: '/documents/MIA-AFRICA-plaquette.pdf',
  },
];

export default function EcosystemePage() {
  return (
    <section className="section bg-cream">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Notre Écosystème"
          subtitle="Ma force réside dans la richesse de mon écosystème. Quatre entités complémentaires forment ma famille institutionnelle, chacune apportant une expertise unique au service des femmes d'Afrique."
          align="center"
        />

        <FadeInUp className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {ECOSYSTEME.map((entite, index) => (
            <Card key={index} className="flex flex-col h-full">
              <div className="mb-3">
                <Badge variant={index % 2 === 0 ? 'burgundy' : 'gold'}>
                  {entite.badge}
                </Badge>
              </div>

              <h3 className="font-display text-xl md:text-2xl font-bold text-burgundy-700 mb-2 leading-snug">
                {entite.title}
              </h3>

              {entite.tagline && (
                <p className="font-quote italic text-rose-500 text-sm md:text-base mb-3">
                  {entite.tagline}
                </p>
              )}

              <p className="font-body text-sm text-text-muted leading-relaxed mb-6 flex-grow">
                {entite.description}
              </p>

              <a href={entite.pdf} download className="mt-auto">
                <Button variant="secondary" size="sm" className="w-full">
                  Télécharger la plaquette de présentation
                </Button>
              </a>
            </Card>
          ))}
        </FadeInUp>
      </div>
    </section>
  );
}