import { useEffect, useState } from "react";
import { Activity, BadgeCheck, CalendarClock, Gauge, Layers3, MapPinned, Radio, Target, TrendingUp, UserCheck, Users } from "lucide-react";
import ActivityLogs from "../components/ActivityLogs.jsx";
import DashboardCharts from "../components/DashboardCharts.jsx";
import RecommendationBox from "../components/RecommendationBox.jsx";
import StatCard from "../components/StatCard.jsx";
import VolunteerAvatar from "../components/VolunteerAvatar.jsx";
import { getActivityLogs, getDashboardStats } from "../services/dashboardService.js";

const fallbackStats = {
  totalVolunteers: 0,
  totalCities: 0,
  totalSkills: 0,
  activeVolunteers: 0,
  inactiveVolunteers: 0,
  activationRate: 0,
  topCity: "No data",
  topSkill: "No data",
  skillsDistribution: [],
  cityDistribution: [],
  availabilityDistribution: [],
  recentVolunteers: [],
  lastUpdated: ""
};

export default function Dashboard() {
  const [stats, setStats] = useState(fallbackStats);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [statsData, logsData] = await Promise.all([getDashboardStats(), getActivityLogs()]);
        setStats(statsData);
        setLogs(logsData.logs || []);
        setOffline(false);
      } catch {
        setStats(fallbackStats);
        setOffline(true);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="grid gap-6">
      <DashboardCommandHeader stats={stats} logs={logs} offline={offline} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Volunteers" value={stats.totalVolunteers} helper="All registered profiles" icon={Users} tone="teal" />
        <StatCard title="Total Cities" value={stats.totalCities} helper="Unique city coverage" icon={MapPinned} tone="blue" />
        <StatCard title="Total Skills" value={stats.totalSkills} helper="Skill categories tracked" icon={BadgeCheck} tone="amber" />
        <StatCard title="Active Volunteers" value={stats.activeVolunteers} helper="Currently available" icon={UserCheck} tone="rose" />
      </div>
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="page-card p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">Performance Pulse</p>
              <h2 className="mt-2 text-xl font-bold text-brand-navy dark:text-white">Volunteer Health</h2>
            </div>
            <span className="badge">Updated {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "now"}</span>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <InsightTile icon={TrendingUp} label="Activation Rate" value={`${stats.activationRate}%`} helper={`${stats.inactiveVolunteers} inactive profiles`} />
            <InsightTile icon={MapPinned} label="Top City" value={stats.topCity} helper="Largest volunteer cluster" />
            <InsightTile icon={Target} label="Top Skill" value={stats.topSkill} helper="Most common capability" />
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold text-slate-700 dark:text-slate-200">Active coverage</span>
              <span className="text-slate-500 dark:text-slate-400">{stats.activeVolunteers} of {stats.totalVolunteers}</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full rounded-full bg-brand-teal transition-all" style={{ width: `${Math.min(stats.activationRate, 100)}%` }} />
            </div>
          </div>
        </div>
        <RecentVolunteers volunteers={stats.recentVolunteers} />
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        <RankedPanel title="Top Skills" eyebrow="Capability Demand" icon={Layers3} items={stats.skillsDistribution} emptyLabel="Skills will rank here after registrations." />
        <RankedPanel title="City Coverage" eyebrow="Regional Spread" icon={MapPinned} items={stats.cityDistribution} emptyLabel="Cities will rank here after registrations." />
      </section>
      <DashboardCharts skills={stats.skillsDistribution} cities={stats.cityDistribution} availability={stats.availabilityDistribution} />
      <RecommendationBox />
      <ActivityLogs logs={logs} />
    </div>
  );
}

