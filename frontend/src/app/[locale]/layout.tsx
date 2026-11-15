import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Noto_Kufi_Arabic, Vazirmatn } from "next/font/google";
import StoreProvider from "@/providers/StoreProvider";
import ThemeSync from "@/providers/ThemeSync";
import BootstrapJs from "@/providers/BootstrapJs";
import RouteLoader from "@/components/loader/loader";
import { routing } from "@/i18n/routing";

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
  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, `/${item}`])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages
    }
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
  const dir = locale === "en" ? "ltr" : "rtl";

  return (
    <html
      lang={locale}
      dir={dir}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className={`${inter.variable} ${vazirmatn.variable} ${notoKufi.variable}`}>
        <StoreProvider>
          <ThemeSync />
          <RouteLoader />
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </StoreProvider>
        <BootstrapJs />
      </body>
    </html>
  );
}
