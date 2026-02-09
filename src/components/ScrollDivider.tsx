import { motion } from 'framer-motion';
export const ScrollDivider = () => {
  return <div className="flex justify-center py-[10px]">
      <motion.div animate={{
      y: [0, 10, 0]
    }} transition={{
      duration: 1.5,
      repeat: Infinity
    }} className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
        <motion.div animate={{
        y: [0, 12, 0]
      }} transition={{
        duration: 1.5,
        repeat: Infinity
      }} className="w-1.5 h-3 rounded-full bg-primary" />
      </motion.div>
    </div>;
};