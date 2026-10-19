import { motion, type MotionValue } from "motion/react";
import styles from "./TimelineRail.module.css";

type Props = {
  clipPath: MotionValue<string>;
};

export const TimelineRail = ({ clipPath }: Props) => (
  <div className={`${styles.track} surface-panel`}>
    <motion.div className={styles.fill} style={{ clipPath }} />
  </div>
);
