import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import LoadingCard from "../components/common/LoadingCard";

function MockInterview() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("Fresher");
  const [loading, setLoading] = useState(false);
  const [interview, setInterview] = useState("");

  const startInterview = async () => {
    if (!role) {
      toast.error("Please enter a job role.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/interview/start", {
        role,
        experience,
      });

      setInterview(response.data.interview);

      toast.success("Interview generated successfully!");

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
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8">
          AI Mock Interview
        </h1>

        <input
          type="text"
          placeholder="Job Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 mb-6"
        />

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 mb-6"
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

        {loading && (
          <LoadingCard text="Generating Interview..." />
        )}

        {interview && (
          <div className="mt-8 bg-gray-50 rounded-lg p-6 border">
            <pre className="whitespace-pre-wrap">
              {interview}
            </pre>
          </div>
        )}

      </div>
    </div>
  );
}

export default MockInterview;