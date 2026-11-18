"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import type { AdminRoles } from "../domain/admin-role";
import { saveAdminRole } from "../application/admin-role-actions";

/** Permission matrix for the existing administrative roles. */
export function RolePermissionManager({ data }: { data: AdminRoles }) {
  const t = useTranslations("adminRoles");
  const messages = useMessageBox();
  const router = useRouter();
  const [draft, setDraft] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(data.roles.map((role) => [role.role, role.permissions]))
  );
  const [pending, setPending] = useState<string | null>(null);

  const toggle = (role: string, permission: string) => {
    setDraft((current) => {
      const set = new Set(current[role] ?? []);
      if (set.has(permission)) set.delete(permission);
      else set.add(permission);
      return { ...current, [role]: [...set] };
    });
  };

  const save = async (role: string) => {
    setPending(role);
    const result = await saveAdminRole(role, draft[role] ?? []);
    setPending(null);
    if (!result.ok) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }
    messages.toast({ kind: "success", message: t("saved") });
    router.refresh();
  };

  return (
    <div className="row g-4">
      {data.roles.map((role) => {
        const selected = new Set(draft[role.role] ?? []);
        const locked =
          role.role === "Admin"
            ? new Set(["role.manage", "settings.view"])
            : new Set<string>();
        return (
          <div className="col-lg-6" key={role.role}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2 className="h5 mb-0">{t(`role${role.role}`)}</h2>
                <span className="fs-12 text-gray-6">{role.role}</span>
              </div>
              <div className="card-body">
                <div className="row g-1">
                  {data.permissionCatalog.map((permission) => (
                    <div className="col-md-6" key={permission}>
                      <div className="form-check">
                        <input
                          id={`${role.role}-${permission}`}
                          className="form-check-input"
                          type="checkbox"
                          checked={selected.has(permission)}
                          disabled={locked.has(permission)}
                          onChange={() => toggle(role.role, permission)}
                        />
                        <label
                          className="form-check-label fs-12"
                          htmlFor={`${role.role}-${permission}`}
                          dir="ltr"
                        >
                          {permission}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-footer bg-white d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => save(role.role)}
                  disabled={pending === role.role}
                >
                  {pending === role.role ? t("saving") : t("save")}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
