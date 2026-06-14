import { useState } from "react";
import { BadgeCheck, CalendarDays, Eye, Mail, MapPin, MoreVertical, Pencil, Phone, Trash2 } from "lucide-react";

export default function VolunteerTable({ volunteers = [], onView, onEdit, onDelete, deletingId }) {
  const [openMenuId, setOpenMenuId] = useState("");

  if (volunteers.length === 0) {
    return (
      <div className="page-card grid min-h-52 place-items-center p-8 text-center">
        <div>
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-300">
            <BadgeCheck size={22} />
          </div>
          <p className="mt-4 font-semibold">No volunteers found</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Try changing filters or adding a new registration.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-card hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
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
              <tr key={volunteer._id} className="premium-table-row border-t border-slate-200 dark:border-slate-800">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-teal-50 text-sm font-bold text-brand-teal dark:bg-teal-950 dark:text-teal-200">
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
                <td className="max-w-[210px] px-4 py-3">
                  <span className="block truncate">{volunteer.email}</span>
                </td>
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
                  <div className="relative flex justify-end">
                    <button
                      type="button"
                      className="btn-secondary min-h-9 px-3 py-1.5"
                      onClick={() => setOpenMenuId((current) => (current === volunteer._id ? "" : volunteer._id))}
                      aria-label="Open volunteer actions"
                    >
                      <MoreVertical size={15} />
                    </button>
                    {openMenuId === volunteer._id ? (
                      <div className="absolute right-0 top-10 z-20 w-44 rounded-lg border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-950">
                        <MenuButton
                          icon={Eye}
                          label="View profile"
                          onClick={() => {
                            setOpenMenuId("");
                            onView(volunteer);
                          }}
                        />
                        <MenuButton
                          icon={Pencil}
                          label="Edit details"
                          onClick={() => {
                            setOpenMenuId("");
                            onEdit(volunteer);
                          }}
                        />
                        <MenuButton
                          icon={Trash2}
                          label="Delete"
                          danger
                          disabled={deletingId === volunteer._id}
                          onClick={() => {
                            setOpenMenuId("");
                            onDelete(volunteer);
                          }}
                        />
                      </div>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

      <div className="grid gap-3 lg:hidden">
        {volunteers.map((volunteer) => (
          <article key={volunteer._id} className="page-card p-4">
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-teal-50 text-sm font-bold text-brand-teal dark:bg-teal-950 dark:text-teal-200">
                {volunteer.profileImage?.url ? (
                  <img src={volunteer.profileImage.url} alt={volunteer.fullName} className="h-full w-full object-cover" />
                ) : (
                  volunteer.fullName?.charAt(0)?.toUpperCase() || "V"
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-brand-navy dark:text-white">{volunteer.fullName}</h3>
                    <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-500 dark:text-slate-400">
                      <CalendarDays size={14} className="shrink-0" />
                      {volunteer.availability}
                    </p>
                  </div>
                  <span
                    className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${
                      volunteer.isActive
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {volunteer.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <p className="flex min-w-0 items-center gap-2">
                    <Mail size={15} className="shrink-0 text-slate-400" />
                    <span className="truncate">{volunteer.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={15} className="shrink-0 text-slate-400" />
                    <span>{volunteer.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={15} className="shrink-0 text-slate-400" />
                    <span>{volunteer.city}</span>
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {volunteer.skills?.length ? volunteer.skills.map((skill) => <span key={skill} className="badge">{skill}</span>) : <span className="badge">No skills</span>}
                </div>

                <div className="mt-4 flex flex-col gap-2 border-t border-slate-200 pt-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Department: </span>
                    <span className="font-semibold">{volunteer.recommendedDepartment || "Not assigned"}</span>
                  </p>
                  <div className="flex gap-2">
                    <button type="button" className="btn-secondary min-h-10 flex-1 px-3 py-1.5 sm:flex-none" onClick={() => onView(volunteer)}>
                      <Eye size={15} />
                      View
                    </button>
                    <button type="button" className="btn-secondary min-h-10 flex-1 px-3 py-1.5 sm:flex-none" onClick={() => onEdit(volunteer)}>
                      <Pencil size={15} />
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-secondary min-h-10 flex-1 px-3 py-1.5 text-red-600 sm:flex-none"
                      onClick={() => onDelete(volunteer)}
                      disabled={deletingId === volunteer._id}
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function MenuButton({ icon: Icon, label, danger = false, disabled = false, onClick }) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-semibold transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-800 ${
        danger ? "text-red-600 dark:text-red-300" : "text-slate-700 dark:text-slate-200"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon size={15} />
      {label}
    </button>
  );
}
