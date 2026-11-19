"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { updateAdminOrderContact } from "../application/admin-booking-actions";

/** Edits the non-commercial contact details of an order. */
export function OrderContactEditor({
  orderId,
  contactEmail,
  contactPhone,
  closed
}: {
  orderId: string;
  contactEmail: string;
  contactPhone: string | null;
  closed: boolean;
}) {
  const t = useTranslations("adminBookings");
  const messages = useMessageBox();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(contactEmail);
  const [phone, setPhone] = useState(contactPhone ?? "");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setError(null);
    setEmail(contactEmail);
    setPhone(contactPhone ?? "");
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      setError(t("emailRequired"));
      return;
    }

    setPending(true);
    const result = await updateAdminOrderContact(
      orderId,
      email.trim(),
      phone.trim() || null
    );
    setPending(false);
    if (!result.ok) {
      setError(t("error"));
      return;
    }

    close();
    messages.toast({ kind: "success", message: t("contactUpdated") });
    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-light btn-sm"
        onClick={() => setOpen(true)}
        disabled={closed}
      >
        {t("editContact")}
      </button>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="modal fade show d-block"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <form onSubmit={submit}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="contact-modal-title">
                      {t("editContactTitle")}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label={t("close")}
                      onClick={close}
                    />
                  </div>
                  <div className="modal-body">
                    <p className="fs-13 text-gray-6">{t("editContactHint")}</p>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="order-contact-email">
                        {t("contactEmail")}
                      </label>
                      <input
                        id="order-contact-email"
                        type="email"
                        className="form-control"
                        dir="ltr"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        maxLength={320}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="order-contact-phone">
                        {t("contactPhone")}
                      </label>
                      <input
                        id="order-contact-phone"
                        className="form-control"
                        dir="ltr"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        maxLength={40}
                      />
                    </div>
                    {error && (
                      <div className="alert alert-danger py-2 mt-3 mb-0" role="alert">
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={close}
                      disabled={pending}
                    >
                      {t("back")}
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={pending}>
                      {pending ? t("saving") : t("save")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>,
          document.body
        )}
      {open &&
        typeof document !== "undefined" &&
        createPortal(<div className="modal-backdrop fade show" />, document.body)}
    </>
  );
}
