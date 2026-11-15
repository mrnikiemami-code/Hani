"use client";

import { Suspense, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { routing } from "@/i18n/routing";

function LocaleSelect() {
  const locale = useLocale();
  const t = useTranslations("common");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function changeLocale(nextLocale: string) {
    const query = searchParams.toString();
    const href = query ? `${pathname}?${query}` : pathname;

    startTransition(() => {
      router.replace(href, { locale: nextLocale });
    });
  }

  return (
    <label className="locale-switcher">
      <span className="sr-only">{t("language")}</span>
      <select
        aria-label={t("language")}
        value={locale}
        disabled={isPending}
        onChange={(event) => changeLocale(event.target.value)}
      >
        {routing.locales.map((item) => (
          <option key={item} value={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}

export function LocaleSwitcher() {
  return (
    <Suspense fallback={null}>
      <LocaleSelect />
    </Suspense>
  );
}