function DashboardCommandHeader({ stats, logs, offline }) {
  return (
    <section className="page-card overflow-hidden">
      <div className="fine-grid soft-highlight p-5 dark:bg-slate-950/40 sm:p-6">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge">
                <Radio size={13} />
                Live Overview
              </span>
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                  offline
                    ? "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${offline ? "bg-amber-500" : "bg-emerald-500"}`} />
                {offline ? "Backend offline" : "System online"}
              </span>
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-brand-navy dark:text-white sm:text-4xl">
              Volunteer command center
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Track intake, coverage, skill demand, and admin activity from one focused operations view.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <HeaderMetric icon={Users} label="Profiles" value={stats.totalVolunteers} />
              <HeaderMetric icon={MapPinned} label="Cities" value={stats.totalCities} />
              <HeaderMetric icon={Activity} label="Logs" value={logs.length} />
            </div>
          </div>

          <div className="rounded-lg border border-white/70 bg-white/75 p-4 shadow-xl shadow-slate-900/10 backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Readiness</p>
                <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">Active volunteer coverage</p>
              </div>
              <Gauge className="text-brand-teal" size={24} />
            </div>
            <div className="mt-5 flex items-center gap-5">
              <div
                className="grid h-28 w-28 shrink-0 place-items-center rounded-full"
                style={{ background: `conic-gradient(#0f766e ${Math.min(stats.activationRate, 100)}%, rgba(148, 163, 184, 0.22) 0)` }}
              >
                <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-2xl font-bold text-slate-950 dark:bg-slate-950 dark:text-white">
                  {stats.activationRate}%
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-slate-500 dark:text-slate-400">Top city</p>
                <p className="truncate text-lg font-bold text-slate-950 dark:text-white">{stats.topCity}</p>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Top skill</p>
                <p className="truncate text-lg font-bold text-slate-950 dark:text-white">{stats.topSkill}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeaderMetric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-200/80 bg-white/80 p-3 shadow-sm dark:border-white/10 dark:bg-slate-950/60">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
        <Icon size={14} />
        {label}
      </div>
      <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{value}</p>
    </div>
  );
}

function RankedPanel({ title, eyebrow, icon: Icon, items = [], emptyLabel }) {
  const topItems = items.slice(0, 5);
  const maxCount = Math.max(...topItems.map((item) => item.count), 1);

  return (
    <div className="page-card p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-2 text-xl font-bold text-brand-navy dark:text-white">{title}</h2>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-teal-50 text-brand-teal dark:bg-teal-950 dark:text-teal-200">
          <Icon size={20} />
        </span>
      </div>

      <div className="mt-5 grid gap-3">
        {topItems.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
            {emptyLabel}
          </div>
        ) : (
          topItems.map((item, index) => (
            <div key={item._id || index} className="grid gap-2">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="min-w-0 truncate font-semibold text-slate-800 dark:text-slate-100">
                  {index + 1}. {item._id || "Unknown"}
                </span>
                <span className="badge">{item.count}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-full rounded-full bg-brand-teal" style={{ width: `${Math.max((item.count / maxCount) * 100, 8)}%` }} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid gap-6">
      <div className="space-y-3">
        <div className="h-3 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-8 w-64 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-full max-w-md animate-pulse rounded bg-slate-100 dark:bg-slate-900" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="page-card p-5">
            <div className="h-10 w-10 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="mt-5 h-7 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mt-3 h-4 w-32 animate-pulse rounded bg-slate-100 dark:bg-slate-900" />
          </div>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="page-card h-72 animate-pulse bg-white dark:bg-slate-900" />
        <div className="page-card h-72 animate-pulse bg-white dark:bg-slate-900" />
      </div>
    </div>
  );
}

function InsightTile({ icon: Icon, label, value, helper }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
        <Icon size={16} />
        {label}
      </div>
      <p className="mt-3 truncate text-2xl font-bold text-slate-950 dark:text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helper}</p>
    </div>
  );
}

function RecentVolunteers({ volunteers = [] }) {
  return (
    <aside className="page-card p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Latest Intake</p>
          <h2 className="mt-2 text-xl font-bold text-brand-navy dark:text-white">Recent Volunteers</h2>
        </div>
        <CalendarClock className="text-brand-teal" size={22} />
      </div>
      <div className="mt-4 grid gap-3">
        {volunteers.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
            New registrations will appear here.
          </div>
        ) : (
          volunteers.map((volunteer) => (
            <div key={volunteer._id} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
              <VolunteerAvatar name={volunteer.fullName} imageUrl={volunteer.profileImage?.url} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{volunteer.fullName}</p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">{volunteer.city} - {volunteer.recommendedDepartment}</p>
              </div>
              <span className={`h-2.5 w-2.5 rounded-full ${volunteer.isActive ? "bg-emerald-500" : "bg-slate-400"}`} />
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
