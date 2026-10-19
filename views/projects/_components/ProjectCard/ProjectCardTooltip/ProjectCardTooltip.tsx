"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { icons } from "@/shared/config/icons";
import styles from "./ProjectCardTooltip.module.css";

type ProjectCardTooltipProps = {
  isCommercial?: boolean;
};

export const ProjectCardTooltip = ({
  isCommercial,
}: ProjectCardTooltipProps) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const isTouch = useRef(false);

  if (!isCommercial) return null;

  return (
    <Tooltip.Provider delayDuration={150}>
      {/* Hover opens it with a mouse; touch has no hover, so a tap toggles it */}
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <div
            className={styles.commercialBadge}
            aria-label={t("projects.card.commercialAria", {
              default: "Commercial project",
            })}
            // preventDefault skips Radix's own handlers, which close it on press
            onPointerDown={(event) => {
              isTouch.current = event.pointerType === "touch";
              if (isTouch.current) event.preventDefault();
            }}
            onClick={(event) => {
              if (!isTouch.current) return;
              event.preventDefault();
              setOpen((prev) => !prev);
            }}
          >
            <icons.commercial size={16} aria-hidden="true" />
          </div>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            className={styles.tooltipContent}
            side="top"
            sideOffset={6}
          >
            {t("projects.card.commercial", { default: "Commercial" })}
            <Tooltip.Arrow className={styles.tooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
