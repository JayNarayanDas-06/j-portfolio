import { motion, useInView } from 'framer-motion';
import React, { useRef, useEffect, useCallback } from 'react';
import { Search, FileSearch, Globe, Share2, BarChart, PenTool, ArrowUpRight, Wrench, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollDivider } from '@/components/ScrollDivider';
import { SectionBackground } from '@/components/SectionBackground';
import { useContent } from '@/contexts/ContentContext';
import { Separator } from '@/components/ui/separator';

// Local PNG imports for all tool logos (64px favicons)
import ahrefsLogo from '@/assets/tools/ahrefs.png';
import mozLogo from '@/assets/tools/moz.png';
import screamingfrogLogo from '@/assets/tools/screamingfrog.png';
import openaiLogo from '@/assets/tools/openai.png';
import canvaLogo from '@/assets/tools/canva.png';
import adobeLogo from '@/assets/tools/adobe.png';
import microsoftLogo from '@/assets/tools/microsoft.png';
import gscLogo from '@/assets/tools/googlesearchconsole.png';
import gaLogo from '@/assets/tools/googleanalytics.svg';
import geminiLogo from '@/assets/tools/googlegemini.png';
import semrushLogo from '@/assets/tools/semrush.png';
import googleLogo from '@/assets/tools/google.png';
import metaLogo from '@/assets/tools/meta.png';
import bufferLogo from '@/assets/tools/buffer.png';
import hootsuiteLogo from '@/assets/tools/hootsuite.png';
import notionLogo from '@/assets/tools/notion.png';
import hubspotLogo from '@/assets/tools/hubspot.png';
import anthropicLogo from '@/assets/tools/anthropic.png';
import perplexityLogo from '@/assets/tools/perplexity.png';
import elevenlabsLogo from '@/assets/tools/elevenlabs.png';

// Map all slugs to local PNG imports
const localLogos: Record<string, string> = {
  ahrefs: ahrefsLogo,
  moz: mozLogo,
  screamingfrog: screamingfrogLogo,
  openai: openaiLogo,
  canva: canvaLogo,
  adobe: adobeLogo,
  microsoft365: microsoftLogo,
  googlesearchconsole: gscLogo,
  googleanalytics: gaLogo,
  googlegemini: geminiLogo,
  semrush: semrushLogo,
  google: googleLogo,
  meta: metaLogo,
  buffer: bufferLogo,
  hootsuite: hootsuiteLogo,
  notion: notionLogo,
  hubspot: hubspotLogo,
  anthropic: anthropicLogo,
  perplexity: perplexityLogo,
  elevenlabs: elevenlabsLogo,
};

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

const ToolLogo = ({ slug, name, size = 24 }: { slug: string; name: string; size?: number }) => {
  const containerSize = size + 12;
  const iconSize = size - 4;
  const localSrc = localLogos[slug];
  const src = localSrc || `https://cdn.simpleicons.org/${slug}`;
  return (
    <span
      title={name}
      className="inline-flex items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"
      style={{ width: containerSize, height: containerSize }}
    >
      <img
        src={src}
        alt={name}
        width={iconSize}
        height={iconSize}
        className="rounded-sm"
        loading="lazy"
      />
    </span>
  );
};

export const ServicesSection = () => {
  const ref = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  const { content } = useContent();
  const s = content.services;

  // Handle mouse wheel to scroll horizontally through cards
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const atStart = scrollLeft <= 0;
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 2;

      // If scrolling down and not at the end, or scrolling up and not at the start
      if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
        e.preventDefault();
        container.scrollBy({ left: e.deltaY * 2, behavior: 'smooth' });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Build all 7 cards data
  const allCards = [
    ...s.services.map((service, index) => ({
      type: 'service' as const,
      service,
      index,
    })),
    { type: 'tools' as const, index: s.services.length },
  ];

  return (
    <section id="services" className="relative bg-secondary/10">
      <SectionBackground variant="waves" />
      <div className="relative z-10 py-[40px] pb-0" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12 px-4">
          <span className="text-sm font-medium tracking-wider uppercase text-primary">{s.label}</span>
          <h2 className="section-title mt-2 inline-flex items-center justify-center w-full gap-3">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="p-3 rounded-xl bg-card border border-border shadow-lg">
              <Wrench className="w-6 h-6 text-blue-400" />
            </motion.div>
            {s.title} <span className="gradient-text text-ring mx-[5px]">{s.titleHighlight}</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">{s.subtitle}</p>
        </motion.div>

        {/* Horizontal scroll carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-[calc(50vw-180px)] pb-10 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {allCards.map((card, i) => {
            if (card.type === 'service') {
              const Icon = serviceIcons[card.index % serviceIcons.length];
              const tools = serviceToolLogos[card.index] || [];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="group snap-center shrink-0 w-[360px] p-6 md:p-8 rounded-2xl bg-card border border-border card-hover relative overflow-hidden flex flex-col"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex-1">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{card.service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{card.service.description}</p>
                  </div>
                  {tools.length > 0 && (
                    <div className="relative z-10 mt-5">
                      <Separator className="mb-4 opacity-50" />
                      <div className="flex items-center gap-3">
                        {tools.map((tool) => (
                          <ToolLogo key={tool.slug + i} slug={tool.slug} name={tool.name} size={24} />
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            }

            // Tools & Technologies card
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="group snap-center shrink-0 w-[360px] p-6 md:p-8 rounded-2xl bg-card border border-border card-hover relative overflow-hidden flex flex-col"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <Sparkles className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Tools & Technologies</h3>
                  <p className="text-muted-foreground leading-relaxed">Leveraging cutting-edge AI and creative platforms to deliver exceptional results.</p>
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
            );
          })}
        </div>

        {/* Scroll indicator dots */}
        <div className="flex justify-center gap-2 pb-6">
          {allCards.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-primary/30" />
          ))}
        </div>
      </div>
      <ScrollDivider />
    </section>
  );
};
