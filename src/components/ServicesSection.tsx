import { motion, useInView, AnimatePresence } from 'framer-motion';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Search, FileSearch, Globe, Share2, BarChart, PenTool, ArrowLeft, ArrowRight, Wrench, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollDivider } from '@/components/ScrollDivider';
import { SectionBackground } from '@/components/SectionBackground';
import { useContent } from '@/contexts/ContentContext';
import { Separator } from '@/components/ui/separator';

// Local PNG imports for all tool logos
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

const localLogos: Record<string, string> = {
  ahrefs: ahrefsLogo, moz: mozLogo, screamingfrog: screamingfrogLogo,
  openai: openaiLogo, canva: canvaLogo, adobe: adobeLogo,
  microsoft365: microsoftLogo, googlesearchconsole: gscLogo,
  googleanalytics: gaLogo, googlegemini: geminiLogo, semrush: semrushLogo,
  google: googleLogo, meta: metaLogo, buffer: bufferLogo,
  hootsuite: hootsuiteLogo, notion: notionLogo, hubspot: hubspotLogo,
  anthropic: anthropicLogo, perplexity: perplexityLogo, elevenlabs: elevenlabsLogo,
};

const serviceIcons = [FileSearch, Search, Globe, Share2, PenTool, BarChart];

const serviceToolLogos: { name: string; slug: string }[][] = [
  [{ name: 'Google Search Console', slug: 'googlesearchconsole' }, { name: 'Screaming Frog', slug: 'screamingfrog' }, { name: 'Ahrefs', slug: 'ahrefs' }],
  [{ name: 'Ahrefs', slug: 'ahrefs' }, { name: 'SEMrush', slug: 'semrush' }, { name: 'Google Trends', slug: 'google' }],
  [{ name: 'Ahrefs', slug: 'ahrefs' }, { name: 'Moz', slug: 'moz' }, { name: 'Google Search Console', slug: 'googlesearchconsole' }],
  [{ name: 'Meta', slug: 'meta' }, { name: 'Buffer', slug: 'buffer' }, { name: 'Hootsuite', slug: 'hootsuite' }],
  [{ name: 'Notion', slug: 'notion' }, { name: 'Google Trends', slug: 'google' }, { name: 'HubSpot', slug: 'hubspot' }],
  [{ name: 'Google Analytics', slug: 'googleanalytics' }, { name: 'Google Search Console', slug: 'googlesearchconsole' }, { name: 'Microsoft 365', slug: 'microsoft365' }],
];

const aiDesignTools = {
  ai: [
    { name: 'ChatGPT', slug: 'openai' }, { name: 'Claude', slug: 'anthropic' },
    { name: 'Gemini', slug: 'googlegemini' }, { name: 'Meta AI', slug: 'meta' },
    { name: 'Perplexity', slug: 'perplexity' }, { name: 'ElevenLabs', slug: 'elevenlabs' },
  ],
  design: [
    { name: 'Canva', slug: 'canva' }, { name: 'Adobe', slug: 'adobe' },
  ],
};

const ToolLogo = ({ slug, name, size = 24 }: { slug: string; name: string; size?: number }) => {
  const containerSize = size + 12;
  const iconSize = size - 4;
  const src = localLogos[slug] || `https://cdn.simpleicons.org/${slug}`;
  return (
    <span title={name} className="inline-flex items-center justify-center rounded-full bg-primary/10 transition-all duration-300" style={{ width: containerSize, height: containerSize }}>
      <img src={src} alt={name} width={iconSize} height={iconSize} className="rounded-sm" loading="lazy" />
    </span>
  );
};

