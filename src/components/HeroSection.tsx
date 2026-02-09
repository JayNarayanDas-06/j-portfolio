import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ===== EDITABLE TEXT — Change any value below =====
const heroContent = {
  badge: 'Available for new opportunities',
  greeting: 'Hey, there',
  namePrefix: 'I AM',
  name: 'JAY NARAYAN DAS',
  title: 'SEO & SMM Specialist',
  titleSeparator: '|',
  subtitle: 'Digital Marketing Executive',
  description:
    'Specialized in driving organic growth through technical SEO, data-driven insights, and strategic content optimization. Transforming digital presence into measurable results.',
  ctaPortfolio: 'View Portfolio',
  ctaServices: 'Explore Services',
  ctaContact: 'Contact Me',
  stats: [
    { value: '1+', label: 'Years Experience' },
    { value: '7+', label: 'Projects Done' },
    { value: '95%', label: 'Client Satisfaction' },
  ],
  profileAlt: 'Jay Narayan Das - SEO & SMM Specialist',
  profileImage: '/lovable-uploads/jay-profile-new.png',
};
// ===== END EDITABLE TEXT =====

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Availability Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex">
              <span className="availability-badge text-sm bg-gray-300">
                <span className="availability-dot" />
                {heroContent.badge}
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="font-display italic text-3xl md:text-4xl lg:text-5xl text-muted-foreground mt-8 mb-4">
              {heroContent.greeting}
            </motion.h2>

            {/* Name */}
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-2">
              {heroContent.namePrefix}{' '}
              <span className="gradient-text text-ring">{heroContent.name}</span>
            </motion.h1>

            {/* Title */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col md:flex-row items-center lg:items-start gap-2 md:gap-4 mb-6">
              <span className="text-xl md:text-2xl font-semibold text-ring">{heroContent.title}</span>
              <span className="hidden md:block text-muted-foreground">{heroContent.titleSeparator}</span>
              <span className="text-lg text-muted-foreground md:text-2xl font-semibold">{heroContent.subtitle}</span>
            </motion.div>

            {/* Description */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-muted-foreground text-lg max-w-xl mx-auto lg:mx-0 mb-8">
              {heroContent.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="rounded-full gap-2 px-8" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
                {heroContent.ctaPortfolio}
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full gap-2 px-8" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                {heroContent.ctaServices}
              </Button>
              <Button variant="outline" size="lg" className="rounded-full gap-2 px-8" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                {heroContent.ctaContact}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              {heroContent.stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Profile Image */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="order-1 lg:order-2 relative">
            <div className="relative mx-auto w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-[glow-pulse_3s_ease-in-out_infinite]" />
              <div className="absolute inset-4 rounded-full border border-primary/10" />
              <div className="absolute inset-8 rounded-full overflow-hidden glow">
                <img alt={heroContent.profileAlt} className="w-full h-full object-cover" src={heroContent.profileImage} />
              </div>

              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-4 right-10 p-3 rounded-xl bg-card border border-border shadow-lg">
                <TrendingUp className="w-6 h-6 text-orange-500" />
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute top-1/4 -left-4 p-3 rounded-xl bg-card border border-border shadow-lg">
                <Target className="w-6 h-6 text-orange-500" />
              </motion.div>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute bottom-10 -right-4 p-3 rounded-xl bg-card border border-border shadow-lg">
                <Sparkles className="w-6 h-6 text-orange-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-3 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};
