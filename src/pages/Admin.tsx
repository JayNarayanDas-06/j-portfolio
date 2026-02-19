import { useState } from 'react';
import { useContent, defaultHeroContent, defaultAboutContent, defaultExperienceContent, defaultSkillsContent, defaultServicesContent, defaultPortfolioContent, defaultContactContent, defaultFooterContent } from '@/contexts/ContentContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, RotateCcw, Save, ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

type SectionKey = 'hero' | 'about' | 'experience' | 'skills' | 'services' | 'portfolio' | 'contact' | 'footer';

const sectionLabels: Record<SectionKey, string> = {
  hero: '🏠 Hero Section',
  about: '👤 About Section',
  experience: '💼 Experience',
  skills: '⚡ Skills',
  services: '🛠️ Services',
  portfolio: '📁 Portfolio',
  contact: '📧 Contact',
  footer: '📄 Footer',
};

const MAX_SHORT = 100;
const MAX_MEDIUM = 255;
const MAX_LONG = 1000;
const MAX_URL = 500;

const Field = ({ label, value, onChange, multiline = false, maxLength }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean; maxLength?: number }) => {
  const limit = maxLength ?? (multiline ? MAX_LONG : MAX_SHORT);
  const trimmed = (v: string) => v.slice(0, limit);
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      {multiline ? (
        <Textarea value={value} onChange={(e) => onChange(trimmed(e.target.value))} className="bg-secondary/50" rows={3} maxLength={limit} />
      ) : (
        <Input value={value} onChange={(e) => onChange(trimmed(e.target.value))} className="bg-secondary/50" maxLength={limit} />
      )}
      <span className="text-xs text-muted-foreground">{value.length}/{limit}</span>
    </div>
  );
};

