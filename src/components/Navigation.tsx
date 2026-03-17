import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);


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
                    <LinkedInIcon />
                  </a>
                  <a href="https://www.instagram.com/situndas_official_/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:scale-110 transition-transform">
                    <InstagramIcon />
                  </a>
                  <a href="https://x.com/situn_das_" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:scale-110 transition-transform">
                    <XIcon />
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
                        <LinkedInIcon />
                      </a>
                      <a href="https://www.instagram.com/situndas_official_/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:scale-110 transition-transform">
                        <InstagramIcon />
                      </a>
                      <a href="https://x.com/situn_das_" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:scale-110 transition-transform">
                        <XIcon />
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