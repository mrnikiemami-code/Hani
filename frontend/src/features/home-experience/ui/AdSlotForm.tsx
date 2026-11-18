"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { createAdSlot } from "../application/admin-ad-actions";

/** Creates a new advertising slot. */
export function AdSlotForm() {
  const t = useTranslations("adminAds");
  const messages = useMessageBox();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!code.trim() || !name.trim()) {
      messages.toast({ kind: "error", message: t("required") });
      return;
    }

    setPending(true);
    const result = await createAdSlot(code.trim(), name.trim());
    setPending(false);
    if (!result.ok) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }

    setCode("");
    setName("");
    messages.toast({ kind: "success", message: t("slotCreated") });
    router.refresh();
  };

  return (
    <form className="row g-2 align-items-end" onSubmit={submit}>
      <div className="col-md-4">
        <label className="form-label" htmlFor="ad-slot-code">
          {t("slotCode")}
        </label>
        <input
          id="ad-slot-code"
          className="form-control"
          dir="ltr"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          maxLength={80}
          placeholder="home-below-tours"
          required
        />
      </div>
      <div className="col-md-5">
        <label className="form-label" htmlFor="ad-slot-name">
          {t("slotName")}
        </label>
        <input
          id="ad-slot-name"
          className="form-control"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={200}
          required
        />
      </div>
      <div className="col-md-3">
        <button type="submit" className="btn btn-primary w-100" disabled={pending}>
          {pending ? t("saving") : t("createSlot")}
        </button>
      </div>
    </form>
  );
}
