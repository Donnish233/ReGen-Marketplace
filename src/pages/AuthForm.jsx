import { useState } from "react";

export default function AuthForm({ onSuccess }) {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirm) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Auth success:", formData);
    // 👇 Trigger success callback when form is valid
    onSuccess?.(formData);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 py-10">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-lg overflow-hidden w-full max-w-5xl">
        {/* Left side – form */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {isLogin ? "Welcome Back" : "Join the Circular Revolution"}
          </h1>
          {!isLogin && (
            <p className="text-green-600 mb-8 text-sm md:text-base">
              Track sustainability, verify authenticity, and earn GreenPoints
              for every eco-action.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm"
                    placeholder="Confirm your password"
                    value={formData.confirm}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                    required
                  />
                </div>
              )}
            </div>

            {!isLogin && (
              <div className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="h-4 w-4 mt-1"
                />
                <label htmlFor="terms" className="text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-green-600 font-medium">
                    Terms & Privacy Policy
                  </a>
                  .
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              {isLogin ? "Log In" : "Create Account"}
            </button>

            <p className="text-sm text-center text-gray-700 mt-3">
              {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-green-600 font-medium"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </form>
        </div>

        {/* Right side – image */}
        <div className="hidden md:flex md:w-1/2 bg-green-500 justify-center items-center p-8">
          <div className="bg-white rounded-3xl p-4 max-w-xs">
            <img
              src="/images/signup.jpg"
              alt="QR and plant"
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
