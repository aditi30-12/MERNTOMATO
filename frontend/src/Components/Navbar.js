import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  // Get the auth token from localStorage to check if the user is logged in
  const authToken = localStorage.getItem('authToken');

  // Decode the token to extract user data (if it exists)
  const user = authToken ? JSON.parse(atob(authToken.split('.')[1])) : null;

  // Use navigate hook to programmatically redirect after logout
  const navigate = useNavigate();

  // Logout function to clear token and redirect to home
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    navigate('/'); // Redirect to Home page after logout
  };

  // Navigate to the Cart page
  const goToCart = () => {
    navigate('/cart'); // Redirect to Cart page
  };

  return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container-fluid">
            <Link className="navbar-brand fs-1 fs-italic" to="/">Tomato</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">Home</Link>
                </li>
                {authToken ? (
                    <>
                      {/* Cart Button */}
                      <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={goToCart}>Cart</button>
                      </li>
                      <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                      </li>
                    </>
                ) : (
                    <>
                      {/* Show login and signup links if user is not logged in */}
                      <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/signup">Signup</Link>
                      </li>
                    </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
  );
}
