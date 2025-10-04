// Nav.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const menuItems = [
    { path: "/admin/home", label: "Dashboard", icon: "🏠" },
    { path: "/admin/profile", label: "Profile", icon: "👤" },
    { path: "/admin/appointments", label: "Appointments", icon: "📅" },
    { path: "/admin/bot", label: "AI Bot", icon: "🤖" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setIsMobileMenuOpen(false);
  };

  const handleLogoutConfirm = () => {
    // Clear all user-related localStorage
    localStorage.removeItem("currentUser");
    localStorage.removeItem("adminToken"); // make sure this is the key your login uses

    // Redirect to login page
    navigate("/", { replace: true });

    setShowLogoutConfirm(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="nav">
        <div className="nav-brand">
          <h2>Appointment Scheduler</h2>
          {currentUser && (
            <span className="user-welcome">Welcome, {currentUser.name}</span>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`nav-link ${isActive(item.path) ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <button onClick={handleLogoutClick} className="nav-link logout-btn">
            <span className="nav-icon">🚪</span>
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="modal-overlay" onClick={handleLogoutCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Logout</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to logout?</p>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={handleLogoutCancel}>
                Cancel
              </button>
              <button className="btn-danger" onClick={handleLogoutConfirm}>
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
