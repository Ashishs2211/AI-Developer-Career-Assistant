import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    githubUsername: "",
    linkedin: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      await register(data);

      alert("Registration Successful!");

      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center p-6">

      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-lg">

        <h1 className="text-3xl text-white font-bold text-center">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 mt-8"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />

          <input
            type="text"
            name="githubUsername"
            placeholder="GitHub Username"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />

          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn URL"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills (Java, React, MongoDB)"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

      </div>

    </div>
  );
}