import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import ProfileCard from "../components/dashboard/ProfileCard";
import RecentActivity from "../components/dashboard/RecentActivity";

import { getProfile } from "../services/authService";
import { getDashboardStats } from "../services/historyService";

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
      {/* Hero Banner */}

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-10 shadow-xl">

        <h1 className="text-5xl font-bold">
          Welcome Back, {user?.name || "User"} 👋
        </h1>

        <p className="mt-3 text-lg text-blue-100">
          AI Developer Career Assistant Dashboard
        </p>

        <p className="mt-2 text-blue-200">
          Analyze resumes, review GitHub repositories, practice mock interviews,
          review projects, and generate career roadmaps using AI.
        </p>

      </div>

      {/* Dashboard Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <StatCard
          title="Resume Analyses"
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

      </div>

      {/* Quick Actions */}

      <QuickActions />

      {/* Profile */}

      <div className="mt-10">
        <ProfileCard user={user} />
      </div>

      {/* Recent Activity */}

      <div className="mt-10">
        <RecentActivity />
      </div>

    </DashboardLayout>
  );
}