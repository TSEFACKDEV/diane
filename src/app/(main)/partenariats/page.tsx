import Link from 'next/link';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { FadeInUp } from '@/components/ui/FadeInUp';

const TEMOIGNAGES_COLLABORATION = [
  {
    quote:
      "Une collaboration exemplaire qui a permis de structurer durablement nos actions auprès des femmes entrepreneures de la région.",
    author: "Partenaire institutionnel",
    organisation: "Collectivité territoriale francophone",
  },
  {
    quote:
      "Le sérieux et la rigueur de l'équipe ont fait toute la différence dans la réussite de notre programme conjoint.",
    author: "Responsable de programme",
    organisation: "Organisation internationale",
  },
  {
    quote:
      "Grâce à cette collaboration, nous avons pu toucher des milliers de femmes à travers plusieurs pays africains.",
    author: "Directrice exécutive",
    organisation: "Réseau d'OSC francophones",
  },
  {
    quote:
      "Un partenariat fondé sur la confiance et des résultats concrets, mesurables, et durables.",
    author: "Coordinateur de projet",
    organisation: "Bailleur de fonds international",
  },
];

const PARTENAIRES = [
  "EDEN AFRICA",
  "ADEF",
  "OSCF",
  "MIA AFRICA",
  "OIF",
  "AUF",
  "Mouvement des Entrepreneurs du Cameroun",
  "UNCDF",
];

export default function PartenariatsPage() {
  return (
    <>
      {/* ───────── INTRO ───────── */}
      <section className="section bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle
            title="Partenariats et Collaboration"
            subtitle="Discutons pour évaluer nos pistes de collaboration possible."
            align="center"
          />

          <FadeInUp>
            <p className="font-body text-text text-sm md:text-base leading-relaxed max-w-2xl mx-auto mt-6">
              Je suis fière de collaborer avec des organisations et institutions avec lesquelles je partage la vision d'une Afrique, creuset de l'innovation durable. Un espace où des compétences plurielles fusionnent pour mettre en place un cadre structurel viable pour des organisations capables de tenir sans la présence de leur fondateur.
            </p>

            <div className="mt-8">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Je serai ravie de discuter avec vous — Écrivez-moi
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ───────── LOGOS PARTENAIRES ───────── */}
      <section className="section bg-surface border-y border-rose-100">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="Nos Partenaires" align="center" />

          <FadeInUp className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {PARTENAIRES.map((nom, index) => (
              <div
                key={index}
                className="aspect-[3/2] rounded-xl bg-cream border border-rose-200 flex items-center justify-center p-4"
              >
                <span className="font-body text-sm font-semibold text-burgundy-700 text-center">
                  {nom}
                </span>
              </div>
            ))}
          </FadeInUp>
        </div>
      </section>

      {/* ───────── TÉMOIGNAGES DE COLLABORATION ───────── */}
      <section className="section bg-cream">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Témoignages de Collaborations Réussies"
            align="center"
          />

          <FadeInUp className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {TEMOIGNAGES_COLLABORATION.map((temoignage, index) => (
              <Card key={index} className="flex flex-col h-full">
                <p className="font-quote italic text-burgundy-700 text-base leading-relaxed mb-4">
                  « {temoignage.quote} »
                </p>
                <div className="mt-auto pt-4 border-t border-rose-100">
                  <p className="font-body font-semibold text-sm text-text-strong">
                    {temoignage.author}
                  </p>
                  <p className="font-body text-xs text-text-muted">
                    {temoignage.organisation}
                  </p>
                </div>
              </Card>
            ))}
          </FadeInUp>
        </div>
      </section>
    </>
  );
}