import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      {/* 1. Bannière d'accueil */}
      <HeroSection />
      
      {/* 2. Section des Chiffres Clés */}
      <StatsSection />

      {/* 3. Section des Expertises */}
      <ExpertiseSection />

      {/* 4. Section des Témoignages */}
      <TestimonialsSection />

      {/* 5. Section de la Newsletter */}
      <NewsletterSection />
    </main>
  );
}