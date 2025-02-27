import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

// Create Authentication Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("TOKEN") || null);
  const [trigger, serTrigger] = useState(false)

  // Function to handle login
  const login = async (FormObj) => {
    try {
      const response = await axios.post("/api/login", FormObj, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === "error") alert(response.data.message);

      else{
        localStorage.setItem("TOKEN", response.data.token) // Store JWT in localStorage
        setToken(response.data.token)
        return true
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("TOKEN"); // Remove token from localStorage
    setToken(null); // Clear context state
  };

  return (
    <AuthContext.Provider value={{ token, login, logout,trigger }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
