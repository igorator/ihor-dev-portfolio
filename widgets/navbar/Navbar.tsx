import { LanguageSelect } from "@/widgets/language-select/LanguageSelect";
import { NavbarLinks } from "@/widgets/navbar/NavbarLinks/NavbarLinks";
import { ThemeSwitch } from "@/widgets/theme-switcher/ThemeSwitcher";
import { TerminalFrame } from "@/shared/ui/TerminalFrame/TerminalFrame";
import { Socials } from "@/widgets/socials/Socials";
import { ScrollToTop } from "@/widgets/scroll-to-top/ScrollToTop";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <TerminalFrame className={styles.socialsWrapper} overflowVisible>
        <Socials />
      </TerminalFrame>

      <TerminalFrame className={styles.navbarLinksWrapper} overflowVisible>
        <NavbarLinks />
      </TerminalFrame>

      <TerminalFrame className={styles.themeSwitcherWrapper}>
        <ThemeSwitch />
      </TerminalFrame>

      <TerminalFrame className={styles.languageSelectWrapper}>
        <LanguageSelect triggerClassName={styles.langTrigger} />
      </TerminalFrame>

      <ScrollToTop variant="inline" className={styles.scrollToTopWrapper} />
    </nav>
  );
};
