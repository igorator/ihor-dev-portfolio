// Deterministic ASCII "image" for projects without a cover. Same title →
// same field, so it renders identically on the server and never shifts.

const RAMP = " .:-=+*#%@";

// FNV-1a: tiny, stable string hash
const hashString = (text: string): number => {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

// Per-cell noise in [0, 1)
const cellNoise = (x: number, y: number, seed: number): number => {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263) + seed;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};

export function asciiField(title: string, cols = 56, rows = 18): string {
  const seed = hashString(title);
  // Light source somewhere in the upper right, placed by the title
  const lightX = 0.55 + (seed % 100) / 250;
  const lightY = 0.1 + ((seed >>> 8) % 100) / 400;

  const lines: string[] = [];
  for (let y = 0; y < rows; y++) {
    let line = "";
    for (let x = 0; x < cols; x++) {
      // Glyphs are ~2x taller than wide, so stretch x to keep the glow round
      const dx = (x / cols - lightX) * 1.8;
      const dy = y / rows - lightY;
      const glow = Math.max(0, 1 - Math.hypot(dx, dy) * 1.25);
      const value = glow * 0.85 + (cellNoise(x, y, seed) - 0.5) * 0.35;
      const index = Math.round(
        Math.min(1, Math.max(0, value)) * (RAMP.length - 1),
      );
      line += RAMP[index];
    }
    lines.push(line);
  }
  return lines.join("\n");
}
