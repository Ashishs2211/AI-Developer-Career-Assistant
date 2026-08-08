import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import ProfileCard from "../components/dashboard/ProfileCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import AchievementCard from "../components/dashboard/AchievementCard";
import ProgressCard from "../components/dashboard/ProgressCard";

import ThemeToggle from "../components/common/ThemeToggle";

import { getProfile } from "../services/authService";
import { getDashboardStats } from "../services/historyService";

import {
  FaRocket,
  FaClock,
  FaRegCalendarAlt,
} from "react-icons/fa";

export default function Dashboard() {

  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    resume: 0,
    github: 0,
    project: 0,
    interview: 0,
    roadmap: 0,
  });

  const totalReports =
    stats.resume +
    stats.github +
    stats.project +
    stats.interview +
    stats.roadmap;

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const getGreeting = () => {

    const hour = currentTime.getHours();

    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";

    return "Good Evening 🌙";
  };

  const quotes = [
    "Consistency beats intensity.",
    "Dream big. Build bigger.",
    "Code. Learn. Improve. Repeat.",
    "Every line of code brings you closer to success.",
    "Small progress every day leads to big achievements.",
  ];

  const quote =
    quotes[currentTime.getDate() % quotes.length];

  useEffect(() => {

    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data.stats);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
    fetchStats();

  }, []);

  return (

    <DashboardLayout>
            {/* ================= Theme Toggle ================= */}

      <div className="flex justify-end gap-4 mb-6">

        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
        >
          🔄 Refresh
        </button>

        <ThemeToggle />

      </div>

      {/* ================= Hero Section ================= */}

      <div className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 rounded-3xl shadow-2xl overflow-hidden mb-10">

        <div className="p-8 md:p-10 flex flex-col lg:flex-row justify-between gap-8">

          <div>

            <p className="text-blue-100 text-lg font-medium">
              {getGreeting()}
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-white mt-2">
              Welcome Back,
              <br />
              {user?.name || "Developer"} 👋
            </h1>

            <p className="text-blue-100 mt-6 max-w-2xl leading-8 text-lg">
              Manage your AI-powered career journey from one intelligent dashboard.
            </p>

            <div className="mt-6 flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 backdrop-blur-md w-fit">
              <FaRocket />
              <span className="italic">
                {quote}
              </span>
            </div>

            <div className="mt-8">

              <h2 className="text-5xl font-bold text-white">
                {totalReports}
              </h2>

              <p className="text-blue-100">
                AI Reports Generated
              </p>

            </div>

          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-white min-w-[300px]">

            <div className="flex items-center gap-3 mb-6">

              <FaRegCalendarAlt size={22} />

              <h3 className="text-xl font-semibold">
                {currentTime.toLocaleDateString()}
              </h3>

            </div>

            <div className="flex items-center gap-3 mb-8">

              <FaClock size={22} />

              <p className="text-3xl font-bold">
                {currentTime.toLocaleTimeString()}
              </p>

            </div>

            <div className="border-t border-white/20 pt-6">

              <p className="text-blue-100">
                Total Analyses
              </p>

              <h2 className="text-4xl font-bold">
                {totalReports}
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* ================= Progress Section ================= */}

      <div className="grid xl:grid-cols-2 gap-8 mb-10">

        <ProgressCard
          progress={Math.min(totalReports * 10, 100)}
        />

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-4 dark:text-white">
            🔥 Most Used Tool
          </h2>

          <h1 className="text-4xl font-bold text-blue-600">
            Resume Analyzer
          </h1>

          <p className="text-gray-500 mt-3">
            Your favorite AI feature based on your activity.
          </p>

        </div>

      </div>

      {/* ================= Statistics ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">

        <StatCard
          title="Resume Reviews"
          value={stats.resume}
          color="bg-blue-600"
        />

        <StatCard
          title="GitHub Reviews"
          value={stats.github}
          color="bg-green-600"
        />

        <StatCard
          title="Mock Interviews"
          value={stats.interview}
          color="bg-purple-600"
        />

        <StatCard
          title="Project Reviews"
          value={stats.project}
          color="bg-orange-500"
        />

        <StatCard
          title="Career Roadmaps"
          value={stats.roadmap}
          color="bg-pink-600"
        />

      </div>

      {/* ================= Analytics ================= */}

      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 mb-10">

        <h2 className="text-2xl font-bold mb-6 dark:text-white">
          📊 AI Usage Analytics
        </h2>

        <AnalyticsChart stats={stats} />

      </div>

      {/* ================= Quick Actions ================= */}

      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 mb-10">

        <h2 className="text-2xl font-bold mb-6 dark:text-white">
          ⚡ Quick Actions
        </h2>

        <QuickActions />

      </div>

      {/* ================= Achievements ================= */}

      <div className="mb-10">

        <h2 className="text-3xl font-bold mb-6 dark:text-white">
          🏆 Achievements
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          <AchievementCard
            icon="🥇"
            title="First Analysis"
            description="Generated your first AI report."
          />

          <AchievementCard
            icon="🚀"
            title="Career Explorer"
            description="Created your first roadmap."
          />

          <AchievementCard
            icon="💻"
            title="Developer"
            description="Reviewed your GitHub repository."
          />

        </div>

      </div>
            {/* ================= Bottom Section ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Profile */}

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            👤 My Profile
          </h2>

          <ProfileCard user={user} />

        </div>

        {/* Recent Activity */}

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            📜 Recent Activity
          </h2>

          <RecentActivity />

        </div>

      </div>

      {/* ================= Footer ================= */}

      <footer className="mt-14">

        <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 rounded-3xl shadow-2xl p-10">

          <div className="grid md:grid-cols-3 gap-8">

            {/* Left */}

            <div>

              <h2 className="text-3xl font-bold text-white">
                AI Developer Career Assistant
              </h2>

              <p className="text-gray-400 mt-4 leading-7">
                Your intelligent AI companion for Resume Analysis,
                GitHub Review, Mock Interviews, Career Roadmaps
                and Project Evaluation.
              </p>

            </div>

            {/* Center */}

            <div>

              <h3 className="text-xl font-semibold text-white mb-4">
                Dashboard Summary
              </h3>

              <div className="space-y-3 text-gray-300">

                <p>
                  📄 Resume Reviews :
                  <span className="font-bold text-white ml-2">
                    {stats.resume}
                  </span>
                </p>

                <p>
                  💻 GitHub Reviews :
                  <span className="font-bold text-white ml-2">
                    {stats.github}
                  </span>
                </p>

                <p>
                  🚀 Project Reviews :
                  <span className="font-bold text-white ml-2">
                    {stats.project}
                  </span>
                </p>

                <p>
                  🎤 Mock Interviews :
                  <span className="font-bold text-white ml-2">
                    {stats.interview}
                  </span>
                </p>

                <p>
                  🛣 Career Roadmaps :
                  <span className="font-bold text-white ml-2">
                    {stats.roadmap}
                  </span>
                </p>

              </div>

            </div>

            {/* Right */}

            <div>

              <h3 className="text-xl font-semibold text-white mb-4">
                Overall Progress
              </h3>

              <div className="bg-white/10 rounded-2xl p-6">

                <h1 className="text-5xl font-bold text-cyan-400">
                  {totalReports}
                </h1>

                <p className="text-gray-300 mt-2">
                  Total AI Reports Generated
                </p>

                <div className="mt-6 w-full bg-gray-700 rounded-full h-3 overflow-hidden">

                  <div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(totalReports * 10, 100)}%`,
                    }}
                  ></div>

                </div>

              </div>

            </div>

          </div>

          {/* Bottom Footer */}

          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-gray-400">
              © 2026 AI Developer Career Assistant
            </p>

            <p className="text-gray-400">
              Built with ❤️ by <span className="font-semibold text-white">Ashish Gupta</span>
            </p>

            <p className="text-cyan-400 font-semibold">
              Version 1.0
            </p>

          </div>

        </div>

      </footer>

    </DashboardLayout>

  );
}