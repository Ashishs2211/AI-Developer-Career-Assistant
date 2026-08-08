export default function AchievementCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 hover:-translate-y-1 transition">

      <div className="text-5xl">
        {icon}
      </div>

      <h2 className="text-xl font-bold mt-4 dark:text-white">
        {title}
      </h2>

      <p className="text-gray-500 mt-2">
        {description}
      </p>

    </div>
  );
}