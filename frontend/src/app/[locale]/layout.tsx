import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Noto_Kufi_Arabic, Vazirmatn } from "next/font/google";
import StoreProvider from "@/providers/StoreProvider";
import ThemeSync from "@/providers/ThemeSync";
import BootstrapJs from "@/providers/BootstrapJs";
import RouteLoader from "@/components/loader/loader";
import { TemplateTranslationProvider } from "@/components/hani/TemplateTranslationProvider";
import { MessageProvider } from "@/components/hani/message-provider";
import { routing } from "@/i18n/routing";
import templateFa from "../../messages/template.fa.json";
import templateAr from "../../messages/template.ar.json";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/css/animate.css";
import "@tabler/icons-webfont/dist/tabler-icons.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../style/css/iconsax.css";
import "swiper/css/bundle";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "react-phone-number-input/style.css";
import "../globals.scss";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap"
});

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-kufi",
  display: "swap"
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ff725e"
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description")
  };
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const common = await getTranslations({ locale, namespace: "common" });
  const templateDictionary =
    locale === "fa"
      ? (templateFa as Record<string, string>)
      : locale === "ar"
        ? (templateAr as Record<string, string>)
        : {};
  const dir = locale === "en" ? "ltr" : "rtl";

  return (
    <html
      lang={locale}
      dir={dir}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className={`${inter.variable} ${vazirmatn.variable} ${notoKufi.variable}`}>
        <a href="#main-content" className="visually-hidden-focusable">
          {common("skipToContent")}
        </a>
        <StoreProvider>
          <ThemeSync />
          <RouteLoader />
          <NextIntlClientProvider messages={messages}>
            <MessageProvider>
              <TemplateTranslationProvider dictionary={templateDictionary}>
                <main id="main-content">{children}</main>
              </TemplateTranslationProvider>
            </MessageProvider>
          </NextIntlClientProvider>
        </StoreProvider>
        <BootstrapJs />
      </body>
    </html>
  );
}
