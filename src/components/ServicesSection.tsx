import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';
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

          {/* Tools & Technologies Card - aligned with middle column */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 + s.services.length * 0.1 }} className="group p-6 md:p-8 rounded-2xl bg-card border border-border card-hover relative overflow-hidden flex flex-col lg:col-start-2">
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
        </div>

      </div>
      <ScrollDivider />
    </section>
  );
};
