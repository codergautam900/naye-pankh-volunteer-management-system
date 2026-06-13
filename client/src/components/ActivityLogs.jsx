import { Clock3 } from "lucide-react";

export default function ActivityLogs({ logs = [] }) {
  return (
    <div className="page-card p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Activity Logs</h2>
        <span className="badge">{logs.length} recent</span>
      </div>
      <div className="mt-4 space-y-3">
        {logs.length === 0 ? (
          <div className="rounded-md border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No activity yet.
          </div>
        ) : (
          logs.map((log) => (
            <div key={log._id} className="flex gap-3 rounded-md bg-slate-50 p-3 text-sm dark:bg-slate-950">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-teal-50 text-brand-teal dark:bg-teal-950 dark:text-teal-200">
                <Clock3 size={16} />
              </span>
              <div>
                <p className="font-medium">{log.action}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(log.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
