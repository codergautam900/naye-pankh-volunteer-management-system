import { NavLink, Outlet } from "react-router-dom";
import { BarChart3, Users } from "lucide-react";

const sideLinkClass = ({ isActive }) =>
  `flex min-h-10 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-teal-50 text-brand-teal dark:bg-teal-950 dark:text-teal-200"
      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
  }`;

export default function DashboardLayout() {
  return (
    <main className="section-shell grid gap-6 py-6 md:grid-cols-[220px_1fr]">
      <aside className="page-card grid h-fit gap-1 p-3 md:sticky md:top-20">
        <NavLink to="/admin" end className={sideLinkClass}>
          <BarChart3 size={16} />
          Dashboard
        </NavLink>
        <NavLink to="/admin/volunteers" className={sideLinkClass}>
          <Users size={16} />
          Volunteers
        </NavLink>
      </aside>
      <section>
        <Outlet />
      </section>
    </main>
  );
}
