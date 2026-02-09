import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, FileSearch, Globe, Share2, BarChart, PenTool, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollDivider } from '@/components/ScrollDivider';

// ===== EDITABLE TEXT — Change any value below =====
const sectionHeader = {
  label: 'How I Can Help',
  title: 'My',
  titleHighlight: 'Services',
  subtitle: 'Comprehensive digital marketing solutions to elevate your online presence and drive measurable growth',
};

const services = [
  { icon: FileSearch, title: 'SEO Optimization & Technical Audits', description: 'Comprehensive website audits to identify and fix technical issues, improve site speed, and enhance crawlability for better search rankings.' },
  { icon: Search, title: 'Keyword Research & Content Strategy', description: 'Data-driven keyword research and content planning to target high-value search terms and capture qualified organic traffic.' },
  { icon: Globe, title: 'On-Page & Off-Page SEO', description: 'Optimize page elements, meta tags, internal linking, and build quality backlinks to boost domain authority and visibility.' },
  { icon: Share2, title: 'Social Media Optimization (SMO)', description: 'Strategic social media presence management to increase brand awareness, engagement, and drive traffic from social platforms.' },
  { icon: PenTool, title: 'Content Strategy & Growth Planning', description: 'Develop content calendars and strategies aligned with SEO goals to establish thought leadership and drive consistent growth.' },
  { icon: BarChart, title: 'Performance Tracking & Reporting', description: 'Regular performance analysis with actionable insights using Google Analytics and Search Console to measure ROI and optimize strategies.' },
];

const ctaText = 'Get Started';
// ===== END EDITABLE TEXT =====

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="relative py-20 bg-secondary/30 md:py-0">
      <div className="section-container py-[40px]" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="text-sm font-medium tracking-wider uppercase text-primary">{sectionHeader.label}</span>
          <h2 className="section-title mt-2">
            {sectionHeader.title} <span className="gradient-text text-ring">{sectionHeader.titleHighlight}</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">{sectionHeader.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }} className="group p-6 md:p-8 rounded-2xl bg-card border border-border card-hover relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                <div className="mt-5 flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowUpRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.8 }} className="text-center mt-12">
          <Button size="lg" className="rounded-full gap-2 px-8" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            {ctaText}
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
      <ScrollDivider />
    </section>
  );
};
