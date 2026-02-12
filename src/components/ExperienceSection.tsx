import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, MapPin, Calendar, CheckCircle, Award } from 'lucide-react';
import { ScrollDivider } from '@/components/ScrollDivider';
import { useContent } from '@/contexts/ContentContext';
export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  const {
    content
  } = useContent();
  const e = content.experience;
  return <section id="experience" className="relative py-20 bg-secondary/15 md:py-0">
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
          <span className="text-sm font-medium tracking-wider uppercase text-primary">{e.label}</span>
          <h2 className="section-title mt-2 inline-flex items-center justify-center w-full gap-3">
            <motion.div animate={{
            y: [0, -6, 0]
          }} transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }} className="p-3 rounded-xl bg-card border border-border shadow-lg">
              <Award className="w-6 h-6 text-blue-400" />
            </motion.div>
            {e.title} <span className="gradient-text text-ring mx-[5px]">{e.titleHighlight}</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">{e.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[...e.experiences].sort((a, b) => a.current === b.current ? 0 : a.current ? 1 : -1).map((exp, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 30
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.5,
          delay: 0.2 + index * 0.15
        }}>
              <div className="p-6 md:p-8 rounded-2xl bg-card border border-border card-hover h-full">
                <div className="flex flex-col gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      {exp.current && <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">Current</span>}
                    </div>
                    <p className="text-lg font-medium text-ring">{exp.company}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </div>
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.responsibilities.map((item, idx) => <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>)}
                </ul>
              </div>
            </motion.div>)}
        </div>
      </div>
      <ScrollDivider />
    </section>;
};