import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, TrendingUp, Users, Target, BarChart, ChevronLeft, ChevronRight, Image, Briefcase } from 'lucide-react';
import auditfilingFavicon from '@/assets/auditfiling-favicon.png';
import cloudsatIcon from '@/assets/cloudsat-icon.png';
import i4optionIcon from '@/assets/i4option-icon.png';
import { Button } from '@/components/ui/button';
import { ScrollDivider } from '@/components/ScrollDivider';
import { SectionBackground } from '@/components/SectionBackground';
import { useContent } from '@/contexts/ContentContext';

const iconMap: Record<string, React.ElementType> = { Target, TrendingUp, BarChart, Users };
const projectIcons: Record<string, string> = {
  auditfiling: auditfilingFavicon,
  cloudsat: cloudsatIcon,
  i4option: i4optionIcon
};

export const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { content } = useContent();
  const p = content.portfolio;
  const projects = p.projects || [];

  const [activeProject, setActiveProject] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const project = projects[activeProject];
  const images = project?.portfolioImages?.length ? project.portfolioImages : [];

  useEffect(() => {
    setShowPreview(false);
    setCurrentSlide(0);
  }, [activeProject]);

  useEffect(() => {
    if (!showPreview || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length, showPreview]);

  if (!project) return null;

  return (
    <section id="portfolio" className="relative py-20 overflow-hidden md:py-0">
      <SectionBackground variant="waves" />

      <div className="section-container py-[40px] pb-0 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="text-sm font-medium tracking-wider uppercase text-primary">{p.label}</span>
          <h2 className="section-title mt-2 inline-flex items-center justify-center w-full gap-3">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="p-3 rounded-xl bg-card border border-border shadow-lg">
              <Briefcase className="w-6 h-6 text-blue-400" />
            </motion.div>
            {p.title} <span className="gradient-text text-ring mx-[5px]">{p.titleHighlight}</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">{p.subtitle}</p>
        </motion.div>

        {/* Project Tabs */}
        {projects.length > 1 &&
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }} className="flex justify-center gap-2 mb-8 flex-wrap">
            {projects.map((proj, i) =>
          <button
            key={proj.id}
            onClick={() => setActiveProject(i)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
            i === activeProject ?
            'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20' :
            'bg-card border-border hover:bg-accent hover:text-accent-foreground'}`
            }>

                <img src={projectIcons[proj.icon] || auditfilingFavicon} alt="" className="w-5 h-5 rounded object-contain" />
                {proj.title.split('–')[0].split('Website')[0].trim()}
              </button>
          )}
          </motion.div>
        }

        <motion.div
          key={activeProject}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto">

          <div className="rounded-2xl bg-card border border-border overflow-hidden card-hover">
            <div className="p-6 md:p-8 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <a href={project.websiteUrl || undefined} target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden border border-border ${project.websiteUrl ? 'hover:opacity-80 transition-opacity' : 'pointer-events-none'}`}>
                    <img src={projectIcons[project.icon] || auditfilingFavicon} alt={project.title} className="w-8 h-8 object-contain" />
                  </a>
                  <div>
                    <span className="text-sm text-primary font-medium">{project.label}</span>
                    <h3 className="text-2xl md:text-3xl font-bold mt-1">{project.title}</h3>
                  </div>
                </div>
                {images.length > 0 && !showPreview &&
                <Button variant="outline" className="rounded-full gap-2" onClick={() => {setShowPreview(true);setCurrentSlide(0);}}>
                    Project Preview
                    <Image className="w-4 h-4" />
                  </Button>
                }
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {project.highlights.map((item, index) => {
                  const IconComp = iconMap[item.icon] || Target;
                  return (
                    <motion.div key={item.label} initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }} className="text-center p-4 rounded-xl border border-border bg-slate-200">
                      <div className="w-10 h-10 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <IconComp className="w-5 h-5 text-primary" />
                      </div>
                      <div className="font-semibold text-sm">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </motion.div>);

                })}
              </div>

              {!showPreview ?
              <div>
                  <h4 className="text-lg font-semibold mb-4">Key Achievements</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {project.achievements.map((achievement, index) =>
                  <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }} className="flex items-start gap-3 p-3 rounded-lg bg-slate-200">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{achievement}</span>
                      </motion.div>
                  )}
                  </div>
                </div> :

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold">Project Preview</h4>
                    <Button variant="outline" size="sm" className="rounded-full gap-2" onClick={() => setShowPreview(false)}>
                      Key Achievements
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="relative rounded-xl overflow-hidden border border-border bg-secondary/20 aspect-video">
                    {images.map((img, i) =>
                  <img key={i} src={img} alt={`Project preview ${i + 1}`} loading="lazy" width={960} height={540} className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`} />
                  )}
                    {images.length > 1 &&
                  <>
                        <button onClick={() => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-colors">
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button onClick={() => setCurrentSlide((prev) => (prev + 1) % images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {images.map((_, i) =>
                      <button key={i} onClick={() => setCurrentSlide(i)} className={`w-2 h-2 rounded-full transition-colors ${i === currentSlide ? 'bg-primary' : 'bg-foreground/30'}`} />
                      )}
                        </div>
                      </>
                  }
                  </div>
                </motion.div>
              }
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.8 }} className="text-center mt-12">
          <p className="text-muted-foreground">
            {p.comingSoonText} <span className="text-primary">{p.comingSoonHighlight}</span>
          </p>
        </motion.div>
      </div>
      <ScrollDivider />
    </section>);

};