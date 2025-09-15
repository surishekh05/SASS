import { useState } from "react";
import { login } from "../api";
import { saveToken } from "../auth";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(email, password);
    if (data.token) {
      saveToken(data.token);
      onLogin();
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto justify-center items-center text-center mt-20 p-4 border rounded">
      <h2 className="text-xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 rounded" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border p-2 rounded" required />
        <button type="submit" className="bg-blue-500 text-black px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}
