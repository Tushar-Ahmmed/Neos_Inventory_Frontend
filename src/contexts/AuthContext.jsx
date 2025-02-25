import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

// Create Authentication Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);

  // Function to handle login
  const login = async (FormObj) => {
    try {
      const response = await axios.post("/api/login", FormObj, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      localStorage.setItem("jwt", data.token); // Store JWT in localStorage
      setToken(data.token); // Update context state
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("jwt"); // Remove token from localStorage
    setToken(null); // Clear context state
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
