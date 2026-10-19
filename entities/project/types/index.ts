import type { Technology } from "@/entities/technology/types";
import type { TechnologyId } from "@/entities/technology/data/technologies";

export type GithubLink = {
  url: string;
  label?: string;
};

export type GithubUrlValue =
  string | GithubLink | (string | GithubLink)[] | null;

// Locale-independent data, keyed by slug in data/projects.ts
export type ProjectBase = {
  date: string;
  technologiesIds: TechnologyId[];
  githubUrl?: GithubUrlValue;
  demoUrl?: string | null;
  isCommercial?: boolean;
  isHighlighted?: boolean;
  isHidden?: boolean;
};

// Per-locale fields, see data/i18n
export type ProjectI18n = {
  title: string;
  description: string;
  type: string;
  category: string;
};

export type Project = Omit<ProjectBase, "technologiesIds"> &
  ProjectI18n & {
    slug: string;
    technologies: Technology[];
    cover?: string;
  };

export type ProjectDetail = Project & {
  screens: string[];
  video?: string;
};

export type ProjectSummary = Pick<Project, "slug" | "title">;
