"use client";

import { useEffect } from "react";

type TemplateTranslationProviderProps = {
  dictionary: Record<string, string>;
  children: React.ReactNode;
};

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "CODE", "PRE", "TEXTAREA"]);
const ATTRIBUTES = ["placeholder", "title", "aria-label"];

function normalize(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function translateTextNode(node: Text, dictionary: Record<string, string>) {
  const raw = node.nodeValue ?? "";
  const key = normalize(raw);
  if (!key) return;

  const translated = dictionary[key];
  if (!translated || translated === key) return;

  const leading = raw.match(/^\s*/)?.[0] ?? "";
  const trailing = raw.match(/\s*$/)?.[0] ?? "";
  const next = `${leading}${translated}${trailing}`;
  if (next !== raw) {
    node.nodeValue = next;
  }
}

function translateElementAttributes(element: Element, dictionary: Record<string, string>) {
  for (const attribute of ATTRIBUTES) {
    const value = element.getAttribute(attribute);
    if (!value) continue;
    const key = normalize(value);
    const translated = dictionary[key];
    if (translated && translated !== key) {
      element.setAttribute(attribute, translated);
    }
  }
}

function translateRoot(root: ParentNode, dictionary: Record<string, string>) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    const parent = current.parentElement;
    if (parent && !SKIP_TAGS.has(parent.tagName)) {
      translateTextNode(current as Text, dictionary);
    }
    current = walker.nextNode();
  }

  if (root instanceof Element) {
    translateElementAttributes(root, dictionary);
    root.querySelectorAll(ATTRIBUTES.map((item) => `[${item}]`).join(",")).forEach((element) => {
      translateElementAttributes(element, dictionary);
    });
  }
}

/**
 * Transitional adapter for the purchased template's legacy hard-coded copy.
 *
 * The template source remains the visual source of truth. Its English copy is
 * externalized into `template.fa.json` / `template.ar.json`; Hani-owned UI uses
 * next-intl message keys directly. New Hani components must use next-intl, not
 * this adapter.
 */
export function TemplateTranslationProvider({
  dictionary,
  children
}: TemplateTranslationProviderProps) {
  useEffect(() => {
    if (!dictionary || Object.keys(dictionary).length === 0) {
      return;
    }

    translateRoot(document.body, dictionary);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData" && mutation.target.nodeType === Node.TEXT_NODE) {
          const parent = mutation.target.parentElement;
          if (parent && !SKIP_TAGS.has(parent.tagName)) {
            translateTextNode(mutation.target as Text, dictionary);
          }
          continue;
        }

        for (const node of Array.from(mutation.addedNodes)) {
          if (node.nodeType === Node.TEXT_NODE) {
            const parent = node.parentElement;
            if (parent && !SKIP_TAGS.has(parent.tagName)) {
              translateTextNode(node as Text, dictionary);
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            translateRoot(node as Element, dictionary);
          }
        }
      }
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true
    });

    return () => observer.disconnect();
  }, [dictionary]);

  return <>{children}</>;
}
