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

export default function MockInterview() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("Fresher");
  const [loading, setLoading] = useState(false);
  const [interview, setInterview] = useState("");

  /* ================= START INTERVIEW ================= */

  const startInterview = async () => {
    if (!role.trim()) {
      toast.error("Please enter a job role.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/interview/start",
        {
          role: role.trim(),
          experience,
        }
      );

      setInterview(response.data.interview);

      toast.success(
        "Interview generated successfully 🎉"
      );

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Interview Generation Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  /* ================= COPY ================= */

  const handleCopy = () => {
    if (!interview) return;

    navigator.clipboard.writeText(interview);

    toast.success(
      "Interview copied successfully"
    );
  };

  /* ================= RESET ================= */

  const handleReset = () => {
    setInterview("");
    setRole("");
    setExperience("Fresher");
  };

  /* ================= DOWNLOAD ================= */

  const handleDownload = () => {
    if (!interview) return;

    downloadReport(
      "Mock Interview",
      interview
    );

    toast.success(
      "PDF Downloaded Successfully 🎉"
    );
  };

  /* ================= PRINT ================= */

  const handlePrint = () => {
    if (!interview) return;

    printReport(
      "Mock Interview",
      interview
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

          {/* ================= INTERVIEW DETAILS ================= */}

          <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl p-6 md:p-8">

            <h2 className="text-3xl text-white font-bold">
              Interview Details
            </h2>

            <p className="text-slate-400 mt-2 mb-8">
              Enter your target role and experience level.
            </p>

            {/* Job Role */}

            <input
              type="text"
              placeholder="Job Role (e.g. Java Developer)"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  startInterview();
                }
              }}
              className="w-full rounded-xl p-4 bg-slate-800 border border-slate-700 text-white mb-6 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Experience */}

            <select
              value={experience}
              onChange={(e) =>
                setExperience(e.target.value)
              }
              className="w-full rounded-xl p-4 bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Fresher</option>
              <option>1 Year</option>
              <option>2 Years</option>
              <option>3+ Years</option>
            </select>

            {/* ================= FEATURES ================= */}

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

            {/* ================= GENERATE BUTTON ================= */}

            <button
              onClick={startInterview}
              disabled={loading}
              className="mt-10 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-[1.02] transition-all duration-300 py-4 rounded-2xl text-xl font-bold text-white shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "🤖 AI is generating interview..."
                : "🎤 Generate Mock Interview"}
            </button>

          </div>

          {/* ================= LOADING ================= */}

          {loading && (
            <div className="mt-10">

              <LoadingCard
                text="Generating Interview..."
              />

            </div>
          )}

          {/* ================= EMPTY STATE ================= */}

          {!loading && !interview && (
            <EmptyState
              icon="🎤"
              title="No Interview Generated"
              description="Enter your job role and generate AI interview questions."
            />
          )}

          {/* ================= INTERVIEW REPORT ================= */}

          {interview && (
            <div className="mt-10">

              <ReportSection
                icon="🤖"
                title="AI Mock Interview"
              >

                <ReactMarkdown
                  className="prose prose-lg dark:prose-invert max-w-none"
                >
                  {interview}
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