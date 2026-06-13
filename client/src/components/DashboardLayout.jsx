import { NavLink, Outlet } from "react-router-dom";
import { BarChart3, Users } from "lucide-react";

const sideLinkClass = ({ isActive }) =>
  `flex min-h-10 shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-teal-50 text-brand-teal shadow-sm shadow-teal-900/5 dark:bg-teal-950 dark:text-teal-200"
      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
  }`;

export default function DashboardLayout() {
  return (
    <main className="section-shell grid gap-5 py-5 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 md:py-6">
      <aside className="page-card no-scrollbar flex h-fit gap-2 overflow-x-auto p-2 md:sticky md:top-24 md:grid md:overflow-visible md:p-3">
        <div className="hidden px-2 pb-2 pt-1 md:block">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Admin</p>
          <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">Workspace</p>
        </div>
        <NavLink to="/admin" end className={sideLinkClass}>
          <BarChart3 size={16} />
          Dashboard
        </NavLink>
        <NavLink to="/admin/volunteers" className={sideLinkClass}>
          <Users size={16} />
          Volunteers
        </NavLink>
      </aside>
      <section className="min-w-0">
        <Outlet />
      </section>
    </main>
  );
}
