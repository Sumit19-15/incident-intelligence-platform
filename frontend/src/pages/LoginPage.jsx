import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { Link } from "react-router-dom"; 

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoginLoading } = useAuthStore();

  const handelSubmit = (event) => {
    event.preventDefault();
    login(formData);
  };

  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handelSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              className="block text-md font-medium text-gray-700"
              htmlFor="loginInput-email"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              name="email"
              id="loginInput-email"
              value={formData.email}
              onChange={handelInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              className="block text-md font-medium text-gray-700"
              htmlFor="loginInput-password"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="loginInput-password"
              value={formData.password}
              onChange={handelInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={isLoginLoading}
              className="w-full bg-blue-600 text-white text-xl py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoginLoading ? "Logging in..." : "Log In"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline transition"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
