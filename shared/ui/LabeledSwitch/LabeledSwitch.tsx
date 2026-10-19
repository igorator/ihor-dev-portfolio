"use client";

import { useId } from "react";
import { Switch } from "@/shared/ui/Switch";
import styles from "./LabeledSwitch.module.css";

type Props = {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
};

export function LabeledSwitch({
  label,
  checked,
  onChange,
  disabled = false,
  loading = false,
}: Props) {
  const id = useId();

  return (
    <div
      className={`${styles.row} ${loading ? styles.loading : disabled ? styles.disabled : ""}`}
    >
      {loading ? (
        <>
          <span className={styles.skeletonText} aria-hidden />
          <span className={styles.skeletonSwitch} aria-hidden />
        </>
      ) : (
        <>
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
          <Switch
            id={id}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
          />
        </>
      )}
    </div>
  );
}
