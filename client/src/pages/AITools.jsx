import { Link } from "react-router-dom";

function AITools() {
  const tools = [
    {
      title: "AI Resume Analyzer",
      description: "Upload your resume and get ATS score with suggestions.",
      path: "/resume-analyzer",
      icon: "📄",
    },
    {
      title: "AI Project Reviewer",
      description: "Upload your project ZIP for an AI-powered review.",
      path: "/project-reviewer",
      icon: "📦",
    },
    {
      title: "GitHub Repository Analyzer",
      description: "Analyze a GitHub repository using AI.",
      path: "/github-analyzer",
      icon: "🐙",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        AI Developer Career Assistant
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <div
            key={tool.title}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
          >
            <div className="text-5xl mb-4">{tool.icon}</div>

            <h2 className="text-xl font-bold mb-3">
              {tool.title}
            </h2>

            <p className="text-gray-600 mb-6">
              {tool.description}
            </p>

            <Link
              to={tool.path}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Open
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AITools;