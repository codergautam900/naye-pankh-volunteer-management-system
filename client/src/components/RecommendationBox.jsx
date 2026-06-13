import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { recommendDepartment, skillOptions } from "../utils/constants.js";

export default function RecommendationBox() {
  const [skill, setSkill] = useState("Teaching");
  const department = useMemo(() => recommendDepartment(skill), [skill]);

  return (
    <div className="page-card p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200">
            <Sparkles size={20} />
          </span>
          <div>
            <h2 className="text-lg font-semibold">AI Volunteer Recommendation</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Select a skill and get the best-fit team.</p>
          </div>
        </div>
        <label className="grid gap-1">
          <span className="label">Skill</span>
          <select className="input" value={skill} onChange={(event) => setSkill(event.target.value)}>
            {skillOptions.slice(0, 4).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4 flex flex-col gap-2 rounded-md bg-teal-50 p-4 text-sm text-teal-900 dark:bg-teal-950 dark:text-teal-100 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-medium">Recommended Department</span>
        <span className="text-base font-bold">{department}</span>
      </div>
    </div>
  );
}
