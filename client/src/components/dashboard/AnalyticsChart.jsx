import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function AnalyticsChart({ stats }) {

  const data = [
    {
      name: "Resume",
      count: stats.resume,
    },
    {
      name: "GitHub",
      count: stats.github,
    },
    {
      name: "Project",
      count: stats.project,
    },
    {
      name: "Interview",
      count: stats.interview,
    },
    {
      name: "Roadmap",
      count: stats.roadmap,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mt-10">

      <h2 className="text-xl md:text-2xl font-bold mb-6">
        📊 AI Analytics
      </h2>

      <div className="h-64 md:h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="count"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}