import LoadingSpinner from "./LoadingSpinner";

export default function LoadingCard({ text }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-10 mt-8 text-center">

      <LoadingSpinner />

      <h2 className="text-2xl font-bold mt-6">
        {text}
      </h2>

      <p className="text-gray-500 mt-2">
        AI is processing your request...
      </p>

    </div>
  );
}