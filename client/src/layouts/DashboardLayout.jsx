import Sidebar from "../components/dashboard/Sidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-slate-100 min-h-screen">

        <DashboardNavbar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}