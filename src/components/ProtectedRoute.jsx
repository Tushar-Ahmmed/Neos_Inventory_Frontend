
import { Navigate } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'
import { isTokenExpired } from './../utilities/TokenUtility';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()
  
  return (token && !isTokenExpired()) ? children : <Navigate to="/" />
};

export default ProtectedRoute