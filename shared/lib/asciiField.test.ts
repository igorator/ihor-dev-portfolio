import { describe, expect, it } from "vitest";
import { asciiField } from "./asciiField";

describe("asciiField", () => {
  it("is deterministic per title", () => {
    expect(asciiField("Turbota")).toBe(asciiField("Turbota"));
    expect(asciiField("Turbota")).not.toBe(asciiField("Dovira"));
  });

  it("has the requested size", () => {
    const lines = asciiField("Turbota", 20, 6).split("\n");
    expect(lines).toHaveLength(6);
    for (const line of lines) expect(line).toHaveLength(20);
  });
});
