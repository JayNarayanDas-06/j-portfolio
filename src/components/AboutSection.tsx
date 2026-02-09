import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { ScrollDivider } from '@/components/ScrollDivider';

// ===== EDITABLE TEXT — Change any value below =====
const sectionHeader = {
  label: 'Get to Know Me',
  title: 'About',
  titleHighlight: 'Me',
};

const bio = {
  heading: 'A Passionate',
  headingHighlight: 'Digital Marketing',
  headingSuffix: 'Professional',
  paragraphs: [
    "I'm Jay Narayan Das, an SEO & SMM specialist with over 1 year of experience in improving organic growth through technical SEO, website audits, keyword research, content optimization, and data-driven insights.",
    'I possess a strong technical mindset and focus on enhancing digital presence through analytical strategies and performance tracking. My approach combines creativity with data to deliver measurable results that drive real business growth.',
    'With a background in Computer Science and a deep passion for digital marketing, I bring a unique blend of technical expertise and creative thinking to every project.',
  ],
  quickInfo: [
    { label: 'Location', value: 'Bhubaneswar, Odisha', highlight: false },
    { label: 'Email', value: 'dassitun6@gmail.com', highlight: true },
  ],
};

const education = [
  {
    degree: 'Bachelor of Technology (BTech)',
    field: 'Computer Science and Engineering',
    institution: 'Nalanda Institute of Technology (NIT), Bhubaneswar',
    period: 'Nov 2021 – Jun 2024',
    grade: 'CGPA: 7.5',
  },
  {
    degree: 'Diploma',
    field: 'Mechanical Engineering',
    institution: 'Bhubanananda Odisha School of Engineering (BOSE), Cuttack',
    period: '2017 – 2021',
    grade: 'CGPA: 7.6',
  },
  {
    degree: 'Matriculation',
    field: 'CBSE',
    institution: 'Santanu English Medium School',
    period: 'May 2012 – May 2017',
    grade: 'CGPA: 9.2',
  },
];

const educationHeading = 'Education Journey';
// ===== END EDITABLE TEXT =====

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-20 overflow-hidden md:py-0">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="section-container py-[40px]" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="text-sm font-medium tracking-wider uppercase text-primary">{sectionHeader.label}</span>
          <h2 className="section-title mt-2">
            {sectionHeader.title} <span className="gradient-text text-ring">{sectionHeader.titleHighlight}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            <h3 className="text-2xl font-semibold mb-6">
              {bio.heading} <span className="text-ring">{bio.headingHighlight}</span> {bio.headingSuffix}
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {bio.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {bio.quickInfo.map((info) => (
                <div key={info.label} className="p-4 rounded-xl bg-card border border-border">
                  <div className="text-sm text-muted-foreground">{info.label}</div>
                  <div className={`font-medium ${info.highlight ? 'text-ring' : ''}`}>{info.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              {educationHeading}
            </h3>

            <div className="relative pl-8 space-y-8">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

              {education.map((edu, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }} className="relative">
                  <div className="absolute -left-5 top-1 w-4 h-4 rounded-full bg-primary glow-sm" />
                  <div className="p-5 rounded-xl bg-card border border-border card-hover">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      {edu.period}
                    </div>
                    <h4 className="font-semibold text-lg">
                      {edu.degree} <span className="text-primary">| {edu.grade}</span>
                    </h4>
                    <p className="text-sm text-ring">{edu.field}</p>
                    <p className="text-muted-foreground text-sm mt-1">{edu.institution}</p>
                    <div className="flex items-center gap-2 mt-3 text-sm">
                      <Award className="w-4 h-4 text-accent" />
                      <span className="text-accent font-medium">{edu.grade}</span>
                    </div>
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
