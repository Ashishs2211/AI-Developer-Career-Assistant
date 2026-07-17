import { Link } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import {
  FaFileAlt,
  FaProjectDiagram,
  FaGithub,
  FaMicrophone,
  FaRoad,
} from "react-icons/fa";
import { motion } from "framer-motion";

const actions = [
  {
    title: "Resume Analyzer",
    description: "Analyze your resume with AI",
    icon: <FaFileAlt />,
    color: "bg-blue-600",
    link: "/resume-analyzer",
  },
  {
    title: "Project Reviewer",
    description: "Upload and review your project",
    icon: <FaProjectDiagram />,
    color: "bg-orange-500",
    link: "/project-reviewer",
  },
  {
    title: "GitHub Analyzer",
    description: "Analyze your GitHub repository",
    icon: <FaGithub />,
    color: "bg-gray-800",
    link: "/github-analyzer",
  },
  {
    title: "Mock Interview",
    description: "Practice technical interviews",
    icon: <FaMicrophone />,
    color: "bg-purple-600",
    link: "/mock-interview",
  },
  {
    title: "Career Roadmap",
    description: "Generate your AI learning roadmap",
    icon: <FaRoad />,
    color: "bg-green-600",
    link: "/career-roadmap",
  },
  {
  title: "History",
  description: "View previous AI analyses",
  icon: <FaHistory />,
  color: "bg-indigo-600",
  link: "/history",
 }
];

export default function QuickActions() {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-6">
        🤖 AI Tools
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {actions.map((action) => (
          <motion.div
            key={action.title}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to={action.link}
              className="block bg-white rounded-2xl shadow-lg p-6 border hover:shadow-2xl transition"
            >
              <div
                className={`w-14 h-14 ${action.color} rounded-xl flex items-center justify-center text-white text-2xl mb-5`}
              >
                {action.icon}
              </div>

              <h3 className="text-xl font-bold">
                {action.title}
              </h3>

              <p className="text-gray-500 mt-2">
                {action.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}