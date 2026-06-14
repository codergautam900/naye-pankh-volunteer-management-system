import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const colors = ["#0f766e", "#f59e0b", "#2563eb", "#dc2626", "#7c3aed"];

function EmptyChart({ label }) {
  return (
    <div className="grid h-full min-h-64 place-items-center rounded-lg border border-dashed border-slate-300 bg-slate-50/70 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
      <span>{label}</span>
    </div>
  );
}

export default function DashboardCharts({ skills = [], cities = [], availability = [] }) {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <div className="page-card p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-brand-navy dark:text-white">Skills Distribution</h2>
          <span className="badge">{skills.length} skills</span>
        </div>
        <div className="mt-4 h-72 sm:h-80">
          {skills.length === 0 ? (
            <EmptyChart label="Skill data will appear after registrations" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={skills} dataKey="count" nameKey="_id" innerRadius="52%" outerRadius="78%" paddingAngle={3}>
                  {skills.map((entry, index) => (
                    <Cell key={entry._id} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      <div className="page-card p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-brand-navy dark:text-white">City-wise Volunteers</h2>
          <span className="badge">{cities.length} cities</span>
        </div>
        <div className="mt-4 h-72 sm:h-80">
          {cities.length === 0 ? (
            <EmptyChart label="City data will appear after registrations" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cities} margin={{ top: 10, right: 8, left: -18, bottom: 6 }}>
                <XAxis dataKey="_id" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#0f766e" radius={[6, 6, 0, 0]} barSize={34} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      <div className="page-card p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-brand-navy dark:text-white">Availability Mix</h2>
          <span className="badge">{availability.length} modes</span>
        </div>
        <div className="mt-4 h-72 sm:h-80">
          {availability.length === 0 ? (
            <EmptyChart label="Availability data will appear after registrations" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={availability} dataKey="count" nameKey="_id" outerRadius="76%" paddingAngle={4}>
                  {availability.map((entry, index) => (
                    <Cell key={entry._id} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
