import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, FileSearch, TrendingUp, BarChart3, Users, FileText, Lightbulb, LineChart, Target, Zap, Brain } from 'lucide-react';
import { ScrollDivider } from '@/components/ScrollDivider';
import { SectionBackground } from '@/components/SectionBackground';
import { useContent } from '@/contexts/ContentContext';
import { Icon3D, Icon3DCard } from '@/components/Icon3D';

const skillIcons = [FileSearch, Search, FileText, TrendingUp, BarChart3, Target, Users, Lightbulb, Zap, LineChart];

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { content } = useContent();
  const s = content.skills;

  return (
    <section id="skills" className="relative py-20 md:py-0">
      <SectionBackground variant="waves" />
      <div className="section-container py-[40px] pb-0 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="text-sm font-medium tracking-wider uppercase text-primary">{s.label}</span>
          <h2 className="section-title mt-2 inline-flex items-center justify-center w-full gap-3">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
              <Icon3D icon={Brain} size={40} />
            </motion.div>
            {s.title} <span className="gradient-text text-ring mx-[5px]">{s.titleHighlight}</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">{s.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {s.skills.map((skill, index) => {
            const Icon = skillIcons[index % skillIcons.length];
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }} className="p-5 rounded-xl bg-card border border-border card-hover group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Icon3DCard icon={Icon} size={20} />
                    <span className="font-medium">{skill.name}</span>
                  </div>
                  <span className="text-sm text-primary font-semibold">{skill.level}%</span>
                </div>
                <div className="skill-progress">
                  <motion.div className="skill-progress-bar" initial={{ width: 0 }} animate={isInView ? { width: `${skill.level}%` } : { width: 0 }} transition={{ duration: 1, delay: 0.3 + index * 0.05, ease: 'easeOut' }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <ScrollDivider />
    </section>
  );
};
