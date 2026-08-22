import { UploadCloud } from "lucide-react";

export default function FileUpload({
  file,
  onChange,
  accept = ".pdf",
  title = "Drag & Drop your Resume",
  description = "PDF only • Maximum 5 MB",
  inputId = "file-upload",
}) {
  return (
    <label
      htmlFor={inputId}
      className="cursor-pointer block border-2 border-dashed border-blue-500 rounded-3xl p-12 text-center bg-gradient-to-br from-slate-900 to-slate-800 hover:border-cyan-400 transition-all duration-300"
    >

      <UploadCloud
        size={70}
        className="mx-auto text-blue-400"
      />

      <h2 className="text-2xl font-bold text-white mt-6">
        {title}
      </h2>

      <p className="text-slate-400 mt-2">
        or click here to browse
      </p>

      <p className="text-sm text-slate-500 mt-4">
        {description}
      </p>

      {file && (
        <div className="mt-6 inline-block bg-green-500 text-white px-5 py-2 rounded-full">
          ✅ {file.name}
        </div>
      )}

      <input
        id={inputId}
        type="file"
        accept={accept}
        onChange={onChange}
        hidden
      />

    </label>
  );
}