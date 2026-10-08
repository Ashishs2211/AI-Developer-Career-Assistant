import { Link } from "react-router-dom";
import {
  FaRobot,
  FaGithub,
  FaFileAlt,
  FaArrowRight,
  FaCheckCircle,
  FaBolt,
} from "react-icons/fa";

export default function Hero() {
  return (
    <section
      className="
        relative
        min-h-[calc(100vh-80px)]
        overflow-hidden
        bg-slate-50
        dark:bg-[#080d1c]
        transition-colors duration-300
      "
    >
      {/* ================= BACKGROUND GLOW ================= */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="
            absolute
            -top-40
            left-1/2
            -translate-x-1/2
            w-[700px]
            h-[500px]
            rounded-full
            bg-indigo-500/15
            dark:bg-indigo-500/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            top-1/3
            -left-40
            w-[350px]
            h-[350px]
            rounded-full
            bg-violet-500/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-0
            -right-40
            w-[400px]
            h-[400px]
            rounded-full
            bg-blue-500/10
            blur-3xl
          "
        />

        {/* Grid Pattern */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            dark:opacity-[0.04]
          "
          style={{
            backgroundImage:
              "linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ================= HERO CONTENT ================= */}

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-24">

        <div className="text-center max-w-5xl mx-auto">

          {/* Badge */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-indigo-50
              dark:bg-indigo-500/10
              border
              border-indigo-100
              dark:border-indigo-500/20
              text-indigo-600
              dark:text-indigo-400
              text-sm
              font-semibold
              shadow-sm
            "
          >
            <FaBolt className="text-xs" />

            AI-Powered Developer Career Platform

            <span className="text-indigo-400">
              ✦
            </span>
          </div>

          {/* Main Heading */}

          <h1
            className="
              mt-8
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              font-extrabold
              tracking-tight
              leading-[1.05]
              text-slate-900
              dark:text-white
            "
          >
            Build Your Career.

            <br />

            <span
              className="
                bg-gradient-to-r
                from-indigo-600
                via-violet-600
                to-blue-600
                dark:from-indigo-400
                dark:via-violet-400
                dark:to-blue-400
                bg-clip-text
                text-transparent
              "
            >
              Prepare Smarter with AI.
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mt-7
              max-w-3xl
              mx-auto
              text-base
              sm:text-lg
              md:text-xl
              leading-relaxed
              text-slate-600
              dark:text-slate-400
            "
          >
            Analyze your resume, improve your projects, review your
            GitHub profile, practice technical interviews, and build
            your career roadmap — all from one intelligent platform.
          </p>

          {/* CTA Buttons */}

          <div
            className="
              mt-9
              flex
              flex-col
              sm:flex-row
              items-center
              justify-center
              gap-4
            "
          >
            <Link
              to="/register"
              className="
                group
                w-full
                sm:w-auto
                inline-flex
                items-center
                justify-center
                gap-2
                px-7
                py-3.5
                rounded-xl
                bg-gradient-to-r
                from-indigo-600
                to-violet-600
                hover:from-indigo-700
                hover:to-violet-700
                text-white
                font-semibold
                shadow-lg
                shadow-indigo-500/25
                hover:shadow-indigo-500/40
                hover:-translate-y-0.5
                transition-all
                duration-200
              "
            >
              Get Started Free

              <FaArrowRight
                className="
                  text-sm
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />
            </Link>

            <Link
              to="/login"
              className="
                w-full
                sm:w-auto
                inline-flex
                items-center
                justify-center
                px-7
                py-3.5
                rounded-xl
                bg-white
                dark:bg-slate-900
                text-slate-700
                dark:text-slate-200
                border
                border-slate-200
                dark:border-slate-700
                hover:border-indigo-300
                dark:hover:border-indigo-500
                hover:text-indigo-600
                dark:hover:text-indigo-400
                shadow-sm
                hover:shadow-md
                transition-all
                duration-200
              "
            >
              Sign In
            </Link>
          </div>

          {/* Trust Points */}

          <div
            className="
              mt-7
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-6
              gap-y-2
              text-sm
              text-slate-500
              dark:text-slate-500
            "
          >
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" />
              AI-powered analysis
            </span>

            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" />
              Developer-focused tools
            </span>

            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" />
              One career platform
            </span>
          </div>

        </div>

        {/* ================= FEATURE CARDS ================= */}

        <div
          className="
            grid
            md:grid-cols-3
            gap-5
            mt-20
            max-w-6xl
            mx-auto
          "
        >

          {/* Resume */}

          <div
            className="
              group
              relative
              p-6
              md:p-7
              rounded-2xl
              bg-white/80
              dark:bg-slate-900/70
              backdrop-blur-xl
              border
              border-slate-200
              dark:border-slate-800
              shadow-sm
              hover:shadow-xl
              hover:shadow-indigo-500/10
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
            <div
              className="
                w-12
                h-12
                rounded-xl
                flex
                items-center
                justify-center
                bg-indigo-50
                dark:bg-indigo-500/10
                text-indigo-600
                dark:text-indigo-400
                group-hover:scale-110
                transition-transform
              "
            >
              <FaFileAlt className="text-xl" />
            </div>

            <h3
              className="
                mt-5
                text-lg
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              AI Resume Analyzer
            </h3>

            <p
              className="
                mt-2
                text-sm
                leading-relaxed
                text-slate-500
                dark:text-slate-400
              "
            >
              Get AI-powered ATS analysis and actionable
              suggestions to improve your resume.
            </p>

            <div
              className="
                mt-5
                text-xs
                font-semibold
                text-indigo-600
                dark:text-indigo-400
              "
            >
              Analyze your resume →
            </div>
          </div>

          {/* GitHub */}

          <div
            className="
              group
              relative
              p-6
              md:p-7
              rounded-2xl
              bg-white/80
              dark:bg-slate-900/70
              backdrop-blur-xl
              border
              border-slate-200
              dark:border-slate-800
              shadow-sm
              hover:shadow-xl
              hover:shadow-violet-500/10
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
            <div
              className="
                w-12
                h-12
                rounded-xl
                flex
                items-center
                justify-center
                bg-violet-50
                dark:bg-violet-500/10
                text-violet-600
                dark:text-violet-400
                group-hover:scale-110
                transition-transform
              "
            >
              <FaGithub className="text-xl" />
            </div>

            <h3
              className="
                mt-5
                text-lg
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              GitHub Analyzer
            </h3>

            <p
              className="
                mt-2
                text-sm
                leading-relaxed
                text-slate-500
                dark:text-slate-400
              "
            >
              Analyze your repositories, coding activity,
              technologies, and project quality.
            </p>

            <div
              className="
                mt-5
                text-xs
                font-semibold
                text-violet-600
                dark:text-violet-400
              "
            >
              Review your GitHub →
            </div>
          </div>

          {/* Interview */}

          <div
            className="
              group
              relative
              p-6
              md:p-7
              rounded-2xl
              bg-white/80
              dark:bg-slate-900/70
              backdrop-blur-xl
              border
              border-slate-200
              dark:border-slate-800
              shadow-sm
              hover:shadow-xl
              hover:shadow-blue-500/10
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
            <div
              className="
                w-12
                h-12
                rounded-xl
                flex
                items-center
                justify-center
                bg-blue-50
                dark:bg-blue-500/10
                text-blue-600
                dark:text-blue-400
                group-hover:scale-110
                transition-transform
              "
            >
              <FaRobot className="text-xl" />
            </div>

            <h3
              className="
                mt-5
                text-lg
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              AI Mock Interview
            </h3>

            <p
              className="
                mt-2
                text-sm
                leading-relaxed
                text-slate-500
                dark:text-slate-400
              "
            >
              Practice technical interviews and receive
              instant AI-generated feedback.
            </p>

            <div
              className="
                mt-5
                text-xs
                font-semibold
                text-blue-600
                dark:text-blue-400
              "
            >
              Start practicing →
            </div>
          </div>

        </div>

        {/* Bottom decorative text */}

        <div className="mt-14 text-center">
          <p
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-slate-400
              dark:text-slate-600
            "
          >
            Resume • Projects • GitHub • Interviews • Career
          </p>
        </div>

      </div>
    </section>
  );
}