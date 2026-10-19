import { describe, expect, it } from "vitest";
import type { Employment } from "../types";
import { formatPeriod } from "./formatPeriod";

const formatDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

const emp = (fields: Partial<Employment>): Employment => ({
  id: "test",
  company: "Test",
  type: "",
  roles: [],
  linkedProjects: [],
  ...fields,
});

describe("formatPeriod", () => {
  it("returns explicit period as is", () => {
    expect(
      formatPeriod(
        emp({ period: "2024", startDate: "2023-01" }),
        formatDate,
        "Now",
      ),
    ).toBe("2024");
  });

  it("formats start and end dates", () => {
    expect(
      formatPeriod(
        emp({ startDate: "2023-07", endDate: "2023-12" }),
        formatDate,
        "Now",
      ),
    ).toBe("2023-07 - 2023-12");
  });

  it("uses present label for ongoing work", () => {
    expect(
      formatPeriod(
        emp({ startDate: "2026-05", endDate: "present" }),
        formatDate,
        "Now",
      ),
    ).toBe("2026-05 - Now");
  });

  it("returns only start date when end date is missing", () => {
    expect(formatPeriod(emp({ startDate: "2025-02" }), formatDate, "Now")).toBe(
      "2025-02",
    );
  });

  it("returns null for missing or invalid start date", () => {
    expect(formatPeriod(emp({}), formatDate, "Now")).toBeNull();
    expect(formatPeriod(emp({ startDate: "~" }), formatDate, "Now")).toBeNull();
  });

  it("drops an invalid end date", () => {
    expect(
      formatPeriod(
        emp({ startDate: "2025-02", endDate: "x" }),
        formatDate,
        "Now",
      ),
    ).toBe("2025-02");
  });
});
