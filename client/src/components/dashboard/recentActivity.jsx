import { useEffect, useState } from "react";
import { getHistory } from "../../services/historyService";
import LoadingSpinner from "../common/LoadingSpinner";

export default function RecentActivity() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getHistory();

        // Show latest 5 activities
        setHistory(response.data.history.slice(0, 5));

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Loading Recent Activity..." />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mt-10">

      <h2 className="text-2xl font-bold mb-6">
        📋 Recent Activity
      </h2>

      {history.length === 0 ? (
        <p>No activity found.</p>
      ) : (
        history.map((item) => (
          <div
            key={item._id}
            className="border-b py-4"
          >
            <h3 className="font-bold capitalize">
              {item.type}
            </h3>

            <p>{item.title}</p>

            <small className="text-gray-500">
              {new Date(item.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      )}

    </div>
  );
}