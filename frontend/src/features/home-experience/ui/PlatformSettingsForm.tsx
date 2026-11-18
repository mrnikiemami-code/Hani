"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import type {
  AdminPlatformSettings,
  PlatformSettings
} from "../domain/admin-platform-settings";
import { savePlatformSettings } from "../application/admin-settings-actions";

const FIELDS: Array<{ key: keyof PlatformSettings; type?: string }> = [
  { key: "brandName" },
  { key: "supportEmail", type: "email" },
  { key: "supportPhone", type: "tel" },
  { key: "defaultCurrency" },
  { key: "termsUrl", type: "url" },
  { key: "privacyUrl", type: "url" },
  { key: "maintenanceMessage" }
];

/** Platform-wide base settings form. */
export function PlatformSettingsForm({ initial }: { initial: AdminPlatformSettings }) {
  const t = useTranslations("adminSettings");
  const messages = useMessageBox();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [settings, setSettings] = useState<PlatformSettings>({
    brandName: initial.settings.brandName ?? "",
    supportEmail: initial.settings.supportEmail ?? "",
    supportPhone: initial.settings.supportPhone ?? "",
    defaultCurrency: initial.settings.defaultCurrency ?? "IRR",
    termsUrl: initial.settings.termsUrl ?? "",
    privacyUrl: initial.settings.privacyUrl ?? "",
    maintenanceMessage: initial.settings.maintenanceMessage ?? ""
  });

  const update = (key: keyof PlatformSettings, value: string) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const result = await savePlatformSettings(settings);
    setPending(false);
    if (!result.ok) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }
    messages.toast({ kind: "success", message: t("saved") });
    router.refresh();
  };

  return (
    <form className="card border-0 shadow-sm" onSubmit={submit}>
      <div className="card-header">
        <h2 className="h5 mb-0">{t("title")}</h2>
        <p className="fs-13 text-gray-6 mb-0">{t("subtitle")}</p>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {FIELDS.map((field) => (
            <div className="col-md-6" key={field.key}>
              <label className="form-label" htmlFor={`platform-${field.key}`}>
                {t(field.key)}
              </label>
              {field.key === "maintenanceMessage" ? (
                <textarea
                  id={`platform-${field.key}`}
                  className="form-control"
                  rows={3}
                  value={settings[field.key]}
                  onChange={(event) => update(field.key, event.target.value)}
                  maxLength={1000}
                />
              ) : (
                <input
                  id={`platform-${field.key}`}
                  type={field.type ?? "text"}
                  className="form-control"
                  dir={field.type === "url" || field.type === "email" ? "ltr" : undefined}
                  value={settings[field.key]}
                  onChange={(event) => update(field.key, event.target.value)}
                  maxLength={500}
                />
              )}
            </div>
          ))}
        </div>
        {initial.updatedAt && (
          <p className="fs-12 text-gray-6 mt-3 mb-0">
            {t("updatedAt")}: {initial.updatedAt}
          </p>
        )}
      </div>
      <div className="card-footer bg-white d-flex justify-content-end">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? t("saving") : t("save")}
        </button>
      </div>
    </form>
  );
}
