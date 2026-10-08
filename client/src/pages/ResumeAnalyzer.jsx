import { useState } from "react";
import api from "../services/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

export default function ResumeAnalyzer() {
  const [resume, setResume] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================================
     UPLOAD & ANALYZE RESUME
  ========================================= */

  const handleUpload = async () => {
    if (!resume) {
      toast.error("Please upload a PDF Resume.");
      return;
    }

    const formData = new FormData();

    formData.append("resume", resume);

    try {
      setLoading(true);
      setAnalysis("");

      const response = await api.post(
        "/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result =
        response?.data?.analysis || "";

      if (!result.trim()) {
        toast.error(
          "No analysis was returned. Please try again."
        );

        return;
      }

      setAnalysis(result);

      toast.success(
        "Resume analyzed successfully 🎉"
      );
    } catch (error) {
      console.error(
        "Resume Analyzer Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Resume Analysis Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     COPY REPORT
  ========================================= */

  const handleCopy = async () => {
    if (!analysis) {
      toast.error("No report available to copy.");
      return;
    }

    try {
      await navigator.clipboard.writeText(
        analysis
      );

      toast.success(
        "Report copied successfully"
      );
    } catch (error) {
      console.error(
        "Copy Error:",
        error
      );

      toast.error(
        "Unable to copy the report."
      );
    }
  };

  /* =========================================
     RESET
  ========================================= */

  const handleReset = () => {
    setAnalysis("");
    setResume(null);
  };

  /* =========================================
     DOWNLOAD PDF
  ========================================= */

  const handleDownload = () => {
    if (!analysis) {
      toast.error("No report available.");
      return;
    }

    downloadReport(
      "Resume Analysis Report",
      analysis
    );

    toast.success(
      "PDF Downloaded Successfully 🎉"
    );
  };

  /* =========================================
     PRINT REPORT
  ========================================= */

  const handlePrint = () => {
    if (!analysis) {
      toast.error("No report available.");
      return;
    }

    printReport(
      "Resume Analysis Report",
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

          {/* =========================================
              HERO
          ========================================= */}

          <PageHero
            badge="AI Powered ATS Resume Analyzer"
            title="📄 AI Resume Analyzer"
            description="Upload your resume and receive an AI-powered ATS score, missing keywords, recruiter suggestions and improvement tips."
            features={[
              "⭐ ATS Score",
              "🔍 Missing Keywords",
              "🚀 Suggestions",
              "💼 Recruiter Feedback",
            ]}
          />

          {/* =========================================
              UPLOAD CARD
          ========================================= */}

          <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl p-6 md:p-8">

            <h2 className="text-3xl text-white font-bold mb-2">
              Upload Resume
            </h2>

            <p className="text-slate-400 mb-8">
              PDF Format • Maximum Size 5 MB
            </p>

            <FileUpload
              file={resume}
              onChange={(e) => {
                const file =
                  e.target.files?.[0];

                if (file) {
                  setResume(file);
                }
              }}
            />

            {/* =========================================
                FEATURES
            ========================================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

              <FeatureCard
                icon="📊"
                title="ATS Score"
                description="Know how ATS systems evaluate your resume."
              />

              <FeatureCard
                icon="🔍"
                title="Keywords"
                description="Find missing recruiter keywords."
              />

              <FeatureCard
                icon="💡"
                title="Suggestions"
                description="AI recommendations to improve your resume."
              />

              <FeatureCard
                icon="🚀"
                title="Career Growth"
                description="Increase your chances of getting shortlisted."
              />

            </div>

            {/* =========================================
                ANALYZE BUTTON
            ========================================= */}

            <button
              onClick={handleUpload}
              disabled={loading}
              className="mt-10 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-[1.02] transition-all duration-300 py-4 rounded-2xl text-xl font-bold text-white shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "🤖 AI is analyzing your resume..."
                : "✨ Analyze Resume with AI"}
            </button>

          </div>

          {/* =========================================
              LOADING STATE
          ========================================= */}

          {loading && (
            <div className="mt-10">

              <LoadingCard
                text="AI is analyzing your resume..."
              />

            </div>
          )}

          {/* =========================================
              EMPTY STATE
          ========================================= */}

          {!loading && !analysis && (
            <EmptyState
              icon="📄"
              title="No Resume Analysis Yet"
              description="Upload your resume and let AI analyze it."
            />
          )}

          {/* =========================================
              REPORT
          ========================================= */}

          {!loading && analysis && (
            <div className="mt-10">

              <ReportSection
                icon="📊"
                title="AI Resume Report"
              >

                {/* 
                  IMPORTANT:
                  No fixed height.
                  No overflow-hidden.
                  Complete analysis remains visible.
                */}

                <div
                  className="
                    w-full
                    max-w-none
                    overflow-visible
                    break-words
                    whitespace-normal
                    text-slate-200
                  "
                >

                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{

                      /* =========================
                         MAIN TITLE
                      ========================= */

                      h1: ({ children }) => (
                        <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-8 break-words">
                          {children}
                        </h1>
                      ),

                      /* =========================
                         SECTION HEADINGS
                      ========================= */

                      h2: ({ children }) => (
                        <h2 className="text-2xl md:text-3xl font-bold text-white mt-10 mb-5 pb-2 border-b border-white/10 break-words">
                          {children}
                        </h2>
                      ),

                      h3: ({ children }) => (
                        <h3 className="text-xl md:text-2xl font-semibold text-white mt-8 mb-4 break-words">
                          {children}
                        </h3>
                      ),

                      /* =========================
                         PARAGRAPH
                      ========================= */

                      p: ({ children }) => (
                        <p className="text-slate-300 leading-8 mb-5 break-words whitespace-normal">
                          {children}
                        </p>
                      ),

                      /* =========================
                         UNORDERED LIST
                      ========================= */

                      ul: ({ children }) => (
                        <ul className="list-disc pl-6 md:pl-8 space-y-3 mb-7 text-slate-300">
                          {children}
                        </ul>
                      ),

                      /* =========================
                         ORDERED LIST
                      ========================= */

                      ol: ({ children }) => (
                        <ol className="list-decimal pl-6 md:pl-8 space-y-4 mb-7 text-slate-300">
                          {children}
                        </ol>
                      ),

                      /* =========================
                         LIST ITEM
                      ========================= */

                      li: ({ children }) => (
                        <li className="leading-7 pl-2 break-words">
                          {children}
                        </li>
                      ),

                      /* =========================
                         STRONG TEXT
                      ========================= */

                      strong: ({ children }) => (
                        <strong className="font-bold text-white">
                          {children}
                        </strong>
                      ),

                      /* =========================
                         CODE
                      ========================= */

                      code: ({ children }) => (
                        <code className="bg-slate-800 text-blue-300 px-2 py-1 rounded-md text-sm break-words">
                          {children}
                        </code>
                      ),

                      /* =========================
                         HORIZONTAL LINE
                      ========================= */

                      hr: () => (
                        <hr className="border-white/10 my-8" />
                      ),

                    }}
                  >
                    {analysis}
                  </ReactMarkdown>

                </div>

              </ReportSection>

              {/* =========================================
                  ACTION BUTTONS
              ========================================= */}

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