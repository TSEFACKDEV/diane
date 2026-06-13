import Link from 'next/link';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FadeInUp } from '@/components/ui/FadeInUp';

const MEDIA_SECTIONS = [
  {
    badge: 'Presse',
    title: 'Presse',
    description: "Ce que les médias disent de mes actions.",
  },
  {
    badge: 'Événements',
    title: 'Communiqués & Événements',
    description: "Formation des formatrices les 9 et 10 juin 2026.",
  },
  {
    badge: 'Réseaux Sociaux',
    title: 'Présence Numérique',
    description:
      "Actifs sur les réseaux sociaux et les plateformes numériques, je diffuse des contenus engageants : témoignages, succès stories, analyses et ressources éducatives à destination de ma communauté et des partenaires institutionnels.",
  },
];

const NEWSLETTER_THEMES = [
  "Actualité de l'entrepreneuriat féminin en Afrique",
  "Les conseils de l'Experte (Diane)",
  "Les histoires de femmes leaders qui inspirent",
  "Appels à projets / consultation",
  "Calendrier des événements sur l'entrepreneuriat féminin en Afrique, au sein de l'espace francophone et dans le monde",
];

export default function MediasPage() {
  return (
    <>
      {/* ───────── INTRO ───────── */}
      <section className="section bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle
            title="Médias & Communication"
            subtitle="Je crois que la visibilité est un levier de légitimité institutionnelle. Ma présence médiatique contribue à amplifier la voix des femmes leaders africaines et à valoriser leurs accomplissements sur la scène nationale et internationale."
            align="center"
          />
        </div>
      </section>

      {/* ───────── PRESSE / ÉVÉNEMENTS / PRÉSENCE NUMÉRIQUE ───────── */}
      <section className="section bg-surface border-y border-rose-100">
        <div className="max-w-6xl mx-auto">
          <FadeInUp className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MEDIA_SECTIONS.map((item, index) => (
              <Card key={index} className="flex flex-col h-full">
                <div className="mb-3">
                  <Badge variant={index % 2 === 0 ? 'burgundy' : 'gold'}>
                    {item.badge}
                  </Badge>
                </div>
                <h3 className="font-display text-lg font-bold text-burgundy-700 mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </FadeInUp>
        </div>
      </section>

      {/* ───────── GALERIE PHOTOS (placeholder) ───────── */}
      <section className="section bg-cream">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="Galerie" subtitle="Photos et vidéos des événements." align="center" />

          <FadeInUp className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-surface border border-rose-200 flex items-center justify-center"
              >
                <span className="font-body text-xs text-text-muted">Photo {i}</span>
              </div>
            ))}
          </FadeInUp>
        </div>
      </section>

      {/* ───────── NEWSLETTER ───────── */}
      <section className="section bg-gradient-burgundy">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInUp>
            <span className="text-xs font-body font-bold tracking-widest text-gold-300 uppercase">
              Newsletter
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mt-3 mb-4">
              Ce que vous recevrez
            </h2>
            <ul className="space-y-2 text-left max-w-md mx-auto mb-6">
              {NEWSLETTER_THEMES.map((theme, index) => (
                <li key={index} className="flex items-start gap-3 font-body text-sm text-rose-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 shrink-0" />
                  {theme}
                </li>
              ))}
            </ul>
          </FadeInUp>
        </div>
      </section>

      {/* ───────── CONTACT MÉDIAS ───────── */}
      <section className="section bg-surface">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInUp>
            <p className="font-body text-sm md:text-base text-text-muted leading-relaxed mb-4">
              Pour toute demande d'interview, de partenariat média ou de couverture événementielle, contactez notre équipe communication.
            </p>
            <p className="font-body text-sm font-semibold text-burgundy-700">
              contact@heritage-expertise.com — contact@dianendeuna.com
            </p>
            <div className="mt-6">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Nous contacter
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}