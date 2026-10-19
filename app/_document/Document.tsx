import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppBackground } from "@/shared/ui/Background/AppBackground";
import { ThemeSync } from "./ThemeSync";

// One monospace family for everything, matching the ASCII background
// (which reads --font-text to draw its glyphs in the same face)
const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

// Applies the saved theme (cookie set by ThemeSwitcher) before first paint.
// Done on the client so the HTML stays static and prerenderable.
const themeScript = `(function(){try{var m=document.cookie.match(/(?:^|; )theme=(light|dark)/);if(m)document.documentElement.setAttribute("data-theme",m[1])}catch(e){}})()`;

// Server renders type="text/javascript"; client renders "text/plain" so React
// doesn't warn about a script tag. suppressHydrationWarning hides the mismatch.
function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// <html>/<body> shell shared by the locale layout and the root not-found page
export function Document({
  lang,
  children,
}: {
  lang: string;
  children: React.ReactNode;
}) {
  return (
    // data-theme is set by themeScript before hydration
    // Font variable on <html> so :root tokens (--font-text) can resolve it
    <html lang={lang} className={fontMono.variable} suppressHydrationWarning>
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body>
        <ThemeSync />
        <AppBackground />
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
