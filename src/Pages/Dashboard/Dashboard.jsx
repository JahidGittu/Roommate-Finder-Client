import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-base-200 overflow-hidden">
      {/* Sidebar */}
      <aside className="md:sticky md:top-0 z-50">
        <Sidebar />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;