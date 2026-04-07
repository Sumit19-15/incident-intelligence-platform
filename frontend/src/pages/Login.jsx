import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoginLoading } = useAuthStore();

  const navigate = useNavigate();
  const location = useLocation();

  const handelSubmit = async (event) => {
    event.preventDefault();
    const success = await login(formData);

    if (success) {
      const origin = location.state?.from?.pathname || "/";
      navigate(origin, { replace: true });
    }
  };

  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        {/* Header with Icon */}
        <div className="text-center mb-8">
          <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-blue-600 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">
            Please enter your details
          </p>
        </div>

        <form onSubmit={handelSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1.5"
              htmlFor="loginInput-email"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                id="loginInput-email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handelInputChange}
                className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50/50"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1.5"
              htmlFor="loginInput-password"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                id="loginInput-password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handelInputChange}
                className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50/50"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoginLoading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
            >
              {isLoginLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              state={{ from: location.state?.from }}
              className="text-blue-600 font-bold hover:text-blue-700 transition"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
