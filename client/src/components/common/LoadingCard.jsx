import LoadingSpinner from "./LoadingSpinner";

export default function LoadingCard({
  text = "Processing...",
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl p-8 md:p-10 mt-8 text-center transition-all duration-300">

      {/* Loading Spinner */}

      <div className="flex justify-center">
        <LoadingSpinner />
      </div>

      {/* Main Message */}

      <h2 className="text-xl md:text-2xl font-bold mt-6 text-slate-900 dark:text-white">
        {text}
      </h2>

      {/* Description */}

      <p className="text-gray-500 dark:text-slate-400 mt-2">
        AI is processing your request...
      </p>

      {/* Animated Progress */}

      <div className="max-w-md mx-auto mt-6">

        <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">

          <div className="h-full w-1/2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full animate-pulse" />

        </div>

      </div>

      {/* Small Status */}

      <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
        Please wait while the AI generates your result...
      </p>

    </div>
  );
}