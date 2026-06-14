import { useEffect, useState } from "react";
import { AlertCircle, CalendarDays, CheckCircle2, Clock3, Mail, MapPin, Pencil, Phone, Trash2, Users, X } from "lucide-react";
import VolunteerAvatar from "./VolunteerAvatar.jsx";
import { getVolunteerActivity } from "../services/volunteerService.js";

const formatDate = (date) => {
  if (!date) return "Not available";
  return new Date(date).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
};

export default function VolunteerProfileDrawer({ volunteer, deletingId, onClose, onEdit, onDelete }) {
  const [activityLogs, setActivityLogs] = useState([]);
  const [activityLoading, setActivityLoading] = useState(false);
  const [activityError, setActivityError] = useState("");

  useEffect(() => {
    if (!volunteer?._id) {
      setActivityLogs([]);
      setActivityError("");
      return undefined;
    }

    let active = true;
    setActivityLoading(true);
    setActivityError("");

    getVolunteerActivity(volunteer._id)
      .then((data) => {
        if (active) setActivityLogs(data.logs || []);
      })
      .catch((error) => {
        if (active) setActivityError(error.response?.data?.message || "Unable to load activity");
      })
      .finally(() => {
        if (active) setActivityLoading(false);
      });

    return () => {
      active = false;
    };
  }, [volunteer?._id]);

  if (!volunteer) return null;

  return (
    <div className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm">
      <aside className="ml-auto flex h-full w-full max-w-xl flex-col overflow-hidden border-l border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#0f172a]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5 dark:border-slate-800">
          <div className="flex min-w-0 items-center gap-4">
            <VolunteerAvatar
              name={volunteer.fullName}
              imageUrl={volunteer.profileImage?.url}
              className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-lg bg-teal-50 text-2xl font-bold text-brand-teal dark:bg-teal-950 dark:text-teal-200"
            />
            <div className="min-w-0">
              <p className="eyebrow">Volunteer Profile</p>
              <h2 className="mt-1 truncate text-2xl font-bold text-brand-navy dark:text-white">{volunteer.fullName}</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${volunteer.isActive ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>
                  {volunteer.isActive ? "Active" : "Inactive"}
                </span>
                <span className="badge">{volunteer.recommendedDepartment || "Not assigned"}</span>
              </div>
            </div>
          </div>
          <button type="button" className="btn-secondary min-h-10 px-3" onClick={onClose} aria-label="Close profile">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoItem icon={Mail} label="Email" value={volunteer.email} />
            <InfoItem icon={Phone} label="Phone" value={volunteer.phone} />
            <InfoItem icon={MapPin} label="City" value={volunteer.city} />
            <InfoItem icon={CalendarDays} label="Availability" value={volunteer.availability} />
            <InfoItem icon={Users} label="Joined" value={formatDate(volunteer.createdAt)} />
            <InfoItem icon={CheckCircle2} label="Updated" value={formatDate(volunteer.updatedAt)} />
          </div>

          <section className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-brand-navy dark:text-white">Skills</h3>
              <span className="badge">{volunteer.skills?.length || 0} selected</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {volunteer.skills?.length ? volunteer.skills.map((skill) => <span key={skill} className="badge">{skill}</span>) : <span className="badge">No skills</span>}
            </div>
          </section>

          <section className="mt-5 rounded-lg border border-teal-200 bg-teal-50 p-4 text-sm text-teal-950 dark:border-teal-900 dark:bg-teal-950 dark:text-teal-100">
            <p className="font-semibold">Recommended Department</p>
            <p className="mt-1 text-lg font-bold">{volunteer.recommendedDepartment || "Volunteer Support Team"}</p>
          </section>

          <ActivityTimeline logs={activityLogs} loading={activityLoading} error={activityError} />
        </div>

        <div className="grid gap-2 border-t border-slate-200 p-5 dark:border-slate-800 sm:grid-cols-2">
          <button type="button" className="btn-secondary" onClick={() => onEdit(volunteer)}>
            <Pencil size={16} />
            Edit Profile
          </button>
          <button type="button" className="btn-danger" onClick={() => onDelete(volunteer)} disabled={deletingId === volunteer._id}>
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </aside>
    </div>
  );
}

function ActivityTimeline({ logs, loading, error }) {
  return (
    <section className="mt-5 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/50">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold text-brand-navy dark:text-white">Activity</h3>
        <span className="badge">{logs.length} events</span>
      </div>

      <div className="mt-4 grid gap-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-800">
              <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-2/5 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-3/5 animate-pulse rounded bg-slate-100 dark:bg-slate-900" />
              </div>
            </div>
          ))
        ) : error ? (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
            <AlertCircle size={16} />
            {error}
          </div>
        ) : logs.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
            No activity recorded yet.
          </div>
        ) : (
          logs.map((log) => (
            <div key={log._id} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-950">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-teal-50 text-brand-teal dark:bg-teal-950 dark:text-teal-200">
                <Clock3 size={16} />
              </span>
              <div className="min-w-0">
                <p className="font-medium">{log.action}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(log.createdAt).toLocaleString()}</p>
                {log.metadata?.changedFields?.length ? (
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Updated {log.metadata.changedFields.join(", ")}</p>
                ) : null}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/50">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        <Icon size={14} />
        {label}
      </div>
      <p className="mt-2 break-words text-sm font-semibold text-slate-950 dark:text-white">{value || "Not available"}</p>
    </div>
  );
}
