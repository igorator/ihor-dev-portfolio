import { icons } from "./icons";

export const routes = {
  root: {
    path: "/",
    label: "Home",
    icon: icons.home,
  },
  projects: {
    path: "/projects",
    label: "Projects",
    icon: icons.projects,
  },
  employment: {
    path: "/employment",
    label: "Employment",
    icon: icons.employment,
  },
} as const;
