// Resolves a CSS custom property (any color syntax, incl. color-mix) to "#rrggbb"
// by painting it on a 1x1 canvas, so non-CSS consumers like WebGL can use it
export function readCssColor(variable: string, fallback: string): string {
  if (typeof document === "undefined") return fallback;

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
  if (!value) return fallback;

  const probe = document.createElement("span");
  probe.style.color = value;
  probe.style.display = "none";
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();

  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return fallback;
  ctx.fillStyle = resolved;
  ctx.fillRect(0, 0, 1, 1);
  const [r = 0, g = 0, b = 0] = ctx.getImageData(0, 0, 1, 1).data;

  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}
