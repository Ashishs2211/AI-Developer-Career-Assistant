import Sidebar from "../components/dashboard/Sidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">

      <div className="flex min-h-screen">

        {/* Sidebar */}

        <Sidebar />

        {/* Main Area */}

        <div className="flex-1 min-w-0">

          {/* Desktop Navbar */}

          <DashboardNavbar />

          {/* Page Content */}

          <main className="pt-20 md:pt-0 p-4 sm:p-6 md:p-8">

            <div className="max-w-[1600px] mx-auto">
              {children}
            </div>

          </main>

        </div>

      </div>

    </div>
  );
}