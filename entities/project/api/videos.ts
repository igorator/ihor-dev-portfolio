import { resolveRef, fetchTree, findDir, buildCdnUrl } from "./cdn";

const VIDEO_NAMES = ["video.mp4", "video.webm"];

export async function listProjectVideo(slug: string): Promise<string | null> {
  const ref = await resolveRef();
  const tree = await fetchTree(ref).catch(() => null);
  if (!tree) return null;

  const dir = findDir(tree, ["Projects", slug]);
  if (!dir?.files) return null;

  const files = dir.files.filter((f) => f.type === "file");

  for (const name of VIDEO_NAMES) {
    const found = files.find((f) => f.name.toLowerCase() === name);
    if (found) return buildCdnUrl(ref, slug, found.name);
  }

  return null;
}
