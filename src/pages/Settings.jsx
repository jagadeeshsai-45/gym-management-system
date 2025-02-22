import { useState } from "react";

function Settings() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleUpdate = async () => {
        const response = await fetch("http://localhost:5000/settings/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer YOUR_ADMIN_JWT_TOKEN`,
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        setMessage(data.message);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="mb-4">
                <label className="block">Update Email</label>
                <input 
                    type="email" 
                    className="border p-2 w-full" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </div>
            <div className="mb-4">
                <label className="block">Update Password</label>
                <input 
                    type="password" 
                    className="border p-2 w-full" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            <button 
                className="bg-blue-500 text-white p-2 rounded" 
                onClick={handleUpdate}
            >
                Update Settings
            </button>
            {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
    );
}

export default Settings;
