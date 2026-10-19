"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { icons } from "@/shared/config/icons";
import { Button } from "@/shared/ui/Button";

type Props = {
  viewMode: "grid" | "list";
  onToggle: () => void;
  loading?: boolean;
};

export const ViewToggleButton = ({
  viewMode,
  onToggle,
  loading = false,
}: Props) => {
  const prefersReduced = useReducedMotion();

  return (
    <Button onClick={onToggle} loading={loading} pressed={viewMode === "list"}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={viewMode}
          initial={{
            opacity: 0,
            scale: prefersReduced ? 1 : 0.5,
            rotate: prefersReduced ? 0 : -90,
          }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{
            opacity: 0,
            scale: prefersReduced ? 1 : 0.5,
            rotate: prefersReduced ? 0 : 90,
          }}
          transition={{
            duration: prefersReduced ? 0 : 0.15,
            ease: "easeInOut",
          }}
          style={{ display: "flex" }}
        >
          {viewMode === "grid" ? (
            <icons.viewGrid aria-hidden />
          ) : (
            <icons.viewList aria-hidden />
          )}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
};
