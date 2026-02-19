import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, MapPin, Calendar, CheckCircle, Award } from 'lucide-react';
import { ScrollDivider } from '@/components/ScrollDivider';
import { SectionBackground } from '@/components/SectionBackground';
import { useContent } from '@/contexts/ContentContext';
import { EditableText } from '@/components/EditableText';

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { content, updateSection } = useContent();
  const e = content.experience;

  // We need the original index to update the right item
  const sortedExperiences = e.experiences.map((exp, origIdx) => ({ exp, origIdx })).sort((a, b) => a.exp.current === b.exp.current ? 0 : a.exp.current ? 1 : -1);

  return (
    <section id="experience" className="relative py-20 bg-secondary/20 md:py-0">
      <SectionBackground variant="waves" />
      <div className="section-container py-[40px] pb-0 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <EditableText value={e.label} onChange={(v) => updateSection('experience', { label: v })} className="text-sm font-medium tracking-wider uppercase text-primary" />
          <h2 className="section-title mt-2 inline-flex items-center justify-center w-full gap-3">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="p-3 rounded-xl bg-card border border-border shadow-lg">
              <Award className="w-6 h-6 text-blue-400" />
            </motion.div>
            <EditableText value={e.title} onChange={(v) => updateSection('experience', { title: v })} />{' '}
            <EditableText value={e.titleHighlight} onChange={(v) => updateSection('experience', { titleHighlight: v })} className="gradient-text text-ring mx-[5px]" />
          </h2>
          <EditableText value={e.subtitle} onChange={(v) => updateSection('experience', { subtitle: v })} as="p" className="section-subtitle mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {sortedExperiences.map(({ exp, origIdx }, index) => (
            <motion.div key={origIdx} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}>
              <div className="p-6 md:p-8 rounded-2xl bg-card border border-border card-hover h-full">
                <div className="flex flex-col gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <EditableText
                        value={exp.title}
                        onChange={(v) => {
                          const experiences = [...e.experiences];
                          experiences[origIdx] = { ...experiences[origIdx], title: v };
                          updateSection('experience', { experiences });
                        }}
                        as="h3"
                        className="text-xl font-semibold"
                      />
                      {exp.current && <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">Current</span>}
                    </div>
                    <EditableText
                      value={exp.company}
                      onChange={(v) => {
                        const experiences = [...e.experiences];
                        experiences[origIdx] = { ...experiences[origIdx], company: v };
                        updateSection('experience', { experiences });
                      }}
                      as="p"
                      className="text-lg font-medium text-ring"
                    />
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <EditableText
                        value={exp.period}
                        onChange={(v) => {
                          const experiences = [...e.experiences];
                          experiences[origIdx] = { ...experiences[origIdx], period: v };
                          updateSection('experience', { experiences });
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <EditableText
                        value={exp.location}
                        onChange={(v) => {
                          const experiences = [...e.experiences];
                          experiences[origIdx] = { ...experiences[origIdx], location: v };
                          updateSection('experience', { experiences });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <EditableText
                        value={item}
                        onChange={(v) => {
                          const experiences = [...e.experiences];
                          const responsibilities = [...experiences[origIdx].responsibilities];
                          responsibilities[idx] = v;
                          experiences[origIdx] = { ...experiences[origIdx], responsibilities };
                          updateSection('experience', { experiences });
                        }}
                        className="text-muted-foreground"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <ScrollDivider />
    </section>
  );
};
