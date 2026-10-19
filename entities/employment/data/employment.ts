import type { EmploymentBase } from "../types";

const data = {
  tenthousand: {
    company: "TenThousand",
    url: "https://tenthousand.io/",
    startDate: "2026-05",
    endDate: "present",
    projects: [],
  },
  "doido-market": {
    company: "DOIDO Market",
    startDate: "2025-02",
    endDate: "2025-05",
    projects: ["doido-market"],
  },
  "tresor-tech": {
    company: "Tresor.tech",
    url: "https://tresor.tech/",
    startDate: "2024-03",
    endDate: "2025-01",
    projects: [],
  },
  "nocorny-agency": {
    company: "NoCorny Agency",
    period: "2024",
    projects: [],
  },
  "3mpq-studio": {
    company: "3mpq Studio",
    startDate: "2023-07",
    endDate: "2023-12",
    projects: ["3mpq-studio-lite", "studio-dashboard", "zycsel-store-bot"],
  },
  logics7: {
    company: "Logics7",
    startDate: "2022-11",
    endDate: "2023-06",
    projects: ["pss", "dovira", "easm", "webwise", "turbota-liqpay"],
  },
  freelance: {
    company: "Self-Employment",
    startDate: "~",
    projects: ["anyway", "custom-globe"],
  },
} satisfies Record<string, EmploymentBase>;

export type EmploymentId = keyof typeof data;

export const employment: Record<EmploymentId, EmploymentBase> = data;
