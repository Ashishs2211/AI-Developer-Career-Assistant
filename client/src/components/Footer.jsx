import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaArrowRight,
  FaCode,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="
        bg-slate-950
        text-slate-300
        border-t
        border-slate-800
      "
    >
      {/* ================= MAIN FOOTER ================= */}

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid gap-10 md:grid-cols-4">

          {/* ================= BRAND ================= */}

          <div className="md:col-span-2">

            <Link
              to="/"
              className="inline-flex items-center gap-3 group"
            >
              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  bg-gradient-to-br
                  from-indigo-600
                  to-violet-600
                  text-white
                  shadow-lg
                  shadow-indigo-500/20
                  group-hover:scale-105
                  transition-transform
                "
              >
                <FaCode />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  AI Career
                </h2>

                <p className="text-[10px] tracking-wider text-slate-500">
                  DEVELOPER ASSISTANT
                </p>
              </div>
            </Link>

            <p
              className="
                mt-5
                max-w-md
                text-sm
                leading-7
                text-slate-400
              "
            >
              An AI-powered platform designed to help developers
              improve their resumes, projects, GitHub profiles,
              interview skills, and career preparation.
            </p>

            {/* Technology Tags */}

            <div className="flex flex-wrap gap-2 mt-6">

              <span
                className="
                  px-3
                  py-1.5
                  rounded-lg
                  bg-slate-900
                  border
                  border-slate-800
                  text-xs
                  text-slate-400
                "
              >
                MERN Stack
              </span>

              <span
                className="
                  px-3
                  py-1.5
                  rounded-lg
                  bg-slate-900
                  border
                  border-slate-800
                  text-xs
                  text-slate-400
                "
              >
                Generative AI
              </span>

              <span
                className="
                  px-3
                  py-1.5
                  rounded-lg
                  bg-slate-900
                  border
                  border-slate-800
                  text-xs
                  text-slate-400
                "
              >
                GitHub API
              </span>

            </div>

          </div>

          {/* ================= QUICK LINKS ================= */}

          <div>

            <h3 className="text-sm font-semibold text-white">
              Platform
            </h3>

            <div className="flex flex-col gap-3 mt-5">

              <Link
                to="/"
                className="
                  text-sm
                  text-slate-400
                  hover:text-indigo-400
                  transition
                "
              >
                Home
              </Link>

              <Link
                to="/resume-analyzer"
                className="
                  text-sm
                  text-slate-400
                  hover:text-indigo-400
                  transition
                "
              >
                Resume Analyzer
              </Link>

              <Link
                to="/project-reviewer"
                className="
                  text-sm
                  text-slate-400
                  hover:text-indigo-400
                  transition
                "
              >
                Project Reviewer
              </Link>

              <Link
                to="/github-analyzer"
                className="
                  text-sm
                  text-slate-400
                  hover:text-indigo-400
                  transition
                "
              >
                GitHub Analyzer
              </Link>

              <Link
                to="/mock-interview"
                className="
                  text-sm
                  text-slate-400
                  hover:text-indigo-400
                  transition
                "
              >
                Mock Interview
              </Link>

            </div>

          </div>

          {/* ================= CAREER ================= */}

          <div>

            <h3 className="text-sm font-semibold text-white">
              Career Tools
            </h3>

            <div className="flex flex-col gap-3 mt-5">

              <Link
                to="/career-roadmap"
                className="
                  text-sm
                  text-slate-400
                  hover:text-indigo-400
                  transition
                "
              >
                Career Roadmap
              </Link>

              <Link
                to="/chat"
                className="
                  text-sm
                  text-slate-400
                  hover:text-indigo-400
                  transition
                "
              >
                AI Assistant
              </Link>

              <Link
                to="/login"
                className="
                  text-sm
                  text-slate-400
                  hover:text-indigo-400
                  transition
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  text-sm
                  text-slate-400
                  hover:text-indigo-400
                  transition
                "
              >
                Create Account
              </Link>

            </div>

          </div>

        </div>

        {/* ================= CTA ================= */}

        <div
          className="
            mt-12
            p-6
            rounded-2xl
            bg-gradient-to-r
            from-indigo-600/10
            via-violet-600/10
            to-blue-600/10
            border
            border-indigo-500/20
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-5
          "
        >

          <div>

            <h3 className="text-lg font-semibold text-white">
              Ready to improve your developer career?
            </h3>

            <p className="text-sm text-slate-400 mt-1">
              Start preparing smarter with AI-powered tools.
            </p>

          </div>

          <Link
            to="/register"
            className="
              group
              flex
              items-center
              gap-2
              shrink-0
              px-5
              py-2.5
              rounded-xl
              bg-gradient-to-r
              from-indigo-600
              to-violet-600
              text-white
              text-sm
              font-semibold
              shadow-lg
              shadow-indigo-500/20
              hover:-translate-y-0.5
              transition-all
            "
          >
            Get Started

            <FaArrowRight
              className="
                text-xs
                group-hover:translate-x-1
                transition-transform
              "
            />
          </Link>

        </div>

        {/* ================= BOTTOM ================= */}

        <div
          className="
            mt-10
            pt-6
            border-t
            border-slate-800
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-4
          "
        >

          <p className="text-xs text-slate-500">
            © 2026 AI Developer Career Assistant. All rights reserved.
          </p>

          <div className="flex items-center gap-3">

            <a
              href="https://github.com/Ashishs2211/AI-Developer-Career-Assistant"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="
                w-9
                h-9
                rounded-lg
                flex
                items-center
                justify-center
                bg-slate-900
                border
                border-slate-800
                text-slate-400
                hover:text-white
                hover:border-slate-600
                transition
              "
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="
                w-9
                h-9
                rounded-lg
                flex
                items-center
                justify-center
                bg-slate-900
                border
                border-slate-800
                text-slate-400
                hover:text-white
                hover:border-slate-600
                transition
              "
            >
              <FaLinkedin />
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}