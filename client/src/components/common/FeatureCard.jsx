export default function FeatureCard({
  title,
  icon,
  description,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-200 dark:border-slate-700">

      <div className="text-4xl mb-4">
        {icon}
      </div>

      <h3 className="text-xl font-bold dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-gray-500 dark:text-gray-400">
        {description}
      </p>

    </div>
  );
}