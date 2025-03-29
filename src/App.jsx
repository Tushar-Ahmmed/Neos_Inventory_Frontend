import React from 'react';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import DashBoardPage from './pages/DashBoardPage';
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {
  return (
    <AuthProvider>
       <BrowserRouter>
          <Routes>
              <Route path='/' element={<LoginPage/>} />
              <Route path='/dashboard' element={
                <ProtectedRoute>
                  <DashBoardPage/>
                </ProtectedRoute>
                } />
          </Routes>
       </BrowserRouter>
    </AuthProvider>
  );
};

export default App;