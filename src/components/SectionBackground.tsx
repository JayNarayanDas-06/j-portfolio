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
    {/* Deep back wave */}
    <svg className="absolute bottom-0 w-full h-56 opacity-[0.06]" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <motion.path
        fill="currentColor"
        className="text-primary"
        animate={{
          d: [
            'M0,224 C120,200 240,260 360,240 C480,220 600,180 720,192 C840,204 960,260 1080,256 C1200,252 1320,200 1440,208 L1440,320 L0,320 Z',
            'M0,240 C120,260 240,200 360,220 C480,240 600,260 720,248 C840,236 960,200 1080,212 C1200,224 1320,260 1440,240 L1440,320 L0,320 Z',
            'M0,224 C120,200 240,260 360,240 C480,220 600,180 720,192 C840,204 960,260 1080,256 C1200,252 1320,200 1440,208 L1440,320 L0,320 Z',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
    {/* Middle wave */}
    <svg className="absolute bottom-0 w-full h-48 opacity-[0.10]" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <motion.path
        fill="currentColor"
        className="text-primary"
        animate={{
          d: [
            'M0,256 C80,240 160,280 320,264 C480,248 560,220 720,232 C880,244 960,280 1120,272 C1280,264 1360,236 1440,248 L1440,320 L0,320 Z',
            'M0,268 C80,280 160,240 320,252 C480,264 560,280 720,268 C880,256 960,232 1120,244 C1280,256 1360,276 1440,260 L1440,320 L0,320 Z',
            'M0,256 C80,240 160,280 320,264 C480,248 560,220 720,232 C880,244 960,280 1120,272 C1280,264 1360,236 1440,248 L1440,320 L0,320 Z',
          ],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
    </svg>
    {/* Front wave */}
    <svg className="absolute bottom-0 w-full h-40 opacity-[0.15]" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <motion.path
        fill="currentColor"
        className="text-primary"
        animate={{
          d: [
            'M0,288 C60,276 180,296 300,284 C420,272 540,260 720,272 C900,284 1020,300 1140,292 C1260,284 1380,268 1440,276 L1440,320 L0,320 Z',
            'M0,280 C60,292 180,268 300,280 C420,292 540,300 720,288 C900,276 1020,264 1140,276 C1260,288 1380,296 1440,284 L1440,320 L0,320 Z',
            'M0,288 C60,276 180,296 300,284 C420,272 540,260 720,272 C900,284 1020,300 1140,292 C1260,284 1380,268 1440,276 L1440,320 L0,320 Z',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </svg>
    {/* Subtle foam/crest highlight */}
    <svg className="absolute bottom-0 w-full h-36 opacity-[0.05]" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <motion.path
        fill="currentColor"
        className="text-ring"
        animate={{
          d: [
            'M0,296 C90,288 270,304 450,292 C630,280 810,272 990,284 C1170,296 1350,304 1440,296 L1440,320 L0,320 Z',
            'M0,300 C90,304 270,288 450,296 C630,304 810,296 990,288 C1170,280 1350,292 1440,300 L1440,320 L0,320 Z',
            'M0,296 C90,288 270,304 450,292 C630,280 810,272 990,284 C1170,296 1350,304 1440,296 L1440,320 L0,320 Z',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
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
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <Component />
    </div>
  );
};
