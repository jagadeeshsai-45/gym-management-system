import { useState, useEffect } from "react";

function BackgroundToggle() {
    const [bg, setBg] = useState(localStorage.getItem("bg") || "dashboard-page");

    useEffect(() => {
        localStorage.setItem("bg", bg);
        document.body.className = bg;
    }, [bg]);

    const handleBackgroundChange = (event) => {
        setBg(event.target.value);
    };

    return (
        <div className="fixed top-4 right-4 bg-white p-2 rounded shadow-md">
            <label className="block text-gray-700 font-bold mb-2">Select Background:</label>
            <select 
                onChange={handleBackgroundChange} 
                value={bg} 
                className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="dashboard-page">Dashboard</option>
                <option value="attendance-page">Attendance</option>
                <option value="users-page">Users</option>
                <option value="settings-page">Settings</option>
            </select>
        </div>
    );
}

export default BackgroundToggle;
