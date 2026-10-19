import { ImageResponse } from "next/og";
import { siteConfig } from "@/shared/config/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgTag = { label: string; color?: string };

type OgImageProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  tags?: OgTag[];
};

const truncate = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;

// Shared layout for every generated OpenGraph image, built from site config
export function renderOgImage({
  eyebrow,
  title,
  description,
  tags = [],
}: OgImageProps) {
  const { accent, brand } = siteConfig.og;
  const host = new URL(siteConfig.url).host.replace(/^www\./, "");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0a0a0a",
        backgroundImage: `radial-gradient(circle at 85% 15%, ${accent}55 0%, transparent 55%)`,
        color: "#f5f5f7",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: accent,
          }}
        />
        <div style={{ fontSize: 28, color: "#a1a1a6" }}>{eyebrow ?? brand}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: title.length > 28 ? 64 : 84,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          {truncate(title, 60)}
        </div>
        {description && (
          <div style={{ fontSize: 30, color: "#a1a1a6", lineHeight: 1.35 }}>
            {truncate(description, 140)}
          </div>
        )}
        {tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {tags.slice(0, 6).map((tag) => (
              <div
                key={tag.label}
                style={{
                  display: "flex",
                  padding: "8px 18px",
                  borderRadius: 999,
                  fontSize: 22,
                  border: `2px solid ${tag.color ?? accent}`,
                  color: "#f5f5f7",
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
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 26,
        }}
      >
        <div style={{ color: "#f5f5f7" }}>{brand}</div>
        <div style={{ color: accent }}>{host}</div>
      </div>
    </div>,
    ogSize,
  );
}
