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

export default function GithubAnalyzer() {
  const [repoUrl, setRepoUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= ANALYZE REPOSITORY ================= */

  const analyzeRepo = async () => {
    if (!repoUrl.trim()) {
      toast.error(
        "Please enter a GitHub Repository URL."
      );
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/github/analyze",
        {
          repoUrl: repoUrl.trim(),
        }
      );

      setResult(res.data);

      toast.success(
        "Repository analyzed successfully 🚀"
      );

    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
          "Analysis Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  /* ================= COPY ================= */

  const handleCopy = () => {
    if (!result?.analysis) return;

    navigator.clipboard.writeText(
      result.analysis
    );

    toast.success(
      "Report copied successfully"
    );
  };

  /* ================= RESET ================= */

  const handleReset = () => {
    setResult(null);
    setRepoUrl("");
  };

  /* ================= DOWNLOAD ================= */

  const handleDownload = () => {
    if (!result?.analysis) return;

    downloadReport(
      "GitHub Repository Analysis",
      result.analysis
    );

    toast.success(
      "PDF Downloaded Successfully 🎉"
    );
  };

  /* ================= PRINT ================= */

  const handlePrint = () => {
    if (!result?.analysis) return;

    printReport(
      "GitHub Repository Analysis",
      result.analysis
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
            badge="AI GitHub Repository Analyzer"
            title="🐙 GitHub Analyzer"
            description="Analyze any public GitHub repository using Artificial Intelligence and receive architecture review, security suggestions, scalability feedback and interview questions."
            features={[
              "⭐ Repository Score",
              "🔍 Code Review",
              "🛡 Security",
              "🚀 Scalability",
            ]}
          />

          {/* ================= REPOSITORY INPUT ================= */}

          <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl p-6 md:p-8">

            <h2 className="text-3xl font-bold text-white">
              Repository URL
            </h2>

            <p className="text-slate-400 mt-2 mb-8">
              Paste any public GitHub repository URL.
            </p>

            <input
              type="text"
              placeholder="https://github.com/username/repository"
              value={repoUrl}
              onChange={(e) =>
                setRepoUrl(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  analyzeRepo();
                }
              }}
              className="w-full rounded-xl p-4 bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* ================= FEATURES ================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

              <FeatureCard
                icon="⭐"
                title="Repository Score"
                description="Overall quality evaluation."
              />

              <FeatureCard
                icon="🛡"
                title="Security"
                description="AI checks for security improvements."
              />

              <FeatureCard
                icon="⚡"
                title="Performance"
                description="Optimization recommendations."
              />

              <FeatureCard
                icon="💼"
                title="Interview Questions"
                description="AI-generated technical interview questions."
              />

            </div>

            {/* ================= ANALYZE BUTTON ================= */}

            <button
              onClick={analyzeRepo}
              disabled={loading}
              className="mt-10 w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:scale-[1.02] transition-all duration-300 py-4 rounded-2xl text-xl font-bold text-white shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "🤖 AI is analyzing repository..."
                : "🚀 Analyze Repository"}
            </button>

          </div>

          {/* ================= LOADING ================= */}

          {loading && (
            <div className="mt-10">

              <LoadingCard
                text="Analyzing Repository..."
              />

            </div>
          )}

          {/* ================= EMPTY STATE ================= */}

          {!loading && !result && (
            <EmptyState
              icon="🐙"
              title="No Repository Analyzed"
              description="Paste a GitHub repository URL and let AI review it."
            />
          )}

          {/* ================= RESULT ================= */}

          {result && (
            <div className="mt-10">

              {/* Repository Information */}

              <ReportSection
                icon="📂"
                title="Repository Information"
              >

                <div className="space-y-4">

                  <p>
                    <strong>Name:</strong>{" "}
                    {result.repository?.name ||
                      "N/A"}
                  </p>

                  <p>
                    <strong>Owner:</strong>{" "}
                    {result.repository?.owner ||
                      "N/A"}
                  </p>

                  <p>
                    <strong>Language:</strong>{" "}
                    {result.repository?.language ||
                      "N/A"}
                  </p>

                  <p>
                    <strong>Stars:</strong>{" "}
                    ⭐{" "}
                    {result.repository?.stars ??
                      0}
                  </p>

                </div>

              </ReportSection>

              {/* AI Analysis */}

              <ReportSection
                icon="🤖"
                title="AI Repository Analysis"
              >

                <ReactMarkdown
                  className="prose prose-lg dark:prose-invert max-w-none"
                >
                  {result.analysis}
                </ReactMarkdown>

              </ReportSection>

              {/* Actions */}

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