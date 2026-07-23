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
  },
];

export default function QuickActions() {
  return (
    <div className="mt-12">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl md:text-3xl font-bold">
          🤖 AI Tools
        </h2>

        <span className="text-gray-500 text-sm">
          {actions.length} Tools
        </span>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {actions.map((action) => (

          <motion.div
            key={action.title}
            whileHover={{
              scale: 1.04,
              y: -5,
            }}
            transition={{
              duration: 0.25,
            }}
          >

            <Link
              to={action.link}
              className="group block bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-200 p-6 transition-all duration-300"
            >

              <div
                className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center text-white text-3xl mb-5 group-hover:rotate-6 transition-transform duration-300`}
              >
                {action.icon}
              </div>

              <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                {action.title}
              </h3>

              <p className="text-gray-500 mt-2">
                {action.description}
              </p>

              <div className="mt-5 flex items-center text-blue-600 font-semibold">

                Open Tool

                <span className="ml-2 group-hover:translate-x-2 transition-transform">
                  →
                </span>

              </div>

            </Link>

          </motion.div>

        ))}

      </div>

    </div>
  );
}