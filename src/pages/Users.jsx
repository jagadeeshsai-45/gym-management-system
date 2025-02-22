import { useState, useEffect } from "react";

function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/users", {
                headers: { Authorization: `Bearer YOUR_ADMIN_JWT_TOKEN` }
            });
            const data = await response.json();

            // Ensure `data` is an array before setting state
            if (!Array.isArray(data)) {
                console.error("API response is not an array:", data);
                setUsers([]);
                return;
            }
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
            setError("Failed to load users");
            setUsers([]);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            {error && <p className="text-red-500">{error}</p>}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td className="border p-2">{user.name}</td>
                                <td className="border p-2">{user.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="border p-2 text-center" colSpan="2">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
