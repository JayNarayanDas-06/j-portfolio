import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, FileSearch, TrendingUp, BarChart3, Users, FileText, Lightbulb, LineChart, Target, Zap } from 'lucide-react';
const skills = [{
  name: 'Technical SEO & Website Auditing',
  level: 90,
  icon: FileSearch
}, {
  name: 'Keyword Research & Search Intent',
  level: 92,
  icon: Search
}, {
  name: 'On-Page SEO & Content Optimization',
  level: 88,
  icon: FileText
}, {
  name: 'Organic Traffic Growth',
  level: 85,
  icon: TrendingUp
}, {
  name: 'SEO Analytics & Reporting',
  level: 90,
  icon: BarChart3
}, {
  name: 'Competitor & Market Research',
  level: 87,
  icon: Target
}, {
  name: 'Social Media Strategy',
  level: 82,
  icon: Users
}, {
  name: 'Content Planning & Scripting',
  level: 85,
  icon: Lightbulb
}, {
  name: 'Trending Content Research',
  level: 88,
  icon: Zap
}, {
  name: 'Google Analytics & Search Console',
  level: 91,
  icon: LineChart
}];
export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section id="skills" className="relative py-20 overflow-hidden md:py-0">
       {/* Background elements */}
       <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
       <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
 
       <div className="section-container py-[40px]" ref={ref}>
         {/* Section Header */}
         <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.5
      }} className="text-center mb-16">
           <span className="text-sm font-medium tracking-wider uppercase text-primary">
             What I Do Best
           </span>
           <h2 className="section-title mt-2">
             Skills & <span className="gradient-text text-ring">Expertise</span>
           </h2>
           <p className="section-subtitle mx-auto mt-4">
             A comprehensive skill set built through continuous learning and hands-on experience
           </p>
         </motion.div>
 
         {/* Skills Grid */}
         <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
           {skills.map((skill, index) => <motion.div key={skill.name} initial={{
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
                     <skill.icon className="w-5 h-5 text-primary" />
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
              ease: "easeOut"
            }} />
               </div>
             </motion.div>)}
         </div>
       </div>
     </section>;
};