"use client";

import { Card } from "@/shared/ui/Card";
import { InputWrapper } from "@/shared/ui/InputWrapper";
import type { Technology } from "@/entities/technology/types";
import { TechnologyMultiSelect } from "./_controls/TechnologyMultiSelect/TechnologyMultiSelect";
import { SortSelect } from "./_controls/SortSelect/SortSelect";
import { CommercialSwitch } from "./_controls/CommercialSwitch/CommercialSwitch";
import { FilterClearButton } from "./_controls/FilterClearButton/FilterClearButton";
import { DEFAULT_FILTERS, hasActiveFilters } from "../../lib/filters";
import { useProjectsQuery } from "../ProjectsQuery/ProjectsQuery";
import styles from "./FilterBar.module.css";

interface FilterBarProps {
  // Only technologies used by visible projects, computed on the server
  technologies: Technology[];
  showCommercialSwitch?: boolean;
}

export const FilterBar = ({
  technologies,
  showCommercialSwitch = true,
}: FilterBarProps) => {
  const { filters, update } = useProjectsQuery();
  const { techs, sort, commercialOnly } = filters;

  const toggleTech = (id: string) =>
    update({
      techs: techs.includes(id)
        ? techs.filter((techId) => techId !== id)
        : [...techs, id],
    });

  // Resets filters but keeps the chosen view
  const clearAll = () => update({ ...DEFAULT_FILTERS, view: filters.view });

  const isActive = hasActiveFilters(filters);

  return (
    <Card className={styles.filtersBar}>
      <InputWrapper
        className={styles.technologySelectWrapper}
        data-active={techs.length > 0 || undefined}
      >
        <TechnologyMultiSelect
          technologies={technologies}
          selectedTechnologies={techs}
          onToggle={toggleTech}
        />
      </InputWrapper>

      <InputWrapper
        className={styles.sortSelectWrapper}
        data-active={sort !== DEFAULT_FILTERS.sort || undefined}
      >
        <SortSelect
          value={sort}
          onChange={(value) => update({ sort: value })}
        />
      </InputWrapper>

      {showCommercialSwitch && (
        <InputWrapper
          className={styles.commercialSwitchWrapper}
          data-active={!commercialOnly || undefined}
        >
          <CommercialSwitch
            value={commercialOnly}
            onChange={(value) => update({ commercialOnly: value })}
          />
        </InputWrapper>
      )}

      <InputWrapper
        className={styles.filterClearButtonWrapper}
        data-active={isActive || undefined}
      >
        <FilterClearButton onClear={clearAll} disabled={!isActive} />
      </InputWrapper>
    </Card>
  );
};
