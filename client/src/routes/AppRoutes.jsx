import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ResumeAnalyzer from "../pages/ResumeAnalyzer";
import ProjectReviewer from "../pages/ProjectReviewer";
import MockInterview from "../pages/MockInterview";
import CareerRoadmap from "../pages/CareerRoadmap";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
      <Route path="/project-review" element={<ProjectReviewer />} />
      <Route path="/mock-interview" element={<MockInterview />} />
      <Route path="/career-roadmap" element={<CareerRoadmap />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}