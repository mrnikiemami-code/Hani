"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { createSupportTicket } from "../application/admin-support-actions";

/** Creates an operational support ticket on behalf of a customer. */
export function SupportTicketForm() {
  const t = useTranslations("adminSupport");
  const messages = useMessageBox();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Booking");
  const [priority, setPriority] = useState("Normal");
  const [message, setMessage] = useState("");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !contactName.trim() ||
      !contactEmail.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      messages.toast({ kind: "error", message: t("required") });
      return;
    }

    setPending(true);
    const result = await createSupportTicket({
      contactName: contactName.trim(),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim() || null,
      subject: subject.trim(),
      category,
      message: message.trim(),
      priority
    });
    setPending(false);
    if (!result.ok) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }

    messages.toast({ kind: "success", message: t("created") });
    if (result.id) {
      router.push(`/admin/support/tickets/${result.id}`);
    } else {
      router.push("/admin/support/tickets");
    }
  };

  return (
    <form className="card border-0 shadow-sm" onSubmit={submit}>
      <div className="card-header">
        <h2 className="h5 mb-0">{t("createTitle")}</h2>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label" htmlFor="support-name">
              {t("contactName")}
            </label>
            <input
              id="support-name"
              className="form-control"
              value={contactName}
              onChange={(event) => setContactName(event.target.value)}
              maxLength={200}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="support-email">
              {t("contactEmail")}
            </label>
            <input
              id="support-email"
              type="email"
              dir="ltr"
              className="form-control"
              value={contactEmail}
              onChange={(event) => setContactEmail(event.target.value)}
              maxLength={320}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="support-phone">
              {t("contactPhone")}
            </label>
            <input
              id="support-phone"
              type="tel"
              dir="ltr"
              className="form-control"
              value={contactPhone}
              onChange={(event) => setContactPhone(event.target.value)}
              maxLength={40}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="support-subject">
              {t("subject")}
            </label>
            <input
              id="support-subject"
              className="form-control"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              maxLength={300}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="support-category">
              {t("category")}
            </label>
            <select
              id="support-category"
              className="form-select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="Booking">{t("categoryBooking")}</option>
              <option value="Payment">{t("categoryPayment")}</option>
              <option value="Hotel">{t("categoryHotel")}</option>
              <option value="Account">{t("categoryAccount")}</option>
              <option value="Other">{t("categoryOther")}</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="support-priority">
              {t("priority")}
            </label>
            <select
              id="support-priority"
              className="form-select"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option value="Low">{t("priorityLow")}</option>
              <option value="Normal">{t("priorityNormal")}</option>
              <option value="High">{t("priorityHigh")}</option>
              <option value="Urgent">{t("priorityUrgent")}</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="support-message">
              {t("message")}
            </label>
            <textarea
              id="support-message"
              className="form-control"
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={5000}
              required
            />
          </div>
        </div>
      </div>
      <div className="card-footer bg-white d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-light"
          onClick={() => router.push("/admin/support/tickets")}
          disabled={pending}
        >
          {t("cancel")}
        </button>
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? t("saving") : t("save")}
        </button>
      </div>
    </form>
  );
}
