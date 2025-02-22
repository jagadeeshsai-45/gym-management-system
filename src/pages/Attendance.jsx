import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Attendance() {
    const [attendance, setAttendance] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [userId, setUserId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            let url = `http://localhost:5000/attendance/all`;
            const params = [];
            if (userId) params.push(`user_id=${userId}`);
            if (startDate) params.push(`start_date=${startDate}`);
            if (endDate) params.push(`end_date=${endDate}`);
            if (params.length) url += "?" + params.join("&");

            const response = await fetch(url, {
                headers: { Authorization: `Bearer YOUR_ADMIN_JWT_TOKEN` }
            });

            const data = await response.json();

            // Ensure `data` is an array before processing
            if (!Array.isArray(data)) {
                console.error("API response is not an array:", data);
                setAttendance([]);
                return;
            }

            setAttendance(data);
            processChartData(data);
        } catch (error) {
            console.error("Error fetching attendance data:", error);
        }
    };

    const processChartData = (data) => {
        if (!Array.isArray(data)) return;
        const groupedData = data.reduce((acc, record) => {
            const date = record.checkin_time.split("T")[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});
        
        const formattedData = Object.keys(groupedData).map(date => ({
            date,
            count: groupedData[date]
        }));

        setChartData(formattedData);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
            <div className="mb-4">
                <input type="text" placeholder="User ID" onChange={(e) => setUserId(e.target.value)} />
                <input type="date" onChange={(e) => setStartDate(e.target.value)} />
                <input type="date" onChange={(e) => setEndDate(e.target.value)} />
                <button onClick={fetchAttendance}>Filter</button>
            </div>
            <div className="w-full h-64 mb-6">
                <h3 className="text-lg font-semibold mb-2">Attendance Trend</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#4F46E5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border p-2">User</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Check-in Time</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((record) => (
                        <tr key={record.id}>
                            <td className="border p-2">{record.name}</td>
                            <td className="border p-2">{record.email}</td>
                            <td className="border p-2">{record.checkin_time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Attendance;
