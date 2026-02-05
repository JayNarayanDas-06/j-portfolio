 import { motion, useInView } from 'framer-motion';
 import { useRef } from 'react';
 import { ExternalLink, TrendingUp, Users, Target, BarChart } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 
 const projectHighlights = [
   { icon: Target, label: 'On-Page SEO', description: 'Full optimization' },
   { icon: TrendingUp, label: 'Off-Page SEO', description: 'Link building' },
   { icon: BarChart, label: 'Technical SEO', description: 'Site health' },
   { icon: Users, label: 'SMM Strategy', description: 'Social growth' },
 ];
 
 const achievements = [
   'Improved keyword rankings across targeted search terms',
   'Increased user engagement and brand visibility',
   'Developed strategic social media marketing campaigns',
   'Expanded digital reach through SEO-driven content',
 ];
 
 export const PortfolioSection = () => {
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true, margin: "-100px" });
 
   return (
     <section id="portfolio" className="relative py-20 md:py-32 overflow-hidden">
       {/* Background elements */}
       <div className="absolute top-1/3 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
       
       <div className="section-container" ref={ref}>
         {/* Section Header */}
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.5 }}
           className="text-center mb-16"
         >
           <span className="text-primary text-sm font-medium tracking-wider uppercase">
             Featured Work
           </span>
           <h2 className="section-title mt-2">
             My <span className="gradient-text">Portfolio</span>
           </h2>
           <p className="section-subtitle mx-auto mt-4">
             Real-world projects showcasing measurable results in SEO and digital marketing
           </p>
         </motion.div>
 
         {/* Featured Project */}
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.5, delay: 0.2 }}
           className="max-w-5xl mx-auto"
         >
           <div className="rounded-2xl bg-card border border-border overflow-hidden card-hover">
             {/* Project Header */}
             <div className="p-6 md:p-8 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                 <div>
                   <span className="text-sm text-primary font-medium">Featured Case Study</span>
                   <h3 className="text-2xl md:text-3xl font-bold mt-1">AuditFiling Website SEO & SMO</h3>
                 </div>
                 <Button
                   variant="outline"
                   className="rounded-full gap-2"
                   asChild
                 >
                   <a href="https://www.auditfiling.com/" target="_blank" rel="noopener noreferrer">
                     Visit Website
                     <ExternalLink className="w-4 h-4" />
                   </a>
                 </Button>
               </div>
             </div>
 
             <div className="p-6 md:p-8">
               {/* Project Highlights Grid */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                 {projectHighlights.map((item, index) => (
                   <motion.div
                     key={item.label}
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={isInView ? { opacity: 1, scale: 1 } : {}}
                     transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                     className="text-center p-4 rounded-xl bg-secondary/50 border border-border"
                   >
                     <div className="w-10 h-10 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                       <item.icon className="w-5 h-5 text-primary" />
                     </div>
                     <div className="font-semibold text-sm">{item.label}</div>
                     <div className="text-xs text-muted-foreground">{item.description}</div>
                   </motion.div>
                 ))}
               </div>
 
               {/* Achievements */}
               <div>
                 <h4 className="text-lg font-semibold mb-4">Key Achievements</h4>
                 <div className="grid md:grid-cols-2 gap-3">
                   {achievements.map((achievement, index) => (
                     <motion.div
                       key={index}
                       initial={{ opacity: 0, x: -20 }}
                       animate={isInView ? { opacity: 1, x: 0 } : {}}
                       transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                       className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30"
                     >
                       <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                       <span className="text-muted-foreground">{achievement}</span>
                     </motion.div>
                   ))}
                 </div>
               </div>
             </div>
           </div>
         </motion.div>
 
         {/* More Projects Coming Soon */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.5, delay: 0.8 }}
           className="text-center mt-12"
         >
           <p className="text-muted-foreground">
             More projects coming soon. <span className="text-primary">Stay tuned!</span>
           </p>
         </motion.div>
       </div>
     </section>
   );
 };