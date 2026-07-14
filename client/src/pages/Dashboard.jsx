import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import ProfileCard from "../components/dashboard/ProfileCard";

import { getProfile } from "../services/authService";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-10">
        Welcome {user?.name || "User"} 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Resume Score"
          value="92%"
          color="bg-blue-600"
        />

        <StatCard
          title="GitHub Score"
          value="85%"
          color="bg-green-600"
        />

        <StatCard
          title="Mock Interviews"
          value="6"
          color="bg-purple-600"
        />

        <StatCard
          title="Projects Reviewed"
          value="12"
          color="bg-orange-500"
        />

      </div>

      <QuickActions />

      <ProfileCard user={user} />

    </DashboardLayout>
  );
}