import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, FileSearch, Globe, Share2, BarChart, PenTool, ArrowUpRight, Wrench, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollDivider } from '@/components/ScrollDivider';
import { SectionBackground } from '@/components/SectionBackground';
import { useContent } from '@/contexts/ContentContext';
import { Separator } from '@/components/ui/separator';

const serviceIcons = [FileSearch, Search, Globe, Share2, PenTool, BarChart];

// Tool logo mappings per service card (by index)
const serviceToolLogos: { name: string; slug: string }[][] = [
  // SEO Optimization & Technical Audits
  [
    { name: 'Google Search Console', slug: 'googlesearchconsole' },
    { name: 'Screaming Frog', slug: 'screamingfrog' },
    { name: 'Ahrefs', slug: 'ahrefs' },
  ],
  // Keyword Research & Content Strategy
  [
    { name: 'Ahrefs', slug: 'ahrefs' },
    { name: 'SEMrush', slug: 'semrush' },
    { name: 'Google Trends', slug: 'google' },
  ],
  // On-Page & Off-Page SEO
  [
    { name: 'Ahrefs', slug: 'ahrefs' },
    { name: 'Moz', slug: 'moz' },
    { name: 'Google Search Console', slug: 'googlesearchconsole' },
  ],
  // Social Media Optimization
  [
    { name: 'Meta', slug: 'meta' },
    { name: 'Buffer', slug: 'buffer' },
    { name: 'Hootsuite', slug: 'hootsuite' },
  ],
  // Content Strategy & Growth Planning
  [
    { name: 'Notion', slug: 'notion' },
    { name: 'Google Trends', slug: 'google' },
    { name: 'HubSpot', slug: 'hubspot' },
  ],
  // Performance Tracking & Reporting
  [
    { name: 'Google Analytics', slug: 'googleanalytics' },
    { name: 'Google Search Console', slug: 'googlesearchconsole' },
    { name: 'Microsoft 365', slug: 'microsoft365' },
  ],
];

const aiDesignTools = {
  ai: [
    { name: 'ChatGPT', slug: 'openai' },
    { name: 'Claude', slug: 'anthropic' },
    { name: 'Gemini', slug: 'googlegemini' },
    { name: 'Meta AI', slug: 'meta' },
    { name: 'Perplexity', slug: 'perplexity' },
    { name: 'ElevenLabs', slug: 'elevenlabs' },
  ],
  design: [
    { name: 'Canva', slug: 'canva' },
    { name: 'Adobe', slug: 'adobe' },
  ],
};

const ToolLogo = ({ slug, name, size = 24 }: { slug: string; name: string; size?: number }) => (
  <img
    src={`https://cdn.simpleicons.org/${slug}`}
    alt={name}
    title={name}
    width={size}
    height={size}
    className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
    loading="lazy"
  />
);

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  const { content } = useContent();
  const s = content.services;

  return (
    <section id="services" className="relative py-20 bg-secondary/10 md:py-0">
      <SectionBackground variant="waves" />
      <div className="section-container py-[40px] pb-0 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="text-sm font-medium tracking-wider uppercase text-primary">{s.label}</span>
          <h2 className="section-title mt-2 inline-flex items-center justify-center w-full gap-3">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="p-3 rounded-xl bg-card border border-border shadow-lg">
              <Wrench className="w-6 h-6 text-blue-400" />
            </motion.div>
            {s.title} <span className="gradient-text text-ring mx-[5px]">{s.titleHighlight}</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">{s.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {s.services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            const tools = serviceToolLogos[index] || [];
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }} className="group p-6 md:p-8 rounded-2xl bg-card border border-border card-hover relative overflow-hidden flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex-1">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
                {tools.length > 0 && (
                  <div className="relative z-10 mt-5">
                    <Separator className="mb-4 opacity-50" />
                    <div className="flex items-center gap-3">
                      {tools.map((tool) => (
                        <ToolLogo key={tool.slug + index} slug={tool.slug} name={tool.name} size={24} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* AI & Design Tools Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 + s.services.length * 0.1 }} className="group p-6 md:p-8 rounded-2xl bg-card border border-border card-hover relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">AI & Design Tools I Work With</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">Enhancing every service with hands-on experience in these tools.</p>

              <div className="mt-5 space-y-4">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">AI Tools</span>
                  <div className="flex items-center gap-3 flex-wrap">
                    {aiDesignTools.ai.map((tool) => (
                      <ToolLogo key={tool.slug} slug={tool.slug} name={tool.name} size={28} />
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">Design & Creative</span>
                  <div className="flex items-center gap-3 flex-wrap">
                    {aiDesignTools.design.map((tool) => (
                      <ToolLogo key={tool.slug} slug={tool.slug} name={tool.name} size={28} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.8 }} className="text-center mt-12">
          <Button size="lg" className="rounded-full gap-2 px-8" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            {s.ctaText}
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
      <ScrollDivider />
    </section>
  );
};
