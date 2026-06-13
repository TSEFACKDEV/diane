import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ExpertiseSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}