import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaSignOutAlt, FaCode } from "react-icons/fa";

export default function DashboardNavbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="
      sticky top-0 z-30
      h-20
      px-6 md:px-8
      flex items-center justify-between
      bg-white/90 dark:bg-slate-900/90
      backdrop-blur-xl
      border-b border-slate-200 dark:border-slate-800
      shadow-sm
      transition-colors duration-300
    ">

      {/* Left Section */}
      <div className="flex items-center gap-3">

        <div className="
          w-10 h-10
          rounded-xl
          flex items-center justify-center
          bg-indigo-600
          text-white
          shadow-lg shadow-indigo-500/20
        ">
          <FaCode />
        </div>

        <div>
          <h1 className="
            text-xl md:text-2xl
            font-bold
            text-slate-900 dark:text-white
          ">
            Dashboard
          </h1>

          <p className="
            hidden sm:block
            text-xs
            text-slate-500 dark:text-slate-400
          ">
            AI Developer Career Assistant
          </p>
        </div>

      </div>

      {/* Right Section */}
      <button
        onClick={handleLogout}
        className="
          flex items-center gap-2
          px-4 py-2.5
          rounded-xl
          bg-red-50 dark:bg-red-500/10
          text-red-600 dark:text-red-400
          border border-red-100 dark:border-red-500/20
          hover:bg-red-500
          hover:text-white
          dark:hover:bg-red-500
          dark:hover:text-white
          transition-all duration-200
          font-medium
        "
      >
        <FaSignOutAlt />
        <span className="hidden sm:inline">
          Logout
        </span>
      </button>

    </header>
  );
}