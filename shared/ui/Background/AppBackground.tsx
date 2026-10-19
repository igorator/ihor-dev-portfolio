"use client";

import { useTheme } from "@/shared/hooks/useTheme";
import { readCssColor } from "@/shared/lib/cssColor";
import { GradientASCII } from "./GradientASCII/GradientASCII";
import styles from "./AppBackground.module.css";

// Ramp comes from --background-ascii-* in app/globals.css (switches with the
// theme); hex values are only used before CSS is available
const readRamp = (isDark: boolean) => [
  readCssColor("--background-ascii-1", isDark ? "#101011" : "#f8f8f9"),
  readCssColor("--background-ascii-2", isDark ? "#2c2c2d" : "#dadadd"),
  readCssColor("--background-ascii-3", isDark ? "#646467" : "#a9a9ad"),
  readCssColor("--background-ascii-4", isDark ? "#c8c8cd" : "#52525b"),
];

// The site font (next/font gives it a generated family name, exposed via CSS)
const readFont = () =>
  typeof document === "undefined"
    ? undefined
    : getComputedStyle(document.documentElement)
        .getPropertyValue("--font-text")
        .trim() || undefined;

export function AppBackground() {
  const { isDark } = useTheme();

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <GradientASCII
        colors={readRamp(isDark)}
        lightMode={!isDark}
        fontFamily={readFont()}
        shape="horizon"
        gradientOpacity={0.6}
        glyphOpacity={0.7}
        glow={0.15}
        // Pointer effects run on window events; the wrapper ignores clicks
        clickEffect="none"
      />
    </div>
  );
}
