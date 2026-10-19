// Locale-independent data, keyed by id in data/technologies.ts
export type TechnologyBase = {
  color: string;
  textColor?: string;
  priority: number;
};

// Per-locale fields, see data/i18n
export type TechnologyI18n = {
  name: string;
  category: string;
};

export type Technology = TechnologyBase &
  TechnologyI18n & {
    id: string;
  };
