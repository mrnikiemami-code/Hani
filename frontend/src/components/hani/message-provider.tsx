"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";

export type MessageKind = "success" | "warning" | "question" | "error";

type ToastOptions = {
  kind: MessageKind;
  message: string;
  title?: string;
  duration?: number;
};

type DialogOptions = {
  kind: MessageKind;
  message: string;
  title?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  alertOnly?: boolean;
};

type ToastItem = ToastOptions & {
  id: number;
  remaining: number;
};

type DialogItem = DialogOptions & {
  resolve: (value: boolean) => void;
};

type MessageBoxApi = {
  toast: (options: ToastOptions) => void;
  confirm: (options: Omit<DialogOptions, "alertOnly">) => Promise<boolean>;
  alert: (options: Omit<DialogOptions, "alertOnly">) => Promise<void>;
  dismiss: (id: number) => void;
};

const MessageBoxContext = createContext<MessageBoxApi | null>(null);

const icons: Record<MessageKind, string> = {
  success: "isax isax-tick-circle",
  warning: "isax isax-warning-2",
  question: "isax isax-message-question",
  error: "isax isax-close-circle"
};

const toastClass: Record<MessageKind, string> = {
  success: "messagebox-success",
  warning: "messagebox-warning",
  question: "messagebox-question",
  error: "messagebox-error"
};

/**
 * Unified message system for admin surfaces. Toasts show a countdown and
 * dismiss themselves; confirmations and alerts use a centered modal. All
 * success, warning, question, and error feedback should go through this
 * provider instead of page-local alerts or window.confirm.
 */
export function MessageProvider({ children }: { children: React.ReactNode }) {
  const t = useTranslations("messageBox");
  const [mounted, setMounted] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [dialog, setDialog] = useState<DialogItem | null>(null);
  const nextId = useRef(1);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setToasts((current) =>
        current.flatMap((toast) =>
          toast.remaining <= 1
            ? []
            : [{ ...toast, remaining: toast.remaining - 1 }]
        )
      );
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dialog.resolve(false);
        setDialog(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [dialog]);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback((options: ToastOptions) => {
    const duration = options.duration ?? 5000;
    const item: ToastItem = {
      ...options,
      id: nextId.current++,
      remaining: Math.ceil(duration / 1000)
    };
    setToasts((current) => [...current.slice(-3), item]);
  }, []);

  const openDialog = useCallback(
    (options: DialogOptions) =>
      new Promise<boolean>((resolve) => {
        setDialog({ ...options, resolve });
      }),
    []
  );

  const confirm = useCallback(
    (options: Omit<DialogOptions, "alertOnly">) => openDialog(options),
    [openDialog]
  );

  const alert = useCallback(
    async (options: Omit<DialogOptions, "alertOnly">) => {
      await openDialog({ ...options, alertOnly: true });
    },
    [openDialog]
  );

  const api = useMemo(
    () => ({ toast, confirm, alert, dismiss }),
    [alert, confirm, dismiss, toast]
  );

  const closeDialog = (value: boolean) => {
    dialog?.resolve(value);
    setDialog(null);
  };

  return (
    <MessageBoxContext.Provider value={api}>
      {children}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="messagebox-toasts"
            aria-live="polite"
            aria-atomic="false"
          >
            {toasts.map((item) => (
              <div
                key={item.id}
                className={`messagebox-toast ${toastClass[item.kind]}`}
                role="status"
              >
                <i className={`${icons[item.kind]} messagebox-toast__icon`} />
                <div className="messagebox-toast__body">
                  <strong>{item.title ?? t(item.kind)}</strong>
                  <p>{item.message}</p>
                  <span className="messagebox-toast__time">
                    {t("autoClose", { seconds: item.remaining })}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  aria-label={t("close")}
                  onClick={() => dismiss(item.id)}
                />
              </div>
            ))}
          </div>,
          document.body
        )}
      {mounted &&
        dialog &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="modal fade show d-block messagebox-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="messagebox-modal-title"
            tabIndex={-1}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && dialog.alertOnly) {
                closeDialog(true);
              }
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="messagebox-modal-title">
                    <i className={`${icons[dialog.kind]} me-2`} />
                    {dialog.title ?? t(dialog.kind)}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label={t("close")}
                    onClick={() => closeDialog(false)}
                  />
                </div>
                <div className="modal-body">{dialog.message}</div>
                <div className="modal-footer">
                  {!dialog.alertOnly && (
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => closeDialog(false)}
                    >
                      {dialog.cancelLabel ?? t("cancel")}
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => closeDialog(true)}
                  >
                    {dialog.confirmLabel ?? t("confirm")}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      {mounted &&
        dialog &&
        typeof document !== "undefined" &&
        createPortal(<div className="modal-backdrop fade show" />, document.body)}
    </MessageBoxContext.Provider>
  );
}

/** Access the unified message API. */
export function useMessageBox(): MessageBoxApi {
  const context = useContext(MessageBoxContext);
  if (!context) {
    throw new Error("useMessageBox must be used inside MessageProvider");
  }
  return context;
}
