import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ServicesSection } from '@/components/ServicesSection';
import { PortfolioSection } from '@/components/PortfolioSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
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
      <Link
        to="/admin"
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-card border border-border shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 opacity-40 hover:opacity-100"
        title="Content Manager"
      >
        <Settings className="w-5 h-5 text-muted-foreground" />
      </Link>
    </div>
  );
};

export default Index;
