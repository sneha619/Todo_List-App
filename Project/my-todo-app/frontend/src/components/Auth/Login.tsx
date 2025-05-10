import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      }, { withCredentials: true });
      localStorage.setItem("accessToken", response.data.accessToken);
      // Fetch todos immediately after successful login
      try {
        await axios.get("http://localhost:5000/todos", {
          headers: {
            Authorization: `Bearer ${response.data.accessToken}`,
          },
          withCredentials: true
        });
      } catch (error) {
        console.error("Error fetching todos after login:", error);
      }
      navigate("/todos");
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to login!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 transition-colors duration-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-dark-card rounded-lg shadow-md transition-colors duration-200">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white transition-colors duration-200">Welcome Back</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-1 transition-colors duration-200" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm border rounded w-full py-3 px-4 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring focus:ring-blue-400 transition-colors duration-200"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-1 transition-colors duration-200" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-sm border rounded w-full py-3 px-4 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring focus:ring-blue-400 transition-colors duration-200"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
            Don't have an account?{" "}
            <button onClick={() => navigate("/signup")} className="text-blue-500 hover:underline dark:text-blue-400 transition-colors duration-200">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;