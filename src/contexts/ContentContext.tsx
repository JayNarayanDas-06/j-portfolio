import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ===== DEFAULT CONTENT FOR ALL SECTIONS =====

export const defaultHeroContent = {
  badge: 'Available for new opportunities',
  greeting: 'Hey, am',
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
    { degree: 'Matriculation', field: 'CBSE', institution: 'Santanu English Medium School', period: '2017', grade: 'CGPA: 9.2' },
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
      company: 'Cloudsat Pvt Ltd',
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
  projects: [
    {
      id: 'auditfiling',
      label: 'Featured Case Study',
      title: 'AuditFiling Website SEO & SMO',
      websiteUrl: 'https://www.auditfiling.com/',
      icon: 'auditfiling',
      highlights: [
        { icon: 'Target', label: 'On-Page SEO', description: 'Full optimization' },
        { icon: 'TrendingUp', label: 'Off-Page SEO', description: 'Link building' },
        { icon: 'BarChart', label: 'Technical SEO', description: 'Site health' },
        { icon: 'Users', label: 'SMM Strategy', description: 'Social growth' },
      ],
      achievements: [
        'Improved keyword rankings across targeted search terms',
        'Increased user engagement and brand visibility',
        'Developed strategic social media marketing campaigns',
        'Expanded digital reach through SEO-driven content',
      ],
      portfolioImages: [
        'https://i.postimg.cc/MGCFNNCR/Screenshot-2026-02-12-144513.png',
        'https://i.postimg.cc/3J8bsgcN/Screenshot-2026-02-12-144538.png',
        'https://i.postimg.cc/g0ZMV4xY/Screenshot-2026-02-12-144648.png',
        'https://i.postimg.cc/vT3XYNN9/Screenshot-2026-02-12-144718.png',
        'https://i.postimg.cc/K8KQbQrx/Screenshot-2026-02-12-144731.png',
        'https://i.postimg.cc/rmT9ST6w/Screenshot-2026-02-12-144743.png',
        'https://i.postimg.cc/W37w8yTb/Screenshot-2026-02-12-144755.png',
        'https://i.postimg.cc/jjHHq1WL/Screenshot-2026-02-12-144803.png',
        'https://i.postimg.cc/PxK1Y8QX/Screenshot-2026-02-12-144810.png',
        'https://i.postimg.cc/FFWjK3Kc/Screenshot-2026-02-12-145000.png',
        'https://i.postimg.cc/7Z77XRnm/Screenshot-2026-02-12-145039.png',
        'https://i.postimg.cc/PxfwX5s9/Screenshot-2026-02-12-145045.png',
        'https://i.postimg.cc/brWD90Gg/Screenshot-2026-02-12-145100.png',
      ],
    },
    {
      id: 'cloudsat',
      label: 'Featured Case Study',
      title: 'Cloudsat Pvt Ltd – SMO & Content',
      websiteUrl: '',
      icon: 'cloudsat',
      highlights: [
        { icon: 'Users', label: 'SMO Strategy', description: 'Social media optimization' },
        { icon: 'TrendingUp', label: 'Content Engagement', description: 'Audience growth' },
        { icon: 'BarChart', label: 'Social Analytics', description: 'Performance tracking' },
        { icon: 'Target', label: 'Brand Awareness', description: 'Digital presence' },
      ],
      achievements: [
        'Created and managed engaging social media content across platforms',
        'Boosted audience engagement through targeted SMO strategies',
        'Developed creative content calendars aligned with brand identity',
        'Increased social media reach and follower growth organically',
      ],
      portfolioImages: [
        'https://i.postimg.cc/8zBc7gHD/Screenshot-2026-02-12-145706.png',
        'https://i.postimg.cc/hGDjxZyQ/Screenshot-2026-02-12-145718.png',
        'https://i.postimg.cc/G29mg81d/Screenshot-2026-02-12-145730.png',
        'https://i.postimg.cc/QtPx28X0/Screenshot-2026-02-12-145754.png',
        'https://i.postimg.cc/DfHg7H5c/Screenshot-2026-02-12-145805.png',
        'https://i.postimg.cc/Ls9kyp6J/Screenshot-2026-02-12-150245.png',
        'https://i.postimg.cc/rmz1kNr5/Screenshot-2026-02-12-150253.png',
        'https://i.postimg.cc/fLFxTS7t/Screenshot-2026-02-12-150258.png',
        'https://i.postimg.cc/1XqDgRMC/Screenshot-2026-02-12-150303.png',
        'https://i.postimg.cc/cLmwtb7j/Screenshot-2026-02-12-150308.png',
        'https://i.postimg.cc/3wxpXFn0/Screenshot-2026-02-12-150312.png',
        'https://i.postimg.cc/KzKMVc6W/Screenshot-2026-02-12-150319.png',
      ],
    },
    {
      id: 'i4option',
      label: 'Featured Case Study',
      title: 'i4Option Website SEO & Digital Marketing',
      websiteUrl: '',
      icon: 'i4option',
      highlights: [
        { icon: 'Target', label: 'On-Page SEO', description: 'Content optimization' },
        { icon: 'TrendingUp', label: 'Off-Page SEO', description: 'Authority building' },
        { icon: 'BarChart', label: 'Technical SEO', description: 'Performance audit' },
        { icon: 'Users', label: 'Digital Strategy', description: 'Growth planning' },
      ],
      achievements: [
        'Conducted comprehensive website SEO audits and optimizations',
        'Enhanced search engine visibility through strategic keyword targeting',
        'Built quality backlink profiles to strengthen domain authority',
        'Delivered data-driven reports with actionable growth insights',
      ],
      portfolioImages: [] as string[],
    },
  ],
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
const CONTENT_VERSION_KEY = 'site-content-version';
const CONTENT_VERSION = 10; // Bump this when defaults change to force refresh

function loadContent(): SiteContent {
  try {
    const storedVersion = localStorage.getItem(CONTENT_VERSION_KEY);
    if (storedVersion && Number(storedVersion) !== CONTENT_VERSION) {
      // Version mismatch — clear old content so new defaults take effect
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(CONTENT_VERSION_KEY, String(CONTENT_VERSION));
      return defaultContent;
    }
    localStorage.setItem(CONTENT_VERSION_KEY, String(CONTENT_VERSION));
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
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
