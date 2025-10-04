import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import Appointment from "./Components/My_appointment/My_appointment";
import Bot from "./Components/Bot/Bot";
import Nav from "./Components/Nav/Nav";

// Protected route wrapper for admin pages
function ProtectedRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return currentUser ? children : <Navigate to="/" replace />;
}

// Admin layout with navbar and nested routes
function AdminLayout() {
  return (
    <div className="admin-layout">
      <Nav />
      <main className="main-content">
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="appointments" element={<Appointment />} />
          <Route path="bot" element={<Bot />} />
          {/* Default fallback */}
          <Route path="*" element={<Navigate to="home" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Always open login at root */}
        <Route path="/" element={<Login />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route → always back to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
