import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    toast
  } = useToast();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon."
    });

    // Reset form after delay
    setTimeout(() => setIsSubmitted(false), 3000);
  };
  return <section id="contact" className="relative py-20 bg-secondary/15 md:py-0">
       <div className="section-container py-[40px]" ref={ref}>
         {/* Section Header */}
         <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.5
      }} className="text-center mb-16">
           <span className="text-sm font-medium tracking-wider uppercase text-primary">
             Get In Touch
           </span>
           <h2 className="section-title mt-2">
             Let's <span className="gradient-text text-ring">Connect</span>
           </h2>
           <p className="section-subtitle mx-auto mt-4">
             Have a project in mind? Let's discuss how I can help grow your digital presence.
           </p>
         </motion.div>
 
         <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
           {/* Contact Info */}
           <motion.div initial={{
          opacity: 0,
          x: -30
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="lg:col-span-2 space-y-6">
             <div className="p-6 rounded-xl bg-card border border-border">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                   <Mail className="w-6 h-6 text-primary" />
                 </div>
                 <div>
                   <div className="text-sm text-muted-foreground">Email</div>
                   <a href="mailto:dassitun6@gmail.com" className="font-medium text-primary hover:underline">
                     dassitun6@gmail.com
                   </a>
                 </div>
               </div>
             </div>
 
             <div className="p-6 rounded-xl bg-card border border-border">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                   <MapPin className="w-6 h-6 text-primary" />
                 </div>
                 <div>
                   <div className="text-sm text-muted-foreground">Location</div>
                   <div className="font-medium">Bhubaneswar, Odisha, India</div>
                 </div>
               </div>
             </div>
 
             <div className="p-6 rounded-xl bg-gradient-to-br from-primary/20 to-accent/25 border border-primary/30">
               <p className="text-sm text-muted-foreground mb-2">Ready to elevate your digital presence?</p>
               <p className="font-medium">Let's create something amazing together!</p>
             </div>
           </motion.div>
 
           {/* Contact Form */}
           <motion.div initial={{
          opacity: 0,
          x: 30
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.5,
          delay: 0.3
        }} className="lg:col-span-3">
             <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl bg-card border border-border space-y-6">
               <div className="grid md:grid-cols-2 gap-4">
                 <div>
                   <label htmlFor="name" className="block text-sm font-medium mb-2">
                     Your Name
                   </label>
                   <Input id="name" name="name" placeholder="John Doe" required className="bg-secondary/50" />
                 </div>
                 <div>
                   <label htmlFor="email" className="block text-sm font-medium mb-2">
                     Email Address
                   </label>
                   <Input id="email" name="email" type="email" placeholder="john@example.com" required className="bg-secondary/50" />
                 </div>
               </div>
 
               <div>
                 <label htmlFor="subject" className="block text-sm font-medium mb-2">
                   Subject
                 </label>
                 <Input id="subject" name="subject" placeholder="How can I help you?" required className="bg-secondary/50" />
               </div>
 
               <div>
                 <label htmlFor="message" className="block text-sm font-medium mb-2">
                   Message
                 </label>
                 <Textarea id="message" name="message" placeholder="Tell me about your project..." rows={5} required className="bg-secondary/50 resize-none" />
               </div>
 
               <Button type="submit" size="lg" className="w-full rounded-full gap-2" disabled={isSubmitting || isSubmitted}>
                 {isSubmitting ? <>
                     <Loader2 className="w-4 h-4 animate-spin" />
                     Sending...
                   </> : isSubmitted ? <>
                     <CheckCircle className="w-4 h-4" />
                     Message Sent!
                   </> : <>
                     <Send className="w-4 h-4" />
                     Send Message
                   </>}
               </Button>
             </form>
           </motion.div>
         </div>
       </div>
     </section>;
};