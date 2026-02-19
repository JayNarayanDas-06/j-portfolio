import { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ServicesSection } from '@/components/ServicesSection';
import { PortfolioSection } from '@/components/PortfolioSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { EditModeToggle } from '@/components/EditModeToggle';
import { EditModeProvider } from '@/contexts/EditModeContext';
import { useContent } from '@/contexts/ContentContext';

const Index = () => {
  const { content } = useContent();

  useEffect(() => {
    if (content.footer.faviconUrl) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = content.footer.faviconUrl;
    }
  }, [content.footer.faviconUrl]);

  return (
    <EditModeProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <ServicesSection />
          <PortfolioSection />
          <ContactSection />
        </main>
        <Footer />
        <EditModeToggle />
      </div>
    </EditModeProvider>
  );
};

export default Index;
