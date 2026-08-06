export default function EmptyState({
  icon,
  title,
  description,
}) {
  return (
    <div className="text-center py-16">

      <div className="text-7xl">
        {icon}
      </div>

      <h2 className="text-3xl font-bold mt-6 dark:text-white">
        {title}
      </h2>

      <p className="text-gray-500 mt-3">
        {description}
      </p>

    </div>
  );
}