import { motion } from 'framer-motion';

type Variant = 'orbs' | 'grid' | 'dots' | 'waves' | 'rings';

const FloatingOrbs = () => (
  <>
    <motion.div
      className="absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl"
      animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      style={{ top: '10%', left: '5%' }}
    />
    <motion.div
      className="absolute w-48 h-48 rounded-full bg-ring/5 blur-3xl"
      animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1.1, 1, 1.1] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      style={{ bottom: '15%', right: '10%' }}
    />
    <motion.div
      className="absolute w-32 h-32 rounded-full bg-primary/3 blur-2xl"
      animate={{ x: [0, 20, -20, 0], y: [0, -20, 10, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      style={{ top: '50%', right: '30%' }}
    />
  </>
);

const GridPattern = () => (
  <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
    <svg width="100%" height="100%">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
    <motion.div
      className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
      animate={{ y: ['-100%', '100%'] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      style={{ height: '30%' }}
    />
  </div>
);

const FloatingDots = () => {
  const dots = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: 3 + (i % 3) * 2,
    x: 10 + (i * 16) % 80,
    y: 15 + (i * 23) % 70,
    duration: 10 + i * 2,
    delay: i * 0.5,
  }));

  return (
    <>
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-primary/10"
          style={{ width: dot.size, height: dot.size, left: `${dot.x}%`, top: `${dot.y}%` }}
          animate={{ y: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: dot.duration, repeat: Infinity, ease: 'easeInOut', delay: dot.delay }}
        />
      ))}
    </>
  );
};

const PulsingRings = () => (
  <>
    <motion.div
      className="absolute w-96 h-96 rounded-full border border-primary/5"
      animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.12, 0.05] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      style={{ top: '-10%', right: '-5%' }}
    />
    <motion.div
      className="absolute w-72 h-72 rounded-full border border-ring/5"
      animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.03, 0.08] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      style={{ bottom: '-5%', left: '-3%' }}
    />
  </>
);

const WaveLine = () => (
  <div className="absolute inset-0 overflow-hidden">
    <svg className="absolute bottom-0 w-full opacity-[0.04]" viewBox="0 0 1440 200" preserveAspectRatio="none">
      <motion.path
        d="M0,100 C360,150 720,50 1080,100 C1260,125 1350,75 1440,100 L1440,200 L0,200 Z"
        fill="currentColor"
        className="text-primary"
        animate={{
          d: [
            'M0,100 C360,150 720,50 1080,100 C1260,125 1350,75 1440,100 L1440,200 L0,200 Z',
            'M0,120 C360,70 720,150 1080,80 C1260,65 1350,130 1440,100 L1440,200 L0,200 Z',
            'M0,100 C360,150 720,50 1080,100 C1260,125 1350,75 1440,100 L1440,200 L0,200 Z',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  </div>
);

const variants: Record<Variant, React.FC> = {
  orbs: FloatingOrbs,
  grid: GridPattern,
  dots: FloatingDots,
  rings: PulsingRings,
  waves: WaveLine,
};

interface SectionBackgroundProps {
  variant: Variant;
}

export const SectionBackground = ({ variant }: SectionBackgroundProps) => {
  const Component = variants[variant];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <Component />
    </div>
  );
};
