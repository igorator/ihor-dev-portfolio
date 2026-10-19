import type { ComponentType, SVGProps } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Briefcase,
  Bulletlist,
  ChevronDown,
  Close,
  Dollar,
  Eraser,
  ExternalLink,
  FileText,
  Folder,
  Github,
  Globe,
  Grid3x3,
  Home,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Reload,
  Sun,
} from "pixelarticons/react";

export type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };
export type Icon = ComponentType<IconProps>;

// Pixel icons sit on a 24px grid; like text they default to 1em and keep
// crisp edges at any size
function pixel(Svg: ComponentType<SVGProps<SVGSVGElement>>): Icon {
  function PixelIcon({ size = "1em", ...props }: IconProps) {
    return (
      <Svg width={size} height={size} shapeRendering="crispEdges" {...props} />
    );
  }
  return PixelIcon;
}

// Every icon on the site comes from here: swap the set in one place
export const icons = {
  home: pixel(Home),
  projects: pixel(Folder),
  employment: pixel(Briefcase),

  email: pixel(Mail),
  github: pixel(Github),
  linkedin: pixel(Linkedin),
  cv: pixel(FileText),
  website: pixel(Globe),
  external: pixel(ExternalLink),

  moon: pixel(Moon),
  sun: pixel(Sun),
  menu: pixel(Menu),
  close: pixel(Close),
  chevronDown: pixel(ChevronDown),
  arrowUp: pixel(ArrowUp),
  arrowLeft: pixel(ArrowLeft),
  arrowRight: pixel(ArrowRight),
  retry: pixel(Reload),

  commercial: pixel(Dollar),
  viewGrid: pixel(Grid3x3),
  viewList: pixel(Bulletlist),
  clearFilters: pixel(Eraser),
} satisfies Record<string, Icon>;
