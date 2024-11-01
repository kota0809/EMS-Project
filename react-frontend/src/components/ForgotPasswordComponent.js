// src/components/ForgotPasswordComponent.js
import React, { useState } from 'react';
import adminServiceComponent from '../services/AdminLogInLogOutService.js';

function ForgotPasswordComponent() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    try {
      const response = await adminServiceComponent.changePassword({
        userName: username,
        currentPassword: newPassword
      });
      
      if (response.data === "Password changed successfully") {
        setMessage("Password has been changed successfully. Please login again.");
      } else {
        setError("Error changing password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during password reset.");
      console.error(err);
    }
  };

  return (
    <div className="password-reset-container mt-5">
      <div className='row w-50'>
        <div className='card offset-md-6'>
      <h2 className='text-center'>Forgot Password</h2>
      <div className='card-body'>
      <form onSubmit={handleChangePassword}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3 offset-md-4">Change Password</button>
        {message && <p className="text-success">{message}</p>}
        {error && <p className="text-danger">{error}</p>}
      </form>
      </div>
      </div>
      </div>
    </div>
  );
}

export default ForgotPasswordComponent;
