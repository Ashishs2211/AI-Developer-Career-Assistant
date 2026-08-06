import { UploadCloud } from "lucide-react";

export default function FileUpload({
  file,
  onChange,
}) {
  return (
    <label
      htmlFor="resume"
      className="cursor-pointer block border-2 border-dashed border-blue-500 rounded-3xl p-12 text-center bg-gradient-to-br from-slate-900 to-slate-800 hover:border-cyan-400 transition-all duration-300"
    >
      <UploadCloud
        size={70}
        className="mx-auto text-blue-400"
      />

      <h2 className="text-2xl font-bold text-white mt-6">
        Drag & Drop your Resume
      </h2>

      <p className="text-slate-400 mt-2">
        or click here to browse
      </p>

      <p className="text-sm text-slate-500 mt-4">
        PDF only • Maximum 5 MB
      </p>

      {file && (
        <div className="mt-6 inline-block bg-green-500 text-white px-5 py-2 rounded-full">
          ✅ {file.name}
        </div>
      )}

      <input
        id="resume"
        type="file"
        accept=".pdf"
        onChange={onChange}
        hidden
      />
    </label>
  );
}