import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import LoadingCard from "../components/common/LoadingCard";

function ProjectReviewer() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

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

      toast.success("Project reviewed successfully!");

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Upload Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        AI Project Reviewer
      </h1>

      <input
        type="file"
        accept=".zip"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="ml-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Upload Project
      </button>

      {loading && (
        <LoadingCard text="Reviewing Project..." />
      )}

      {analysis && (
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-4">
            AI Review
          </h2>

          <pre className="whitespace-pre-wrap">
            {analysis}
          </pre>

        </div>
      )}

    </div>
  );
}

export default ProjectReviewer;