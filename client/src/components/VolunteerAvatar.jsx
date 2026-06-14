import { useEffect, useState } from "react";

export default function VolunteerAvatar({
  name,
  imageUrl,
  className = "grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-teal-50 text-sm font-bold text-brand-teal dark:bg-teal-950 dark:text-teal-200"
}) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [imageUrl]);

  const initial = name?.trim()?.charAt(0)?.toUpperCase() || "V";

  return (
    <div className={className}>
      {imageUrl && !imageFailed ? (
        <img src={imageUrl} alt={name || "Volunteer"} className="h-full w-full object-cover" onError={() => setImageFailed(true)} />
      ) : (
        initial
      )}
    </div>
  );
}
