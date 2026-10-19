import type { HTMLAttributes } from "react";
import styles from "./Card.module.css";

type Props = HTMLAttributes<HTMLDivElement>;

export function Card({ className, children, ...rest }: Props) {
  return (
    <div
      className={`${styles.card} surface-panel pixel-frame pixel-frame-panel${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {children}
    </div>
  );
}
