import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTools,
  FaEdit,
} from "react-icons/fa";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProfileCard({ user }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 mt-10"
    >

      {/* ================= PROFILE HEADER ================= */}

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

        {/* Profile Image */}

        <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-4xl text-white font-bold flex-shrink-0">

          {user?.profileImage ? (

            <img
              src={user.profileImage}
              alt={user?.name || "Profile"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

          ) : (

            user?.name
              ?.charAt(0)
              .toUpperCase() || "U"

          )}

        </div>

        {/* Name */}

        <div className="flex-1 text-center sm:text-left">

          <h2 className="text-3xl font-bold dark:text-white">
            {user?.name || "Developer"}
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            AI Developer Career Assistant User
          </p>

        </div>

        {/* Edit Profile */}

        <Link
          to="/profile"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
        >
          <FaEdit />
          Edit
        </Link>

      </div>

      <hr className="my-6 border-gray-200 dark:border-slate-700" />

      {/* ================= CONTACT INFORMATION ================= */}

      <div className="space-y-4">

        {/* Email */}

        <div className="flex items-center gap-3 dark:text-white">

          <FaEnvelope className="text-blue-600 flex-shrink-0" />

          <span className="break-all">
            {user?.email || "No email available"}
          </span>

        </div>

        {/* GitHub */}

        {user?.githubUsername && (

          <div className="flex items-center gap-3 dark:text-white">

            <FaGithub className="text-gray-800 dark:text-white" />

            <a
              href={`https://github.com/${user.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {user.githubUsername}
            </a>

          </div>

        )}

        {/* LinkedIn */}

        {user?.linkedin && (

          <div className="flex items-center gap-3 dark:text-white">

            <FaLinkedin className="text-blue-700 flex-shrink-0" />

            <a
              href={
                user.linkedin.startsWith("http")
                  ? user.linkedin
                  : `https://${user.linkedin}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              LinkedIn Profile
            </a>

          </div>

        )}

      </div>

      {/* ================= SKILLS ================= */}

      {user?.skills?.length > 0 && (

        <div className="mt-6">

          <div className="flex items-center gap-2 mb-3">

            <FaTools className="text-purple-600" />

            <h3 className="font-bold dark:text-white">
              Skills
            </h3>

          </div>

          <div className="flex flex-wrap gap-2">

            {user.skills.map((skill, index) => (

              <span
                key={`${skill}-${index}`}
                className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-sm font-medium"
              >
                {skill}
              </span>

            ))}

          </div>

        </div>

      )}

      {/* ================= EMPTY PROFILE MESSAGE ================= */}

      {!user?.githubUsername &&
        !user?.linkedin &&
        (!user?.skills ||
          user.skills.length === 0) && (

          <div className="mt-6 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 text-sm text-gray-500 dark:text-gray-400">
            Complete your developer profile by adding
            your GitHub, LinkedIn and skills.
          </div>

        )}

    </motion.div>
  );
}