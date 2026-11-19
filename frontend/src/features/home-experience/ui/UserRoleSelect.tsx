"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { changeUserRole } from "../application/admin-role-actions";

/** Inline role assignment for the admin user directory. */
export function UserRoleSelect({
  userId,
  role,
  roles
}: {
  userId: string;
  role: string;
  roles: Array<{ role: string; displayName: string }>;
}) {
  const t = useTranslations("adminUsers");
  const messages = useMessageBox();
  const router = useRouter();
  const [value, setValue] = useState(role);
  const [pending, setPending] = useState(false);

  const change = async (next: string) => {
    setValue(next);
    setPending(true);
    const result = await changeUserRole(userId, next);
    setPending(false);
    if (!result.ok) {
      setValue(role);
      messages.toast({ kind: "error", message: t("error") });
      return;
    }
    messages.toast({ kind: "success", message: t("roleChanged") });
    router.refresh();
  };

  return (
    <select
      className="form-select form-select-sm"
      value={value}
      disabled={pending}
      onChange={(event) => change(event.target.value)}
      aria-label={t("role")}
    >
      {roles.map((item) => (
        <option value={item.role} key={item.role}>
          {item.displayName}
        </option>
      ))}
    </select>
  );
}
