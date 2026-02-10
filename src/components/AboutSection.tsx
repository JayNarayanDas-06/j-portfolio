import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar, Award, User } from 'lucide-react';
import { ScrollDivider } from '@/components/ScrollDivider';
import { useContent } from '@/contexts/ContentContext';
export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  const {
    content
  } = useContent();
  const a = content.about;
  return <section id="about" className="relative py-20 md:py-0">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="section-container py-[40px]" ref={ref}>
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.5
      }} className="text-center mb-16">
          <span className="text-sm font-medium tracking-wider uppercase text-primary">{a.label}</span>
          <h2 className="section-title mt-2 relative inline-flex items-center justify-center w-full">
            {a.title} <span className="gradient-text text-ring mx-[5px]">{a.titleHighlight}</span>
            <motion.div animate={{
            y: [0, -10, 0]
          }} transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }} className="absolute -right-2 -top-4 z-10" style={{
            rotate: '45deg'
          }}>
              <User className="w-6 h-6 text-primary/60 mx-[356px] my-[15px] mb-0 mt-[10px]" />
            </motion.div>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.5,
          delay: 0.2
        }}>
            <h3 className="text-2xl font-semibold mb-6">
              {a.heading} <span className="text-ring">{a.headingHighlight}</span> {a.headingSuffix}
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {a.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {a.quickInfo.map((info, i) => <div key={info.label} className="p-4 rounded-xl bg-card border border-border">
                  <div className="text-sm text-muted-foreground">{info.label}</div>
                  <div className={`font-medium ${i === 1 ? 'text-ring' : ''}`}>{info.value}</div>
                </div>)}
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          x: 30
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.5,
          delay: 0.3
        }}>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              Education Journey
            </h3>

            <div className="relative pl-8 space-y-8">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

              {a.education.map((edu, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} animate={isInView ? {
              opacity: 1,
              y: 0
            } : {}} transition={{
              duration: 0.4,
              delay: 0.4 + index * 0.1
            }} className="relative">
                  <div className="absolute -left-5 top-1 w-4 h-4 rounded-full bg-primary glow-sm" />
                  <div className="p-5 rounded-xl bg-card border border-border card-hover">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      {edu.period}
                    </div>
                    <h4 className="font-semibold text-lg">
                      {edu.degree} <span className="text-primary">| {edu.grade}</span>
                    </h4>
                    <p className="text-sm text-ring">{edu.field}</p>
                    <p className="text-muted-foreground text-sm mt-1">{edu.institution}</p>
                    <div className="flex items-center gap-2 mt-3 text-sm">
                      <Award className="w-4 h-4 text-accent" />
                      <span className="text-accent font-medium">{edu.grade}</span>
                    </div>
                  </div>
                </motion.div>)}
            </div>
          </motion.div>
        </div>
      </div>
      <ScrollDivider />
    </section>;
};