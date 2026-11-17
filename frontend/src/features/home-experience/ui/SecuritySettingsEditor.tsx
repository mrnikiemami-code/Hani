"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import {
  saveOtpSecuritySettings,
  unlockOtpSecurity,
  type OtpSecurityConfig
} from "../application/security-actions";

const FIELDS: Array<{
  key: keyof OtpSecurityConfig;
  label: string;
  min: number;
  max: number;
}> = [
  { key: "lifetimeSeconds", label: "lifetimeSeconds", min: 60, max: 600 },
  { key: "resendCooldownSeconds", label: "resendCooldownSeconds", min: 30, max: 600 },
  { key: "maxRequestsPerHour", label: "maxRequestsPerHour", min: 1, max: 30 },
  { key: "maxVerifyAttempts", label: "maxVerifyAttempts", min: 3, max: 10 },
  { key: "mobileChangeWindowSeconds", label: "mobileChangeWindowSeconds", min: 30, max: 3600 },
  { key: "maxMobileChangesPerIp", label: "maxMobileChangesPerIp", min: 1, max: 10 },
  { key: "ipBlockSeconds", label: "ipBlockSeconds", min: 60, max: 86400 },
  { key: "maxIpRequestsPerWindow", label: "maxIpRequestsPerWindow", min: 1, max: 100 },
  { key: "ipRequestWindowSeconds", label: "ipRequestWindowSeconds", min: 30, max: 3600 }
];

/**
 * Admin editor for the persisted OTP security policy. The API normalizes
 * values to safe bounds; the form communicates the intended ranges.
 */
export function SecuritySettingsEditor({
  initialSettings
}: {
  initialSettings: OtpSecurityConfig;
}) {
  const t = useTranslations("adminSecurity");
  const messages = useMessageBox();
  const [settings, setSettings] = useState(initialSettings);
  const [unlockMobile, setUnlockMobile] = useState("");
  const [unlockIp, setUnlockIp] = useState("");
  const [pending, startTransition] = useTransition();

  const unlock = () => {
    startTransition(async () => {
      const result = await unlockOtpSecurity(unlockMobile, unlockIp);
      if (result.ok) {
        setUnlockMobile("");
        setUnlockIp("");
        messages.toast({ kind: "success", message: t("unlocked") });
      } else {
        messages.toast({ kind: "error", message: t("error") });
      }
    });
  };

  const save = () => {
    startTransition(async () => {
      const result = await saveOtpSecuritySettings(settings);
      if (result.ok && result.data) {
        setSettings(result.data);
        messages.toast({ kind: "success", message: t("saved") });
      } else {
        messages.toast({ kind: "error", message: t("error") });
      }
    });
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <h2 className="h5 mb-1">{t("title")}</h2>
          <p className="fs-13 text-gray-6 mb-0">{t("subtitle")}</p>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={save}
          disabled={pending}
        >
          {pending ? t("saving") : t("save")}
        </button>
      </div>
      <div className="card-body">
        <div className="alert alert-info" role="status">
          {t("storageHint")}
        </div>
        <div className="row g-3">
          {FIELDS.map((field) => (
            <div className="col-md-6 col-xl-4" key={field.key}>
              <label className="form-label" htmlFor={`otp-${field.key}`}>
                {t(field.label)}
              </label>
              <input
                id={`otp-${field.key}`}
                className="form-control"
                type="number"
                min={field.min}
                max={field.max}
                dir="ltr"
                value={settings[field.key]}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    [field.key]: Number(event.target.value)
                  }))
                }
              />
              <p className="fs-12 text-gray-6 mb-0 mt-1">
                {t(`${field.label}Hint`)}
              </p>
            </div>
          ))}
        </div>

        <hr className="my-4" />
        <h3 className="h6 mb-1">{t("unlockTitle")}</h3>
        <p className="fs-13 text-gray-6 mb-3">{t("unlockHint")}</p>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label" htmlFor="otp-unlock-mobile">
              {t("unlockMobile")}
            </label>
            <input
              id="otp-unlock-mobile"
              className="form-control"
              dir="ltr"
              value={unlockMobile}
              onChange={(event) => setUnlockMobile(event.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="otp-unlock-ip">
              {t("unlockIp")}
            </label>
            <input
              id="otp-unlock-ip"
              className="form-control"
              dir="ltr"
              value={unlockIp}
              onChange={(event) => setUnlockIp(event.target.value)}
            />
          </div>
          <div className="col-md-4 d-flex align-items-end">
            <button
              type="button"
              className="btn btn-light w-100"
              onClick={unlock}
              disabled={pending || (!unlockMobile.trim() && !unlockIp.trim())}
            >
              {t("unlock")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
