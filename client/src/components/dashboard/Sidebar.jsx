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
  FaCode,
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

      <div
        className="
          md:hidden
          fixed top-0 left-0 right-0
          z-50
          h-16
          px-4
          flex items-center justify-between
          bg-slate-950
          text-white
          border-b border-slate-800
          shadow-lg
        "
      >
        <div className="flex items-center gap-2">
          <div
            className="
              w-9 h-9
              rounded-lg
              bg-indigo-600
              flex items-center justify-center
              shadow-md
            "
          >
            <FaCode />
          </div>

          <h2 className="text-lg font-bold">
            AI Career
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="
            p-2.5
            rounded-xl
            text-slate-300
            hover:text-white
            hover:bg-slate-800
            transition
          "
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes size={21} /> : <FaBars size={21} />}
        </button>
      </div>

      {/* ================= MOBILE OVERLAY ================= */}

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="
            md:hidden
            fixed inset-0
            bg-black/60
            backdrop-blur-sm
            z-40
          "
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
          min-h-screen
          bg-slate-950
          text-white
          border-r border-slate-800
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
        {/* ================= LOGO ================= */}

        <div className="mb-9 px-2">
          <div className="flex items-center gap-3">
            <div
              className="
                w-11 h-11
                rounded-xl
                bg-indigo-600
                flex items-center justify-center
                shadow-lg shadow-indigo-600/20
              "
            >
              <FaCode className="text-lg" />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight">
                AI Career
              </h2>

              <p className="text-xs text-slate-400 mt-0.5">
                Developer Assistant
              </p>
            </div>

            {/* Mobile Close Button */}

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="
                md:hidden
                ml-auto
                p-2
                rounded-lg
                text-slate-400
                hover:text-white
                hover:bg-slate-800
                transition
              "
              aria-label="Close navigation"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* ================= SECTION TITLE ================= */}

        <p
          className="
            px-3
            mb-3
            text-[11px]
            font-semibold
            uppercase
            tracking-wider
            text-slate-500
          "
        >
          Workspace
        </p>

        {/* ================= NAVIGATION ================= */}

        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavigation}
                className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {/* Active Indicator */}

                {isActive && (
                  <span
                    className="
                      absolute
                      left-0
                      top-1/2
                      -translate-y-1/2
                      w-1
                      h-7
                      rounded-r-full
                      bg-white
                    "
                  />
                )}

                {/* Icon */}

                <Icon
                  className="
                    text-[17px]
                    shrink-0
                    transition-transform
                    duration-200
                    group-hover:scale-110
                  "
                />

                {/* Menu Name */}

                <span className="font-medium text-sm">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* ================= BOTTOM ================= */}

        <div className="mt-10 pt-5 border-t border-slate-800">
          <div
            className="
              p-3
              rounded-xl
              bg-slate-900
              border border-slate-800
            "
          >
            <p
              className="
                text-xs
                font-medium
                text-slate-400
                text-center
              "
            >
              AI Developer Career Assistant
            </p>

            <p
              className="
                text-[10px]
                text-slate-600
                text-center
                mt-1
              "
            >
              Version 1.0 • 2026
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}