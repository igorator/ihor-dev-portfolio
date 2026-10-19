import { icons } from "@/shared/config/icons";

export const socials = {
  email: {
    url: "ihor.kliushnyk@gmail.com",
    icon: icons.email,
    label: "Email",
  },

  github: {
    url: "https://github.com/igorator",
    icon: icons.github,
    label: "GitHub",
  },

  linkedIn: {
    url: "https://www.linkedin.com/in/ihor-kliushnyk/",
    icon: icons.linkedin,
    label: "LinkedIn",
  },

  cv: {
    url: "https://cdn.jsdelivr.net/gh/igorator/portfolio-assets@main/cv/Ihor_Kliushnyk_Frontend_Developer_CV.pdf",
    icon: icons.cv,
    label: "CV",
  },
} as const;
