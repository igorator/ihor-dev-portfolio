import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { loadMessages, timeZone } from "@/i18n/messages";
import { routing } from "@/i18n/routing";
import { MobileHiddenMenuButton } from "@/widgets/mobile-hidden-menu/MobileHiddenMenuButton/MobileHiddenMenuButton";
import { Navbar } from "@/widgets/navbar/Navbar";
import { ScrollToTop } from "@/widgets/scroll-to-top/ScrollToTop";
import { NotFoundSection } from "@/views/not-found/NotFoundSection";
import { Document } from "./_document/Document";

// Outside [locale], so it renders its own document in the default locale
export default async function AppNotFound() {
  const locale = routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "notFound" });
  const messages = await loadMessages(locale);

  return (
    <Document lang={locale}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone={timeZone}
      >
        <MobileHiddenMenuButton />
        <Navbar />
        <ScrollToTop />
        <main className="page-wrapper">
          <NotFoundSection title={t("title")} />
        </main>
      </NextIntlClientProvider>
    </Document>
  );
}
