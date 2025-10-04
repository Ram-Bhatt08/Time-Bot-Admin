import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE = "https://time-bot-backend-2.onrender.com/api/admin";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!isLogin) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm your password";
      else if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        const res = await axios.post(`${API_BASE}/login`, {
          email: formData.email,
          password: formData.password,
        });

        if (res.data.success) {
          const admin = res.data.admin;

          // Store important admin info
          localStorage.setItem("currentUser", JSON.stringify(admin));
          localStorage.setItem("adminToken", res.data.token);
          localStorage.setItem("adminId", admin.adminId || admin._id);

          showNotification("Login successful!", "success");
          setTimeout(() => navigate("/admin/home"), 1500);
        } else {
          showNotification(res.data.message || "Login failed", "error");
        }
      } else {
        const res = await axios.post(`${API_BASE}/register`, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        });

        if (res.data.success) {
          const admin = res.data.admin;

          localStorage.setItem("currentUser", JSON.stringify(admin));
          localStorage.setItem("adminToken", res.data.token);
          localStorage.setItem("adminId", admin.adminId || admin._id);

          showNotification("Registration successful!", "success");
          setTimeout(() => navigate("/admin/home"), 1500);
        } else {
          showNotification(res.data.message || "Signup failed", "error");
        }
      }
    } catch (err) {
      showNotification(err.response?.data?.message || "Server error", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setNotification({ message: "", type: "" });
    setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="login-container">
      {notification.message && (
        <div className={`notification ${notification.type}`}>{notification.message}</div>
      )}

      <div className="auth-card">
        <h2>{isLogin ? "Admin Login" : "Create Admin Account"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "error" : ""}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && (
                <span className="error-text">{errors.confirmPassword}</span>
              )}
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="switch-mode">
          <p>
            {isLogin ? "Don’t have an account? " : "Already have an account? "}
            <button type="button" onClick={switchMode} className="switch-btn">
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
