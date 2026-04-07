import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, User, UserPlus, ArrowRight } from "lucide-react";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { register, isRegisterLoading } = useAuthStore();

  const navigate = useNavigate();
  const location = useLocation();

  const handelSubmit = async (event) => {
    event.preventDefault();
    const success = await register(formData);

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
        <div className="text-center mb-8">
          <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="text-blue-600 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">
            Join City Guard to report incidents
          </p>
        </div>

        <form onSubmit={handelSubmit} className="space-y-5">
          {/* 4. Name Input with Icon Adornment */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1.5"
              htmlFor="regInput-name"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                id="regInput-name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handelInputChange}
                className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50/50"
                required
              />
            </div>
          </div>

          {/* 5. Email Input with Icon Adornment */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1.5"
              htmlFor="regInput-email"
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
                id="regInput-email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handelInputChange}
                className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50/50"
                required
              />
            </div>
          </div>

          {/* 6. Password Input with Icon Adornment */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1.5"
              htmlFor="regInput-password"
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
                id="regInput-password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handelInputChange}
                className="w-full border border-gray-300 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50/50"
                required
              />
            </div>
          </div>

          {/* 7. Enhanced Button styling with Icons and Loading State */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isRegisterLoading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
            >
              {isRegisterLoading ? (
                // Spinner
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* 8. Modernized Link Section */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              state={{ from: location.state?.from }}
              className="text-blue-600 font-bold hover:text-blue-700 transition"
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
