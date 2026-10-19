import type { TechnologyBase } from "../types";

const data = {
  typescript: {
    color: "#3178C6",
    priority: 1,
  },
  javascript: {
    color: "#F7DF1E",
    priority: 2,
  },
  css: {
    color: "#264de4",
    priority: 3,
  },
  react: {
    color: "#61DAFB",
    priority: 4,
  },
  nextjs: {
    color: "#000000",
    textColor: "#ffffff",
    priority: 5,
  },
  vue: {
    color: "#3eb27c",
    priority: 6,
  },
  nodejs: {
    color: "#339933",
    priority: 7,
  },
  webflow: {
    color: "#146EF5",
    priority: 8,
  },
  redux: {
    color: "#764ABC",
    priority: 10,
  },
  zustand: {
    color: "#FFD700",
    priority: 11,
  },
  express: {
    color: "#353535",
    textColor: "#ffffff",
    priority: 12,
  },
  "react-router": {
    color: "#CA4245",
    priority: 12.2,
  },
  vite: {
    color: "#fdd027",
    priority: 12.5,
  },
  postgres: {
    color: "#336791",
    priority: 13,
  },
  typeorm: {
    color: "#E83524",
    priority: 14,
  },
  supabase: {
    color: "#3ECF8E",
    priority: 15,
  },
  tailwind: {
    color: "#06B6D4",
    priority: 16,
  },
  antd: {
    color: "#1677FF",
    priority: 17,
  },
  shadcn: {
    color: "#000000",
    textColor: "#ffffff",
    priority: 18,
  },
  radix: {
    color: "#1C2024",
    textColor: "#ffffff",
    priority: 19,
  },
  "react-hook-form": {
    color: "#EC5990",
    priority: 20,
  },
  "framer-motion": {
    color: "#E30B5C",
    priority: 21,
  },
  gsap: {
    color: "#88CE02",
    priority: 22,
  },
  lottie: {
    color: "#00DDB4",
    priority: 22.5,
  },
  i18n: {
    color: "#0070F3",
    priority: 23,
  },
  jest: {
    color: "#C21325",
    priority: 24,
  },
  docker: {
    color: "#2496ED",
    priority: 25,
  },
  git: {
    color: "#F05032",
    priority: 26,
  },
  telegram: {
    color: "#0088CC",
    priority: 27,
  },
  ton: {
    color: "#0098EA",
    priority: 28,
  },
  blueprint: {
    color: "#1B6CA8",
    priority: 28.5,
  },
  grammy: {
    color: "#00BFFF",
    priority: 29,
  },
  liqpay: {
    color: "#00B140",
    priority: 30,
  },
  zoho: {
    color: "#E74C3C",
    priority: 31,
  },
  jquery: {
    color: "#0769AD",
    priority: 31.3,
  },
  "google-maps-api": {
    color: "#4285F4",
    priority: 31.5,
  },
  threejs: {
    color: "#146EF5",
    priority: 32,
  },
  ogl: {
    color: "#6C63FF",
    priority: 32.5,
  },
  leaflet: {
    color: "#199900",
    priority: 33,
  },
  spline3d: {
    color: "#00C8FF",
    priority: 34,
  },
  graphql: {
    color: "#E535AB",
    priority: 35,
  },
  apollo: {
    color: "#311C87",
    textColor: "#ffffff",
    priority: 36,
  },
  vitest: {
    color: "#6E9F18",
    priority: 37,
  },
} satisfies Record<string, TechnologyBase>;

export type TechnologyId = keyof typeof data;

export const technologies: Record<TechnologyId, TechnologyBase> = data;
