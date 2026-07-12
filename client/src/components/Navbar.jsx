import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-950 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        <h1 className="text-2xl font-bold text-blue-500">
          AI Career Assistant
        </h1>

        <div className="space-x-8">

          <Link
            to="/"
            className="hover:text-blue-400"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="hover:text-blue-400"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="hover:text-blue-400"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}