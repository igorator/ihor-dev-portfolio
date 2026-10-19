"use client";

import { AnimatePresence, motion } from "motion/react";

type GridTransitionProps = {
  // Changes whenever the result set or view changes, triggering the fade
  transitionKey: string;
  className?: string;
  children: React.ReactNode;
};

// Client-only animation shell; the cards inside are rendered on the server
export function GridTransition({
  transitionKey,
  className,
  children,
}: GridTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        className={className}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
