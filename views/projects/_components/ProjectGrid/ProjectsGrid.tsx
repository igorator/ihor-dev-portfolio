import { useTranslations } from "next-intl";
import type { Project } from "@/entities/project/types";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { ProjectsStatsCard } from "../ProjectsStatsCard/ProjectsStatsCard";
import { GridTransition } from "./GridTransition";
import type { ViewMode } from "../../lib/filters";
import styles from "./ProjectGrid.module.css";

type ProjectsGridProps = {
  projects: Project[];
  commercialCount: number;
  personalCount?: number;
  viewMode: ViewMode;
  showStats: boolean;
  // Builds the URL that filters the list by a single technology
  techHref: (techId: string) => string;
};

export const ProjectsGrid = ({
  projects,
  commercialCount,
  personalCount,
  viewMode,
  showStats,
  techHref,
}: ProjectsGridProps) => {
  const t = useTranslations("projects");

  const className = `${styles.projectsWrapper} ${viewMode === "list" ? styles.listView : ""}`;

  if (projects.length === 0) {
    return (
      <GridTransition transitionKey="empty" className={className}>
        <div className={styles.noProjects}>{t("noMatches")}</div>
      </GridTransition>
    );
  }

  return (
    <GridTransition
      transitionKey={viewMode + projects.map((p) => p.slug).join(",")}
      className={className}
    >
      {viewMode === "grid" && showStats && (
        <ProjectsStatsCard
          commercialCount={commercialCount}
          personalCount={personalCount}
        />
      )}

      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          slug={project.slug}
          title={project.title}
          description={project.description}
          type={project.type}
          date={project.date}
          category={project.category}
          cover={project.cover}
          technologies={project.technologies}
          githubUrl={project.githubUrl}
          demoUrl={project.demoUrl}
          isCommercial={project.isCommercial}
          techHref={techHref}
          viewMode={viewMode}
        />
      ))}
    </GridTransition>
  );
};
