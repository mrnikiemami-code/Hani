"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBodyClass } from "../hooks/useBodyClass";
import { useSuppressHtmlClass } from "../hooks/useSuppressHtmlClass";

const ERROR_PAGES = ["/under-maintenance", "/error-404", "/error-500"];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const isErrorPage = ERROR_PAGES.includes(pathname);
  useBodyClass("bg-primary-transparent", isErrorPage);
  useSuppressHtmlClass("dark-mode");
  const comingSoon = pathname === "/coming-soon";

  if (isErrorPage) return <>{children}</>;
  return (
    <div className={`main-wrapper authentication-wrapper ${comingSoon ? "coming-soon-wrapper" : ""}`}>
      <div className="container-fuild">{children}</div>
      <div className="coprright-footer">
        <p className="fs-14">
          Copyright &copy; 2026. All Rights Reserved,{" "}
          <Link href="#" className="text-primary fw-medium">DreamsTour</Link>
        </p>
      </div>
    </div>
  );
}
