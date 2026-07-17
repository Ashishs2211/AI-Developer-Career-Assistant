import { useEffect, useState } from "react";
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

  const loadHistory = async () => {
    try {
      const response = await getHistory();
      setHistory(response.data.history);
    } catch (error) {
      toast.error("Failed to load history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteHistory(id);

      toast.success("History deleted.");

      setHistory((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      toast.error("Unable to delete.");
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "resume":
        return <FaFileAlt className="text-blue-600 text-3xl" />;

      case "github":
        return <FaGithub className="text-gray-800 text-3xl" />;

      case "project":
        return (
          <FaProjectDiagram className="text-orange-500 text-3xl" />
        );

      case "interview":
        return (
          <FaMicrophone className="text-purple-600 text-3xl" />
        );

      case "roadmap":
        return <FaRoad className="text-green-600 text-3xl" />;

      default:
        return null;
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading History..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        📚 My AI History
      </h1>

      <div className="space-y-6">

        {history.map((item) => (

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
                onClick={() => handleDelete(item._id)}
                className="text-red-600 text-xl"
              >
                <FaTrash />
              </button>

            </div>

            <details className="mt-5">

              <summary className="cursor-pointer text-blue-600 font-semibold">
                View AI Result
              </summary>

              <pre className="mt-4 whitespace-pre-wrap bg-gray-100 rounded-lg p-4">
                {item.result}
              </pre>

            </details>

          </div>

        ))}

      </div>

    </div>
  );
}