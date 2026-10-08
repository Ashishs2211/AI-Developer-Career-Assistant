import { Link } from "react-router-dom";
import {
  FaFileAlt,
  FaProjectDiagram,
  FaGithub,
  FaMicrophone,
  FaRoad,
  FaHistory,
  FaComments,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

const actions = [
  {
    title: "Resume Analyzer",
    description: "Optimize your resume with AI",
    icon: FaFileAlt,
    path: "/resume-analyzer",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    title: "Project Reviewer",
    description: "Get AI feedback on projects",
    icon: FaProjectDiagram,
    path: "/project-reviewer",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  {
    title: "GitHub Analyzer",
    description: "Analyze your GitHub profile",
    icon: FaGithub,
    path: "/github-analyzer",
    iconBg: "bg-slate-500/10",
    iconColor: "text-slate-700 dark:text-slate-300",
  },
  {
    title: "Mock Interview",
    description: "Practice interviews with AI",
    icon: FaMicrophone,
    path: "/mock-interview",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    title: "Career Roadmap",
    description: "Build your personalized roadmap",
    icon: FaRoad,
    path: "/career-roadmap",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  {
    title: "History",
    description: "View your previous analyses",
    icon: FaHistory,
    path: "/history",
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
  },
  {
    title: "AI Assistant",
    description: "Ask AI anything about your career",
    icon: FaComments,
    path: "/chat",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-500",
  },
];

export default function QuickActions() {
  return (
    <section className="mt-8">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-1">
            AI Workspace
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Quick Actions
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Choose a tool to accelerate your developer career.
          </p>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.05,
              }}
              whileHover={{ y: -5 }}
            >
              <Link
                to={action.path}
                className="
                  group
                  relative
                  flex
                  items-center
                  gap-4
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  dark:border-slate-800
                  bg-white
                  dark:bg-slate-900
                  p-5
                  shadow-sm
                  hover:shadow-xl
                  hover:border-indigo-200
                  dark:hover:border-indigo-900
                  transition-all
                  duration-300
                "
              >
                {/* Background Glow */}
                <div
                  className="
                    absolute
                    -right-10
                    -top-10
                    h-24
                    w-24
                    rounded-full
                    bg-indigo-500/5
                    dark:bg-indigo-500/10
                    blur-2xl
                    transition-all
                    duration-300
                    group-hover:bg-indigo-500/10
                    dark:group-hover:bg-indigo-500/20
                  "
                />

                {/* Icon */}
                <div
                  className={`
                    relative
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    ${action.iconBg}
                    ${action.iconColor}
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  `}
                >
                  <Icon className="text-lg" />
                </div>

                {/* Text */}
                <div className="relative min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {action.description}
                  </p>
                </div>

                {/* Arrow */}
                <div
                  className="
                    relative
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    text-slate-400
                    transition-all
                    duration-300
                    group-hover:bg-indigo-50
                    group-hover:text-indigo-600
                    dark:group-hover:bg-indigo-500/10
                    dark:group-hover:text-indigo-400
                  "
                >
                  <FaArrowRight
                    className="
                      text-xs
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                    "
                  />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}