import { Link } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaGithub,
  FaRobot,
  FaRoad,
  FaUser,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-950 text-white min-h-screen p-6">

      <h2 className="text-2xl font-bold text-blue-500 mb-10">
        AI Career
      </h2>

      <nav className="flex flex-col gap-5">

        <Link to="/dashboard" className="flex items-center gap-3 hover:text-blue-400">
          <FaHome />
          Dashboard
        </Link>

        <Link to="/resume-analyzer" className="flex items-center gap-3 hover:text-blue-400">
          <FaFileAlt />
          Resume Analyzer
        </Link>

        <Link to="/project-reviewer" className="flex items-center gap-3 hover:text-blue-400">
          <FaGithub />
          Project Reviewer
        </Link>

        <Link to="/mock-interview" className="flex items-center gap-3 hover:text-blue-400">
          <FaRobot />
          Mock Interview
        </Link>

        <Link to="/career-roadmap" className="flex items-center gap-3 hover:text-blue-400">
          <FaRoad />
          Career Roadmap
        </Link>

        <Link to="/profile" className="flex items-center gap-3 hover:text-blue-400">
          <FaUser />
          Profile
        </Link>

      </nav>

    </aside>
  );
}