import { useState } from "react";

function CareerRoadmap() {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("Beginner");

  const generateRoadmap = () => {
    alert(
      `Roadmap will be generated for ${goal || "Software Engineer"} (${level})`
    );
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
        >
          Generate Roadmap
        </button>

      </div>
    </div>
  );
}

export default CareerRoadmap;