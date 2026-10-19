import { useTranslations } from "next-intl";
import { Section } from "@/shared/ui/Section/Section";
import type { Project } from "@/entities/project/types";
import type { Technology } from "@/entities/technology/types";
import {
  applyFilters,
  getAvailableTechnologies,
  hasActiveFilters,
  toQueryString,
  type ProjectFilters,
} from "./lib/filters";
import {
  ProjectsQuery,
  PendingRegion,
} from "./_components/ProjectsQuery/ProjectsQuery";
import { FilterBar } from "./_components/FilterBar/FilterBar";
import { ControlsBar } from "./_components/ControlsBar/ControlsBar";
import { ProjectsGrid } from "./_components/ProjectGrid/ProjectsGrid";
import styles from "./Projects.module.css";

interface ProjectsSectionProps {
  projects: Project[];
  technologies: Technology[];
  // Parsed from the page's searchParams
  filters: ProjectFilters;
  // Site-wide mode from projects config: show only commercial projects
  commercialOnlyMode?: boolean;
}

// Server Component: filtering and sorting happen here, per request.
// Client islands: ProjectsQuery (URL state), FilterBar, ControlsBar, the
// grid's enter/exit animation and the commercial tooltip on each card
export const ProjectsSection = ({
  projects,
  technologies,
  filters,
  commercialOnlyMode = false,
}: ProjectsSectionProps) => {
  const t = useTranslations("projects");

  const visibleProjects = commercialOnlyMode
    ? projects.filter((p) => p.isCommercial)
    : projects;

  const filteredProjects = applyFilters(visibleProjects, {
    ...filters,
    // The switch is hidden in this mode, so ignore a stale ?commercial=false
    commercialOnly: commercialOnlyMode || filters.commercialOnly,
  });

  const techHref = (techId: string) =>
    `/projects${toQueryString({ ...filters, techs: [techId] })}`;

  return (
    <Section className={styles.projectSection}>
      <h2 className={`prompt-title ${styles.title}`}>{t("title")}</h2>

      <ProjectsQuery>
        <div className={styles.controlsRow}>
          <FilterBar
            technologies={getAvailableTechnologies(
              visibleProjects,
              technologies,
            )}
            showCommercialSwitch={!commercialOnlyMode}
          />
          <ControlsBar />
        </div>

        <PendingRegion>
          <ProjectsGrid
            projects={filteredProjects}
            commercialCount={projects.filter((p) => p.isCommercial).length}
            personalCount={
              commercialOnlyMode
                ? undefined
                : projects.filter((p) => !p.isCommercial).length
            }
            viewMode={filters.view}
            showStats={!hasActiveFilters(filters)}
            techHref={techHref}
          />
        </PendingRegion>
      </ProjectsQuery>
    </Section>
  );
};
