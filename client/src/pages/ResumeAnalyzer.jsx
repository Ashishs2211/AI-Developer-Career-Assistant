import { useState } from "react";
import api from "../services/api";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import LoadingCard from "../components/common/LoadingCard";

function ResumeAnalyzer() {
  const [resume, setResume] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!resume) {
      toast.error("Please upload a resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      setLoading(true);

          const response = await api.post(
      "/resume/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

      setAnalysis(response.data.analysis);
      toast.success("Resume analyzed successfully!");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          AI Resume Analyzer
        </h1>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
          className="mb-4 w-full"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Analyze Resume
        </button>

        {loading && (
          <LoadingCard text="Analyzing Resume..." />
        )}

        {analysis && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg border">
            <div className="prose max-w-none">
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeAnalyzer;