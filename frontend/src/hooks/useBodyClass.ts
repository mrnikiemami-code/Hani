"use client";
import { useEffect } from "react";

/** Adds a class to <body> (or <html>) while the component is mounted and `enabled` is true. */
export const useBodyClass = (className: string, enabled = true, target: "body" | "html" = "body") => {
  useEffect(() => {
    if (!enabled) return;
    const el = target === "html" ? document.documentElement : document.body;
    el.classList.add(className);
    return () => el.classList.remove(className);
  }, [className, enabled, target]);
};
