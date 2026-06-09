import { SectionTitle } from '@/components/ui/SectionTitle';

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Conteneur temporaire propre en attendant l'assemblage de la Semaine 2 */}
      <section className="section flex flex-col items-center justify-center min-h-[60vh] text-center">
        <SectionTitle 
          title="Diane Ndeuna" 
          subtitle="Plateforme officielle en cours de développement. Les composants de base de la Semaine 1 ont été configurés avec succès."
          align="center"
        />
      </section>
    </main>
  );
}