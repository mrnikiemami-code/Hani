"use client";
import { useEffect } from "react";

/** Temporarily removes a class from <html> (e.g. force light mode on auth pages) and restores it on unmount. */
export const useSuppressHtmlClass = (className: string) => {
  useEffect(() => {
    const el = document.documentElement;
    const had = el.classList.contains(className);
    el.classList.remove(className);
    return () => {
      if (had) el.classList.add(className);
    };
  }, [className]);
};
