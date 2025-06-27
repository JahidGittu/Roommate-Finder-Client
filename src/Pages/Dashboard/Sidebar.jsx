import { useEffect, useRef, useState, useContext } from "react";
import { NavLink } from "react-router";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaPlus,
  FaThList,
  FaUser,
  FaListAlt,
} from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState(240);
  const [dragging, setDragging] = useState(false);
  const isDragging = useRef(false);

  // Auto collapse for small screen
  useEffect(() => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
      setWidth(70);
    }
  }, []);

  // Auto collapse when resized below 80px
  useEffect(() => {
    setCollapsed(width <= 80);
  }, [width]);

  // Mouse handlers
  const handleMouseDown = () => {
    isDragging.current = true;
    setDragging(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const newWidth = Math.min(Math.max(e.clientX, 70), 240);
    setWidth(newWidth);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Navigation item
  const navItem = (to, icon, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${
          isActive
            ? "bg-violet-100 text-violet-700 font-semibold"
            : "hover:bg-base-200"
        } flex items-center ${collapsed ? "justify-center" : ""} gap-2 px-4 py-2 rounded transition-all relative group`
      }
    >
      <span
        className={`transition-all duration-300 ${
          collapsed ? "text-xl" : "text-base"
        }`}
      >
        {icon}
      </span>
      {!collapsed && <span className="whitespace-nowrap">{label}</span>}

      {/* Tooltip when collapsed */}
      {collapsed && (
        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
          {label}
        </span>
      )}
    </NavLink>
  );

  return (
    <div
      className="bg-base-100 text-base-content h-full shadow-md flex flex-col justify-between relative transition-all duration-300"
      style={{ width: `${width}px` }}
    >
      {/* Top Section */}
      <div className="p-4">
        {/* Collapse Toggle */}
        <button
          onClick={() => {
            const newState = !collapsed;
            setCollapsed(newState);
            setWidth(newState ? 70 : 240);
          }}
          className="mb-4 btn btn-sm btn-ghost"
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>

        {/* User Info */}
        <div className="text-center mb-6">
          <img
            src={user?.photoURL || "/placeholder.png"}
            alt="Profile"
            className="w-12 h-12 rounded-full mx-auto border"
          />
          {!collapsed && (
            <>
              <p className="text-sm font-medium mt-1 truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email}
              </p>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          {navItem("/", <FaHome />, "Home")}
          {navItem("/dashboard", <FaThList />, "Dashboard")}
          {navItem("/dashboard/browse-listing", <FaListAlt />, "Browse Listings")}
          {navItem("/dashboard/my-listings", <FaUser />, "My Listings")}
          {navItem("/dashboard/add-listing-to-find-roommate", <FaPlus />, "Add Listing")}
          {navItem("/dashboard/my-profile", <FaUser />, "My Profile")}
        </nav>
      </div>

      {/* Drag Handle */}
      <div
        onMouseDown={handleMouseDown}
        title="Drag to resize"
        className={`w-1 cursor-col-resize h-full absolute right-0 top-0 z-20 transition ${
          dragging ? "bg-violet-500" : "hover:bg-violet-300"
        }`}
      />
    </div>
  );
};

export default Sidebar;
