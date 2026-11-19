"use client";

import { useEffect, useState } from "react";

import type {
  AdminPlatformSettings,
  PlatformSettings
} from "@/features/home-experience/domain/admin-platform-settings";

const defaults: PlatformSettings = {
  brandName: "Hani",
  supportEmail: "info@hani.ir",
  supportPhone: "",
  defaultCurrency: "IRR",
  termsUrl: "",
  privacyUrl: "",
  maintenanceMessage: ""
};

/** Loads public platform settings once and returns safe defaults on failure. */
export function usePlatformSettings(): PlatformSettings {
  const [settings, setSettings] = useState<PlatformSettings>(defaults);

  useEffect(() => {
    let active = true;
    fetch("/api/platform-settings", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: AdminPlatformSettings | null) => {
        if (!active || !data?.settings) return;
        setSettings({
          brandName: data.settings.brandName ?? defaults.brandName,
          supportEmail: data.settings.supportEmail ?? defaults.supportEmail,
          supportPhone: data.settings.supportPhone ?? defaults.supportPhone,
          defaultCurrency: data.settings.defaultCurrency ?? defaults.defaultCurrency,
          termsUrl: data.settings.termsUrl ?? defaults.termsUrl,
          privacyUrl: data.settings.privacyUrl ?? defaults.privacyUrl,
          maintenanceMessage:
            data.settings.maintenanceMessage ?? defaults.maintenanceMessage
        });
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  return settings;
}
