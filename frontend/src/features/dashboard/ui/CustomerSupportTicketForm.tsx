"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { createMySupportTicket } from "../application/customer-support-actions";

/** Creates a support ticket for the signed-in customer. */
export function CustomerSupportTicketForm() {
  const t = useTranslations("supportCenter");
  const messages = useMessageBox();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Booking");
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
    const result = await createMySupportTicket({
      contactName: contactName.trim(),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim() || null,
      subject: subject.trim(),
      category,
      message: message.trim()
    });
    setPending(false);
    if (!result.ok) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }

    messages.toast({ kind: "success", message: t("created") });
    router.push(result.id ? `/user/support/${result.id}` : "/user/support");
  };

  return (
    <form className="card" onSubmit={submit}>
      <div className="card-header">
        <h5 className="mb-0">{t("createTitle")}</h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label" htmlFor="customer-ticket-name">
              {t("contactName")}
            </label>
            <input
              id="customer-ticket-name"
              className="form-control"
              value={contactName}
              onChange={(event) => setContactName(event.target.value)}
              maxLength={200}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="customer-ticket-email">
              {t("contactEmail")}
            </label>
            <input
              id="customer-ticket-email"
              type="email"
              className="form-control"
              dir="ltr"
              value={contactEmail}
              onChange={(event) => setContactEmail(event.target.value)}
              maxLength={320}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="customer-ticket-phone">
              {t("contactPhone")}
            </label>
            <input
              id="customer-ticket-phone"
              className="form-control"
              dir="ltr"
              value={contactPhone}
              onChange={(event) => setContactPhone(event.target.value)}
              maxLength={40}
            />
          </div>
          <div className="col-md-8">
            <label className="form-label" htmlFor="customer-ticket-subject">
              {t("subject")}
            </label>
            <input
              id="customer-ticket-subject"
              className="form-control"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              maxLength={300}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="customer-ticket-category">
              {t("category")}
            </label>
            <select
              id="customer-ticket-category"
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
          <div className="col-12">
            <label className="form-label" htmlFor="customer-ticket-message">
              {t("message")}
            </label>
            <textarea
              id="customer-ticket-message"
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
      <div className="card-footer bg-white d-flex justify-content-end">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? t("saving") : t("create")}
        </button>
      </div>
    </form>
  );
}
