import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Check, Settings } from 'lucide-react';
import { useEditMode } from '@/contexts/EditModeContext';
import { useNavigate } from 'react-router-dom';

export const EditModeToggle = () => {
  const { isEditMode, toggleEditMode } = useEditMode();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
      <AnimatePresence>
        {isEditMode && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => navigate('/admin')}
            className="p-3 rounded-full shadow-lg bg-card border border-border text-foreground hover:bg-accent transition-colors"
            title="Open Admin Panel"
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
      <motion.button
        onClick={toggleEditMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`p-4 rounded-full shadow-xl transition-colors ${
          isEditMode
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        }`}
        title={isEditMode ? 'Save & Exit Edit Mode' : 'Enter Edit Mode'}
      >
        {isEditMode ? <Check className="w-6 h-6" /> : <Pencil className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};
