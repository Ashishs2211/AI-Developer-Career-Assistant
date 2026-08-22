import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

import {
  FaFileAlt,
  FaGithub,
  FaProjectDiagram,
  FaMicrophone,
  FaRoad,
  FaTrash,
  FaSearch,
  FaCopy,
  FaFilePdf,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";

import LoadingSpinner from "../components/common/LoadingSpinner";
import PageHero from "../components/common/PageHero";
import EmptyState from "../components/common/EmptyState";

import { downloadReport } from "../utils/pdfGenerator";

import {
  getHistory,
  deleteHistory,
} from "../services/historyService";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  /* ================= LOAD HISTORY ================= */

  useEffect(() => {
    loadHistory();
  }, []);

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

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    try {
      await deleteHistory(id);

      toast.success(
        "History deleted successfully."
      );

      setHistory((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

    } catch (error) {
      console.log(error);

      toast.error(
        "Unable to delete history."
      );
    }
  };

  /* ================= SEARCH + FILTER ================= */

  const filteredHistory = history.filter(
    (item) => {
      const text = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        text === "" ||
        item.type
          ?.toLowerCase()
          .includes(text) ||
        item.title
          ?.toLowerCase()
          .includes(text);

      const matchesFilter =
        filter === "all" ||
        item.type === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    }
  );

  /* ================= ICON ================= */

  const getIcon = (type) => {
    switch (type) {
      case "resume":
        return (
          <FaFileAlt className="text-blue-600 text-4xl" />
        );

      case "github":
        return (
          <FaGithub className="text-gray-700 text-4xl dark:text-white" />
        );

      case "project":
        return (
          <FaProjectDiagram className="text-orange-500 text-4xl" />
        );

      case "interview":
        return (
          <FaMicrophone className="text-purple-600 text-4xl" />
        );

      case "roadmap":
        return (
          <FaRoad className="text-green-600 text-4xl" />
        );

      default:
        return null;
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner
          text="Loading AI History..."
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl py-8 px-5 md:px-8">

        <div className="max-w-7xl mx-auto">

          {/* ================= HERO ================= */}

          <PageHero
            badge="AI Report Library"
            title="📚 AI Report History"
            description="Access every AI generated report from one place. Search, filter, download, copy and manage your reports."
            features={[
              "📄 Resume",
              "🐙 GitHub",
              "📂 Project",
              "🎤 Interview",
              "🛣 Roadmap",
            ]}
          />

          {/* ================= STATISTICS ================= */}

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5 mt-10 mb-10">

            {/* Total */}

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 text-center">

              <h2 className="text-4xl font-bold dark:text-white">
                {history.length}
              </h2>

              <p className="text-gray-500 mt-2">
                Total
              </p>

            </div>

            {/* Resume */}

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 text-center">

              <h2 className="text-3xl font-bold text-blue-600">
                {
                  history.filter(
                    (i) =>
                      i.type === "resume"
                  ).length
                }
              </h2>

              <p className="dark:text-gray-300">
                Resume
              </p>

            </div>

            {/* GitHub */}

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 text-center">

              <h2 className="text-3xl font-bold dark:text-white">
                {
                  history.filter(
                    (i) =>
                      i.type === "github"
                  ).length
                }
              </h2>

              <p className="dark:text-gray-300">
                GitHub
              </p>

            </div>

            {/* Project */}

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 text-center">

              <h2 className="text-3xl font-bold text-orange-500">
                {
                  history.filter(
                    (i) =>
                      i.type === "project"
                  ).length
                }
              </h2>

              <p className="dark:text-gray-300">
                Project
              </p>

            </div>

            {/* Interview */}

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 text-center">

              <h2 className="text-3xl font-bold text-purple-600">
                {
                  history.filter(
                    (i) =>
                      i.type === "interview"
                  ).length
                }
              </h2>

              <p className="dark:text-gray-300">
                Interview
              </p>

            </div>

            {/* Roadmap */}

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 text-center">

              <h2 className="text-3xl font-bold text-green-600">
                {
                  history.filter(
                    (i) =>
                      i.type === "roadmap"
                  ).length
                }
              </h2>

              <p className="dark:text-gray-300">
                Roadmap
              </p>

            </div>

          </div>

          {/* ================= SEARCH ================= */}

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 flex flex-col lg:flex-row gap-5 mb-10">

            <div className="relative flex-1">

              <FaSearch className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search reports..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full pl-12 p-4 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="rounded-xl border p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">
                All Reports
              </option>

              <option value="resume">
                Resume
              </option>

              <option value="github">
                GitHub
              </option>

              <option value="project">
                Project
              </option>

              <option value="interview">
                Interview
              </option>

              <option value="roadmap">
                Roadmap
              </option>

            </select>

          </div>

          {/* ================= HISTORY LIST ================= */}

          {filteredHistory.length === 0 ? (

            <EmptyState
              icon="📭"
              title="No Reports Found"
              description="Try changing your search or filter to find reports."
            />

          ) : (

            <div className="space-y-8">

              {filteredHistory.map(
                (item) => (

                  <div
                    key={item._id}
                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6 md:p-8"
                  >

                    {/* ================= HEADER ================= */}

                    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">

                      <div className="flex items-center gap-5 min-w-0">

                        {getIcon(item.type)}

                        <div className="min-w-0">

                          <h2 className="text-2xl font-bold capitalize dark:text-white">
                            {item.type}
                          </h2>

                          <p className="text-gray-600 dark:text-gray-300 mt-2 break-words">
                            {item.title ||
                              "AI Analysis"}
                          </p>

                          <p className="text-sm text-gray-500 mt-2">
                            {new Date(
                              item.createdAt
                            ).toLocaleString()}
                          </p>

                        </div>

                      </div>

                      {/* Delete */}

                      <button
                        onClick={() =>
                          handleDelete(
                            item._id
                          )
                        }
                        className="self-start lg:self-auto text-red-500 hover:text-red-700 text-2xl transition"
                        title="Delete report"
                      >
                        <FaTrash />
                      </button>

                    </div>

                    {/* ================= REPORT ================= */}

                    <details className="mt-8">

                      <summary className="cursor-pointer text-blue-600 font-semibold text-lg hover:text-blue-800">
                        👀 View AI Report
                      </summary>

                      <div className="mt-6 bg-slate-100 dark:bg-slate-800 rounded-2xl p-4 md:p-6 overflow-x-auto">

                        <div className="prose prose-lg max-w-none dark:prose-invert">

                          <ReactMarkdown>
                            {item.result}
                          </ReactMarkdown>

                        </div>

                      </div>

                      {/* ================= ACTIONS ================= */}

                      <div className="flex flex-wrap gap-4 mt-6">

                        <button
                          onClick={() =>
                            downloadReport(
                              item.title ||
                                "AI Report",
                              item.result
                            )
                          }
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
                        >
                          <FaFilePdf />
                          Export PDF
                        </button>

                        <button
                          onClick={() => {

                            navigator.clipboard.writeText(
                              item.result
                            );

                            toast.success(
                              "Copied Successfully"
                            );

                          }}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
                        >
                          <FaCopy />
                          Copy
                        </button>

                      </div>

                    </details>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </DashboardLayout>
  );
}