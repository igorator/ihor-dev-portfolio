"use client";

import { useSearchParams } from "next/navigation";
import { createContext, use, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  parseFilters,
  toQueryString,
  type ProjectFilters,
} from "../../lib/filters";
import styles from "./ProjectsQuery.module.css";

type ProjectsQueryValue = {
  filters: ProjectFilters;
  update: (patch: Partial<ProjectFilters>) => void;
  isPending: boolean;
};

const ProjectsQueryContext = createContext<ProjectsQueryValue | null>(null);

export function useProjectsQuery(): ProjectsQueryValue {
  const value = use(ProjectsQueryContext);
  if (!value) {
    throw new Error("useProjectsQuery must be used inside <ProjectsQuery>");
  }
  return value;
}

// Filter state lives in the URL. Controls call update(), which navigates to
// the new URL; the server re-renders the filtered list for it. The transition
// keeps the current list on screen (marked pending) until the new one arrives
export function ProjectsQuery({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const filters = parseFilters(searchParams);

  const update = (patch: Partial<ProjectFilters>) => {
    const next = { ...filters, ...patch };
    startTransition(() => {
      router.replace(`${pathname}${toQueryString(next)}`, { scroll: false });
    });

    // A new result set starts from the top; switching the view doesn't
    const changesResults = Object.keys(patch).some((key) => key !== "view");
    if (changesResults) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ProjectsQueryContext value={{ filters, update, isPending }}>
      {children}
    </ProjectsQueryContext>
  );
}

// Dims server-rendered results while the next ones are loading
export function PendingRegion({ children }: { children: React.ReactNode }) {
  const { isPending } = useProjectsQuery();

  return (
    <div
      className={styles.pendingRegion}
      data-pending={isPending || undefined}
      aria-busy={isPending}
    >
      {children}
    </div>
  );
}
