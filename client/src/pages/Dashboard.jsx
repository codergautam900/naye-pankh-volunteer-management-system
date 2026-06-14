import { useEffect, useState } from "react";
import { BadgeCheck, CalendarClock, MapPinned, Target, TrendingUp, UserCheck, Users } from "lucide-react";
import ActivityLogs from "../components/ActivityLogs.jsx";
import DashboardCharts from "../components/DashboardCharts.jsx";
import RecommendationBox from "../components/RecommendationBox.jsx";
import StatCard from "../components/StatCard.jsx";
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
      <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="eyebrow">Live Overview</p>
          <h1 className="mt-2 text-2xl font-bold text-brand-navy dark:text-white sm:text-3xl">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Volunteer summary, charts, and recent activity.</p>
        </div>
        {offline ? (
          <span className="w-fit rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
            Backend not connected
          </span>
        ) : null}
      </div>
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
      <DashboardCharts skills={stats.skillsDistribution} cities={stats.cityDistribution} availability={stats.availabilityDistribution} />
      <RecommendationBox />
      <ActivityLogs logs={logs} />
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
              <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-teal-50 text-sm font-bold text-brand-teal dark:bg-teal-950 dark:text-teal-200">
                {volunteer.profileImage?.url ? (
                  <img src={volunteer.profileImage.url} alt={volunteer.fullName} className="h-full w-full object-cover" />
                ) : (
                  volunteer.fullName?.charAt(0)?.toUpperCase() || "V"
                )}
              </div>
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
