import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, FileSearch, Globe, Share2, BarChart, PenTool, ArrowUpRight, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollDivider } from '@/components/ScrollDivider';
import { SectionBackground } from '@/components/SectionBackground';
import { useContent } from '@/contexts/ContentContext';
const serviceIcons = [FileSearch, Search, Globe, Share2, PenTool, BarChart];
export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  const {
    content
  } = useContent();
  const s = content.services;
  return <section id="services" className="relative py-20 bg-secondary/30 md:py-0">
      <SectionBackground variant="waves" />
      <div className="section-container py-[40px] pb-0" ref={ref}>
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.5
      }} className="text-center mb-16">
          <span className="text-sm font-medium tracking-wider uppercase text-primary">{s.label}</span>
          <h2 className="section-title mt-2 inline-flex items-center justify-center w-full gap-3">
            <motion.div animate={{
            y: [0, -6, 0]
          }} transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }} className="p-3 rounded-xl bg-card border border-border shadow-lg">
              <Wrench className="w-6 h-6 text-blue-400" />
            </motion.div>
            {s.title} <span className="gradient-text text-ring mx-[5px]">{s.titleHighlight}</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">{s.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {s.services.map((service, index) => {
          const Icon = serviceIcons[index % serviceIcons.length];
          return <motion.div key={index} initial={{
            opacity: 0,
            y: 30
          }} animate={isInView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.5,
            delay: 0.1 + index * 0.1
          }} className="group p-6 md:p-8 rounded-2xl bg-card border border-border card-hover relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  <div className="mt-5 flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowUpRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </motion.div>;
        })}
        </div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.5,
        delay: 0.8
      }} className="text-center mt-12">
          <Button size="lg" className="rounded-full gap-2 px-8" onClick={() => document.getElementById('contact')?.scrollIntoView({
          behavior: 'smooth'
        })}>
            {s.ctaText}
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
      <ScrollDivider />
    </section>;
};