import { ImageResponse } from "next/og";
import { siteConfig } from "@/shared/config/site";
import { asciiField } from "./asciiField";

// 1.91:1 is the widest card Telegram, Slack, X, LinkedIn and Facebook show
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgTag = { label: string; color?: string };

type OgImageProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  tags?: OgTag[];
};

// Site palette (dark theme), see app/globals.css
const palette = {
  background: "#000000",
  panel: "#0a0a0a",
  foreground: "#e8e6e3",
  muted: "#8b8580",
};

// Geist Mono, same as the site. Google's static TTFs (Latin + Cyrillic in one
// file): the fontsource WOFFs carry GSUB lookups ImageResponse can't parse
const fontFiles = [
  {
    weight: 400,
    url: "https://fonts.gstatic.com/s/geistmono/v6/or3yQ6H-1_WfwkMZI_qYPLs1a-t7PU0AbeE9KJ5T.ttf",
  },
  {
    weight: 700,
    url: "https://fonts.gstatic.com/s/geistmono/v6/or3yQ6H-1_WfwkMZI_qYPLs1a-t7PU0AbeHaL55T.ttf",
  },
] as const;

const loadFonts = () =>
  Promise.all(
    fontFiles.map(async ({ weight, url }) => ({
      name: "Geist Mono",
      weight,
      style: "normal" as const,
      data: await fetch(url, { cache: "force-cache" }).then((res) =>
        res.arrayBuffer(),
      ),
    })),
  );

const truncate = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;

// Pixel-cut corners, like .pixel-frame on the site
const STEP = 8;
const pixelCorners = `polygon(0 ${STEP}px, ${STEP}px ${STEP}px, ${STEP}px 0, calc(100% - ${STEP}px) 0, calc(100% - ${STEP}px) ${STEP}px, 100% ${STEP}px, 100% calc(100% - ${STEP}px), calc(100% - ${STEP}px) calc(100% - ${STEP}px), calc(100% - ${STEP}px) 100%, ${STEP}px 100%, ${STEP}px calc(100% - ${STEP}px), 0 calc(100% - ${STEP}px))`;

// Shared layout for every generated OpenGraph image: a terminal panel over
// the ASCII field, prompt-style title with the block cursor
export async function renderOgImage({
  eyebrow,
  title,
  description,
  tags = [],
}: OgImageProps) {
  const { accent } = siteConfig.og;
  const host = new URL(siteConfig.url).host.replace(/^www\./, "");
  const field = asciiField(title, 100, 30).split("\n");
  const titleSize = title.length > 24 ? 64 : 88;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        padding: 48,
        background: palette.background,
        color: palette.foreground,
        fontFamily: "Geist Mono",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: ogSize.width,
          height: ogSize.height,
          display: "flex",
          flexDirection: "column",
          fontSize: 20,
          lineHeight: "21px",
          color: accent,
          opacity: 0.35,
        }}
      >
        {field.map((line, i) => (
          <div key={i} style={{ display: "flex", whiteSpace: "pre" }}>
            {line}
          </div>
        ))}
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          background: palette.panel,
          border: `2px solid ${accent}`,
          clipPath: pixelCorners,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: palette.muted }}>
          <span style={{ color: accent }}>$&nbsp;</span>
          {eyebrow ?? "whoami"}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            <span style={{ color: accent }}>&gt;&nbsp;</span>
            {truncate(title, 40)}
            <div
              style={{
                width: titleSize * 0.5,
                height: titleSize * 0.9,
                marginLeft: titleSize * 0.15,
                background: accent,
              }}
            />
          </div>
          {description && (
            <div
              style={{ fontSize: 30, color: palette.muted, lineHeight: 1.4 }}
            >
              {truncate(description, 120)}
            </div>
          )}
          {tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {tags.slice(0, 6).map((tag) => (
                <div
                  key={tag.label}
                  style={{
                    display: "flex",
                    padding: "6px 14px",
                    fontSize: 22,
                    border: `2px solid ${tag.color ?? accent}`,
                    color: tag.color ?? palette.foreground,
                  }}
                >
                  {tag.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: 24,
            color: accent,
          }}
        >
          {host}
        </div>
      </div>
    </div>,
    { ...ogSize, fonts: await loadFonts() },
  );
}
