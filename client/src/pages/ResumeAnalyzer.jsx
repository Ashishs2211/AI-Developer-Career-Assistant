import { useState } from "react";
import api from "../services/api";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

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

  const handleUpload = async () => {
    if (!resume) {
      toast.error("Please upload a PDF Resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      setLoading(true);

      const response = await api.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAnalysis(response.data.analysis);

      toast.success("Resume analyzed successfully 🎉");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Resume Analysis Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(analysis);
    toast.success("Report copied successfully");
  };

  const handleReset = () => {
    setAnalysis("");
    setResume(null);
  };

  const handleDownload = () => {
  downloadReport(
    "Resume Analysis Report",
    analysis
  );

  toast.success("PDF Downloaded Successfully 🎉");
};

   const handlePrint = () => {
  printReport(
    "Resume Analysis Report",
    analysis
  );

  toast.success("Opening Print Preview...");
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-10 px-5">

      <div className="max-w-6xl mx-auto">

        {/* Hero */}

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

        {/* Upload Card */}

        <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl text-white font-bold mb-2">
            Upload Resume
          </h2>

          <p className="text-slate-400 mb-8">
            PDF Format • Maximum Size 5 MB
          </p>

          <FileUpload
            file={resume}
            onChange={(e) => setResume(e.target.files[0])}
          />

          {/* Features */}

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

          {/* Button */}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-10 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-[1.02] transition-all duration-300 py-4 rounded-2xl text-xl font-bold text-white shadow-xl disabled:opacity-60"
          >
            {loading
              ? "🤖 AI is analyzing your resume..."
              : "✨ Analyze Resume with AI"}
          </button>

        </div>

        {/* Loading */}

        {loading && (
          <div className="mt-10">
            <LoadingCard text="AI is analyzing your resume..." />
          </div>
        )}

        {/* Empty State */}

        {!loading && !analysis && (
          <EmptyState
            icon="📄"
            title="No Resume Analysis Yet"
            description="Upload your resume and let AI analyze it."
          />
        )}

        {/* Report */}

        {analysis && (
          <div className="mt-10">

            <ReportSection
              icon="📊"
              title="AI Resume Report"
            >
              <ReactMarkdown className="prose prose-lg dark:prose-invert max-w-none">
                {analysis}
              </ReactMarkdown>
            </ReportSection>

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
  );
}