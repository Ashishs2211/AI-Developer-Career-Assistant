import { useState } from "react";
import api from "../services/api";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

import LoadingCard from "../components/common/LoadingCard";
import FileUpload from "../components/common/FileUpload";
import FeatureCard from "../components/common/FeatureCard";
import PageHero from "../components/common/PageHero";
import ReportSection from "../components/common/ReportSection";
import ActionButtons from "../components/common/ActionButtons";
import EmptyState from "../components/common/EmptyState";

import { downloadReport } from "../utils/pdfGenerator";
import { printReport } from "../utils/printReport";

export default function ProjectReviewer() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= UPLOAD PROJECT ================= */

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a ZIP file.");
      return;
    }

    const formData = new FormData();

    formData.append("project", file);

    try {
      setLoading(true);

      const res = await api.post(
        "/project/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAnalysis(res.data.analysis);

      toast.success(
        "Project reviewed successfully 🚀"
      );

    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
          "Project Review Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  /* ================= COPY REPORT ================= */

  const handleCopy = () => {
    navigator.clipboard.writeText(analysis);

    toast.success(
      "Report copied successfully"
    );
  };

  /* ================= RESET ================= */

  const handleReset = () => {
    setAnalysis("");
    setFile(null);
  };

  /* ================= DOWNLOAD ================= */

  const handleDownload = () => {
    downloadReport(
      "Project Review",
      analysis
    );

    toast.success(
      "PDF Downloaded Successfully 🎉"
    );
  };

  /* ================= PRINT ================= */

  const handlePrint = () => {
    printReport(
      "Project Review",
      analysis
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
            badge="AI Project Reviewer"
            title="📂 AI Project Reviewer"
            description="Upload your ZIP project and receive an AI-powered code review including architecture analysis, scalability, security suggestions, performance improvements and interview questions."
            features={[
              "🏗 Architecture",
              "⚡ Performance",
              "🛡 Security",
              "💼 Interview Questions",
            ]}
          />

          {/* ================= UPLOAD CARD ================= */}

          <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl p-6 md:p-8">

            <h2 className="text-3xl text-white font-bold">
              Upload Project
            </h2>

            <p className="text-slate-400 mt-2 mb-8">
              Upload your project as a ZIP file.
            </p>

            <FileUpload
              file={file}
              onChange={(e) =>
                setFile(e.target.files[0])
              }
            />

            {/* ================= FEATURES ================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

              <FeatureCard
                icon="🏗"
                title="Architecture"
                description="Review project structure and design."
              />

              <FeatureCard
                icon="⚡"
                title="Performance"
                description="Find optimization opportunities."
              />

              <FeatureCard
                icon="🛡"
                title="Security"
                description="Detect security improvements."
              />

              <FeatureCard
                icon="💼"
                title="Interview"
                description="Generate project interview questions."
              />

            </div>

            {/* ================= REVIEW BUTTON ================= */}

            <button
              onClick={handleUpload}
              disabled={loading}
              className="mt-10 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-[1.02] transition-all duration-300 py-4 rounded-2xl text-xl font-bold text-white shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "🤖 AI is reviewing your project..."
                : "🚀 Review Project with AI"}
            </button>

          </div>

          {/* ================= LOADING ================= */}

          {loading && (
            <div className="mt-10">

              <LoadingCard
                text="Reviewing Project..."
              />

            </div>
          )}

          {/* ================= EMPTY STATE ================= */}

          {!loading && !analysis && (
            <EmptyState
              icon="📂"
              title="No Project Reviewed"
              description="Upload a ZIP file and let AI review your project."
            />
          )}

          {/* ================= AI REPORT ================= */}

          {analysis && (
            <div className="mt-10">

              <ReportSection
                icon="🤖"
                title="AI Project Review"
              >

                <ReactMarkdown
                  className="prose prose-lg dark:prose-invert max-w-none"
                >
                  {analysis}
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