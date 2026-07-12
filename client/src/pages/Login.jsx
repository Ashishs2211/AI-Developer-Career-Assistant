import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center">

      <div className="bg-slate-800 w-full max-w-md rounded-2xl p-8 shadow-xl">

        <h1 className="text-3xl text-white font-bold text-center">
          Login
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Welcome Back 👋
        </p>

        <form className="mt-8 space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 text-white outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 text-white outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}