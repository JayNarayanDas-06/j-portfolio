import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ServicesSection } from '@/components/ServicesSection';
import { PortfolioSection } from '@/components/PortfolioSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { ScrollDivider } from '@/components/ScrollDivider';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ScrollDivider />
        <AboutSection />
        <ScrollDivider />
        <ExperienceSection />
        <ScrollDivider />
        <SkillsSection />
        <ScrollDivider />
        <ServicesSection />
        <ScrollDivider />
        <PortfolioSection />
        <ScrollDivider />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
