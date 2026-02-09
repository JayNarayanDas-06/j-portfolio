import { motion } from 'framer-motion';
import { ArrowUp, Mail, MapPin, Heart } from 'lucide-react';
const navLinks = [{
  name: 'Home',
  href: '#home'
}, {
  name: 'About',
  href: '#about'
}, {
  name: 'Experience',
  href: '#experience'
}, {
  name: 'Skills',
  href: '#skills'
}, {
  name: 'Services',
  href: '#services'
}, {
  name: 'Portfolio',
  href: '#portfolio'
}, {
  name: 'Contact',
  href: '#contact'
}];
export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <footer className="relative bg-card border-t border-border">
       <div className="section-container md:py-16 py-[50px]">
         <div className="grid md:grid-cols-3 gap-8 md:gap-12">
           {/* Brand */}
           <div>
             <a href="#home" className="font-display text-2xl font-semibold italic">
               <span className="text-foreground">Jay</span>
               <span className="text-primary">.</span>
             </a>
             <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
               SEO & SMM Specialist focused on driving organic growth through technical SEO, 
               data-driven insights, and strategic content optimization.
             </p>
           </div>
 
           {/* Quick Links */}
           <div>
             <h4 className="font-semibold mb-4">Quick Links</h4>
             <div className="grid grid-cols-2 gap-2">
               {navLinks.map(link => <a key={link.name} href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                   {link.name}
                 </a>)}
             </div>
           </div>
 
           {/* Contact */}
           <div>
             <h4 className="font-semibold mb-4">Contact</h4>
             <div className="space-y-3 text-sm">
               <a href="mailto:dassitun6@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                 <Mail className="w-4 h-4" />
                 dassitun6@gmail.com
               </a>
               <div className="flex items-center gap-2 text-muted-foreground">
                 <MapPin className="w-4 h-4" />
                 Bhubaneswar, Odisha, India
               </div>
             </div>
           </div>
         </div>
 
         {/* Divider */}
         <div className="border-t border-border mt-12 pt-8">
           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
             <p className="text-sm text-muted-foreground flex items-center gap-1">
               © {new Date().getFullYear()} Jay Narayan Das. Made with 
               <Heart className="w-4 h-4 text-primary fill-primary" />
             </p>
 
             {/* Back to Top */}
             <motion.button onClick={scrollToTop} whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.95
          }} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
               Back to Top
               <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                 <ArrowUp className="w-4 h-4 text-primary" />
               </div>
             </motion.button>
           </div>
         </div>
       </div>
     </footer>;
};