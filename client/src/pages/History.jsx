import { useEffect, useState } from "react";
import { exportPDF } from "../utils/pdfExport";
import toast from "react-hot-toast";
import {
  FaFileAlt,
  FaGithub,
  FaProjectDiagram,
  FaMicrophone,
  FaRoad,
  FaTrash,
} from "react-icons/fa";

import LoadingSpinner from "../components/common/LoadingSpinner";
import {
  getHistory,
  deleteHistory,
} from "../services/historyService";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Load History
  const loadHistory = async () => {
    try {
      const response = await getHistory();
      setHistory(response.data.history);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // Delete History
  const handleDelete = async (id) => {
    try {
      await deleteHistory(id);

      toast.success("History deleted successfully.");

      setHistory((prev) =>
        prev.filter((item) => item._id !== id)
      );

    } catch (error) {
      console.log(error);
      toast.error("Unable to delete history.");
    }
  };

  // Filter History
  const filteredHistory = history.filter((item) => {

    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || item.type === filter;

    return matchesSearch && matchesFilter;
  });

  // Icons
  const getIcon = (type) => {

    switch (type) {

      case "resume":
        return (
          <FaFileAlt className="text-blue-600 text-3xl" />
        );

      case "github":
        return (
          <FaGithub className="text-gray-800 text-3xl" />
        );

      case "project":
        return (
          <FaProjectDiagram className="text-orange-500 text-3xl" />
        );

      case "interview":
        return (
          <FaMicrophone className="text-purple-600 text-3xl" />
        );

      case "roadmap":
        return (
          <FaRoad className="text-green-600 text-3xl" />
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <LoadingSpinner text="Loading History..." />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* Heading */}

      <h1 className="text-4xl font-bold mb-8">
        📚 My AI History
      </h1>

      {/* Search & Filter */}

      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <input
          type="text"
          placeholder="🔍 Search history..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="flex-1 border rounded-lg px-4 py-3"
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="border rounded-lg px-4 py-3"
        >
          <option value="all">All</option>
          <option value="resume">Resume</option>
          <option value="github">GitHub</option>
          <option value="project">Project</option>
          <option value="interview">Interview</option>
          <option value="roadmap">Roadmap</option>
        </select>

      </div>

      {/* History List */}

      <div className="space-y-6">

        {filteredHistory.length === 0 ? (

          <div className="bg-white rounded-xl shadow-lg p-10 text-center">

            <h2 className="text-2xl font-bold">
              📭 No Results Found
            </h2>

            <p className="text-gray-500 mt-3">
              Try changing the search text or filter.
            </p>

          </div>

        ) : (

          filteredHistory.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >

              <div className="flex justify-between">

                <div className="flex gap-5">

                  {getIcon(item.type)}

                  <div>

                    <h2 className="text-2xl font-bold capitalize">
                      {item.type}
                    </h2>

                    <p className="mt-2">
                      {item.title}
                    </p>

                    <p className="text-gray-500 mt-2">
                      {new Date(
                        item.createdAt
                      ).toLocaleString()}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    handleDelete(item._id)
                  }
                  className="text-red-600 text-xl hover:text-red-800 transition"
                >
                  <FaTrash />
                </button>

              </div>

              <details className="mt-6">

        <summary className="cursor-pointer text-blue-600 font-semibold hover:text-blue-800">
          View AI Result
        </summary>

        <pre className="mt-4 whitespace-pre-wrap bg-gray-100 rounded-lg p-4 overflow-x-auto">
          {item.result}
        </pre>

        {/* Action Buttons */}

        <div className="mt-5 flex gap-3">

          <button
            onClick={() => exportPDF(item.title, item.result)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            📄 Export PDF
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(item.result);
              toast.success("Copied to clipboard!");
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
          >
            📋 Copy Result
          </button>

        </div>

      </details>

            </div>

          ))

        )}

      </div>

    </div>
  );
}