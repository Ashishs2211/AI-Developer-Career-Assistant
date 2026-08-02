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

export default function Dashboard() {
  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    resume: 0,
    github: 0,
    project: 0,
    interview: 0,
    roadmap: 0,
  });

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

      {/* Hero Banner */}

      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl p-8 md:p-10 text-white shadow-2xl mb-10">

        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome Back, {user?.name || "Developer"} 🚀
        </h1>

        <p className="mt-4 text-xl text-blue-100 font-medium">
          Your Personal AI Career Growth Dashboard
        </p>

        <p className="mt-4 text-blue-100 leading-7 max-w-4xl">
          Track your interview preparation, analyze resumes, review GitHub
          repositories, evaluate projects, practice mock interviews, and
          generate AI-powered career roadmaps — all from one dashboard.
        </p>

      </div>

      {/* Dashboard Stats */}

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

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 mb-10">

        <h2 className="text-2xl font-bold mb-6">
          📊 AI Usage Analytics
        </h2>

        <AnalyticsChart stats={stats} />

      </div>

      {/* Quick Actions */}

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 mb-10">

        <h2 className="text-2xl font-bold mb-6">
          ⚡ Quick Actions
        </h2>

        <QuickActions />

      </div>

      {/* Bottom Section */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">
            👤 My Profile
          </h2>

          <ProfileCard user={user} />
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">
            📜 Recent Activity
          </h2>

          <RecentActivity />
        </div>

      </div>

    </DashboardLayout>
  );
}