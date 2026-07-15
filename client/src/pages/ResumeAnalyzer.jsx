import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function ResumeAnalyzer() {
  const [resume, setResume] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!resume) {
      alert("Please select a resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAnalysis(response.data.analysis);

    } catch (error) {
      alert(error.response?.data?.message || "Upload Failed");
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
          <p className="mt-6 text-blue-600 font-semibold">
            Analyzing Resume...
          </p>
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