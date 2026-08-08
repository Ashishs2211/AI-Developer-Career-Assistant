export default function ProgressCard({
  progress,
}) {
  return (
    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-xl">

      <h2 className="text-3xl font-bold">
        Today's Progress
      </h2>

      <div className="w-full bg-white/30 rounded-full h-4 mt-6">

        <div
          className="bg-white h-4 rounded-full"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <h3 className="text-4xl font-bold mt-6">
        {progress}%
      </h3>

    </div>
  );
}