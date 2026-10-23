import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open &&
      <motion.div key="sheet" className="absolute inset-0 z-40" exit={{ opacity: 1 }}>
          <motion.div
          className="absolute inset-0 bg-ink/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={onClose} />
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="absolute inset-x-0 bottom-0 flex max-h-[90%] flex-col rounded-t-[32px] bg-cream"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.26, ease: [0.32, 0.72, 0, 1] }}>
          
            <div className="flex justify-center pt-2.5">
              <span className="h-1.5 w-10 rounded-full bg-line" aria-hidden="true" />
            </div>
            <div className="flex items-start justify-between gap-3 px-5 pb-3 pt-3">
              <h2 className="font-display text-[22px] font-semibold leading-tight text-ink">{title}</h2>
              <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="-mr-1.5 -mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-paper text-muted transition-colors duration-150 hover:text-ink">
              
                <XIcon className="h-[18px] w-[18px]" />
              </button>
            </div>
            <div className="overflow-y-auto pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              {children}
            </div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}