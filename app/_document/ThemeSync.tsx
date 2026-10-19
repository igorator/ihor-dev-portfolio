"use client";

import { useLayoutEffect } from "react";

// Switching locale remounts <html> on the client, dropping the data-theme
// that themeScript set on first load (the inline script doesn't run again).
// Re-apply the saved theme before paint.
export function ThemeSync() {
  useLayoutEffect(() => {
    const match = document.cookie.match(/(?:^|; )theme=(light|dark)/);
    if (match?.[1]) {
      document.documentElement.setAttribute("data-theme", match[1]);
    }
  }, []);

  return null;
}
