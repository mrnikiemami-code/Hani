"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { updateSupportTicket } from "../application/admin-support-actions";

/** Status, priority, and assignment controls for one support ticket. */
export function SupportTicketControls({
  id,
  status,
  priority,
  assignedTo,
  assignees
}: {
  id: string;
  status: string;
  priority: string;
  assignedTo: string | null;
  assignees: { id: string; label: string }[];
}) {
  const t = useTranslations("adminSupport");
  const messages = useMessageBox();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [nextStatus, setNextStatus] = useState(status);
  const [nextPriority, setNextPriority] = useState(priority);
  const [nextAssignedTo, setNextAssignedTo] = useState(assignedTo ?? "");

  useEffect(() => {
    setNextStatus(status);
    setNextPriority(priority);
    setNextAssignedTo(assignedTo ?? "");
  }, [status, priority, assignedTo]);

  const save = async () => {
    setPending(true);
    const result = await updateSupportTicket(
      id,
      nextStatus,
      nextPriority,
      nextAssignedTo.trim() || null
    );
    setPending(false);
    if (!result.ok) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }
    messages.toast({ kind: "success", message: t("updated") });
    router.refresh();
  };

  return (
    <div className="d-flex flex-wrap gap-2 align-items-end">
      <div>
        <label className="form-label fs-12 mb-1" htmlFor="support-next-status">
          {t("status")}
        </label>
        <select
          id="support-next-status"
          className="form-select form-select-sm"
          value={nextStatus}
          onChange={(event) => setNextStatus(event.target.value)}
        >
          <option value="Open">{t("statusOpen")}</option>
          <option value="InProgress">{t("statusInProgress")}</option>
          <option value="WaitingCustomer">{t("statusWaitingCustomer")}</option>
          <option value="Resolved">{t("statusResolved")}</option>
          <option value="Closed">{t("statusClosed")}</option>
        </select>
      </div>
      <div>
        <label className="form-label fs-12 mb-1" htmlFor="support-next-priority">
          {t("priority")}
        </label>
        <select
          id="support-next-priority"
          className="form-select form-select-sm"
          value={nextPriority}
          onChange={(event) => setNextPriority(event.target.value)}
        >
          <option value="Low">{t("priorityLow")}</option>
          <option value="Normal">{t("priorityNormal")}</option>
          <option value="High">{t("priorityHigh")}</option>
          <option value="Urgent">{t("priorityUrgent")}</option>
        </select>
      </div>
      <div>
        <label className="form-label fs-12 mb-1" htmlFor="support-next-assignee">
          {t("assignedTo")}
        </label>
        <select
          id="support-next-assignee"
          className="form-select form-select-sm"
          value={nextAssignedTo}
          onChange={(event) => setNextAssignedTo(event.target.value)}
        >
          <option value="">{t("unassigned")}</option>
          {assignees.map((assignee) => (
            <option key={assignee.id} value={assignee.id}>
              {assignee.label}
            </option>
          ))}
        </select>
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
  );
}
