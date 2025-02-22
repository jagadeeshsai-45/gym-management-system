import { useEffect, useState } from "react";

function Dashboard() {
    const [stats, setStats] = useState({ users: 0, attendance: 0 });

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        const response = await fetch("http://localhost:5000/dashboard/stats", {
            headers: { Authorization: `Bearer YOUR_ADMIN_JWT_TOKEN` }
        });
        const data = await response.json();
        setStats(data);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-500 text-white rounded-lg">
                    <h3 className="text-lg">Total Users</h3>
                    <p className="text-2xl font-bold">{stats.users}</p>
                </div>
                <div className="p-4 bg-green-500 text-white rounded-lg">
                    <h3 className="text-lg">Total Check-ins</h3>
                    <p className="text-2xl font-bold">{stats.attendance}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
