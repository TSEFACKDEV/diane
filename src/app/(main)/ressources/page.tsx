import Link from 'next/link';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FadeInUp } from '@/components/ui/FadeInUp';
import { Button } from '@/components/ui/Button';

const RESSOURCES_INTERNES = [
  {
    badge: 'Publications',
    title: 'Articles & Publications',
    description:
      "Analyses, tribunes et rapports thématiques sur le leadership féminin en Afrique.",
    cta: { label: 'Lire les articles', href: '/blog' },
  },
  {
    badge: 'Guides',
    title: 'Livres & Guides Pratiques',
    description:
      "Guides méthodologiques, manuels de gouvernance et outils de gestion téléchargeables — dont le Guide du Jeune Entrepreneur et le Manuel sur les métiers du développement durable.",
    cta: { label: 'Télécharger nos guides', href: '#guides' },
  },
  {
    badge: 'Audio & Vidéo',
    title: 'Vidéos & Podcasts',
    description:
      "Conférences, témoignages, interviews et contenus audio-visuels inspirants — des conversations avec des femmes leaders.",
    cta: { label: 'Écouter nos podcasts', href: '#podcasts' },
  },
  {
    badge: 'Annuaire',
    title: 'Annuaire des Organisations Féminines',
    description:
      "Répertoire des organisations de femmes en Afrique, classées par pays et secteur d'activité.",
    cta: { label: "Consulter l'annuaire", href: '/annuaire' },
  },
];

export default function RessourcesPage() {
  return (
    <>
      {/* ───────── INTRO ───────── */}
      <section className="section bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle
            title="Ressources & Outils"
            subtitle="Je mets à disposition une bibliothèque de ressources gratuites et premium pour soutenir le développement des organisations et projets féminins. Explorez mes contenus, téléchargez mes guides et connectez-vous avec mon réseau."
            align="center"
          />
        </div>
      </section>

      {/* ───────── RESSOURCES INTERNES ───────── */}
      <section className="section bg-surface border-y border-rose-100">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="Nos Ressources Internes" align="center" />

          <FadeInUp className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {RESSOURCES_INTERNES.map((ressource, index) => (
              <Card key={index} className="flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3">
                    <Badge variant={index % 2 === 0 ? 'burgundy' : 'gold'}>
                      {ressource.badge}
                    </Badge>
                  </div>
                  <h3 className="font-display text-lg font-bold text-burgundy-700 mb-2 leading-snug">
                    {ressource.title}
                  </h3>
                  <p className="font-body text-sm text-text-muted leading-relaxed mb-4">
                    {ressource.description}
                  </p>
                </div>

                <Link href={ressource.cta.href} className="mt-auto">
                  <Button variant="secondary" size="sm" className="w-full">
                    {ressource.cta.label}
                  </Button>
                </Link>
              </Card>
            ))}
          </FadeInUp>
        </div>
      </section>

      {/* ───────── LIENS VERS RESSOURCES EXTERNES ───────── */}
      <section className="section bg-cream">
        <div className="max-w-4xl mx-auto">
          <FadeInUp>
            <Card>
              <h3 className="font-display text-xl md:text-2xl font-bold text-burgundy-700 mb-3">
                Liens vers Ressources Externes
              </h3>
              <p className="font-body text-sm md:text-base text-text-muted leading-relaxed">
                Sélection de plateformes, bases de données et institutions partenaires recommandées pour approfondir vos recherches et accéder à des opportunités complémentaires.
              </p>
            </Card>
          </FadeInUp>
        </div>
      </section>

      {/* ───────── CONTRIBUTION À L'ANNUAIRE ───────── */}
      <section className="section bg-gradient-burgundy">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInUp>
            <h3 className="font-display text-xl md:text-2xl font-bold text-gold-300 mb-3">
              Vous souhaitez enrichir notre annuaire ou proposer une ressource ?
            </h3>
            <p className="font-body text-sm md:text-base text-rose-100 leading-relaxed mb-6">
              Contactez-nous pour soumettre une organisation, un guide, une vidéo ou tout autre contenu pertinent pour notre communauté.
            </p>
            <Link href="/contact" className="btn-gold inline-flex items-center gap-2">
              Nous contacter
            </Link>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}