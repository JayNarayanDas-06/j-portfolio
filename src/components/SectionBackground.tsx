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
    {/* Deep ocean base */}
    <svg className="absolute bottom-0 w-full h-72 opacity-[0.12]" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <defs>
        <linearGradient id="wave-deep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <motion.path
        fill="url(#wave-deep)"
        animate={{
          d: [
            'M0,160 C60,140 120,180 240,170 C360,160 420,120 540,130 C660,140 720,180 840,175 C960,170 1020,130 1140,140 C1260,150 1320,170 1440,160 L1440,320 L0,320 Z',
            'M0,170 C60,180 120,140 240,150 C360,160 420,180 540,170 C660,160 720,130 840,145 C960,160 1020,180 1140,170 C1260,160 1320,140 1440,155 L1440,320 L0,320 Z',
            'M0,160 C60,140 120,180 240,170 C360,160 420,120 540,130 C660,140 720,180 840,175 C960,170 1020,130 1140,140 C1260,150 1320,170 1440,160 L1440,320 L0,320 Z',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
    {/* Mid-depth curling wave */}
    <svg className="absolute bottom-0 w-full h-60 opacity-[0.18]" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <defs>
        <linearGradient id="wave-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          <stop offset="40%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <motion.path
        fill="url(#wave-mid)"
        animate={{
          d: [
            'M0,220 C80,190 160,240 280,225 C400,210 480,180 600,195 C720,210 800,250 920,240 C1040,230 1120,195 1240,205 C1360,215 1400,235 1440,225 L1440,320 L0,320 Z',
            'M0,230 C80,245 160,200 280,215 C400,230 480,250 600,235 C720,220 800,190 920,205 C1040,220 1120,245 1240,235 C1360,225 1400,205 1440,215 L1440,320 L0,320 Z',
            'M0,220 C80,190 160,240 280,225 C400,210 480,180 600,195 C720,210 800,250 920,240 C1040,230 1120,195 1240,205 C1360,215 1400,235 1440,225 L1440,320 L0,320 Z',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
    </svg>
    {/* Cresting wave with curl */}
    <svg className="absolute bottom-0 w-full h-52 opacity-[0.22]" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <defs>
        <linearGradient id="wave-crest" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--ring))" stopOpacity="0.2" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="1" />
        </linearGradient>
      </defs>
      <motion.path
        fill="url(#wave-crest)"
        animate={{
          d: [
            'M0,260 C40,248 100,270 200,258 C300,246 380,230 500,242 C620,254 700,278 820,270 C940,262 1020,240 1140,250 C1260,260 1340,274 1440,265 L1440,320 L0,320 Z',
            'M0,268 C40,275 100,250 200,262 C300,274 380,282 500,270 C620,258 700,238 820,250 C940,262 1020,278 1140,268 C1260,258 1340,248 1440,260 L1440,320 L0,320 Z',
            'M0,260 C40,248 100,270 200,258 C300,246 380,230 500,242 C620,254 700,278 820,270 C940,262 1020,240 1140,250 C1260,260 1340,274 1440,265 L1440,320 L0,320 Z',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
      />
    </svg>
    {/* Foam/spray layer */}
    <svg className="absolute bottom-0 w-full h-44 opacity-[0.10]" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <motion.path
        fill="currentColor"
        className="text-foreground"
        animate={{
          d: [
            'M0,285 C30,278 90,292 180,284 C270,276 330,268 450,276 C570,284 630,296 750,290 C870,284 930,272 1050,278 C1170,284 1230,294 1320,288 C1380,284 1410,278 1440,282 L1440,320 L0,320 Z',
            'M0,290 C30,294 90,280 180,288 C270,296 330,292 450,284 C570,276 630,270 750,278 C870,286 930,296 1050,290 C1170,284 1230,276 1320,282 C1380,288 1410,294 1440,288 L1440,320 L0,320 Z',
            'M0,285 C30,278 90,292 180,284 C270,276 330,268 450,276 C570,284 630,296 750,290 C870,284 930,272 1050,278 C1170,284 1230,294 1320,288 C1380,284 1410,278 1440,282 L1440,320 L0,320 Z',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      />
    </svg>
    {/* Bubble/sparkle dots */}
    {[15, 30, 50, 70, 85].map((x, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 rounded-full bg-primary/20"
        style={{ left: `${x}%`, bottom: '8%' }}
        animate={{ y: [0, -20, -40], opacity: [0.4, 0.2, 0], scale: [1, 0.8, 0.4] }}
        transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeOut', delay: i * 1.2 }}
      />
    ))}
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
