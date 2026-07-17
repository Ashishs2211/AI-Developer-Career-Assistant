import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProfileCard({ user }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg p-8 mt-10"
    >
      <div className="flex items-center gap-6">

        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-4xl text-white font-bold">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>

        <div>

          <h2 className="text-3xl font-bold">
            {user?.name}
          </h2>

          <p className="text-gray-500 mt-1">
            AI Developer Career Assistant User
          </p>

        </div>

      </div>

      <hr className="my-6" />

      <div className="space-y-4">

        <div className="flex items-center gap-3">
          <FaEnvelope className="text-blue-600" />
          <span>{user?.email}</span>
        </div>

        {user?.githubUsername && (
          <div className="flex items-center gap-3">
            <FaGithub />
            <span>{user.githubUsername}</span>
          </div>
        )}

        {user?.linkedin && (
          <div className="flex items-center gap-3">
            <FaLinkedin className="text-blue-700" />
            <span>{user.linkedin}</span>
          </div>
        )}

      </div>
    </motion.div>
  );
}