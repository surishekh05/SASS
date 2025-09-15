import { parseToken, logout } from "../auth";

export default function Header() {
  const user = parseToken();

  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 shadow-md">
      <h1 className="text-2xl font-bold">Notes</h1>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
        Logout
      </button>
    </div>
  );
}
