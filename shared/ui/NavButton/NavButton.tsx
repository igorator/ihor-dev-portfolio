import { icons } from "@/shared/config/icons";
import styles from "./NavButton.module.css";

type NavButtonVariant = "previous" | "next" | "close";

type Props = {
  variant: NavButtonVariant;
  ariaLabel: string;
  onClick: (e: React.MouseEvent) => void;
  onPointerDown?: (e: React.PointerEvent) => void;
  className?: string;
};

const variantIcons = {
  previous: icons.arrowLeft,
  next: icons.arrowRight,
  close: icons.close,
};

export const NavButton = ({
  variant,
  ariaLabel,
  onClick,
  onPointerDown,
  className,
}: Props) => {
  const Icon = variantIcons[variant];
  return (
    <button
      type="button"
      className={`${styles.navButton}${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel}
      onClick={onClick}
      onPointerDown={onPointerDown}
    >
      <Icon size={16} />
    </button>
  );
};
