import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import LoadingCard from "../components/common/LoadingCard";

function CareerRoadmap() {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
    if (!goal) {
      toast.error("Please enter a career goal.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/roadmap/generate", {
        goal,
        level,
      });

      setRoadmap(response.data.roadmap);

      toast.success("Roadmap generated successfully!");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8">
          AI Career Roadmap
        </h1>

        <label className="block mb-2 font-semibold">
          Career Goal
        </label>

        <input
          type="text"
          placeholder="Full Stack Developer"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 mb-6"
        />

        <label className="block mb-2 font-semibold">
          Current Skill Level
        </label>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 mb-8"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <button
          onClick={generateRoadmap}
          disabled={loading}
          className={`px-6 py-3 rounded-lg text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Generating Roadmap..." : "Generate Roadmap"}
        </button>

        {loading && (
          <LoadingCard text="Generating AI Roadmap..." />
        )}

        {roadmap && (
          <div className="mt-8 bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              AI Career Roadmap
            </h2>

            <pre className="whitespace-pre-wrap">
              {roadmap}
            </pre>
          </div>
        )}

      </div>
    </div>
  );
}

export default CareerRoadmap;