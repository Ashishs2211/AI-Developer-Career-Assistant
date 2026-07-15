import { useState } from "react";

function MockInterview() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("Fresher");

  const startInterview = () => {
    alert(
      `Interview will start for ${role || "Software Developer"} (${experience})`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8">
          AI Mock Interview
        </h1>

        <label className="block mb-2 font-semibold">
          Job Role
        </label>

        <input
          type="text"
          placeholder="Software Developer"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 mb-6"
        />

        <label className="block mb-2 font-semibold">
          Experience Level
        </label>

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 mb-8"
        >
          <option>Fresher</option>
          <option>1 Year</option>
          <option>2 Years</option>
          <option>3+ Years</option>
        </select>

        <button
          onClick={startInterview}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Start Interview
        </button>

      </div>
    </div>
  );
}

export default MockInterview;