const Admin = () => {
  const { content, updateSection, resetSection, resetAll } = useContent();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState<Set<SectionKey>>(new Set(['hero']));

  const toggleSection = (key: SectionKey) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleReset = (section: SectionKey) => {
    resetSection(section);
    toast({ title: `${sectionLabels[section]} reset to defaults` });
  };

  const handleResetAll = () => {
    resetAll();
    toast({ title: 'All content reset to defaults' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">Content Manager</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleResetAll} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset All
            </Button>
            <Button size="sm" onClick={() => navigate('/')} className="gap-2">
              <Save className="w-4 h-4" />
              View Site
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
        <p className="text-muted-foreground text-sm mb-6">
          Edit your website content below. Changes are saved automatically and appear instantly on your site.
        </p>

        {/* HERO */}
        <SectionAccordion title={sectionLabels.hero} isOpen={openSections.has('hero')} onToggle={() => toggleSection('hero')} onReset={() => handleReset('hero')}>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Badge Text" value={content.hero.badge} onChange={(v) => updateSection('hero', { badge: v })} />
            <Field label="Greeting" value={content.hero.greeting} onChange={(v) => updateSection('hero', { greeting: v })} />
            <Field label="Name" value={content.hero.name} onChange={(v) => updateSection('hero', { name: v })} />
            <Field label="Title" value={content.hero.title} onChange={(v) => updateSection('hero', { title: v })} />
            <Field label="Subtitle" value={content.hero.subtitle} onChange={(v) => updateSection('hero', { subtitle: v })} />
            <Field label="Profile Image URL" value={content.hero.profileImage} onChange={(v) => updateSection('hero', { profileImage: v })} maxLength={MAX_URL} />
          </div>
          <Field label="Description" value={content.hero.description} onChange={(v) => updateSection('hero', { description: v })} multiline />
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="CTA: Portfolio" value={content.hero.ctaPortfolio} onChange={(v) => updateSection('hero', { ctaPortfolio: v })} />
            <Field label="CTA: Services" value={content.hero.ctaServices} onChange={(v) => updateSection('hero', { ctaServices: v })} />
            <Field label="CTA: Contact" value={content.hero.ctaContact} onChange={(v) => updateSection('hero', { ctaContact: v })} />
          </div>
          <h4 className="text-sm font-semibold mt-4">Stats</h4>
          {content.hero.stats.map((stat, i) => (
            <div key={i} className="grid grid-cols-2 gap-4">
              <Field label={`Stat ${i + 1} Value`} value={stat.value} onChange={(v) => {
                const stats = [...content.hero.stats];
                stats[i] = { ...stats[i], value: v };
                updateSection('hero', { stats });
              }} />
              <Field label={`Stat ${i + 1} Label`} value={stat.label} onChange={(v) => {
                const stats = [...content.hero.stats];
                stats[i] = { ...stats[i], label: v };
                updateSection('hero', { stats });
              }} />
            </div>
          ))}
        </SectionAccordion>

        {/* ABOUT */}
        <SectionAccordion title={sectionLabels.about} isOpen={openSections.has('about')} onToggle={() => toggleSection('about')} onReset={() => handleReset('about')}>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Section Label" value={content.about.label} onChange={(v) => updateSection('about', { label: v })} />
            <Field label="Title" value={content.about.title} onChange={(v) => updateSection('about', { title: v })} />
            <Field label="Title Highlight" value={content.about.titleHighlight} onChange={(v) => updateSection('about', { titleHighlight: v })} />
            <Field label="Heading" value={content.about.heading} onChange={(v) => updateSection('about', { heading: v })} />
            <Field label="Heading Highlight" value={content.about.headingHighlight} onChange={(v) => updateSection('about', { headingHighlight: v })} />
            <Field label="Heading Suffix" value={content.about.headingSuffix} onChange={(v) => updateSection('about', { headingSuffix: v })} />
          </div>
          <h4 className="text-sm font-semibold mt-4">Bio Paragraphs</h4>
          {content.about.paragraphs.map((p, i) => (
            <Field key={i} label={`Paragraph ${i + 1}`} value={p} onChange={(v) => {
              const paragraphs = [...content.about.paragraphs];
              paragraphs[i] = v;
              updateSection('about', { paragraphs });
            }} multiline />
          ))}
          <h4 className="text-sm font-semibold mt-4">Quick Info</h4>
          {content.about.quickInfo.map((info, i) => (
            <div key={i} className="grid grid-cols-2 gap-4">
              <Field label="Label" value={info.label} onChange={(v) => {
                const quickInfo = [...content.about.quickInfo];
                quickInfo[i] = { ...quickInfo[i], label: v };
                updateSection('about', { quickInfo });
              }} />
              <Field label="Value" value={info.value} onChange={(v) => {
                const quickInfo = [...content.about.quickInfo];
                quickInfo[i] = { ...quickInfo[i], value: v };
                updateSection('about', { quickInfo });
              }} />
            </div>
          ))}
          <h4 className="text-sm font-semibold mt-4">Education</h4>
          {content.about.education.map((edu, i) => (
            <div key={i} className="p-4 rounded-lg bg-secondary/20 border border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Education {i + 1}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
                  const education = content.about.education.filter((_, idx) => idx !== i);
                  updateSection('about', { education });
                }}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Degree" value={edu.degree} onChange={(v) => { const education = [...content.about.education]; education[i] = { ...education[i], degree: v }; updateSection('about', { education }); }} />
                <Field label="Field" value={edu.field} onChange={(v) => { const education = [...content.about.education]; education[i] = { ...education[i], field: v }; updateSection('about', { education }); }} />
                <Field label="Institution" value={edu.institution} onChange={(v) => { const education = [...content.about.education]; education[i] = { ...education[i], institution: v }; updateSection('about', { education }); }} />
                <Field label="Period" value={edu.period} onChange={(v) => { const education = [...content.about.education]; education[i] = { ...education[i], period: v }; updateSection('about', { education }); }} />
                <Field label="Grade" value={edu.grade} onChange={(v) => { const education = [...content.about.education]; education[i] = { ...education[i], grade: v }; updateSection('about', { education }); }} />
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="gap-2 mt-2" onClick={() => {
            const education = [...content.about.education, { degree: '', field: '', institution: '', period: '', grade: '' }];
            updateSection('about', { education });
          }}><Plus className="w-4 h-4" /> Add Education</Button>
        </SectionAccordion>

        {/* EXPERIENCE */}
        <SectionAccordion title={sectionLabels.experience} isOpen={openSections.has('experience')} onToggle={() => toggleSection('experience')} onReset={() => handleReset('experience')}>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Section Label" value={content.experience.label} onChange={(v) => updateSection('experience', { label: v })} />
            <Field label="Title" value={content.experience.title} onChange={(v) => updateSection('experience', { title: v })} />
            <Field label="Title Highlight" value={content.experience.titleHighlight} onChange={(v) => updateSection('experience', { titleHighlight: v })} />
          </div>
          <Field label="Subtitle" value={content.experience.subtitle} onChange={(v) => updateSection('experience', { subtitle: v })} multiline />
          {content.experience.experiences.map((exp, i) => (
            <div key={i} className="p-4 rounded-lg bg-secondary/20 border border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Experience {i + 1}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
                  const experiences = content.experience.experiences.filter((_, idx) => idx !== i);
                  updateSection('experience', { experiences });
                }}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Title" value={exp.title} onChange={(v) => { const experiences = [...content.experience.experiences]; experiences[i] = { ...experiences[i], title: v }; updateSection('experience', { experiences }); }} />
                <Field label="Company" value={exp.company} onChange={(v) => { const experiences = [...content.experience.experiences]; experiences[i] = { ...experiences[i], company: v }; updateSection('experience', { experiences }); }} />
                <Field label="Location" value={exp.location} onChange={(v) => { const experiences = [...content.experience.experiences]; experiences[i] = { ...experiences[i], location: v }; updateSection('experience', { experiences }); }} />
                <Field label="Period" value={exp.period} onChange={(v) => { const experiences = [...content.experience.experiences]; experiences[i] = { ...experiences[i], period: v }; updateSection('experience', { experiences }); }} />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={exp.current} onChange={(e) => { const experiences = [...content.experience.experiences]; experiences[i] = { ...experiences[i], current: e.target.checked }; updateSection('experience', { experiences }); }} className="rounded" />
                <span className="text-sm">Current position</span>
              </div>
              <h5 className="text-xs font-semibold mt-2">Responsibilities</h5>
              {exp.responsibilities.map((r, ri) => (
                <div key={ri} className="flex gap-2 items-center">
                  <Input value={r} onChange={(e) => {
                    const experiences = [...content.experience.experiences];
                    const responsibilities = [...experiences[i].responsibilities];
                    responsibilities[ri] = e.target.value;
                    experiences[i] = { ...experiences[i], responsibilities };
                    updateSection('experience', { experiences });
                  }} className="bg-secondary/50 text-sm" />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => {
                    const experiences = [...content.experience.experiences];
                    const responsibilities = experiences[i].responsibilities.filter((_, idx) => idx !== ri);
                    experiences[i] = { ...experiences[i], responsibilities };
                    updateSection('experience', { experiences });
                  }}><Trash2 className="w-3 h-3 text-destructive" /></Button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="gap-1 text-xs" onClick={() => {
                const experiences = [...content.experience.experiences];
                experiences[i] = { ...experiences[i], responsibilities: [...experiences[i].responsibilities, ''] };
                updateSection('experience', { experiences });
              }}><Plus className="w-3 h-3" /> Add Responsibility</Button>
            </div>
          ))}
          <Button variant="outline" size="sm" className="gap-2 mt-2" onClick={() => {
            const experiences = [...content.experience.experiences, { title: '', company: '', location: '', period: '', current: false, responsibilities: [''] }];
            updateSection('experience', { experiences });
          }}><Plus className="w-4 h-4" /> Add Experience</Button>
        </SectionAccordion>

        {/* SKILLS */}
        <SectionAccordion title={sectionLabels.skills} isOpen={openSections.has('skills')} onToggle={() => toggleSection('skills')} onReset={() => handleReset('skills')}>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Section Label" value={content.skills.label} onChange={(v) => updateSection('skills', { label: v })} />
            <Field label="Title" value={content.skills.title} onChange={(v) => updateSection('skills', { title: v })} />
            <Field label="Title Highlight" value={content.skills.titleHighlight} onChange={(v) => updateSection('skills', { titleHighlight: v })} />
          </div>
          <Field label="Subtitle" value={content.skills.subtitle} onChange={(v) => updateSection('skills', { subtitle: v })} multiline />
          {content.skills.skills.map((skill, i) => (
            <div key={i} className="flex gap-3 items-center">
              <Input value={skill.name} onChange={(e) => {
                const skills = [...content.skills.skills];
                skills[i] = { ...skills[i], name: e.target.value };
                updateSection('skills', { skills });
              }} placeholder="Skill name" className="bg-secondary/50 flex-1" />
              <Input type="number" value={skill.level} min={0} max={100} onChange={(e) => {
                const skills = [...content.skills.skills];
                skills[i] = { ...skills[i], level: parseInt(e.target.value) || 0 };
                updateSection('skills', { skills });
              }} className="bg-secondary/50 w-20" />
              <span className="text-xs text-muted-foreground">%</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => {
                const skills = content.skills.skills.filter((_, idx) => idx !== i);
                updateSection('skills', { skills });
              }}><Trash2 className="w-3 h-3 text-destructive" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" className="gap-2 mt-2" onClick={() => {
            const skills = [...content.skills.skills, { name: '', level: 50 }];
            updateSection('skills', { skills });
          }}><Plus className="w-4 h-4" /> Add Skill</Button>
        </SectionAccordion>

        {/* SERVICES */}
        <SectionAccordion title={sectionLabels.services} isOpen={openSections.has('services')} onToggle={() => toggleSection('services')} onReset={() => handleReset('services')}>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Section Label" value={content.services.label} onChange={(v) => updateSection('services', { label: v })} />
            <Field label="Title" value={content.services.title} onChange={(v) => updateSection('services', { title: v })} />
            <Field label="Title Highlight" value={content.services.titleHighlight} onChange={(v) => updateSection('services', { titleHighlight: v })} />
            <Field label="CTA Button" value={content.services.ctaText} onChange={(v) => updateSection('services', { ctaText: v })} />
          </div>
          <Field label="Subtitle" value={content.services.subtitle} onChange={(v) => updateSection('services', { subtitle: v })} multiline />
          {content.services.services.map((svc, i) => (
            <div key={i} className="p-4 rounded-lg bg-secondary/20 border border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Service {i + 1}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
                  const services = content.services.services.filter((_, idx) => idx !== i);
                  updateSection('services', { services });
                }}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
              <Field label="Title" value={svc.title} onChange={(v) => { const services = [...content.services.services]; services[i] = { ...services[i], title: v }; updateSection('services', { services }); }} />
              <Field label="Description" value={svc.description} onChange={(v) => { const services = [...content.services.services]; services[i] = { ...services[i], description: v }; updateSection('services', { services }); }} multiline />
            </div>
          ))}
          <Button variant="outline" size="sm" className="gap-2 mt-2" onClick={() => {
            const services = [...content.services.services, { title: '', description: '' }];
            updateSection('services', { services });
          }}><Plus className="w-4 h-4" /> Add Service</Button>
        </SectionAccordion>

        {/* PORTFOLIO */}
        <SectionAccordion title={sectionLabels.portfolio} isOpen={openSections.has('portfolio')} onToggle={() => toggleSection('portfolio')} onReset={() => handleReset('portfolio')}>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Section Label" value={content.portfolio.label} onChange={(v) => updateSection('portfolio', { label: v })} />
            <Field label="Title" value={content.portfolio.title} onChange={(v) => updateSection('portfolio', { title: v })} />
            <Field label="Title Highlight" value={content.portfolio.titleHighlight} onChange={(v) => updateSection('portfolio', { titleHighlight: v })} />
          </div>
          <Field label="Subtitle" value={content.portfolio.subtitle} onChange={(v) => updateSection('portfolio', { subtitle: v })} multiline />
          <p className="text-xs text-muted-foreground mb-2">Projects are managed in the content defaults. Use this section to edit top-level portfolio fields.</p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <Field label="Coming Soon Text" value={content.portfolio.comingSoonText} onChange={(v) => updateSection('portfolio', { comingSoonText: v })} />
            <Field label="Coming Soon Highlight" value={content.portfolio.comingSoonHighlight} onChange={(v) => updateSection('portfolio', { comingSoonHighlight: v })} />
          </div>
        </SectionAccordion>

        {/* CONTACT */}
        <SectionAccordion title={sectionLabels.contact} isOpen={openSections.has('contact')} onToggle={() => toggleSection('contact')} onReset={() => handleReset('contact')}>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Section Label" value={content.contact.label} onChange={(v) => updateSection('contact', { label: v })} />
            <Field label="Title" value={content.contact.title} onChange={(v) => updateSection('contact', { title: v })} />
            <Field label="Title Highlight" value={content.contact.titleHighlight} onChange={(v) => updateSection('contact', { titleHighlight: v })} />
            <Field label="Email" value={content.contact.email} onChange={(v) => updateSection('contact', { email: v })} />
            <Field label="Location" value={content.contact.location} onChange={(v) => updateSection('contact', { location: v })} />
          </div>
          <Field label="Subtitle" value={content.contact.subtitle} onChange={(v) => updateSection('contact', { subtitle: v })} multiline />
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="CTA Line 1" value={content.contact.ctaLine1} onChange={(v) => updateSection('contact', { ctaLine1: v })} />
            <Field label="CTA Line 2" value={content.contact.ctaLine2} onChange={(v) => updateSection('contact', { ctaLine2: v })} />
          </div>
        </SectionAccordion>

        {/* FOOTER */}
        <SectionAccordion title={sectionLabels.footer} isOpen={openSections.has('footer')} onToggle={() => toggleSection('footer')} onReset={() => handleReset('footer')}>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Brand Name" value={content.footer.brandName} onChange={(v) => updateSection('footer', { brandName: v })} />
            <Field label="Email" value={content.footer.email} onChange={(v) => updateSection('footer', { email: v })} />
            <Field label="Location" value={content.footer.location} onChange={(v) => updateSection('footer', { location: v })} />
            <Field label="Copyright Name" value={content.footer.copyright} onChange={(v) => updateSection('footer', { copyright: v })} />
          </div>
          <Field label="Tagline" value={content.footer.tagline} onChange={(v) => updateSection('footer', { tagline: v })} multiline />
          <h4 className="text-sm font-semibold mt-4">🖼️ Logo & Favicon</h4>
          <p className="text-xs text-muted-foreground">Paste an image URL to replace the text logo. Leave empty to use text.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Field label="Logo Image URL" value={content.footer.logoUrl} onChange={(v) => updateSection('footer', { logoUrl: v })} maxLength={MAX_URL} />
              {content.footer.logoUrl && (
                <div className="p-3 rounded-lg bg-secondary/20 border border-border">
                  <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                  <img src={content.footer.logoUrl} alt="Logo preview" className="h-10 w-auto object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Field label="Favicon URL" value={content.footer.faviconUrl} onChange={(v) => updateSection('footer', { faviconUrl: v })} maxLength={MAX_URL} />
              {content.footer.faviconUrl && (
                <div className="p-3 rounded-lg bg-secondary/20 border border-border">
                  <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                  <img src={content.footer.faviconUrl} alt="Favicon preview" className="h-8 w-8 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
              )}
            </div>
          </div>
        </SectionAccordion>
      </div>
    </div>
  );
};

const SectionAccordion = ({ title, isOpen, onToggle, onReset, children }: { title: string; isOpen: boolean; onToggle: () => void; onReset: () => void; children: React.ReactNode }) => (
  <div className="rounded-xl border border-border bg-card overflow-hidden">
    <button onClick={onToggle} className="w-full flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors">
      <span className="font-semibold">{title}</span>
      {isOpen ? <ChevronDown className="w-5 h-5 text-muted-foreground" /> : <ChevronRight className="w-5 h-5 text-muted-foreground" />}
    </button>
    {isOpen && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 pt-0 space-y-4 border-t border-border">
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={onReset} className="gap-1 text-xs text-muted-foreground">
            <RotateCcw className="w-3 h-3" /> Reset to default
          </Button>
        </div>
        {children}
      </motion.div>
    )}
  </div>
);

export default Admin;
