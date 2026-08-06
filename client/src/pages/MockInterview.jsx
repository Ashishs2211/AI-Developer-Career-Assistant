import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

import LoadingCard from "../components/common/LoadingCard";
import FeatureCard from "../components/common/FeatureCard";
import PageHero from "../components/common/PageHero";
import ReportSection from "../components/common/ReportSection";
import ActionButtons from "../components/common/ActionButtons";
import EmptyState from "../components/common/EmptyState";

export default function MockInterview() {
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

      toast.success("Interview generated successfully 🎉");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Interview Generation Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(interview);
    toast.success("Interview copied successfully");
  };

  const handleReset = () => {
    setInterview("");
    setRole("");
    setExperience("Fresher");
  };

  const handleDownload = () => {
    toast("📄 PDF Export coming in Day 17");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-10 px-5">

      <div className="max-w-6xl mx-auto">

        <PageHero
          badge="AI Mock Interview"
          title="🎤 AI Mock Interview"
          description="Generate realistic interview questions based on your target role and experience level. Practice with AI and improve your interview confidence."
          features={[
            "💼 HR Questions",
            "💻 Technical Questions",
            "🧠 Problem Solving",
            "🚀 AI Feedback",
          ]}
        />

        <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl text-white font-bold">
            Interview Details
          </h2>

          <p className="text-slate-400 mt-2 mb-8">
            Enter your target role and experience level.
          </p>

          <input
            type="text"
            placeholder="Job Role (e.g. Java Developer)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-xl p-4 bg-slate-800 border border-slate-700 text-white mb-6 outline-none"
          />

          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full rounded-xl p-4 bg-slate-800 border border-slate-700 text-white outline-none"
          >
            <option>Fresher</option>
            <option>1 Year</option>
            <option>2 Years</option>
            <option>3+ Years</option>
          </select>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

            <FeatureCard
              icon="💻"
              title="Technical"
              description="Core technical interview questions."
            />

            <FeatureCard
              icon="🧠"
              title="Problem Solving"
              description="Logical and coding-based scenarios."
            />

            <FeatureCard
              icon="💼"
              title="HR Round"
              description="Behavioral and HR interview questions."
            />

            <FeatureCard
              icon="🚀"
              title="AI Feedback"
              description="Improve your interview performance."
            />

          </div>

          <button
            onClick={startInterview}
            disabled={loading}
            className="mt-10 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-[1.02] transition-all duration-300 py-4 rounded-2xl text-xl font-bold text-white shadow-xl disabled:opacity-60"
          >
            {loading
              ? "🤖 AI is generating interview..."
              : "🎤 Generate Mock Interview"}
          </button>

        </div>

        {loading && (
          <div className="mt-10">
            <LoadingCard text="Generating Interview..." />
          </div>
        )}

        {!loading && !interview && (
          <EmptyState
            icon="🎤"
            title="No Interview Generated"
            description="Enter your job role and generate AI interview questions."
          />
        )}

        {interview && (
          <div className="mt-10">

            <ReportSection
              icon="🤖"
              title="AI Mock Interview"
            >
              <ReactMarkdown className="prose prose-lg dark:prose-invert max-w-none">
                {interview}
              </ReactMarkdown>
            </ReportSection>

            <ActionButtons
              onDownload={handleDownload}
              onCopy={handleCopy}
              onReset={handleReset}
            />

          </div>
        )}

      </div>

    </div>
  );
}