import { Section } from "@/shared/ui/Section/Section";
import type { Technology } from "@/entities/technology/types";
import type { GithubUrlValue } from "@/entities/project/types";
import type { MediaItem } from "@/shared/ui/Lightbox/types";
import { BackLink } from "./components/BackLink/BackLink";
import { CardsReveal } from "./components/CardsReveal/CardsReveal";
import { ProjectMedia } from "./components/ProjectMedia/ProjectMedia";
import { OverviewCard } from "./components/OverviewCard/OverviewCard";
import { StackCard } from "./components/StackCard/StackCard";
import { LinksCard } from "./components/LinksCard/LinksCard";
import { DescriptionCard } from "./components/DescriptionCard/DescriptionCard";
import styles from "./Project.module.css";

type ProjectSectionProps = {
  title: string;
  description: string;
  type: string;
  category: string;
  date: string;
  cover: string;
  technologies: Technology[];
  githubUrl?: GithubUrlValue;
  demoUrl?: string | null;
  screens?: string[];
  video?: string;
};

// Server Component. Client islands: BackLink (history), ProjectMedia
// (gallery + lightbox state) and CardsReveal (entrance animation)
export function ProjectSection({
  title,
  description,
  type,
  category,
  date,
  cover,
  technologies,
  githubUrl,
  demoUrl,
  screens = [],
  video,
}: ProjectSectionProps) {
  const items: MediaItem[] = [
    ...(cover ? [{ type: "image" as const, url: cover }] : []),
    ...(video ? [{ type: "video" as const, url: video }] : []),
    ...screens.map((url) => ({ type: "image" as const, url })),
  ];

  return (
    <Section className={styles.section}>
      <div className={styles.header}>
        <BackLink />
      </div>

      <CardsReveal className={styles.cardsGrid}>
        <OverviewCard
          title={title}
          type={type}
          category={category}
          date={date}
        />
        <StackCard technologies={technologies} />
        <LinksCard demoUrl={demoUrl} githubUrl={githubUrl} />
        <ProjectMedia items={items} title={title} />
        <DescriptionCard description={description} />
      </CardsReveal>

      <div className={styles.proxy} aria-hidden />
    </Section>
  );
}
