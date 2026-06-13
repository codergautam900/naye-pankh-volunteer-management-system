import { useEffect, useState } from "react";
import { BadgeCheck, MapPinned, UserCheck, Users } from "lucide-react";
import ActivityLogs from "../components/ActivityLogs.jsx";
import DashboardCharts from "../components/DashboardCharts.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import RecommendationBox from "../components/RecommendationBox.jsx";
import StatCard from "../components/StatCard.jsx";
import { getActivityLogs, getDashboardStats } from "../services/dashboardService.js";

const fallbackStats = {
  totalVolunteers: 0,
  totalCities: 0,
  totalSkills: 0,
  activeVolunteers: 0,
  skillsDistribution: [],
  cityDistribution: []
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

  if (loading) return <LoadingSpinner label="Loading dashboard" />;

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
      <DashboardCharts skills={stats.skillsDistribution} cities={stats.cityDistribution} />
      <RecommendationBox />
      <ActivityLogs logs={logs} />
    </div>
  );
}
