export default function StatCard({ title, value, helper, icon: Icon, tone = "teal" }) {
  const toneClasses = {
    teal: "bg-teal-50 text-brand-teal dark:bg-teal-950 dark:text-teal-200",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200",
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200",
    rose: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-200"
  };

  return (
    <article className="page-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
        {Icon ? (
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-md ${toneClasses[tone] || toneClasses.teal}`}>
            <Icon size={21} />
          </span>
        ) : null}
      </div>
      {helper ? <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{helper}</p> : null}
    </article>
  );
}
