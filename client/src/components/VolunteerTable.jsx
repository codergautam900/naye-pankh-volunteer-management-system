import { Pencil, Trash2 } from "lucide-react";

export default function VolunteerTable({ volunteers = [], onEdit, onDelete, deletingId }) {
  return (
    <div className="page-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[940px] text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Skills</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => (
              <tr key={volunteer._id} className="border-t border-slate-200 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-md bg-teal-50 text-sm font-bold text-brand-teal dark:bg-teal-950 dark:text-teal-200">
                      {volunteer.profileImage?.url ? (
                        <img src={volunteer.profileImage.url} alt={volunteer.fullName} className="h-full w-full object-cover" />
                      ) : (
                        volunteer.fullName?.charAt(0)?.toUpperCase() || "V"
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{volunteer.fullName}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{volunteer.availability}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{volunteer.email}</td>
                <td className="px-4 py-3">{volunteer.phone}</td>
                <td className="px-4 py-3">{volunteer.city}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {volunteer.skills?.length ? volunteer.skills.map((skill) => <span key={skill} className="badge">{skill}</span>) : "No skills"}
                  </div>
                </td>
                <td className="px-4 py-3">{volunteer.recommendedDepartment || "Not assigned"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      volunteer.isActive
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {volunteer.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button type="button" className="btn-secondary min-h-9 px-3 py-1.5" onClick={() => onEdit(volunteer)} aria-label="Edit volunteer">
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      className="btn-secondary min-h-9 px-3 py-1.5 text-red-600"
                      onClick={() => onDelete(volunteer._id)}
                      disabled={deletingId === volunteer._id}
                      aria-label="Delete volunteer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {volunteers.length === 0 ? <p className="px-4 py-8 text-center text-sm text-slate-500">No volunteers found.</p> : null}
    </div>
  );
}
