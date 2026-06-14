import { AlertTriangle, X } from "lucide-react";

export default function ConfirmDialog({
  open,
  title = "Confirm action",
  message = "Are you sure you want to continue?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading = false,
  onCancel,
  onConfirm
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm">
      <section className="page-card w-full max-w-md overflow-hidden">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5 dark:border-slate-800">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-200">
              <AlertTriangle size={20} />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">{title}</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{message}</p>
            </div>
          </div>
          <button type="button" className="btn-secondary min-h-10 px-3" onClick={onCancel} aria-label="Close dialog">
            <X size={17} />
          </button>
        </div>
        <div className="flex flex-col-reverse gap-2 p-5 sm:flex-row sm:justify-end">
          <button type="button" className="btn-secondary" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </button>
          <button type="button" className="btn-danger" onClick={onConfirm} disabled={loading}>
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
