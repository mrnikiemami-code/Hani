"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { addAdCreative } from "../application/admin-ad-actions";

/** Adds a creative to one advertising slot. */
export function AdCreativeForm({ code }: { code: string }) {
  const t = useTranslations("adminAds");
  const messages = useMessageBox();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [targetUrl, setTargetUrl] = useState("");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !imageUrl.trim() || !targetUrl.trim()) {
      messages.toast({ kind: "error", message: t("required") });
      return;
    }

    setPending(true);
    const result = await addAdCreative(code, {
      title: title.trim(),
      imageUrl: imageUrl.trim(),
      targetUrl: targetUrl.trim(),
      startsAt: null,
      endsAt: null
    });
    setPending(false);
    if (!result.ok) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }

    setTitle("");
    setImageUrl("");
    setTargetUrl("");
    messages.toast({ kind: "success", message: t("creativeCreated") });
    router.refresh();
  };

  return (
    <form className="row g-2 align-items-end" onSubmit={submit}>
      <div className="col-md-3">
        <label className="form-label" htmlFor={`ad-title-${code}`}>
          {t("creativeTitle")}
        </label>
        <input
          id={`ad-title-${code}`}
          className="form-control"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={200}
          required
        />
      </div>
      <div className="col-md-4">
        <label className="form-label" htmlFor={`ad-image-${code}`}>
          {t("imageUrl")}
        </label>
        <input
          id={`ad-image-${code}`}
          className="form-control"
          dir="ltr"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          maxLength={1000}
          placeholder="https://"
          required
        />
      </div>
      <div className="col-md-4">
        <label className="form-label" htmlFor={`ad-target-${code}`}>
          {t("targetUrl")}
        </label>
        <input
          id={`ad-target-${code}`}
          className="form-control"
          dir="ltr"
          value={targetUrl}
          onChange={(event) => setTargetUrl(event.target.value)}
          maxLength={1000}
          placeholder="https://"
          required
        />
      </div>
      <div className="col-md-1">
        <button type="submit" className="btn btn-primary w-100" disabled={pending}>
          {pending ? t("saving") : t("add")}
        </button>
      </div>
    </form>
  );
}
