"use client";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

/**
 * Scroll-spy for in-page section navigation (add/edit forms).
 * Sections register themselves with `ref={registerSection("#id")}` so no DOM lookups are needed.
 */
export const useSectionSpy = (sectionIds: string[], headerOffset = 80) => {
  const sections = useRef(new Map<string, HTMLElement>());
  const [activeId, setActiveId] = useState<string>(sectionIds[0]);

  const registerSection = useCallback(
    (hash: string) => (el: HTMLElement | null) => {
      if (el) sections.current.set(hash, el);
      else sections.current.delete(hash);
    },
    [],
  );

  useEffect(() => {
    if (window.location.hash) setActiveId(window.location.hash);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(`#${entry.target.id}`);
        });
      },
      { root: null, rootMargin: `-${headerOffset}px 0px -60% 0px`, threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
    );
    sectionIds.forEach((hash) => {
      const el = sections.current.get(hash);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sectionIds, headerOffset]);

  const onNavClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
      e.preventDefault();
      const target = sections.current.get(hash);
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(hash);
      window.history.replaceState(null, "", hash);
    },
    [headerOffset],
  );

  return { activeId, registerSection, onNavClick };
};
