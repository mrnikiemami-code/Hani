"use client";
import { useEffect } from "react";

/** Bootstrap's bundle touches `document` on import, so it is loaded only in the browser. */
export default function BootstrapJs() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return null;
}
