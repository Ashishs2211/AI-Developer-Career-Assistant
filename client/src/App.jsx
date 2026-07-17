import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import AITools from "./pages/AITools";
import ProjectReviewer from "./pages/ProjectReviewer";
import MockInterview from "./pages/MockInterview";
import CareerRoadmap from "./pages/CareerRoadmap";
import GithubAnalyzer from "./pages/GithubAnalyzer";
import History from "./pages/History";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/resume-analyzer"
  element={
    <ProtectedRoute>
      <ResumeAnalyzer />
    </ProtectedRoute>
  }
/>
<Route
  path="/ai-tools"
  element={
    <ProtectedRoute>
      <AITools />
    </ProtectedRoute>
  }
/>
<Route
  path="/project-reviewer"
  element={
    <ProtectedRoute>
      <ProjectReviewer />
    </ProtectedRoute>
  }
/>

<Route
  path="/mock-interview"
  element={
    <ProtectedRoute>
      <MockInterview />
    </ProtectedRoute>
  }
/>

<Route
  path="/career-roadmap"
  element={
    <ProtectedRoute>
      <CareerRoadmap />
    </ProtectedRoute>
  }
/>
<Route
  path="/github-analyzer"
  element={
    <ProtectedRoute>
      <GithubAnalyzer />
    </ProtectedRoute>
  }
/>
    <Route
  path="/history"
  element={
    <ProtectedRoute>
      <History />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
}

export default App;