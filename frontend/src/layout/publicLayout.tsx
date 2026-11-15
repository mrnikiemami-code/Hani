"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "../components/common-header/header";
import Cursor from "../components/cursor/cursor";
import BackToTop from "../components/back-to-top/backToTop";
import Footer from "../components/common-footer/footer";
import FooterSeven from "../views/home-seven/footerSeven";
import { LocaleSwitcher } from "@/components/hani/LocaleSwitcher";

const NO_HEADER = ["/", "/index-10", "/index-12"];
const NO_FOOTER = ["/", "/index-1", "/index-2", "/index-4", "/index-5", "/index-6", "/index-7", "/index-8", "/index-9", "/index-10", "/index-11", "/index-12"];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const normalizedPathname = pathname.replace(/^\/(fa|en|ar)(?=\/|$)/, "") || "/";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div>
      <div className="hani-locale-float">
        <LocaleSwitcher />
      </div>
      {!NO_HEADER.includes(normalizedPathname) && <Header />}
      {children}
      {!NO_FOOTER.includes(normalizedPathname) && <Footer />}
      {normalizedPathname === "/index-9" && <FooterSeven />}
      {normalizedPathname !== "/index-2" && <BackToTop />}
      <Cursor />
      <div className="sidebar-overlay"></div>
    </div>
  );
}
