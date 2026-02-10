import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, FileSearch, TrendingUp, BarChart3, Users, FileText, Lightbulb, LineChart, Target, Zap, Brain } from 'lucide-react';
import { ScrollDivider } from '@/components/ScrollDivider';
import { useContent } from '@/contexts/ContentContext';

// Default icons mapped by index
const skillIcons = [FileSearch, Search, FileText, TrendingUp, BarChart3, Target, Users, Lightbulb, Zap, LineChart];
export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  const {
    content
  } = useContent();
  const s = content.skills;
  return <section id="skills" className="relative py-20 md:py-0">
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
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
          <span className="text-sm font-medium tracking-wider uppercase text-primary">{s.label}</span>
          <h2 className="section-title mt-2 relative inline-flex items-center justify-center w-full">
            {s.title} <span className="gradient-text text-ring mx-[5px]">{s.titleHighlight}</span>
            <motion.div animate={{
            y: [0, -10, 0]
          }} transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }} className="absolute -right-2 -top-4 z-10" style={{
            rotate: '45deg'
          }}>
              <Brain className="w-6 h-6 text-primary/60" />
            </motion.div>
          </h2>
          <p className="section-subtitle mx-auto mt-4">{s.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {s.skills.map((skill, index) => {
          const Icon = skillIcons[index % skillIcons.length];
          return <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} animate={isInView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.4,
            delay: 0.1 + index * 0.05
          }} className="p-5 rounded-xl bg-card border border-border card-hover group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium">{skill.name}</span>
                  </div>
                  <span className="text-sm text-primary font-semibold">{skill.level}%</span>
                </div>
                <div className="skill-progress">
                  <motion.div className="skill-progress-bar" initial={{
                width: 0
              }} animate={isInView ? {
                width: `${skill.level}%`
              } : {
                width: 0
              }} transition={{
                duration: 1,
                delay: 0.3 + index * 0.05,
                ease: 'easeOut'
              }} />
                </div>
              </motion.div>;
        })}
        </div>
      </div>
      <ScrollDivider />
    </section>;
};