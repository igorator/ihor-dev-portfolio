"use client";

import * as RadixSwitch from "@radix-ui/react-switch";
import styles from "./Switch.module.css";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  ariaLabel?: string;
  // Lets a <label htmlFor> name and toggle the switch
  id?: string;
};

export function Switch({ checked, onChange, disabled, ariaLabel, id }: Props) {
  return (
    <RadixSwitch.Root
      id={id}
      checked={checked}
      onCheckedChange={onChange}
      disabled={disabled}
      aria-label={ariaLabel}
      className={styles.root}
    >
      <RadixSwitch.Thumb className={styles.thumb} />
    </RadixSwitch.Root>
  );
}
