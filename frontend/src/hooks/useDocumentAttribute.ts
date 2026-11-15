"use client";
import { useEffect } from "react";

/** Sets an attribute on <html> (e.g. `dir="rtl"`) for the lifetime of the component. */
export const useDocumentAttribute = (name: string, value: string) => {
  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute(name, value);
    return () => el.removeAttribute(name);
  }, [name, value]);
};
