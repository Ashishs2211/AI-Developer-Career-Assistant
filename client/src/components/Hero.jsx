import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-slate-900 min-h-[80vh] flex items-center justify-center">

      <div className="text-center px-6">

        <h1 className="text-6xl font-bold text-white">

          AI Developer

          <span className="text-blue-500">
            {" "}Career Assistant
          </span>

        </h1>

        <p className="text-gray-400 text-xl mt-6 max-w-2xl">

          Analyze your Resume,
          Review GitHub Projects,
          Practice AI Mock Interviews
          and prepare for placements.

        </p>

        <div className="mt-10 space-x-5">

          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-white"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-white px-8 py-4 rounded-lg text-white hover:bg-white hover:text-black"
          >
            Login
          </Link>

        </div>

      </div>

    </section>
  );
}