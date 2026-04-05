import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { Link } from "react-router-dom"; // 1. Added Link import

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { register, isRegisterLoading } = useAuthStore();

  const handelSubmit = (event) => {
    event.preventDefault();
    register(formData);
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
        <h2 className="text-xl font-semibold mb-4">Create Account</h2>{" "}
        {/* Fixed heading */}
        <form onSubmit={handelSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label
              className="block text-md font-medium text-gray-700"
              htmlFor="regInput-name"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              id="regInput-name"
              value={formData.name}
              onChange={handelInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              className="block text-md font-medium text-gray-700"
              htmlFor="regInput-email"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              name="email"
              id="regInput-email"
              value={formData.email}
              onChange={handelInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              className="block text-md font-medium text-gray-700"
              htmlFor="regInput-password"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="regInput-password"
              value={formData.password}
              onChange={handelInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={isRegisterLoading}
              className="w-full bg-blue-600 text-white text-xl py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRegisterLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline transition"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
