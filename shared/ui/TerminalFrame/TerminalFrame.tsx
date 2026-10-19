import styles from "./TerminalFrame.module.css";

type TerminalFrameProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  // For content that pops out of the frame (dropdowns, tooltips): the frame
  // is drawn on a separate clipped layer so the content itself isn't clipped
  overflowVisible?: boolean;
};

// Bar/button container: dark panel in the pixel frame (see .pixel-frame in
// app/globals.css); the border lights up on hover/focus
export function TerminalFrame({
  children,
  className,
  style,
  overflowVisible = false,
}: TerminalFrameProps) {
  const classes = [
    styles.frame,
    overflowVisible
      ? `${styles.overflowVisible} pixel-frame-layer pixel-frame-panel pixel-frame-interactive`
      : "pixel-frame pixel-frame-panel pixel-frame-interactive",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}
