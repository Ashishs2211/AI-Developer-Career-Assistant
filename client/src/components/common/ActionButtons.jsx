export default function ActionButtons({
  onDownload,
  onCopy,
  onReset,
  onPrint,
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
        onClick={onPrint}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl"
      >
        🖨 Print
      </button>

      <button
        onClick={onCopy}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
      >
        📋 Copy
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