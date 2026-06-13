export default function StatCard({ title, value, helper, icon: Icon, tone = "teal" }) {
  const toneClasses = {
    teal: {
      icon: "bg-teal-50 text-brand-teal dark:bg-teal-950 dark:text-teal-200",
      rail: "bg-brand-teal"
    },
    amber: {
      icon: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200",
      rail: "bg-brand-saffron"
    },
    blue: {
      icon: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-200",
      rail: "bg-sky-600"
    },
    rose: {
      icon: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-200",
      rail: "bg-rose-600"
    }
  };
  const currentTone = toneClasses[tone] || toneClasses.teal;

  return (
    <article className="page-card lift-card overflow-hidden">
      <div className={`h-1 ${currentTone.rail}`} />
      <div className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">{value}</p>
        </div>
        {Icon ? (
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${currentTone.icon}`}>
            <Icon size={21} />
          </span>
        ) : null}
      </div>
      {helper ? <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{helper}</p> : null}
      </div>
    </article>
  );
}
