import { useState } from "react";
import axios from "axios";

function CareerRoadmap() {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [roadmap, setRoadmap] = useState("");
const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
  if (!goal) {
    alert("Please enter a career goal.");
    return;
  }

  try {
    setLoading(true);

    const response = await axios.post(
      "http://localhost:5000/api/roadmap/generate",
      {
        goal,
        level,
      }
    );

    setRoadmap(response.data.roadmap);

  } catch (error) {
    alert(error.response?.data?.message || "Something went wrong.");
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
  className="bg-green-600 text-white px-6 py-3 rounded-lg"
  disabled={loading}
>
  {loading ? "Generating..." : "Generate Roadmap"}
</button>
        {roadmap && (
  <div className="mt-8 bg-white shadow-lg rounded-xl p-6">
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