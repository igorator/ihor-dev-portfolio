"use client";

import { startTransition, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { TerminalFrame } from "@/shared/ui/TerminalFrame/TerminalFrame";
import { icons } from "@/shared/config/icons";
import styles from "./ScrollToTop.module.css";

type Props = {
  variant?: "fixed" | "inline";
  className?: string;
};

export const ScrollToTop = ({ variant = "fixed", className }: Props) => {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () =>
      startTransition(() => setVisible(window.scrollY > 300));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const surface = (
    <TerminalFrame className={styles.surface}>
      <button
        className={styles.button}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={t("scrollToTop")}
        title={t("scrollToTop")}
      >
        <icons.arrowUp className={styles.icon} />
      </button>
    </TerminalFrame>
  );

  if (variant === "inline") {
    return (
      <motion.div
        className={`${styles.inline} ${className ?? ""}`}
        animate={{
          opacity: visible ? 1 : 0,
          scale: prefersReduced ? 1 : visible ? 1 : 0.75,
          pointerEvents: visible ? "auto" : "none",
        }}
        transition={{ duration: prefersReduced ? 0 : 0.18 }}
      >
        {surface}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.positioner}
      animate={{
        opacity: visible ? 1 : 0,
        scale: prefersReduced ? 1 : visible ? 1 : 0.75,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: prefersReduced ? 0 : 0.18 }}
    >
      {surface}
    </motion.div>
  );
};
