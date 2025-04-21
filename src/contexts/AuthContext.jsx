import axios from "axios"
import { createContext, useState, useContext } from "react"



// Create Authentication Context
const AuthContext = createContext()

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authTokenExpiration') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [optionRender, setOptionRender] = useState()
  const [isScrolledUnder, setIsScrolledUnder] = useState(false);


  // Function to handle login
  const login = async (FormObj) => {
    try {
      const response = await axios.post("/api/login", FormObj, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === "error"){
        alert(response.data.message)
        return false
      }

      else{
        localStorage.setItem("TOKEN", response.data.token) // Store JWT in localStorage
        const expirationTime = Date.now() + 4 * 60 * 60 * 1000 //4 hours in ms
        // const expirationTime = Date.now() +  1 * 60 * 1000 //1 minutes in ms
        localStorage.setItem('authTokenExpiration', expirationTime.toString())
        setToken(response.data.token)
        setIsAuthenticated(true)
        return true
      }
      
    } catch (error) {
      console.error("Login error:", error)
    }
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("TOKEN") // Remove token from localStorage
    localStorage.removeItem("authTokenExpiration") // Remove authTokenExpiration from localStorage
    setToken(null) // Clear context state
    setIsAuthenticated(false)
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, setOptionRender, optionRender, setIsScrolledUnder, isScrolledUnder }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext)
