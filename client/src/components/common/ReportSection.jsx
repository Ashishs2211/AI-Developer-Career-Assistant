export default function ReportSection({
  icon,
  title,
  children,
}) {
  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 md:p-8 mb-8">

      {/* ================= HEADER ================= */}

      <div className="flex items-center gap-3 mb-8">

        <div className="text-3xl shrink-0">
          {icon}
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>

      </div>

      {/* ================= REPORT CONTENT ================= */}

      <div className="w-full max-w-none overflow-visible break-words">
        {children}
      </div>

    </div>
  );
}