import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import ProfileCard from "../components/dashboard/ProfileCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";

import { getProfile } from "../services/authService";
import { getDashboardStats } from "../services/historyService";

import ThemeToggle from "../components/common/ThemeToggle";

import {
  FaRegCalendarAlt,
  FaClock,
  FaRocket,
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

  const quote = quotes[currentTime.getDate() % quotes.length];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        setStats(response.data.stats);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
    fetchStats();
  }, []);

  return (
    <DashboardLayout>

      {/* Theme Toggle */}

      <div className="flex justify-end mb-6">
        <ThemeToggle />
      </div>

      {/* Premium Hero */}

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
              <span className="italic">{quote}</span>
            </div>

          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-white min-w-[280px]">

            <div className="flex items-center gap-3 mb-6">
              <FaRegCalendarAlt size={22} />
              <h3 className="text-xl font-semibold">
                {currentTime.toLocaleDateString()}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <FaClock size={22} />
              <p className="text-3xl font-bold">
                {currentTime.toLocaleTimeString()}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Statistics */}

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

      {/* Analytics */}

      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 mb-10">

        <h2 className="text-2xl font-bold mb-6">
          📊 AI Usage Analytics
        </h2>

        <AnalyticsChart stats={stats} />

      </div>

      {/* Quick Actions */}

      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 mb-10">

        <h2 className="text-2xl font-bold mb-6">
          ⚡ Quick Actions
        </h2>

        <QuickActions />

      </div>

      {/* Bottom Cards */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            👤 My Profile
          </h2>

          <ProfileCard user={user} />

        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            📜 Recent Activity
          </h2>

          <RecentActivity />

        </div>

      </div>

      {/* Footer */}

      <div className="mt-12 text-center text-gray-500 dark:text-gray-400">

        <p className="font-semibold">
          AI Developer Career Assistant
        </p>

        <p className="mt-2">
          Built with ❤️ by Ashish Gupta
        </p>

        <p className="text-sm mt-1">
          Version 1.0 • © 2026
        </p>

      </div>

    </DashboardLayout>
  );
}