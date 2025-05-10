import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Auth/Signup.tsx";
import Login from "./components/Auth/Login.tsx";
import TodoList from "./components/Todos/TodoList.tsx";
import ThemeToggle from "./components/ThemeToggle.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import axios from "axios";

const ProtectedRoute = ({ children }: { children }) => {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/" replace />;
};

const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) fetchTodos();
  }, []);

  // Add event listener for page refresh/load to ensure todos are fetched
  useEffect(() => {
    window.addEventListener('load', () => {
      const token = localStorage.getItem("accessToken");
      if (token) fetchTodos();
    });
    return () => {
      window.removeEventListener('load', () => {});
    };
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<Login />} />
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
