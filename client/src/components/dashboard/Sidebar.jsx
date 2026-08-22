import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import {
  FaHome,
  FaFileAlt,
  FaGithub,
  FaRobot,
  FaRoad,
  FaUser,
  FaFolderOpen,
  FaHistory,
  FaComments,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      icon: FaHome,
      path: "/dashboard",
    },
    {
      name: "Resume Analyzer",
      icon: FaFileAlt,
      path: "/resume-analyzer",
    },
    {
      name: "Project Reviewer",
      icon: FaFolderOpen,
      path: "/project-reviewer",
    },
    {
      name: "GitHub Analyzer",
      icon: FaGithub,
      path: "/github-analyzer",
    },
    {
      name: "Mock Interview",
      icon: FaRobot,
      path: "/mock-interview",
    },
    {
      name: "Career Roadmap",
      icon: FaRoad,
      path: "/career-roadmap",
    },
    {
      name: "AI Assistant",
      icon: FaComments,
      path: "/chat",
    },
    {
      name: "History",
      icon: FaHistory,
      path: "/history",
    },
    {
      name: "Profile",
      icon: FaUser,
      path: "/profile",
    },
  ];

  const handleNavigation = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* ================= MOBILE HEADER ================= */}

      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-950 text-white h-16 px-4 flex items-center justify-between shadow-lg">

        <h2 className="text-xl font-bold text-blue-500">
          AI Career
        </h2>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-slate-800 transition"
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <FaTimes size={22} />
          ) : (
            <FaBars size={22} />
          )}
        </button>

      </div>

      {/* ================= MOBILE OVERLAY ================= */}

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed md:sticky
          top-0
          left-0
          z-50
          w-64
          bg-slate-950
          text-white
          min-h-screen
          p-5 md:p-6
          transition-transform
          duration-300
          ease-in-out
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        {/* Logo */}

        <div className="mb-8 px-2">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-blue-500">
                AI Career
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Developer Assistant
              </p>

            </div>

            {/* Mobile Close Button */}

            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800"
            >
              <FaTimes />
            </button>

          </div>

        </div>

        {/* Navigation */}

        <nav className="flex flex-col gap-2">

          {menuItems.map((item) => {

            const Icon = item.icon;

            const isActive =
              location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavigation}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >

                <Icon className="text-lg shrink-0" />

                <span className="font-medium">
                  {item.name}
                </span>

              </Link>
            );
          })}

        </nav>

        {/* Bottom */}

        <div className="mt-10 border-t border-slate-800 pt-5">

          <p className="text-xs text-slate-500 text-center">
            AI Developer Career Assistant
          </p>

          <p className="text-xs text-slate-600 text-center mt-1">
            v1.0 • 2026
          </p>

        </div>

      </aside>
    </>
  );
}