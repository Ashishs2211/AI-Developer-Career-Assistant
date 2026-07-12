import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-500"
        >
          AI Career Assistant
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className="text-gray-300 hover:text-white transition"
          >
            Home
          </Link>

          <Link
            to="/resume-analyzer"
            className="text-gray-300 hover:text-white transition"
          >
            Resume
          </Link>

          <Link
            to="/project-review"
            className="text-gray-300 hover:text-white transition"
          >
            Projects
          </Link>

          <Link
            to="/mock-interview"
            className="text-gray-300 hover:text-white transition"
          >
            Interview
          </Link>

        </div>

        {/* Buttons */}
        <div className="flex gap-3">

          <Link
            to="/login"
            className="px-5 py-2 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}