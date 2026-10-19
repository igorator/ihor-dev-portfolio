import type { Locale, Messages } from "next-intl";

// Same on server and client, so formatted dates don't differ on hydration
export const timeZone = "Europe/Kyiv";

// Typed against en.json (see global.d.ts): a missing key in another locale fails tsc
const loaders = {
  en: () => import("../messages/en.json"),
  uk: () => import("../messages/uk.json"),
} satisfies Record<Locale, () => Promise<{ default: Messages }>>;

export async function loadMessages(locale: Locale): Promise<Messages> {
  return (await loaders[locale]()).default;
}
