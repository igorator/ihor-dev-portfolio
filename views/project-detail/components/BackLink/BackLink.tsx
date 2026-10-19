"use client";

import { useTranslations } from "next-intl";
import { icons } from "@/shared/config/icons";
import { Link, useRouter } from "@/i18n/navigation";
import { routes } from "@/shared/config/routes";
import { TerminalFrame } from "@/shared/ui/TerminalFrame/TerminalFrame";
import layout from "../../Project.module.css";

// Goes back in history when the visitor came from this site (keeps their
// filters and scroll position), otherwise to the projects list
export function BackLink() {
  const t = useTranslations("projectDetail");
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    try {
      const referrer = document.referrer && new URL(document.referrer);
      if (referrer && referrer.origin === window.location.origin) {
        router.back();
        return;
      }
    } catch {}

    router.push(routes.projects.path);
  };

  return (
    <TerminalFrame className={layout.backButtonWrapper}>
      <Link
        href={routes.projects.path}
        className={layout.backLink}
        aria-label={t("backToProjectsAria")}
        onClick={handleClick}
      >
        <icons.arrowLeft aria-hidden size={16} />
        <span>{t("back")}</span>
      </Link>
    </TerminalFrame>
  );
}
