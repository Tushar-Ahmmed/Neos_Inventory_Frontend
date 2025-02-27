import React from 'react';
import LoginPage from './pages/loginPage';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import DashBoardPage from './pages/DashBoardPage';


const App = () => {
  return (
    <AuthProvider>
       <BrowserRouter>
          <Routes>
              <Route path='/' element={<LoginPage/>} />
              <Route path='/dashboard' element={<DashBoardPage/>} />
          </Routes>
       </BrowserRouter>
    </AuthProvider>
  );
};

export default App;