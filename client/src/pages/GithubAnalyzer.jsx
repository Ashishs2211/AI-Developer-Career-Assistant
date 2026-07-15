import { useState } from "react";
import axios from "axios";

function GithubAnalyzer() {
  const [repoUrl, setRepoUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeRepo = async () => {
    if (!repoUrl) {
      alert("Please enter a GitHub Repository URL.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/github/analyze",
        {
          repoUrl,
        }
      );

      setResult(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        GitHub Repository Analyzer
      </h1>

      <input
        type="text"
        placeholder="Paste GitHub Repository URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        className="border rounded-lg px-4 py-2 w-2/3"
      />

      <button
        onClick={analyzeRepo}
        className="ml-4 bg-green-600 text-white px-6 py-2 rounded-lg"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div className="mt-10 bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-6">
            Repository Information
          </h2>

          <p><strong>Name:</strong> {result.repository.name}</p>
          <p><strong>Owner:</strong> {result.repository.owner}</p>
          <p><strong>Language:</strong> {result.repository.language}</p>
          <p><strong>Stars:</strong> ⭐ {result.repository.stars}</p>

          <hr className="my-6" />

          <h2 className="text-3xl font-bold mb-4">
            AI Analysis
          </h2>

          <pre className="whitespace-pre-wrap">
            {result.analysis}
          </pre>

        </div>
      )}

    </div>
  );
}

export default GithubAnalyzer;