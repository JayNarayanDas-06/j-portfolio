import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar, Award, User } from 'lucide-react';
import { ScrollDivider } from '@/components/ScrollDivider';
import { SectionBackground } from '@/components/SectionBackground';
import { useContent } from '@/contexts/ContentContext';
import { EditableText } from '@/components/EditableText';

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { content, updateSection } = useContent();
  const a = content.about;

  return (
    <section id="about" className="relative py-20 md:py-0">
      <SectionBackground variant="waves" />
      <div className="section-container py-[40px] pb-0 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <EditableText value={a.label} onChange={(v) => updateSection('about', { label: v })} className="text-sm font-medium tracking-wider uppercase text-primary" />
          <h2 className="section-title mt-2 inline-flex items-center justify-center w-full gap-3">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="p-3 rounded-xl bg-card border border-border shadow-lg">
              <User className="w-6 h-6 text-blue-400" />
            </motion.div>
            <EditableText value={a.title} onChange={(v) => updateSection('about', { title: v })} />{' '}
            <EditableText value={a.titleHighlight} onChange={(v) => updateSection('about', { titleHighlight: v })} className="gradient-text text-ring mx-[5px]" />
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            <h3 className="text-2xl font-semibold mb-6">
              <EditableText value={a.heading} onChange={(v) => updateSection('about', { heading: v })} />{' '}
              <EditableText value={a.headingHighlight} onChange={(v) => updateSection('about', { headingHighlight: v })} className="text-ring" />{' '}
              <EditableText value={a.headingSuffix} onChange={(v) => updateSection('about', { headingSuffix: v })} />
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {a.paragraphs.map((p, i) => (
                <EditableText
                  key={i}
                  value={p}
                  onChange={(v) => {
                    const paragraphs = [...a.paragraphs];
                    paragraphs[i] = v;
                    updateSection('about', { paragraphs });
                  }}
                  as="p"
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {a.quickInfo.map((info, i) => (
                <div key={info.label} className="p-4 rounded-xl bg-card border border-border">
                  <EditableText
                    value={info.label}
                    onChange={(v) => {
                      const quickInfo = [...a.quickInfo];
                      quickInfo[i] = { ...quickInfo[i], label: v };
                      updateSection('about', { quickInfo });
                    }}
                    as="div"
                    className="text-sm text-muted-foreground"
                  />
                  <EditableText
                    value={info.value}
                    onChange={(v) => {
                      const quickInfo = [...a.quickInfo];
                      quickInfo[i] = { ...quickInfo[i], value: v };
                      updateSection('about', { quickInfo });
                    }}
                    as="div"
                    className={`font-medium ${i === 1 ? 'text-ring' : ''}`}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              Education Journey
            </h3>

            <div className="relative pl-8 space-y-8">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

              {a.education.map((edu, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }} className="relative">
                  <div className="absolute -left-5 top-1 w-4 h-4 rounded-full bg-primary glow-sm" />
                  <div className="p-5 rounded-xl bg-card border border-border card-hover">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      <EditableText
                        value={edu.period}
                        onChange={(v) => {
                          const education = [...a.education];
                          education[index] = { ...education[index], period: v };
                          updateSection('about', { education });
                        }}
                      />
                    </div>
                    <h4 className="font-semibold text-lg flex items-center gap-1">
                      <EditableText
                        value={edu.degree}
                        onChange={(v) => {
                          const education = [...a.education];
                          education[index] = { ...education[index], degree: v };
                          updateSection('about', { education });
                        }}
                      />{' '}
                      <span className="text-primary">|{' '}
                        <EditableText
                          value={edu.grade}
                          onChange={(v) => {
                            const education = [...a.education];
                            education[index] = { ...education[index], grade: v };
                            updateSection('about', { education });
                          }}
                        />
                      </span>
                      <Award className="w-4 h-4" style={{ color: '#64748b' }} />
                    </h4>
                    <EditableText
                      value={edu.field}
                      onChange={(v) => {
                        const education = [...a.education];
                        education[index] = { ...education[index], field: v };
                        updateSection('about', { education });
                      }}
                      as="p"
                      className="text-sm text-ring"
                    />
                    <EditableText
                      value={edu.institution}
                      onChange={(v) => {
                        const education = [...a.education];
                        education[index] = { ...education[index], institution: v };
                        updateSection('about', { education });
                      }}
                      as="p"
                      className="text-muted-foreground text-sm mt-1"
                    />
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
