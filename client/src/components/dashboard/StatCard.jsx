export default function StatCard({ title, value, color }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">

      <div className={`${color} h-2 rounded-t-2xl`} />

      <div className="p-6">

        <h3 className="text-gray-500 dark:text-gray-400 font-semibold">
          {title}
        </h3>

        <h2 className="text-4xl font-bold mt-3 text-gray-800 dark:text-white">
          {value}
        </h2>

      </div>

    </div>
  );
}