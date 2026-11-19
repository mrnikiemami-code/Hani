"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Refreshes a support thread every 20 seconds while the tab is visible. */
export function SupportAutoRefresh() {
  const router = useRouter();

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    }, 20_000);
    return () => window.clearInterval(timer);
  }, [router]);

  return null;
}
