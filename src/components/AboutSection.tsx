import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar, Award, User } from 'lucide-react';
import { ScrollDivider } from '@/components/ScrollDivider';
import { SectionBackground } from '@/components/SectionBackground';
import { useContent } from '@/contexts/ContentContext';
import { Icon3D, Icon3DInline } from '@/components/Icon3D';

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { content } = useContent();
  const a = content.about;

  return (
    <section id="about" className="relative py-20 md:py-0">
      <SectionBackground variant="waves" />
      <div className="section-container py-[40px] pb-0 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="text-sm font-medium tracking-wider uppercase text-primary">{a.label}</span>
          <h2 className="section-title mt-2 inline-flex items-center justify-center w-full gap-3">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
              <Icon3D icon={User} size={40} />
            </motion.div>
            {a.title} <span className="gradient-text text-ring mx-[5px]">{a.titleHighlight}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            <h3 className="text-2xl font-semibold mb-6">
              {a.heading} <span className="text-ring">{a.headingHighlight}</span> {a.headingSuffix}
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {a.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {a.quickInfo.map((info, i) => (
                <div key={info.label} className="p-4 rounded-xl bg-card border border-border">
                  <div className="text-sm text-muted-foreground">{info.label}</div>
                  <div className={`font-medium ${i === 1 ? 'text-ring' : ''}`}>{info.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Icon3DInline icon={GraduationCap} size={24} className="text-primary" />
              Education Journey
            </h3>
            <div className="relative pl-8 space-y-8">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />
              {a.education.map((edu, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }} className="relative">
                  <div className="absolute -left-5 top-1 w-4 h-4 rounded-full bg-primary glow-sm" />
                  <div className="p-5 rounded-xl bg-card border border-border card-hover">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Icon3DInline icon={Calendar} size={16} />
                      {edu.period}
                    </div>
                    <h4 className="font-semibold text-lg flex items-center gap-1">
                      {edu.degree} <span className="text-primary">| {edu.grade}</span>
                      <Icon3DInline icon={Award} size={16} className="text-muted-foreground" />
                    </h4>
                    <p className="text-sm text-ring">{edu.field}</p>
                    <p className="text-muted-foreground text-sm mt-1">{edu.institution}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <ScrollDivider />
    </section>
  );
};
