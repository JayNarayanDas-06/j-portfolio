import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import linkedinIcon from '@/assets/linkedin-icon.png';
import instagramIcon from '@/assets/instagram-icon.png';
import xIcon from '@/assets/x-icon.ico';
 
 const navLinks = [
   { name: 'Home', href: '#home' },
   { name: 'About', href: '#about' },
   { name: 'Experience', href: '#experience' },
   { name: 'Skills', href: '#skills' },
   { name: 'Services', href: '#services' },
   { name: 'Portfolio', href: '#portfolio' },
   { name: 'Contact', href: '#contact' },
 ];
 
 export const Navigation = () => {
   const [isScrolled, setIsScrolled] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [activeSection, setActiveSection] = useState('home');
 
   useEffect(() => {
     const handleScroll = () => {
       setIsScrolled(window.scrollY > 50);
       
       // Update active section based on scroll position
       const sections = navLinks.map(link => link.href.replace('#', ''));
       for (const section of sections.reverse()) {
         const element = document.getElementById(section);
         if (element) {
           const rect = element.getBoundingClientRect();
           if (rect.top <= 100) {
             setActiveSection(section);
             break;
           }
         }
       }
     };
 
     window.addEventListener('scroll', handleScroll);
     return () => window.removeEventListener('scroll', handleScroll);
   }, []);
 
   const handleNavClick = (href: string) => {
     setIsMobileMenuOpen(false);
     const element = document.getElementById(href.replace('#', ''));
     if (element) {
       element.scrollIntoView({ behavior: 'smooth' });
     }
   };
 
   return (
     <>
       <motion.nav
         initial={{ y: -100 }}
         animate={{ y: 0 }}
         transition={{ duration: 0.5 }}
         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
           isScrolled
             ? 'bg-background/80 backdrop-blur-lg border-b border-border'
             : 'bg-transparent'
         }`}
       >
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center justify-between h-16 md:h-20">
             {/* Logo */}
             <motion.a
               href="#home"
               onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
               className="font-display text-xl md:text-2xl font-semibold italic"
               whileHover={{ scale: 1.05 }}
             >
               <span className="text-foreground">Jay</span>
               <span className="text-primary">.</span>
             </motion.a>
 
             {/* Desktop Navigation */}
             <div className="hidden md:flex items-center gap-1">
               {navLinks.map((link) => (
                 <a
                   key={link.name}
                   href={link.href}
                   onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                   className={`px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                     activeSection === link.href.replace('#', '')
                       ? 'text-primary'
                       : 'text-muted-foreground hover:text-foreground'
                   }`}
                 >
                   {link.name}
                 </a>
               ))}
             </div>
 
             {/* CTA Button */}
              <div className="hidden md:flex items-center gap-2">
                <a href="https://www.linkedin.com/in/jay-narayan-das-1b99b4208/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:scale-110 transition-transform">
                  <img src={linkedinIcon} alt="LinkedIn" className="w-4 h-4 rounded-sm" />
                </a>
                <a href="https://www.instagram.com/situndas_official_/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:scale-110 transition-transform">
                  <img src={instagramIcon} alt="Instagram" className="w-4 h-4" />
                </a>
                <a href="https://x.com/situn_das_" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:scale-110 transition-transform">
                  <img src={xIcon} alt="X" className="w-4 h-4" />
                </a>
              </div>
 
             {/* Mobile Menu Button */}
             <button
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               className="md:hidden p-2 text-foreground"
               aria-label="Toggle menu"
             >
               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
           </div>
         </div>
       </motion.nav>
 
       {/* Mobile Menu */}
       <AnimatePresence>
         {isMobileMenuOpen && (
           <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             transition={{ duration: 0.2 }}
             className="fixed inset-0 z-40 md:hidden"
           >
             <div className="absolute inset-0 bg-background/95 backdrop-blur-lg pt-20">
               <div className="flex flex-col items-center gap-4 p-8">
                 {navLinks.map((link, index) => (
                   <motion.a
                     key={link.name}
                     href={link.href}
                     onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: index * 0.05 }}
                     className={`text-xl font-medium ${
                       activeSection === link.href.replace('#', '')
                         ? 'text-primary'
                         : 'text-muted-foreground'
                     }`}
                   >
                     {link.name}
                   </motion.a>
                 ))}
                  <div className="flex items-center gap-3 mt-4">
                    <a href="https://www.linkedin.com/in/jay-narayan-das-1b99b4208/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:scale-110 transition-transform">
                      <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5 rounded-sm" />
                    </a>
                    <a href="https://www.instagram.com/situndas_official_/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:scale-110 transition-transform">
                      <img src={instagramIcon} alt="Instagram" className="w-5 h-5" />
                    </a>
                    <a href="https://x.com/situn_das_" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:scale-110 transition-transform">
                      <img src={xIcon} alt="X" className="w-5 h-5" />
                    </a>
                  </div>
               </div>
             </div>
           </motion.div>
         )}
       </AnimatePresence>
     </>
   );
 };