import { resolveRef, fetchTree, findDir, buildCdnUrl } from "./cdn";
import type { JsDelivrNode } from "./cdn";

const IMAGE_EXTS = new Set(["webp", "png", "jpg", "jpeg"]);

function hasImageExt(name: string): boolean {
  const dot = name.lastIndexOf(".");
  if (dot === -1) return false;
  return IMAGE_EXTS.has(name.slice(dot + 1).toLowerCase());
}

type ProjectImages = { cover: string | null; screens: string[] };

const NO_IMAGES: ProjectImages = { cover: null, screens: [] };

export async function listProjectImages(slug: string): Promise<ProjectImages> {
  const ref = await resolveRef();
  const tree = await fetchTree(ref).catch(() => null);
  if (!tree) return NO_IMAGES;

  const dir = findDir(tree, ["Projects", slug]);
  if (!dir?.files) return NO_IMAGES;

  const files = dir.files.filter(
    (f): f is JsDelivrNode & { type: "file" } => f.type === "file",
  );

  const coverFile =
    files.find(
      (f) => f.name.toLowerCase().startsWith("cover.") && hasImageExt(f.name),
    ) ?? null;
  const cover = coverFile ? buildCdnUrl(ref, slug, coverFile.name) : null;

  const screenFiles = files
    .filter((f) => /^screen-\d+\./i.test(f.name) && hasImageExt(f.name))
    .toSorted((a, b) => {
      const na = parseInt(a.name.match(/\d+/)?.[0] ?? "0", 10);
      const nb = parseInt(b.name.match(/\d+/)?.[0] ?? "0", 10);
      return na - nb;
    });

  const screens = screenFiles.map((f) => buildCdnUrl(ref, slug, f.name));

  return { cover, screens };
}
