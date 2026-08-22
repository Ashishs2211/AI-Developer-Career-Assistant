import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6">

      <div className="max-w-2xl w-full text-center">

        {/* 404 */}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
            404
          </h1>
        </motion.div>

        {/* Robot */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="text-7xl mt-6"
        >
          🤖
        </motion.div>

        {/* Heading */}

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
          }}
          className="text-3xl md:text-4xl font-bold text-white mt-6"
        >
          Page Not Found
        </motion.h2>

        {/* Description */}

        <p className="text-slate-400 text-lg mt-4 max-w-lg mx-auto">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
          >
            <FaHome />
            Go to Dashboard
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 transition-all text-white px-6 py-3 rounded-xl font-semibold border border-slate-700"
          >
            <FaArrowLeft />
            Go Back
          </button>

        </div>

      </div>

    </div>
  );
}