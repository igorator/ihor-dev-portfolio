"use client";

import { Card } from "@/shared/ui/Card";
import { InputWrapper } from "@/shared/ui/InputWrapper";
import { ViewToggleButton } from "../FilterBar/_controls/ViewToggleButton/ViewToggleButton";
import { useProjectsQuery } from "../ProjectsQuery/ProjectsQuery";
import styles from "./ControlsBar.module.css";

export const ControlsBar = () => {
  const { filters, update } = useProjectsQuery();

  return (
    <Card className={styles.controlsBar}>
      <InputWrapper className={styles.viewToggleWrapper}>
        <ViewToggleButton
          viewMode={filters.view}
          onToggle={() =>
            update({ view: filters.view === "grid" ? "list" : "grid" })
          }
        />
      </InputWrapper>
    </Card>
  );
};
