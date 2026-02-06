import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, MapPin, Calendar, CheckCircle } from 'lucide-react';
const experiences = [{
  title: 'Digital Marketing Executive',
  company: 'CloudSat',
  location: 'Bhubaneswar, Odisha',
  period: 'April 2025 – Present',
  current: true,
  responsibilities: ['Developing and executing comprehensive SEO strategies', 'Performance tracking and analytics-driven optimization', 'Content optimization for improved search visibility', 'Managing digital marketing campaigns across platforms']
}, {
  title: 'SEO Intern',
  company: 'Seoczar IT Services Pvt Ltd',
  location: 'Bhubaneswar, Odisha',
  period: 'September 2024 – April 2025',
  current: false,
  responsibilities: ['Conducted comprehensive SEO audits and analysis', 'Performed advanced keyword research and competitive analysis', 'Implemented technical SEO optimization strategies', 'Analyzed and reported on campaign performance metrics']
}];
export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section id="experience" className="relative py-20 bg-secondary/15 md:py-0">
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
             My Journey
           </span>
           <h2 className="section-title mt-2">
             Work <span className="gradient-text text-ring">Experience</span>
           </h2>
           <p className="section-subtitle mx-auto mt-4">
             Building expertise through hands-on experience in digital marketing and SEO optimization
           </p>
         </motion.div>
 
         {/* Experience Cards */}
         <div className="max-w-4xl mx-auto space-y-8">
           {experiences.map((exp, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 30
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.5,
          delay: 0.2 + index * 0.15
        }} className="relative">
               <div className="p-6 md:p-8 rounded-2xl bg-card border border-border card-hover">
                 {/* Header */}
                 <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                   <div>
                     <div className="flex items-center gap-3 mb-2">
                       <div className="p-2 rounded-lg bg-primary/10">
                         <Briefcase className="w-5 h-5 text-primary" />
                       </div>
                       <h3 className="text-xl font-semibold">{exp.title}</h3>
                       {exp.current && <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">
                           Current
                         </span>}
                     </div>
                     <p className="text-lg font-medium text-ring">{exp.company}</p>
                   </div>
                   <div className="flex flex-col gap-1 text-sm text-muted-foreground">
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
 
                 {/* Responsibilities */}
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
     </section>;
};