export const skillOptions = [
  "Teaching",
  "Web Development",
  "Content Writing",
  "Social Media",
  "Fundraising",
  "Graphic Design",
  "Event Management"
];

export const availabilityOptions = ["Weekdays", "Weekends", "Flexible"];

export const recommendDepartment = (skill) => {
  const normalizedSkill = skill?.toLowerCase();

  if (normalizedSkill === "teaching") return "Education Team";
  if (normalizedSkill === "web development") return "Technical Team";
  if (normalizedSkill === "content writing") return "Marketing Team";
  if (normalizedSkill === "social media") return "Awareness Campaign Team";

  return "Volunteer Support Team";
};

