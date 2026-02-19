import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContent } from '@/contexts/ContentContext';
import { EditableText } from '@/components/EditableText';
import { EditableImage } from '@/components/EditableImage';
import { useEditMode } from '@/contexts/EditModeContext';
import profileWebp from '@/assets/jay-profile-new.webp';

export const HeroSection = () => {
  const { content, updateSection } = useContent();
  const { isEditMode } = useEditMode();
  const h = content.hero;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex">
              <span className="availability-badge text-sm bg-gray-300">
                <span className="availability-dot" />
                <EditableText value={h.badge} onChange={(v) => updateSection('hero', { badge: v })} />
              </span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <EditableText value={h.greeting} onChange={(v) => updateSection('hero', { greeting: v })} as="h2" className="font-display italic text-3xl md:text-4xl lg:text-5xl text-muted-foreground mt-8 mb-4" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 lg:text-6xl">
                <EditableText value={h.name} onChange={(v) => updateSection('hero', { name: v })} className="gradient-text text-ring" />
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col md:flex-row items-center lg:items-start gap-2 md:gap-4 mb-6">
              <EditableText value={h.subtitle} onChange={(v) => updateSection('hero', { subtitle: v })} className="text-lg text-muted-foreground md:text-2xl font-semibold text-center" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <EditableText value={h.description} onChange={(v) => updateSection('hero', { description: v })} as="p" className="text-muted-foreground text-lg max-w-xl mx-auto lg:mx-0 mb-8" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="rounded-full gap-2 px-8" onClick={() => !isEditMode && document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
                <EditableText value={h.ctaPortfolio} onChange={(v) => updateSection('hero', { ctaPortfolio: v })} />
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full gap-2 px-8" onClick={() => !isEditMode && document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                <EditableText value={h.ctaServices} onChange={(v) => updateSection('hero', { ctaServices: v })} />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full gap-2 px-8" onClick={() => !isEditMode && document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <EditableText value={h.ctaContact} onChange={(v) => updateSection('hero', { ctaContact: v })} />
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              {h.stats.map((stat, i) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <EditableText
                    value={stat.value}
                    onChange={(v) => {
                      const stats = [...h.stats];
                      stats[i] = { ...stats[i], value: v };
                      updateSection('hero', { stats });
                    }}
                    as="div"
                    className="text-2xl md:text-3xl font-bold text-primary"
                  />
                  <EditableText
                    value={stat.label}
                    onChange={(v) => {
                      const stats = [...h.stats];
                      stats[i] = { ...stats[i], label: v };
                      updateSection('hero', { stats });
                    }}
                    as="div"
                    className="text-sm text-muted-foreground"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="order-1 lg:order-2 relative">
            <div className="relative mx-auto w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-[glow-pulse_3s_ease-in-out_infinite]" />
              <div className="absolute inset-4 rounded-full border border-primary/10" />
              <div className="absolute inset-8 rounded-full overflow-hidden glow">
                <EditableImage
                  src={h.profileImage.startsWith('/') ? h.profileImage : profileWebp}
                  alt={h.profileAlt}
                  className="w-full h-full object-cover"
                  width={450}
                  height={450}
                  fetchPriority="high"
                  onChange={(v) => updateSection('hero', { profileImage: v })}
                />
              </div>
              {/* Floating icons */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-4 right-10 p-3 rounded-xl bg-card border border-border shadow-lg">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute top-1/4 -left-4 p-3 rounded-xl bg-card border border-border shadow-lg">
                <Target className="w-6 h-6 text-blue-400" />
              </motion.div>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute bottom-10 -right-4 p-3 rounded-xl bg-card border border-border shadow-lg">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-3 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};
