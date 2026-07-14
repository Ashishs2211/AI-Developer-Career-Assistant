import { Link } from "react-router-dom";
import {
  FaFileAlt,
  FaGithub,
  FaRobot,
  FaRoad,
} from "react-icons/fa";

export default function QuickActions() {
  const actions = [
    {
      title: "Resume Analyzer",
      icon: <FaFileAlt className="text-3xl" />,
      link: "/resume-analyzer",
      color: "bg-blue-600",
    },
    {
      title: "Project Reviewer",
      icon: <FaGithub className="text-3xl" />,
      link: "/project-reviewer",
      color: "bg-green-600",
    },
    {
      title: "Mock Interview",
      icon: <FaRobot className="text-3xl" />,
      link: "/mock-interview",
      color: "bg-purple-600",
    },
    {
      title: "Career Roadmap",
      icon: <FaRoad className="text-3xl" />,
      link: "/career-roadmap",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.link}
            className={`${action.color} text-white rounded-xl p-6 shadow-lg hover:scale-105 transition`}
          >
            <div className="mb-4">{action.icon}</div>

            <h3 className="text-xl font-semibold">
              {action.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
