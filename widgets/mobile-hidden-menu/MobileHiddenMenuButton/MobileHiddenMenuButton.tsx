"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { icons } from "@/shared/config/icons";
import { TerminalFrame } from "@/shared/ui/TerminalFrame/TerminalFrame";
import { MobileHiddenMenu } from "@/widgets/mobile-hidden-menu/MobileHiddenMenu";
import styles from "./MobileHiddenMenuButton.module.css";

export const MobileHiddenMenuButton = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("a11y");

  return (
    <>
      <div className={styles.wrapper}>
        <TerminalFrame>
          <button
            type="button"
            className={styles.hiddenMenuButton}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label={t("openMenu")}
            onClick={() => setOpen(true)}
          >
            <icons.menu size={20} />
          </button>
        </TerminalFrame>
      </div>

      <MobileHiddenMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
};
