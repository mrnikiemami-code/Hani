"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import type { AdminRoles } from "../domain/admin-role";
import {
  createAdminRole,
  deleteAdminRole,
  saveAdminRole
} from "../application/admin-role-actions";

/** Permission matrix for the existing administrative roles. */
export function RolePermissionManager({ data }: { data: AdminRoles }) {
  const t = useTranslations("adminRoles");
  const messages = useMessageBox();
  const router = useRouter();
  const [draft, setDraft] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(data.roles.map((role) => [role.role, role.permissions]))
  );
  const [pending, setPending] = useState<string | null>(null);
  const [roleName, setRoleName] = useState("");
  const [displayName, setDisplayName] = useState("");

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

  const create = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!roleName.trim() || !displayName.trim()) return;
    const result = await createAdminRole(roleName.trim(), displayName.trim());
    if (!result.ok) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }
    setRoleName("");
    setDisplayName("");
    messages.toast({ kind: "success", message: t("created") });
    router.refresh();
  };

  const remove = async (role: string) => {
    const confirmed = await messages.confirm({
      kind: "warning",
      title: t("deleteConfirm"),
      message: role,
      confirmLabel: t("delete")
    });
    if (!confirmed) return;
    const result = await deleteAdminRole(role);
    if (!result.ok) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }
    messages.toast({ kind: "success", message: t("deleted") });
    router.refresh();
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <form className="card border-0 shadow-sm" onSubmit={create}>
          <div className="card-header">
            <h2 className="h5 mb-0">{t("createTitle")}</h2>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-5">
                <label className="form-label" htmlFor="role-name">
                  {t("roleName")}
                </label>
                <input
                  id="role-name"
                  className="form-control"
                  dir="ltr"
                  value={roleName}
                  onChange={(event) => setRoleName(event.target.value)}
                  maxLength={64}
                  required
                />
              </div>
              <div className="col-md-5">
                <label className="form-label" htmlFor="role-display-name">
                  {t("displayName")}
                </label>
                <input
                  id="role-display-name"
                  className="form-control"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  maxLength={120}
                  required
                />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button type="submit" className="btn btn-primary w-100">
                  {t("create")}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
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
                <h2 className="h5 mb-0">{role.displayName}</h2>
                <div className="d-flex align-items-center gap-2">
                  <span className="fs-12 text-gray-6">{role.role}</span>
                  {!role.isSystem && (
                    <button
                      type="button"
                      className="btn btn-light btn-sm text-danger"
                      onClick={() => remove(role.role)}
                    >
                      {t("delete")}
                    </button>
                  )}
                </div>
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
