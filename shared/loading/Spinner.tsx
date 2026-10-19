import styles from "./Spinner.module.css";

type SpinnerProps = {
  size?: number | string;
  className?: string;
};

// The eight outer cells of a 3×3 grid, walked clockwise from the top-left
const CELLS = [
  [0, 0],
  [1, 0],
  [2, 0],
  [2, 1],
  [2, 2],
  [1, 2],
  [0, 2],
  [0, 1],
] as const;

// Pixel spinner: a lit cell runs around the ring with a fading tail
export function Spinner({ size = 20, className }: SpinnerProps) {
  const dim = typeof size === "number" ? `${size}px` : size;

  return (
    <span
      className={`${styles.wrap} ${className ?? ""}`}
      role="status"
      aria-live="polite"
    >
      <svg
        className={styles.spinner}
        style={{ width: dim, height: dim }}
        viewBox="0 0 11 11"
        shapeRendering="crispEdges"
        xmlns="http://www.w3.org/2000/svg"
        aria-busy="true"
      >
        {CELLS.map(([x, y], i) => (
          <rect
            key={i}
            className={styles.cell}
            x={x * 4}
            y={y * 4}
            width="3"
            height="3"
            style={{ animationDelay: `${(i - CELLS.length) * 0.1}s` }}
          />
        ))}
      </svg>
    </span>
  );
}

export default Spinner;
