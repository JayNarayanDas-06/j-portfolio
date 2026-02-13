import { motion } from 'framer-motion';

export const SectionBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    <motion.div
      className="absolute w-72 h-72 rounded-full bg-primary/10 blur-3xl"
      animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      style={{ top: '5%', left: '-5%' }}
    />
    <motion.div
      className="absolute w-56 h-56 rounded-full bg-ring/8 blur-3xl"
      animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      style={{ bottom: '10%', right: '0%' }}
    />
    <motion.div
      className="absolute w-40 h-40 rounded-full bg-primary/6 blur-2xl"
      animate={{ x: [0, 25, -25, 0], y: [0, -25, 15, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      style={{ top: '40%', right: '20%' }}
    />
  </div>
);
