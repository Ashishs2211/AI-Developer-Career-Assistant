export default function ReportSection({
  icon,
  title,
  children,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 mb-8">

      <div className="flex items-center gap-3 mb-6">

        <div className="text-3xl">
          {icon}
        </div>

        <h2 className="text-2xl font-bold dark:text-white">
          {title}
        </h2>

      </div>

      <div className="prose dark:prose-invert max-w-none">
        {children}
      </div>

    </div>
  );
}