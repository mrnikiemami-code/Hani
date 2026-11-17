"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import ImageWithBasePath from "@/components/image-with-base-path";

export function OtpLoginForm({ locale }: { locale: string }) {
  const t = useTranslations("auth");
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"mobile" | "code">("mobile");
  const [devCode, setDevCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendAt, setResendAt] = useState(0);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!resendAt) {
      setRemaining(0);
      return;
    }
    const tick = () =>
      setRemaining(Math.max(0, Math.ceil((resendAt - Date.now()) / 1000)));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [resendAt]);

  const timeLabel = `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(
    remaining % 60
  ).padStart(2, "0")}`;

  async function sendCode() {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile })
      });
      if (!response.ok) throw new Error("request");
      const data = (await response.json()) as {
        devCode: string | null;
        retryAfterSeconds: number;
      };
      setDevCode(data.devCode);
      setResendAt(Date.now() + data.retryAfterSeconds * 1000);
      setStep("code");
    } catch {
      setError(t("invalid"));
    } finally {
      setLoading(false);
    }
  }

  async function verify() {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, code })
      });
      if (!response.ok) throw new Error("verify");
      router.push(`/${locale}`);
      router.refresh();
    } catch {
      setError(t("invalid"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
      <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
        <div className="col-xxl-4 col-lg-6 col-md-6 col-11 mx-auto">
          <div className="p-4 text-center">
            <ImageWithBasePath
              src="assets/img/logo-dark.svg"
              alt="Hani"
              className="img-fluid"
            />
          </div>
          <div className="card authentication-card">
            <div className="card-header">
              <div className="text-center">
                <h5 className="mb-1">{t("title")}</h5>
                <p>{t("subtitle")}</p>
              </div>
            </div>
            <div className="card-body">
              {error ? <div className="alert alert-danger">{error}</div> : null}

              {step === "mobile" ? (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    void sendCode();
                  }}
                >
                  <div className="mb-3">
                    <label className="form-label">{t("mobile")}</label>
                    <div className="input-icon">
                      <span className="input-icon-addon">
                        <i className="isax isax-call" />
                      </span>
                      <input
                        className="form-control form-control-lg"
                        type="tel"
                        dir="ltr"
                        inputMode="tel"
                        autoComplete="tel"
                        value={mobile}
                        onChange={(event) => setMobile(event.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                    {loading ? t("sending") : t("sendCode")}
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    void verify();
                  }}
                >
                  {devCode ? (
                    <div className="alert alert-info">
                      {t("devCode")}: <strong dir="ltr">{devCode}</strong>
                    </div>
                  ) : null}
                  <div className="mb-3">
                    <label className="form-label">{t("code")}</label>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      dir="ltr"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      value={code}
                      onChange={(event) => setCode(event.target.value)}
                      required
                    />
                  </div>
                  <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                    {loading ? t("verifying") : t("verify")}
                  </button>
                  {remaining > 0 ? (
                    <p className="text-center text-gray-6 fs-13 mt-3 mb-0">
                      {t("resendIn", { time: timeLabel })}
                    </p>
                  ) : (
                    <button
                      className="btn btn-link w-100 mt-2"
                      type="button"
                      onClick={() => void sendCode()}
                      disabled={loading}
                    >
                      {t("resend")}
                    </button>
                  )}
                  <button
                    className="btn btn-link w-100 mt-2"
                    type="button"
                    onClick={() => {
                      setStep("mobile");
                      setCode("");
                      setDevCode(null);
                      setResendAt(0);
                    }}
                  >
                    {t("changeMobile")}
                  </button>
                </form>
              )}

              <div className="text-center mt-3">
                <button
                  className="btn btn-link p-0"
                  type="button"
                  onClick={() => router.push(`/${locale}`)}
                >
                  {t("backHome")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
