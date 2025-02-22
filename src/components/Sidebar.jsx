import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiSettings, FiCalendar, FiMenu, FiLogOut } from "react-icons/fi";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <>
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
                <div className="flex items-center justify-between p-4">
                    <h1 className={`text-xl font-bold transition-all duration-300 ${!isOpen && "hidden"}`}>Gym Admin</h1>
                    <FiMenu className="cursor-pointer text-xl" onClick={() => setIsOpen(!isOpen)} />
                </div>
                <nav className="mt-4">
                    <SidebarItem to="/dashboard" icon={<FiHome />} text="Dashboard" isOpen={isOpen} active={location.pathname === "/dashboard"} />
                    <SidebarItem to="/attendance" icon={<FiCalendar />} text="Attendance" isOpen={isOpen} active={location.pathname === "/attendance"} />
                    <SidebarItem to="/users" icon={<FiUsers />} text="Users" isOpen={isOpen} active={location.pathname === "/users"} />
                    <SidebarItem to="/settings" icon={<FiSettings />} text="Settings" isOpen={isOpen} active={location.pathname === "/settings"} />
                </nav>
                <div className="mt-auto p-4">
                    <button 
                        onClick={handleLogout} 
                        className="flex items-center space-x-3 p-3 w-full text-left hover:bg-gray-700 transition-all rounded-md"
                    >
                        <FiLogOut className="text-xl" />
                        {isOpen && <span className="text-sm font-medium">Logout</span>}
                    </button>
                </div>
            </div>

            {/* Push content when sidebar is open */}
            <div className={`transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"} p-4`}></div>
        </>
    );
}

function SidebarItem({ to, icon, text, isOpen, active }) {
    return (
        <Link
            to={to}
            className={`flex items-center space-x-3 p-3 rounded-md transition-all ${active ? "bg-blue-600" : "hover:bg-gray-700"}`}
        >
            <span className="text-xl">{icon}</span>
            {isOpen && <span className="text-sm font-medium">{text}</span>}
        </Link>
    );
}

export default Sidebar;
