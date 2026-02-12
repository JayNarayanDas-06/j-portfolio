import { motion } from 'framer-motion';
import { ArrowUp, Mail, MapPin, Heart } from 'lucide-react';
import { useContent } from '@/contexts/ContentContext';
import { LinkedInIcon, InstagramIcon, XIcon } from '@/components/SocialIcons';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
];

export const Footer = () => {
  const { content } = useContent();
  const f = content.footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-card border-t border-border">
      <div className="section-container md:py-16 py-[50px]">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <a href="#home" className="font-display text-2xl font-semibold italic">
              <span className="text-foreground">{f.brandName}</span>
              <span className="text-primary">{f.brandDot}</span>
            </a>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{f.tagline}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <a href={`mailto:${f.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                {f.email}
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {f.location}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              © {new Date().getFullYear()} {f.copyright}. Made with{' '}
              <Heart className="w-4 h-4 text-primary fill-primary" />
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.linkedin.com/in/jay-narayan-das-1b99b4208/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:scale-110 transition-transform text-muted-foreground hover:text-primary">
                <LinkedInIcon className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/situndas_official_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:scale-110 transition-transform text-muted-foreground hover:text-primary">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://x.com/situn_das_" target="_blank" rel="noopener noreferrer" aria-label="X" className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:scale-110 transition-transform text-muted-foreground hover:text-primary">
                <XIcon className="w-5 h-5" />
              </a>
            </div>
            <motion.button onClick={scrollToTop} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              Back to Top
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <ArrowUp className="w-4 h-4 text-primary" />
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};
