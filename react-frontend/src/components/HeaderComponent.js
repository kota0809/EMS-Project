import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react'; // Import the user icon from lucide-react
import "../HeaderComponentStyle.css"

function HeaderComponent({ isAuthenticated, setIsAuthenticated, adminName}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Toggle dropdown menu
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false); // Update authentication status
    navigate('/login'); // Redirect to login page
  };

  return (
	<>
    <header>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container'>
          <a href="/" className='navbar-brand'>Employee Management Application</a>
          <div className="d-flex align-items-center">
            {isAuthenticated ? (
              // If authenticated, show user icon with dropdown menu
              <div className="position-relative">
                <User
                  size={24}
                  className="text-light cursor-pointer"
                  onClick={handleDropdownToggle}
                />
                {showDropdown && (
                  <div className="dropdown-menu dropdown-menu-right" style={{ display: 'block', position: 'absolute', right: 0, top: '100%', marginTop: '5px' }}>
                    <span className="dropdown-item-text">{adminName}</span>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // If not authenticated, show Admin Login option
              <a href="/login" className="btn btn-outline-light ml-2">Admin Login</a>
            )}
          </div>
        </div>
      </nav>
    </header>
	</>
  );
}

export default HeaderComponent;
