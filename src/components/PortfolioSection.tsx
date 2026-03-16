import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, TrendingUp, Users, Target, BarChart, ChevronLeft, ChevronRight, Image, Briefcase } from 'lucide-react';
import auditfilingFavicon from '@/assets/auditfiling-favicon.png';
import cloudsatIcon from '@/assets/cloudsat-icon.png';
import i4optionIcon from '@/assets/i4option-icon.png';
import { ScrollDivider } from '@/components/ScrollDivider';
import { SectionBackground } from '@/components/SectionBackground';
import { useContent } from '@/contexts/ContentContext';

const iconMap: Record<string, React.ElementType> = { Target, TrendingUp, BarChart, Users };
const projectIcons: Record<string, string> = {
  auditfiling: auditfilingFavicon,
  cloudsat: cloudsatIcon,
  i4option: i4optionIcon
};

const SpiralRing = ({ index }: { index: number }) => (
  <div className="relative" style={{ filter: 'drop-shadow(0 2px 3px hsl(0 0% 0% / 0.3))' }}>
    {/* Outer ring */}
    <div
      className="w-6 h-10 rounded-full border-[3px] relative z-10"
      style={{
        borderColor: 'hsl(0 0% 72%)',
        background: 'linear-gradient(180deg, hsl(0 0% 85%) 0%, hsl(0 0% 65%) 40%, hsl(0 0% 80%) 60%, hsl(0 0% 70%) 100%)',
        boxShadow: 'inset 0 1px 2px hsl(0 0% 100% / 0.4), inset 0 -1px 2px hsl(0 0% 0% / 0.2)',
      }}
    />
    {/* Inner hole / shadow where ring threads through */}
    <div
      className="absolute top-3.5 left-1/2 -translate-x-1/2 w-2 h-3 rounded-full"
      style={{
        background: 'linear-gradient(180deg, hsl(0 0% 20%) 0%, hsl(0 0% 35%) 100%)',
        boxShadow: 'inset 0 1px 2px hsl(0 0% 0% / 0.5)',
      }}
    />
    {/* Highlight gleam */}
    <div
      className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-2 rounded-full"
      style={{
        background: 'linear-gradient(180deg, hsl(0 0% 100% / 0.6) 0%, transparent 100%)',
      }}
    />
  </div>
);

