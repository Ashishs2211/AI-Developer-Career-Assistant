import { Link } from "react-router-dom";
import { FaRobot, FaGithub, FaFileAlt } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="bg-slate-900 min-h-[85vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">

        <div className="text-center">

          <span className="inline-block bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
            🚀 AI Powered Career Platform
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold text-white leading-tight">
            Accelerate Your
            <span className="text-blue-500">
              {" "}Placement Journey
            </span>

            <br />

            with AI
          </h1>

          <p className="mt-8 text-gray-400 text-xl max-w-3xl mx-auto">

            Improve your resume, review your GitHub projects,
            practice AI mock interviews, and prepare for placements
            with one intelligent platform.

          </p>

          <div className="mt-10 flex justify-center gap-6">

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-xl transition"
            >
              Login
            </Link>

          </div>

          {/* Feature Cards */}

          <div className="grid md:grid-cols-3 gap-8 mt-20">

            <div className="bg-slate-800 rounded-2xl p-8 shadow-lg">

              <FaFileAlt className="text-blue-500 text-4xl mb-5 mx-auto"/>

              <h3 className="text-white text-2xl font-semibold">
                Resume Analyzer
              </h3>

              <p className="text-gray-400 mt-3">
                AI-powered ATS analysis with detailed suggestions.
              </p>

            </div>

            <div className="bg-slate-800 rounded-2xl p-8 shadow-lg">

              <FaGithub className="text-blue-500 text-4xl mb-5 mx-auto"/>

              <h3 className="text-white text-2xl font-semibold">
                GitHub Review
              </h3>

              <p className="text-gray-400 mt-3">
                Analyze repositories and improve project quality.
              </p>

            </div>

            <div className="bg-slate-800 rounded-2xl p-8 shadow-lg">

              <FaRobot className="text-blue-500 text-4xl mb-5 mx-auto"/>

              <h3 className="text-white text-2xl font-semibold">
                AI Interview
              </h3>

              <p className="text-gray-400 mt-3">
                Practice technical interviews with AI feedback.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}