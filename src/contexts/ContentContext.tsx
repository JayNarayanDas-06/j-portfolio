import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ===== DEFAULT CONTENT FOR ALL SECTIONS =====

export const defaultHeroContent = {
  badge: 'Available for new opportunities',
  greeting: 'Hey, there',
  name: 'JAY NARAYAN DAS',
  title: 'SEO & SMM Specialist',
  titleSeparator: '|',
  subtitle: 'Digital Marketing Executive',
  description: 'Specialized in driving organic growth through technical SEO, data-driven insights, and strategic content optimization. Transforming digital presence into measurable results.',
  ctaPortfolio: 'View Portfolio',
  ctaServices: 'Explore Services',
  ctaContact: 'Contact Me',
  profileImage: '/lovable-uploads/jay-profile-new.png?v=2',
  profileAlt: 'Jay Narayan Das - SEO & SMM Specialist',
  stats: [
    { value: '1+', label: 'Years Experience' },
    { value: '7+', label: 'Projects Done' },
    { value: '95%', label: 'Client Satisfaction' },
  ],
};

export const defaultAboutContent = {
  label: 'Get to Know Me',
  title: 'About',
  titleHighlight: 'Me',
  heading: 'A Passionate',
  headingHighlight: 'Digital Marketing',
  headingSuffix: 'Professional',
  paragraphs: [
    "I'm Jay Narayan Das, an SEO & SMM specialist with over 1 year of experience in improving organic growth through technical SEO, website audits, keyword research, content optimization, and data-driven insights.",
    'I possess a strong technical mindset and focus on enhancing digital presence through analytical strategies and performance tracking. My approach combines creativity with data to deliver measurable results that drive real business growth.',
    'With a background in Computer Science and a deep passion for digital marketing, I bring a unique blend of technical expertise and creative thinking to every project.',
  ],
  quickInfo: [
    { label: 'Location', value: 'Bhubaneswar, Odisha' },
    { label: 'Email', value: 'dassitun6@gmail.com' },
  ],
  education: [
    { degree: 'Bachelor of Technology (BTech)', field: 'Computer Science and Engineering', institution: 'Nalanda Institute of Technology (NIT), Bhubaneswar', period: 'Nov 2021 – Jun 2024', grade: 'CGPA: 7.5' },
    { degree: 'Diploma', field: 'Mechanical Engineering', institution: 'Bhubanananda Odisha School of Engineering (BOSE), Cuttack', period: '2017 – 2021', grade: 'CGPA: 7.6' },
    { degree: 'Matriculation', field: 'CBSE', institution: 'Santanu English Medium School', period: 'May 2012 – May 2017', grade: 'CGPA: 9.2' },
  ],
};

export const defaultExperienceContent = {
  label: 'My Journey',
  title: 'Work',
  titleHighlight: 'Experience',
  subtitle: 'Building expertise through hands-on experience in digital marketing and SEO optimization',
  experiences: [
    {
      title: 'Digital Marketing Executive',
      company: 'CloudSat',
      location: 'Bhubaneswar, Odisha',
      period: 'April 2025 – Present',
      current: true,
      responsibilities: [
        'Developing and executing comprehensive SEO strategies',
        'Performance tracking and analytics-driven optimization',
        'Content optimization for improved search visibility',
        'Managing digital marketing campaigns across platforms',
      ],
    },
    {
      title: 'SEO Intern',
      company: 'Seoczar IT Services Pvt Ltd',
      location: 'Bhubaneswar, Odisha',
      period: 'September 2024 – April 2025',
      current: false,
      responsibilities: [
        'Conducted comprehensive SEO audits and analysis',
        'Performed advanced keyword research and competitive analysis',
        'Implemented technical SEO optimization strategies',
        'Analyzed and reported on campaign performance metrics',
      ],
    },
  ],
};

export const defaultSkillsContent = {
  label: 'What I Do Best',
  title: 'Skills &',
  titleHighlight: 'Expertise',
  subtitle: 'A comprehensive skill set built through continuous learning and hands-on experience',
  skills: [
    { name: 'Technical SEO & Website Auditing', level: 90 },
    { name: 'Keyword Research & Search Intent', level: 92 },
    { name: 'On-Page SEO & Content Optimization', level: 88 },
    { name: 'Organic Traffic Growth', level: 85 },
    { name: 'SEO Analytics & Reporting', level: 90 },
    { name: 'Competitor & Market Research', level: 87 },
    { name: 'Social Media Strategy', level: 82 },
    { name: 'Content Planning & Scripting', level: 85 },
    { name: 'Trending Content Research', level: 88 },
    { name: 'Google Analytics & Search Console', level: 91 },
  ],
};

