import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Send, Loader2, CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ScrollDivider } from '@/components/ScrollDivider';
import { SectionBackground } from '@/components/SectionBackground';
import { useContent } from '@/contexts/ContentContext';
import { EditableText } from '@/components/EditableText';

const formLabels = {
  name: 'Your Name',
  namePlaceholder: 'John Doe',
  email: 'Email Address',
  emailPlaceholder: 'john@example.com',
  subject: 'Subject',
  subjectPlaceholder: 'How can I help you?',
  message: 'Message',
  messagePlaceholder: 'Tell me about your project...',
  submitButton: 'Send Message',
  submittingButton: 'Sending...',
  submittedButton: 'Message Sent!',
};

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { content, updateSection } = useContent();
  const c = content.contact;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: 'Message sent!',
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative py-20 bg-secondary/20 md:py-0">
      <SectionBackground variant="waves" />
      <div className="section-container py-[40px] pb-0 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <EditableText value={c.label} onChange={(v) => updateSection('contact', { label: v })} className="text-sm font-medium tracking-wider uppercase text-primary" />
          <h2 className="section-title mt-2 inline-flex items-center justify-center w-full gap-3">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="p-3 rounded-xl bg-card border border-border shadow-lg">
              <MessageCircle className="w-6 h-6 text-blue-400" />
            </motion.div>
            <EditableText value={c.title} onChange={(v) => updateSection('contact', { title: v })} />{' '}
            <EditableText value={c.titleHighlight} onChange={(v) => updateSection('contact', { titleHighlight: v })} className="gradient-text text-ring mx-[5px]" />
          </h2>
          <EditableText value={c.subtitle} onChange={(v) => updateSection('contact', { subtitle: v })} as="p" className="section-subtitle mx-auto mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <EditableText
                    value={c.email}
                    onChange={(v) => updateSection('contact', { email: v })}
                    className="font-medium text-primary"
                  />
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
                  <EditableText
                    value={c.location}
                    onChange={(v) => updateSection('contact', { location: v })}
                    as="div"
                    className="font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/20 to-accent/25 border border-primary/30">
              <EditableText value={c.ctaLine1} onChange={(v) => updateSection('contact', { ctaLine1: v })} as="p" className="text-sm text-muted-foreground mb-2" />
              <EditableText value={c.ctaLine2} onChange={(v) => updateSection('contact', { ctaLine2: v })} as="p" className="font-medium" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl bg-card border border-border space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">{formLabels.name}</label>
                  <Input id="name" name="name" placeholder={formLabels.namePlaceholder} required className="bg-secondary/50" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">{formLabels.email}</label>
                  <Input id="email" name="email" type="email" placeholder={formLabels.emailPlaceholder} required className="bg-secondary/50" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">{formLabels.subject}</label>
                <Input id="subject" name="subject" placeholder={formLabels.subjectPlaceholder} required className="bg-secondary/50" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">{formLabels.message}</label>
                <Textarea id="message" name="message" placeholder={formLabels.messagePlaceholder} rows={5} required className="bg-secondary/50 resize-none" />
              </div>
              <Button type="submit" size="lg" className="w-full rounded-full gap-2" disabled={isSubmitting || isSubmitted}>
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" />{formLabels.submittingButton}</> : isSubmitted ? <><CheckCircle className="w-4 h-4" />{formLabels.submittedButton}</> : <><Send className="w-4 h-4" />{formLabels.submitButton}</>}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
      <ScrollDivider />
    </section>
  );
};
