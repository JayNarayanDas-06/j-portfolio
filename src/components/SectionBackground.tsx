import { motion } from 'framer-motion';

type Variant = 'orbs' | 'grid' | 'dots' | 'waves' | 'rings';

const FloatingOrbs = () => (
  <>
    <motion.div
      className="absolute w-72 h-72 rounded-full bg-primary/20 blur-3xl"
      animate={{ x: [0, 60, 0], y: [0, -50, 0], scale: [1, 1.3, 1] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      style={{ top: '5%', left: '0%' }}
    />
    <motion.div
      className="absolute w-56 h-56 rounded-full bg-ring/15 blur-3xl"
      animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1.2, 0.9, 1.2] }}
      transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      style={{ bottom: '10%', right: '5%' }}
    />
    <motion.div
      className="absolute w-40 h-40 rounded-full bg-primary/15 blur-2xl"
      animate={{ x: [0, 30, -30, 0], y: [0, -30, 20, 0] }}
      transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      style={{ top: '45%', right: '25%' }}
    />
  </>
);

const GridPattern = () => (
  <div className="absolute inset-0 overflow-hidden">
    <svg width="100%" height="100%" className="opacity-[0.08]">
      <defs>
        <pattern id="grid-bg" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-primary" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-bg)" />
    </svg>
    <motion.div
      className="absolute inset-x-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
      animate={{ y: ['-100%', '200%'] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      style={{ height: '25%' }}
    />
  </div>
);

const FloatingDots = () => {
  const dots = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: 2 + (i % 3) * 2,
    x: 3 + (i * 5) % 94,
    y: 5 + (i * 13) % 90,
    duration: 8 + i * 0.8,
    delay: i * 0.5,
  }));

  return (
    <>
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-primary/10"
          style={{ width: dot.size, height: dot.size, left: `${dot.x}%`, top: `${dot.y}%` }}
          animate={{ y: [0, -15, 0], opacity: [0.05, 0.25, 0.05] }}
          transition={{ duration: dot.duration, repeat: Infinity, ease: 'easeInOut', delay: dot.delay }}
        />
      ))}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-primary/8 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '20%', left: '10%' }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-ring/8 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '15%', right: '10%' }}
      />
    </>
  );
};

const PulsingRings = () => (
  <>
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full border-2 border-primary/15"
      animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      style={{ top: '-15%', right: '-10%' }}
    />
    <motion.div
      className="absolute w-80 h-80 rounded-full border-2 border-ring/15"
      animate={{ scale: [1.3, 0.9, 1.3], opacity: [0.15, 0.05, 0.15] }}
      transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      style={{ bottom: '-8%', left: '-5%' }}
    />
    <motion.div
      className="absolute w-60 h-60 rounded-full border border-primary/10"
      animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.08, 0.2, 0.08] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      style={{ top: '30%', left: '20%' }}
    />
  </>
);

const WaveLine = () => (
  <div className="absolute inset-0 overflow-hidden">
    <svg className="absolute bottom-0 w-full h-48 opacity-[0.12]" viewBox="0 0 1440 200" preserveAspectRatio="none">
      <motion.path
        d="M0,100 C360,150 720,50 1080,100 C1260,125 1350,75 1440,100 L1440,200 L0,200 Z"
        fill="currentColor"
        className="text-primary"
        animate={{
          d: [
            'M0,100 C360,160 720,40 1080,100 C1260,130 1350,70 1440,100 L1440,200 L0,200 Z',
            'M0,130 C360,60 720,160 1080,70 C1260,55 1350,140 1440,100 L1440,200 L0,200 Z',
            'M0,100 C360,160 720,40 1080,100 C1260,130 1350,70 1440,100 L1440,200 L0,200 Z',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
    <svg className="absolute top-0 w-full h-32 opacity-[0.08] rotate-180" viewBox="0 0 1440 200" preserveAspectRatio="none">
      <motion.path
        d="M0,120 C360,60 720,150 1080,90 L1440,120 L1440,200 L0,200 Z"
        fill="currentColor"
        className="text-ring"
        animate={{
          d: [
            'M0,120 C360,60 720,150 1080,90 L1440,120 L1440,200 L0,200 Z',
            'M0,80 C360,140 720,60 1080,130 L1440,90 L1440,200 L0,200 Z',
            'M0,120 C360,60 720,150 1080,90 L1440,120 L1440,200 L0,200 Z',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
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
