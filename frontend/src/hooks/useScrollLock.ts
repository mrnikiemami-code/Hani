"use client";
import { useEffect } from "react";

/** Prevents page scrolling while `locked` is true (e.g. mobile menu open). */
export const useScrollLock = (locked: boolean) => {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
};
