// src/components/AdminLoginComponent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminServiceComponent from '../services/AdminLogInLogOutService.js';
import {Eye, EyeOff} from 'lucide-react';

function AdminLoginComponent({ setIsAuthenticated , setAdminName}) {
  const [username, setUsername] = useState("");

 const [password, setPassword] = useState("");
   
  const [error, setError] = useState(null);

  //const [adminName, setAdminName] = useState(""); // Define in parent component

  const navigate = useNavigate();

  // handlig the Eye  for visible or invisible on clicking on Eye
  const [showPassword,setShowPassword]=useState(true);
    const handleClick =()=>{
      setShowPassword(!showPassword)
    }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await adminServiceComponent.login({ userName: username, currentPassword: password });
      if (response.data.status === "success") {
        setIsAuthenticated(true);
        setAdminName(response.data.adminName);//set admin's name
        navigate("/employees",{state: {message:`Welcome, ${response.data.adminName}!` }});  // Redirect to employee management page on successful login

      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during login.");
      console.error(err);
    }

    
  };

  return (
    <div className="container mt-5">
      <div className="row w-50">
      
      <div className="card offset-md-6">
      <h2 className="text-center">Admin Login</h2>
      <div className="card-body">
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group position-relative">
          <label>Password:</label>
          <input
            type={showPassword ? 'password':'text'}
            className="form-control"
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className='cursor-pointer ' style={{position: 'absolute', right:'10px', top:'50%', }}>{showPassword ? <Eye onClick={handleClick}/>:<EyeOff onClick={handleClick} />}</div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Login</button>
        <a href="/forgot-password" className="btn btn-link mt-3 float-end">Forgot Password?</a>

        {error && <p className="text-danger">{error}</p>}
      </form>
      </div>
      </div>
    </div>
    </div>
  );
}

export default AdminLoginComponent;
