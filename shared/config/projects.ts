import { get } from "@vercel/global-config";
import { unstable_cache } from "next/cache";

export type ProjectsConfig = {
  // Show only commercial projects: hides the commercial filter switch and personal projects count
  commercialOnly: boolean;
};

// Used when Global Config is not connected (local dev) or a key is missing
const fallback: ProjectsConfig = {
  commercialOnly: false,
};

// Editable without redeploy in Vercel → Storage → Global Config, key "projects".
// Not a fetch call, so it's cached with unstable_cache; changes apply within a minute
export const getProjectsConfig = unstable_cache(
  async (): Promise<ProjectsConfig> => {
    if (!process.env.GLOBAL_CONFIG && !process.env.EDGE_CONFIG) return fallback;

    try {
      const remote = await get<Partial<ProjectsConfig>>("projects");
      return { ...fallback, ...remote };
    } catch {
      return fallback;
    }
  },
  ["projects-config"],
  { revalidate: 60 },
);
