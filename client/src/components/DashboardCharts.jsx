import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const colors = ["#0f766e", "#f59e0b", "#2563eb", "#dc2626", "#7c3aed"];

function EmptyChart({ label }) {
  return (
    <div className="grid h-full place-items-center rounded-md border border-dashed border-slate-300 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
      <span>{label}</span>
    </div>
  );
}

export default function DashboardCharts({ skills = [], cities = [] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="page-card p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Skills Distribution</h2>
          <span className="badge">{skills.length} skills</span>
        </div>
        <div className="mt-4 h-72">
          {skills.length === 0 ? (
            <EmptyChart label="Skill data will appear after registrations" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={skills} dataKey="count" nameKey="_id" outerRadius={90} label>
                  {skills.map((entry, index) => (
                    <Cell key={entry._id} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      <div className="page-card p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">City-wise Volunteers</h2>
          <span className="badge">{cities.length} cities</span>
        </div>
        <div className="mt-4 h-72">
          {cities.length === 0 ? (
            <EmptyChart label="City data will appear after registrations" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cities}>
                <XAxis dataKey="_id" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#0f766e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
