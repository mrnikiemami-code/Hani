"use client";

import { useEffect, useState } from "react";

/** Renders the signed-in agency name without hardcoding a demo identity. */
export function AgencyName() {
  const [name, setName] = useState("Agency");

  useEffect(() => {
    let active = true;
    fetch("/api/agency/me", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (active && data) {
          setName(data.managerName || data.name || "Agency");
        }
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  return <>{name}</>;
}
