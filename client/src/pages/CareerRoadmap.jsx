import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

import DashboardLayout from "../layouts/DashboardLayout";

import LoadingCard from "../components/common/LoadingCard";
import FeatureCard from "../components/common/FeatureCard";
import PageHero from "../components/common/PageHero";
import ReportSection from "../components/common/ReportSection";
import ActionButtons from "../components/common/ActionButtons";
import EmptyState from "../components/common/EmptyState";

import { downloadReport } from "../utils/pdfGenerator";
import { printReport } from "../utils/printReport";

export default function CareerRoadmap() {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= GENERATE ROADMAP ================= */

  const generateRoadmap = async () => {
    if (!goal.trim()) {
      toast.error("Please enter a career goal.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/roadmap/generate",
        {
          goal: goal.trim(),
          level,
        }
      );

      setRoadmap(response.data.roadmap);

      toast.success(
        "Career roadmap generated successfully 🚀"
      );
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Roadmap Generation Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= COPY ================= */

  const handleCopy = () => {
    if (!roadmap) return;

    navigator.clipboard.writeText(roadmap);

    toast.success(
      "Roadmap copied successfully"
    );
  };

  /* ================= RESET ================= */

  const handleReset = () => {
    setRoadmap("");
    setGoal("");
    setLevel("Beginner");
  };

  /* ================= DOWNLOAD ================= */

  const handleDownload = () => {
    if (!roadmap) return;

    downloadReport(
      "Career Roadmap",
      roadmap
    );

    toast.success(
      "PDF Downloaded Successfully 🎉"
    );
  };

  /* ================= PRINT ================= */

  const handlePrint = () => {
    if (!roadmap) return;

    printReport(
      "Career Roadmap",
      roadmap
    );

    toast.success(
      "Opening Print Preview..."
    );
  };

  return (
    <DashboardLayout>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-5 md:p-8">

        <div className="max-w-6xl mx-auto">

          {/* ================= HERO ================= */}

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

          {/* ================= INPUT CARD ================= */}

          <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl p-6 md:p-8">

            <h2 className="text-3xl font-bold text-white">
              Career Details
            </h2>

            <p className="text-slate-400 mt-2 mb-8">
              Tell AI where you want to go.
            </p>

            {/* Career Goal */}

            <input
              type="text"
              placeholder="e.g. MERN Stack Developer"
              value={goal}
              onChange={(e) =>
                setGoal(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  generateRoadmap();
                }
              }}
              className="w-full rounded-xl p-4 bg-slate-800 border border-slate-700 text-white mb-6 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Skill Level */}

            <select
              value={level}
              onChange={(e) =>
                setLevel(e.target.value)
              }
              className="w-full rounded-xl p-4 bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            {/* ================= FEATURES ================= */}

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

            {/* ================= GENERATE BUTTON ================= */}

            <button
              onClick={generateRoadmap}
              disabled={loading}
              className="mt-10 w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:scale-[1.02] transition-all duration-300 py-4 rounded-2xl text-xl font-bold text-white shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "🤖 AI is generating roadmap..."
                : "🛣 Generate AI Roadmap"}
            </button>

          </div>

          {/* ================= LOADING ================= */}

          {loading && (
            <div className="mt-10">

              <LoadingCard
                text="Generating Career Roadmap..."
              />

            </div>
          )}

          {/* ================= EMPTY STATE ================= */}

          {!loading && !roadmap && (
            <EmptyState
              icon="🛣"
              title="No Roadmap Generated"
              description="Enter your career goal and let AI create a personalized roadmap."
            />
          )}

          {/* ================= AI REPORT ================= */}

          {roadmap && (
            <div className="mt-10">

              <ReportSection
                icon="🛣"
                title="AI Career Roadmap"
              >

                <ReactMarkdown
                  className="prose prose-lg dark:prose-invert max-w-none"
                >
                  {roadmap}
                </ReactMarkdown>

              </ReportSection>

              {/* ================= ACTION BUTTONS ================= */}

              <ActionButtons
                onDownload={handleDownload}
                onPrint={handlePrint}
                onCopy={handleCopy}
                onReset={handleReset}
              />

            </div>
          )}

        </div>

      </div>

    </DashboardLayout>
  );
}