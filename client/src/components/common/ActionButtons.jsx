export default function ActionButtons({
  onDownload,
  onCopy,
  onReset,
}) {
  return (
    <div className="flex flex-wrap gap-4 mt-10">

      <button
        onClick={onDownload}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
      >
        📄 Download PDF
      </button>

      <button
        onClick={onCopy}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
      >
        📋 Copy Report
      </button>

      <button
        onClick={onReset}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl"
      >
        🔄 Analyze Again
      </button>

    </div>
  );
}