import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const storedData = JSON.parse(localStorage.getItem("users")) || [];
      const user = storedData.find(
        (user) => user.email === formData.email && user.password === formData.password
      );

      if (user) {
        alert(`Welcome back, ${user.name}!`);
        navigate("/home"); 
      } else {
        alert("Invalid email or password!");
      }
      setLoading(false);
    }, 2000);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (formData.name && formData.email && formData.password) {
        const storedData = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = storedData.some((user) => user.email === formData.email);

        if (!userExists) {
          localStorage.setItem(
            "users",
            JSON.stringify([...storedData, { ...formData }])
          );
          alert("Signup successful! You can now log in.");
          setIsLogin(true);
        } else {
          alert("User already exists with this email!");
        }
      } else {
        alert("Please fill all the fields correctly!");
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 transition-all duration-500 transform hover:scale-105">
        <div className="flex justify-center mb-6">
          <button
            className={`text-lg font-semibold px-6 py-2 rounded-full transition-all duration-500 ease-in-out ${
              isLogin
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`text-lg font-semibold px-6 py-2 rounded-full transition-all duration-500 ease-in-out ${
              !isLogin
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        <div className="relative transition-all duration-500 ease-in-out">
          {isLogin && (
            <form onSubmit={handleLogin}>
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Welcome Back!
              </h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-bold transition-all duration-300 ${
                  loading && "opacity-50 cursor-not-allowed"
                }`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          )}

          {/* Signup Form */}
          {!isLogin && (
            <form onSubmit={handleSignup}>
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Create an Account
              </h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Create a password"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-bold transition-all duration-300 ${
                  loading && "opacity-50 cursor-not-allowed"
                }`}
                disabled={loading}
              >
                {loading ? "Signing up..." : "Signup"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
