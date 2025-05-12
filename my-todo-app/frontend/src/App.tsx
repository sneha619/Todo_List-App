import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Auth/Signup.tsx";
import Login from "./components/Auth/Login.tsx";
import TodoList from "./components/Todos/TodoList.tsx";
import ThemeToggle from "./components/ThemeToggle.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://todo-backend-8occ.onrender.com' 
  : 'http://localhost:5000';

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        
        const response = await axios.post(`${API_URL}/auth/refresh`, {}, {
          withCredentials: true
        });
      
        if (response.data.accessToken) {
          localStorage.setItem("accessToken", response.data.accessToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("accessToken");
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);


const ProtectedRoute = ({ children }: { children }) => {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/" replace />;
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token){
        setIsAuthenticated(false);
         return;
        }

      const response = await axios.get(`${API_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      });
      setTodos(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching todos:", error);
      if (error.response?.status === 403) {
        setIsAuthenticated(false);
      }
    }
  };

 
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
    if (token) fetchTodos();
  }, []);

  useEffect(() => {
    window.addEventListener('load', () => {
      const token = localStorage.getItem("accessToken");
      if (token) fetchTodos();
    });
    return () => {
      window.removeEventListener('load', () => {});
    };
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  return (
    <ThemeProvider>
      <Router>
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <TodoList todos={todos} fetchTodos={fetchTodos} />
              </ProtectedRoute>
            }
          /> 
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
