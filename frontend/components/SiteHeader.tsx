import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

const navItems = [
  ["tours", "/tours"],
  ["hotels", "/hotels"],
  ["restaurants", "/restaurants"],
  ["attractions", "/attractions"],
  ["visa", "/visa"],
  ["flights", "/flights"],
  ["itineraries", "/itineraries"],
  ["blog", "/blog"],
  ["videos", "/videos"],
  ["agencies", "/agencies"]
] as const;

export async function SiteHeader({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "nav" });
  const common = await getTranslations({ locale });

  return (
    <header className="topbar">
      <div className="container nav">
        <Link className="brand" href="/">
          {common("brand")}
        </Link>
        {navItems.map(([key, href]) => (
          <Link key={key} href={href}>
            {t(key)}
          </Link>
        ))}
        <div className="nav-actions">
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        Hani API-first marketplace · FA / EN / AR · Hani MoR
      </div>
    </footer>
  );
}
