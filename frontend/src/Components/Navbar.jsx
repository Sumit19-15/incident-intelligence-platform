import { useAuthStore } from "../stores/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, UserPlus, User, LogOut } from "lucide-react";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handelLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm sticky top-0 z-50">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition">
          <User className="text-white w-5 h-5" />
        </div>
        <h1 className="text-xl font-black text-blue-600 tracking-tight">
          Risk
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-6">
            {/* User Info */}
            <div className="hidden md:flex items-center gap-2 text-gray-700">
              <div className="bg-gray-100 p-2 rounded-full">
                <User size={18} className="text-gray-600" />
              </div>
              <span className="text-sm font-semibold italic">
                {user?.name?.split(" ")[0]}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handelLogout}
              className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition border border-red-100"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            {/* Login Link */}
            <Link
              to="/login"
              className="flex items-center gap-2 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition"
            >
              <LogIn size={18} />
              <span>Login</span>
            </Link>

            {/* Register Link */}
            <Link
              to="/register"
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-md shadow-blue-200"
            >
              <UserPlus size={18} />
              <span>Register</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