export const ServicesSection = () => {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { content } = useContent();
  const s = content.services;
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = s.services.length + 1; // 6 services + 1 tools card

  const goTo = useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(totalCards - 1, index)));
  }, [totalCards]);

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Touch handler for mobile swipe
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isSwiping = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const deltaX = e.touches[0].clientX - touchStartX;
      const deltaY = e.touches[0].clientY - touchStartY;
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        isSwiping = true;
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isSwiping) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      if (deltaX < -40) {
        setActiveIndex(prev => Math.min(prev + 1, totalCards - 1));
      } else if (deltaX > 40) {
        setActiveIndex(prev => Math.max(prev - 1, 0));
      }
    };

    section.addEventListener('touchstart', handleTouchStart, { passive: true });
    section.addEventListener('touchmove', handleTouchMove, { passive: false });
    section.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchmove', handleTouchMove);
      section.removeEventListener('touchend', handleTouchEnd);
    };
  }, [totalCards]);

  // Wheel handler: hijack scroll to navigate cards, release at boundaries
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let lastWheelTime = 0;
    const THROTTLE = 400;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime < THROTTLE) {
        e.preventDefault();
        return;
      }

      const atStart = activeIndex === 0;
      const atEnd = activeIndex === totalCards - 1;

      if (e.deltaY > 0 && !atEnd) {
        e.preventDefault();
        lastWheelTime = now;
        setActiveIndex(prev => Math.min(prev + 1, totalCards - 1));
      } else if (e.deltaY < 0 && !atStart) {
        e.preventDefault();
        lastWheelTime = now;
        setActiveIndex(prev => Math.max(prev - 1, 0));
      }
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    return () => section.removeEventListener('wheel', handleWheel);
  }, [activeIndex, totalCards]);

  // Get 3D transform for each card position relative to active
  const getCardStyle = (index: number) => {
    const offset = index - activeIndex;
    const absOffset = Math.abs(offset);

    if (absOffset > 3) return { display: 'none' as const };

    const isMobile = window.innerWidth < 768;
    const rotateY = isMobile ? 0 : offset * -35;
    const translateX = isMobile ? offset * 110 : offset * 280;
    const translateZ = isMobile ? -absOffset * 60 : -absOffset * 150;
    const scale = 1 - absOffset * 0.12;
    const opacity = 1 - absOffset * 0.25;

    return {
      transform: `perspective(1200px) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: Math.max(0.15, opacity),
      zIndex: 10 - absOffset,
      filter: absOffset > 0 ? `brightness(${1 - absOffset * 0.15})` : 'none',
    };
  };

  const renderServiceCard = (service: typeof s.services[0], index: number) => {
    const Icon = serviceIcons[index % serviceIcons.length];
    const tools = serviceToolLogos[index] || [];
    const isActive = index === activeIndex;

    return (
      <div
        key={index}
        className="absolute top-0 left-1/2 -ml-[140px] md:-ml-[170px] w-[280px] md:w-[340px] cursor-pointer transition-all duration-500 ease-out"
        style={getCardStyle(index)}
        onClick={() => goTo(index)}
      >
        <div className={`group p-4 md:p-6 rounded-2xl bg-card border border-border relative overflow-hidden flex flex-col h-[300px] md:h-[340px] transition-shadow duration-500 ${isActive ? 'shadow-2xl shadow-primary/20 border-primary/30' : 'shadow-lg'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex-1">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
              <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-xs md:text-sm">{service.description}</p>
          </div>
          {tools.length > 0 && (
            <div className="relative z-10 mt-3">
              <Separator className="mb-3 opacity-50" />
              <div className="flex items-center gap-2">
                {tools.map((tool) => (
                  <ToolLogo key={tool.slug + index} slug={tool.slug} name={tool.name} size={20} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderToolsCard = () => {
    const index = totalCards - 1;
    const isActive = index === activeIndex;

    return (
      <div
        key="tools"
        className="absolute top-0 left-1/2 -ml-[140px] md:-ml-[170px] w-[280px] md:w-[340px] cursor-pointer transition-all duration-500 ease-out"
        style={getCardStyle(index)}
        onClick={() => goTo(index)}
      >
        <div className={`group p-4 md:p-6 rounded-2xl bg-card border border-border relative overflow-hidden flex flex-col h-[300px] md:h-[340px] transition-shadow duration-500 ${isActive ? 'shadow-2xl shadow-primary/20 border-primary/30' : 'shadow-lg'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2 group-hover:text-primary transition-colors">Tools & Technologies</h3>
            <p className="text-muted-foreground leading-relaxed text-xs md:text-sm">Leveraging cutting-edge AI and creative platforms.</p>
            <div className="mt-3 space-y-3">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5 block">AI Tools</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {aiDesignTools.ai.map((tool) => (
                    <ToolLogo key={tool.slug} slug={tool.slug} name={tool.name} size={22} />
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5 block">Design & Creative</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {aiDesignTools.design.map((tool) => (
                    <ToolLogo key={tool.slug} slug={tool.slug} name={tool.name} size={22} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="services" className="relative bg-secondary/10" ref={sectionRef}>
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

        {/* 3D Carousel */}
        <div className="relative w-full overflow-hidden" style={{ height: 360 }}>
          <div className="relative w-full h-[300px] md:h-[340px]" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
            {s.services.map((service, i) => renderServiceCard(service, i))}
            {renderToolsCard()}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 py-3">
          {Array.from({ length: totalCards }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-primary w-6' : 'bg-primary/30 hover:bg-primary/50'}`}
            />
          ))}
        </div>
      </div>
      <ScrollDivider />
    </section>
  );
};