export const defaultServicesContent = {
  label: 'How I Can Help',
  title: 'My',
  titleHighlight: 'Services',
  subtitle: 'Comprehensive digital marketing solutions to elevate your online presence and drive measurable growth',
  services: [
    { title: 'SEO Optimization & Technical Audits', description: 'Comprehensive website audits to identify and fix technical issues, improve site speed, and enhance crawlability for better search rankings.' },
    { title: 'Keyword Research & Content Strategy', description: 'Data-driven keyword research and content planning to target high-value search terms and capture qualified organic traffic.' },
    { title: 'On-Page & Off-Page SEO', description: 'Optimize page elements, meta tags, internal linking, and build quality backlinks to boost domain authority and visibility.' },
    { title: 'Social Media Optimization (SMO)', description: 'Strategic social media presence management to increase brand awareness, engagement, and drive traffic from social platforms.' },
    { title: 'Content Strategy & Growth Planning', description: 'Develop content calendars and strategies aligned with SEO goals to establish thought leadership and drive consistent growth.' },
    { title: 'Performance Tracking & Reporting', description: 'Regular performance analysis with actionable insights using Google Analytics and Search Console to measure ROI and optimize strategies.' },
  ],
  ctaText: 'Get Started',
};

export const defaultPortfolioContent = {
  label: 'Featured Work',
  title: 'My',
  titleHighlight: 'Portfolio',
  subtitle: 'Real-world projects showcasing measurable results in SEO and digital marketing',
  featuredProject: {
    label: 'Featured Case Study',
    title: 'AuditFiling Website SEO & SMO',
    websiteUrl: 'https://www.auditfiling.com/',
    websiteLabel: 'Visit Website',
  },
  achievements: [
    'Improved keyword rankings across targeted search terms',
    'Increased user engagement and brand visibility',
    'Developed strategic social media marketing campaigns',
    'Expanded digital reach through SEO-driven content',
  ],
  portfolioImages: [
    'https://i.postimg.cc/GhfVRXHg/Company-Registration-in-Odisha-72.png',
    'https://i.postimg.cc/qBbZc1Xz/Company-Registration-in-Odisha.png',
    'https://i.postimg.cc/3xpSTYMw/FSSAI-Registration-in-Odisha(1).png',
    'https://i.postimg.cc/q7x1Nwvp/FSSAI-Registration-in-Odisha(2).png',
    'https://i.postimg.cc/SQvDYJkn/FSSAI-Registration-in-Odisha(3).png',
  ] as string[],
  comingSoonText: 'More projects coming soon.',
  comingSoonHighlight: 'Stay tuned!',
};

export const defaultContactContent = {
  label: 'Get In Touch',
  title: "Let's",
  titleHighlight: 'Connect',
  subtitle: "Have a project in mind? Let's discuss how I can help grow your digital presence.",
  email: 'dassitun6@gmail.com',
  location: 'Bhubaneswar, Odisha, India',
  ctaLine1: 'Ready to elevate your digital presence?',
  ctaLine2: "Let's create something amazing together!",
};

export const defaultFooterContent = {
  brandName: 'Jay',
  brandDot: '.',
  tagline: 'SEO & SMM Specialist focused on driving organic growth through technical SEO, data-driven insights, and strategic content optimization.',
  email: 'dassitun6@gmail.com',
  location: 'Bhubaneswar, Odisha, India',
  copyright: 'Jay Narayan Das',
};

// ===== TYPES =====
export interface SiteContent {
  hero: typeof defaultHeroContent;
  about: typeof defaultAboutContent;
  experience: typeof defaultExperienceContent;
  skills: typeof defaultSkillsContent;
  services: typeof defaultServicesContent;
  portfolio: typeof defaultPortfolioContent;
  contact: typeof defaultContactContent;
  footer: typeof defaultFooterContent;
}

const defaultContent: SiteContent = {
  hero: defaultHeroContent,
  about: defaultAboutContent,
  experience: defaultExperienceContent,
  skills: defaultSkillsContent,
  services: defaultServicesContent,
  portfolio: defaultPortfolioContent,
  contact: defaultContactContent,
  footer: defaultFooterContent,
};

const STORAGE_KEY = 'site-content';

function loadContent(): SiteContent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Deep merge with defaults to handle new fields
      return {
        hero: { ...defaultHeroContent, ...parsed.hero },
        about: { ...defaultAboutContent, ...parsed.about },
        experience: { ...defaultExperienceContent, ...parsed.experience },
        skills: { ...defaultSkillsContent, ...parsed.skills },
        services: { ...defaultServicesContent, ...parsed.services },
        portfolio: { ...defaultPortfolioContent, ...parsed.portfolio },
        contact: { ...defaultContactContent, ...parsed.contact },
        footer: { ...defaultFooterContent, ...parsed.footer },
      };
    }
  } catch (e) {
    console.error('Failed to load content from localStorage', e);
  }
  return defaultContent;
}

interface ContentContextType {
  content: SiteContent;
  updateSection: <K extends keyof SiteContent>(section: K, data: Partial<SiteContent[K]>) => void;
  resetSection: (section: keyof SiteContent) => void;
  resetAll: () => void;
}

const ContentContext = createContext<ContentContextType | null>(null);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(loadContent);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  const updateSection = useCallback(<K extends keyof SiteContent>(section: K, data: Partial<SiteContent[K]>) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  }, []);

  const resetSection = useCallback((section: keyof SiteContent) => {
    setContent(prev => ({
      ...prev,
      [section]: defaultContent[section],
    }));
  }, []);

  const resetAll = useCallback(() => {
    setContent(defaultContent);
  }, []);

  return (
    <ContentContext.Provider value={{ content, updateSection, resetSection, resetAll }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
};
