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

export default function CareerRoadmap() {
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

      toast.success("Career roadmap generated successfully 🚀");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Roadmap Generation Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(roadmap);
    toast.success("Roadmap copied successfully");
  };

  const handleReset = () => {
    setRoadmap("");
    setGoal("");
    setLevel("Beginner");
  };

  const handleDownload = () => {
    toast("📄 PDF Export coming in Day 17");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-10 px-5">

      <div className="max-w-6xl mx-auto">

        <PageHero
          badge="AI Career Roadmap Generator"
          title="🛣 AI Career Roadmap"
          description="Generate a personalized AI roadmap based on your career goal and current skill level."
          features={[
            "🎯 Learning Path",
            "📚 Resources",
            "💼 Career Planning",
            "🚀 Growth Strategy",
          ]}
        />

        {/* Input Card */}

        <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl font-bold text-white">
            Career Details
          </h2>

          <p className="text-slate-400 mt-2 mb-8">
            Tell AI where you want to go.
          </p>

          <input
            type="text"
            placeholder="e.g. MERN Stack Developer"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full rounded-xl p-4 bg-slate-800 border border-slate-700 text-white mb-6 outline-none"
          />

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full rounded-xl p-4 bg-slate-800 border border-slate-700 text-white outline-none"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          {/* Feature Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

            <FeatureCard
              icon="🎯"
              title="Learning Path"
              description="Step-by-step roadmap."
            />

            <FeatureCard
              icon="📚"
              title="Resources"
              description="Courses and learning resources."
            />

            <FeatureCard
              icon="💼"
              title="Career Planning"
              description="Industry-focused guidance."
            />

            <FeatureCard
              icon="🚀"
              title="Growth Strategy"
              description="Become job-ready faster."
            />

          </div>

          <button
            onClick={generateRoadmap}
            disabled={loading}
            className="mt-10 w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:scale-[1.02] transition-all duration-300 py-4 rounded-2xl text-xl font-bold text-white shadow-xl disabled:opacity-60"
          >
            {loading
              ? "🤖 AI is generating roadmap..."
              : "🛣 Generate AI Roadmap"}
          </button>

        </div>

        {/* Loading */}

        {loading && (
          <div className="mt-10">
            <LoadingCard text="Generating Career Roadmap..." />
          </div>
        )}

        {/* Empty State */}

        {!loading && !roadmap && (
          <EmptyState
            icon="🛣"
            title="No Roadmap Generated"
            description="Enter your career goal and let AI create a personalized roadmap."
          />
        )}

        {/* AI Report */}

        {roadmap && (
          <div className="mt-10">

            <ReportSection
              icon="🛣"
              title="AI Career Roadmap"
            >
              <ReactMarkdown className="prose prose-lg dark:prose-invert max-w-none">
                {roadmap}
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