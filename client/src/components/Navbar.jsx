import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FaCode,
  FaBars,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Resume",
      path: "/resume-analyzer",
    },
    {
      name: "Projects",
      path: "/project-reviewer",
    },
    {
      name: "Interview",
      path: "/mock-interview",
    },
  ];

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <nav
        className="
          sticky top-0 z-50
          bg-white/80
          dark:bg-slate-950/80
          backdrop-blur-xl
          border-b
          border-slate-200
          dark:border-slate-800
          transition-colors duration-300
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-5 sm:px-6
            h-20
            flex
            items-center
            justify-between
          "
        >

          {/* ================= LOGO ================= */}

          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 group"
          >
            <div
              className="
                w-10 h-10
                rounded-xl
                flex items-center justify-center
                bg-gradient-to-br
                from-indigo-600
                to-violet-600
                text-white
                shadow-lg
                shadow-indigo-500/20
                group-hover:scale-105
                transition-transform duration-200
              "
            >
              <FaCode />
            </div>

            <div className="hidden sm:block">
              <h1
                className="
                  text-lg
                  font-bold
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                AI Career
              </h1>

              <p
                className="
                  text-[10px]
                  font-medium
                  tracking-wide
                  text-slate-500
                  dark:text-slate-400
                  -mt-0.5
                "
              >
                DEVELOPER ASSISTANT
              </p>
            </div>
          </Link>

          {/* ================= DESKTOP NAVIGATION ================= */}

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    px-4
                    py-2
                    rounded-lg
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }
                  `}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* ================= DESKTOP BUTTONS ================= */}

          <div className="hidden md:flex items-center gap-3">

            <Link
              to="/login"
              className="
                px-4
                py-2.5
                rounded-xl
                text-sm
                font-semibold
                text-slate-700
                dark:text-slate-200
                border
                border-slate-200
                dark:border-slate-700
                hover:border-indigo-300
                dark:hover:border-indigo-500
                hover:text-indigo-600
                dark:hover:text-indigo-400
                transition-all
                duration-200
              "
            >
              Login
            </Link>

            <Link
              to="/register"
              className="
                group
                flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                text-sm
                font-semibold
                text-white
                bg-gradient-to-r
                from-indigo-600
                to-violet-600
                hover:from-indigo-700
                hover:to-violet-700
                shadow-md
                shadow-indigo-500/20
                hover:shadow-lg
                hover:shadow-indigo-500/30
                hover:-translate-y-0.5
                transition-all
                duration-200
              "
            >
              Get Started

              <FaArrowRight
                className="
                  text-xs
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />
            </Link>

          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="
              md:hidden
              p-2.5
              rounded-xl
              text-slate-700
              dark:text-slate-200
              hover:bg-slate-100
              dark:hover:bg-slate-900
              transition
            "
            aria-label="Toggle navigation"
          >
            {isOpen ? (
              <FaTimes size={21} />
            ) : (
              <FaBars size={21} />
            )}
          </button>

        </div>

        {/* ================= MOBILE MENU ================= */}

        {isOpen && (
          <div
            className="
              md:hidden
              border-t
              border-slate-200
              dark:border-slate-800
              bg-white
              dark:bg-slate-950
              px-5
              py-5
              shadow-xl
            "
          >

            <div className="flex flex-col gap-2">

              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`
                      px-4
                      py-3
                      rounded-xl
                      text-sm
                      font-medium
                      transition
                      ${
                        isActive
                          ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <div
                className="
                  h-px
                  bg-slate-200
                  dark:bg-slate-800
                  my-2
                "
              />

              <Link
                to="/login"
                onClick={closeMenu}
                className="
                  px-4
                  py-3
                  rounded-xl
                  text-sm
                  font-semibold
                  text-center
                  text-slate-700
                  dark:text-slate-200
                  border
                  border-slate-200
                  dark:border-slate-700
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="
                  px-4
                  py-3
                  rounded-xl
                  text-sm
                  font-semibold
                  text-center
                  text-white
                  bg-gradient-to-r
                  from-indigo-600
                  to-violet-600
                  shadow-md
                "
              >
                Get Started
              </Link>

            </div>
          </div>
        )}

      </nav>
    </>
  );
}