export const PortfolioSection = () => {
  const ref = useRef(null);
  const { content } = useContent();
  const p = content.portfolio;
  const projects = p.projects || [];

  const [activeProject, setActiveProject] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [flipDirection, setFlipDirection] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);

  const project = projects[activeProject];
  const images = project?.portfolioImages?.length ? project.portfolioImages : [];

  const handleProjectChange = (index: number) => {
    if (index === activeProject || isFlipping) return;
    setFlipDirection(index > activeProject ? 1 : -1);
    setIsFlipping(true);
    setTimeout(() => {
      setActiveProject(index);
      setShowPreview(false);
      setCurrentSlide(0);
      setTimeout(() => setIsFlipping(false), 400);
    }, 300);
  };

  const handleTogglePreview = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setShowPreview(!showPreview);
      setCurrentSlide(0);
      setTimeout(() => setIsFlipping(false), 400);
    }, 300);
  };

  useEffect(() => {
    if (!showPreview || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length, showPreview]);

  if (!project) return null;

  const spiralRings = Array.from({ length: 8 }, (_, i) => i);

  return (
    <section id="portfolio" className="relative py-20 overflow-hidden md:py-0">
      <SectionBackground variant="waves" />

      <div className="section-container py-[40px] pb-0 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="text-sm font-medium tracking-wider uppercase text-primary">{p.label}</span>
          <h2 className="section-title mt-2 inline-flex items-center justify-center w-full gap-3">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="p-3 rounded-xl bg-card border border-border shadow-lg">
              <Briefcase className="w-6 h-6 text-primary" />
            </motion.div>
            {p.title} <span className="gradient-text text-ring mx-[5px]">{p.titleHighlight}</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">{p.subtitle}</p>
        </motion.div>

        {/* Project Tabs */}
        {projects.length > 1 &&
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="flex justify-center gap-2 mb-8 flex-wrap">
            {projects.map((proj, i) =>
          <button
            key={proj.id}
            onClick={() => handleProjectChange(i)}
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

        {/* 3D Calendar Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto"
          style={{ perspective: '1800px' }}
        >
          
          <div
            className="relative"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(2deg)',
            }}
          >
            {/* Metallic Spiral Binding */}
            <div className="relative z-30 flex justify-center px-10 -mb-4" style={{ gap: 'calc((100% - 80px) / 9)' }}>
              {spiralRings.map((i) => <SpiralRing key={i} index={i} />)}
            </div>

            {/* Calendar Top - Project Header */}
            <div
              className="relative z-20 rounded-t-2xl overflow-hidden pt-5"
              style={{
                background: 'linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.85) 100%)',
                boxShadow: '0 -2px 10px hsl(0 0% 0% / 0.1), inset 0 1px 0 hsl(0 0% 100% / 0.1)',
              }}
            >
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg bg-background flex items-center justify-center overflow-hidden"
                    style={{ boxShadow: '0 2px 8px hsl(0 0% 0% / 0.2)' }}
                  >
                    <img src={projectIcons[project.icon] || auditfilingFavicon} alt={project.title} className="w-7 h-7 object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider text-primary-foreground/70">{project.label}</span>
                    <h3 className="text-lg md:text-xl font-bold text-primary-foreground">{project.title.split('–')[0].split('Website')[0].trim()}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {images.length > 0 && !showPreview &&
                  <button onClick={handleTogglePreview} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors font-medium text-primary-foreground text-sm backdrop-blur-sm">
                      Project Preview
                      <Image className="w-3.5 h-3.5" />
                    </button>
                  }
                  {showPreview &&
                  <button onClick={handleTogglePreview} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors text-xs font-medium text-primary-foreground backdrop-blur-sm">
                      Case Study
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  }
                </div>
              </div>
              {/* Bottom edge shadow for depth */}
              <div className="h-1" style={{ background: 'linear-gradient(180deg, hsl(0 0% 0% / 0.15), transparent)' }} />
            </div>

            {/* Calendar Bottom - Content Page */}
            <div className="relative min-h-[200px]" style={{ perspective: '1200px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeProject}-${showPreview ? 'preview' : 'study'}`}
                  initial={{ rotateX: -90, opacity: 0, transformOrigin: 'top center' }}
                  animate={{ rotateX: 0, opacity: 1, transformOrigin: 'top center' }}
                  exit={{ rotateX: 90, opacity: 0, transformOrigin: 'top center' }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="rounded-b-2xl overflow-hidden relative"
                  style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    background: 'linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.95) 100%)',
                    border: '1px solid hsl(var(--border))',
                    borderTop: 'none',
                    boxShadow: '0 8px 32px -8px hsl(0 0% 0% / 0.2), 0 2px 8px hsl(0 0% 0% / 0.1), inset 0 1px 0 hsl(0 0% 100% / 0.05)',
                  }}
                >
                  {/* Subtle paper texture overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' viewBox=\'0 0 4 4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 3h1v1H1V3zm2-2h1v1H3V1z\' fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                    }}
                  />

                  {!showPreview ? (
                  /* Case Study Page */
                  <div className="p-6 md:p-8 relative">
                      {/* Highlights Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {project.highlights.map((item, index) => {
                        const IconComp = iconMap[item.icon] || Target;
                        return (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                            className="text-center p-4 rounded-xl border border-border bg-secondary/10"
                            style={{ boxShadow: '0 2px 8px hsl(0 0% 0% / 0.06)' }}
                          >
                              <div className="w-10 h-10 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                                <IconComp className="w-5 h-5 text-primary" />
                              </div>
                              <div className="font-semibold text-sm">{item.label}</div>
                              <div className="text-xs text-muted-foreground">{item.description}</div>
                            </motion.div>);
                      })}
                      </div>

                      {/* Achievements */}
                      <h4 className="text-lg font-semibold mb-4">Key Achievements</h4>
                      <div className="grid md:grid-cols-2 gap-3 mb-6">
                        {project.achievements.map((achievement, index) =>
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-secondary/10"
                      >
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{achievement}</span>
                          </motion.div>
                      )}
                      </div>
                    </div>) : (

                  /* Preview Page */
                  <div className="p-6 md:p-8">
                      <div className="relative rounded-xl overflow-hidden border border-border bg-secondary/20 aspect-video" style={{ boxShadow: 'inset 0 2px 4px hsl(0 0% 0% / 0.1)' }}>
                        {images.map((img, i) =>
                      <img
                        key={i}
                        src={img}
                        alt={`Project preview ${i + 1}`}
                        loading="lazy"
                        width={960}
                        height={540}
                        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`} />
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
                    </div>)
                  }
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Stacked pages effect - realistic paper stack */}
            <div className="relative -mt-0.5" style={{ transform: 'translateZ(-2px)' }}>
              <div
                className="mx-2 h-2.5 rounded-b-2xl"
                style={{
                  background: 'linear-gradient(180deg, hsl(var(--card) / 0.7) 0%, hsl(var(--card) / 0.5) 100%)',
                  border: '1px solid hsl(var(--border) / 0.6)',
                  borderTop: 'none',
                  boxShadow: '0 4px 12px -4px hsl(0 0% 0% / 0.15)',
                }}
              />
              <div
                className="mx-4 h-2 rounded-b-2xl -mt-0.5"
                style={{
                  background: 'linear-gradient(180deg, hsl(var(--card) / 0.4) 0%, hsl(var(--card) / 0.25) 100%)',
                  border: '1px solid hsl(var(--border) / 0.4)',
                  borderTop: 'none',
                  boxShadow: '0 4px 8px -4px hsl(0 0% 0% / 0.1)',
                }}
              />
              <div
                className="mx-6 h-1.5 rounded-b-2xl -mt-0.5"
                style={{
                  background: 'hsl(var(--card) / 0.15)',
                  border: '1px solid hsl(var(--border) / 0.2)',
                  borderTop: 'none',
                }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.8 }} className="text-center mt-12">
          <p className="text-muted-foreground">
            {p.comingSoonText} <span className="text-primary">{p.comingSoonHighlight}</span>
          </p>
        </motion.div>
      </div>
      <ScrollDivider />
    </section>
  );
};
