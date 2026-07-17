import { motion } from "framer-motion";

export default function StatCard({ title, value, color, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
    >
      <div className="flex justify-between items-center mb-4">
        <div
          className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center text-white text-2xl`}
        >
          {icon}
        </div>

        <span className="text-green-500 text-sm font-semibold">
          ↑ Active
        </span>
      </div>

      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <h1 className="text-3xl font-bold mt-2">
        {value}
      </h1>
    </motion.div>
  );
}