import './App.css';
//import ListEmployeeComponent from './components/ListEmployeeComponent';
import ListEmployeeWrapper from './components/ListEmployeeWrapper';
import { BrowserRouter as Router,Route,Routes,Navigate } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import AdminLoginComponent from './components/AdminLoginComponent';  // Import Admin Login Component
import ForgotPasswordComponent from './components/ForgotPasswordComponent'; // Import Forgot Password Component
import React, { useState } from 'react';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Track authentication status
  const [adminName, setAdminName] = useState("");



  return (
    <div>
      	
        <Router>
        <HeaderComponent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} adminName={adminName}/>
      	<div className="container">

        <Routes>
            <Route path="/" element={<Navigate to={isAuthenticated ? "/employees" : "/login"} />} />
            <Route path="/login" element={<AdminLoginComponent setIsAuthenticated={setIsAuthenticated} setAdminName={setAdminName}/>} />
            <Route path="/forgot-password" element={<ForgotPasswordComponent />} />

            {/* Protect the employee management routes */}
            {isAuthenticated && (
              <>
              <Route path="/employees" element={<ListEmployeeWrapper/>}></Route>
              <Route path="/add-employee" element={<CreateEmployeeComponent/>}></Route>
              <Route path="/update-employee/:id" element={<UpdateEmployeeComponent/>}></Route>
              </>
            )}
          </Routes>	
      	</div>
        <FooterComponent/>
        </Router>
    	</div>
  );
}

export default App;