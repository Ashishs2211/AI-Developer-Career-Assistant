export default function StatCard({ title, value, color }) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        bg-white
        dark:bg-slate-900
        border
        border-slate-200
        dark:border-slate-800
        p-6
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      {/* Top Accent */}

      <div
        className={`
          absolute
          top-0
          left-0
          right-0
          h-1
          ${color}
        `}
      />

      {/* Background Glow */}

      <div
        className="
          absolute
          -right-8
          -top-8
          w-24
          h-24
          rounded-full
          bg-indigo-500/5
          dark:bg-indigo-500/10
          blur-2xl
          group-hover:bg-indigo-500/10
          transition
        "
      />

      {/* Content */}

      <div className="relative">

        <div className="flex items-center justify-between">

          <p
            className="
              text-sm
              font-medium
              text-slate-500
              dark:text-slate-400
            "
          >
            {title}
          </p>

          <span
            className="
              w-2
              h-2
              rounded-full
              bg-indigo-500
              shadow-sm
              shadow-indigo-500/50
            "
          />
        </div>

        <h2
          className="
            mt-3
            text-4xl
            font-extrabold
            tracking-tight
            text-slate-900
            dark:text-white
          "
        >
          {value}
        </h2>

        <p
          className="
            mt-2
            text-xs
            text-slate-400
            dark:text-slate-500
          "
        >
          AI activity
        </p>

      </div>
    </div>
  );
}