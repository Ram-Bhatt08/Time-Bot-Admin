import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem("adminToken");

  const API_BASE = "https://time-bot-backend-2.onrender.com/api/admin";

  // Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched admin:", res.data.admin); // Debug
        setProfile(res.data.admin);
        setFormData(res.data.admin);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  // Handle edit toggles
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("availability.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        availability: { ...formData.availability, [key]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Save updated profile
  const handleSave = async () => {
    try {
      const res = await axios.put(
        `${API_BASE}/profile`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setProfile(res.data.admin);
        setIsEditing(false);
        alert("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>No profile found</p>;

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {profile.name?.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="avatar-status status-active"></div>
        </div>
        <div className="profile-info">
          <h1>{profile.name}</h1>
          <p className="profile-role">{profile.role}</p>
          <p className="profile-email">{profile.email}</p>
        </div>
        <div className="profile-actions">
          {!isEditing ? (
            <button className="btn-edit" onClick={handleEdit}>
              ✏️ Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button className="btn-save" onClick={handleSave}>
                💾 Save
              </button>
              <button className="btn-cancel" onClick={handleCancel}>
                ❌ Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {/* Admin Information */}
        <div className="profile-card">
          <div className="card-header">
            <h3>📊 Admin Information</h3>
          </div>
          <div className="card-body">
            {isEditing ? (
              <div className="edit-form">
                {[
                  { label: "Full Name", name: "name", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Phone Number", name: "phone", type: "tel" },
                  { label: "Specialty", name: "specialty", type: "text" },
                  { label: "Description", name: "description", type: "textarea" },
                  { label: "Fee", name: "fee", type: "number" },
                  { label: "Experience", name: "experience", type: "text" },
                  { label: "Famous For", name: "famousFor", type: "text" },
                  { label: "Working Days", name: "availability.workingDays", type: "text", placeholder: "Mon–Fri" },
                  { label: "Working Hours", name: "availability.workingHours", type: "text", placeholder: "9:00 AM – 5:00 PM" },
                  { label: "Break Time", name: "availability.breakTime", type: "text", placeholder: "1:00 PM – 2:00 PM" },
                ].map((field, idx) => (
                  <div className="form-group" key={idx}>
                    <label>{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        value={field.name.includes("availability") ? formData.availability?.[field.name.split(".")[1]] || "" : formData[field.name] || ""}
                        onChange={handleChange}
                        className="form-input"
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={field.name.includes("availability") ? formData.availability?.[field.name.split(".")[1]] || "" : formData[field.name] || ""}
                        onChange={handleChange}
                        className="form-input"
                        placeholder={field.placeholder || ""}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="info-grid">
                {[
                  { label: "Full Name", value: profile.name },
                  { label: "Email Address", value: profile.email },
                  { label: "Phone Number", value: profile.phone },
                  { label: "Role", value: profile.role, badge: true },
                  { label: "Admin ID", value: profile.adminId },
                  { label: "Permissions", value: profile.permissions?.join(", ") },
                  { label: "Specialty", value: profile.specialty },
                  { label: "Description", value: profile.description },
                  { label: "Fee", value: profile.fee },
                  { label: "Experience", value: profile.experience },
                  { label: "Famous For", value: profile.famousFor },
                  { label: "Availability", value: `${profile.availability?.workingDays}, ${profile.availability?.workingHours}, Break: ${profile.availability?.breakTime}` },
                ].map((item, idx) => (
                  <div className="info-item" key={idx}>
                    <span className="info-label">{item.badge ? "🎯 " + item.label : item.label.includes("Availability") ? "🕒 " + item.label : "📌 " + item.label}</span>
                    <span className="info-value">{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <h4>Member Since</h4>
              <p>{profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A"}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔒</div>
            <div className="stat-content">
              <h4>Last Login</h4>
              <p>{profile.lastLogin || "N/A"}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h4>Status</h4>
              <p className="status-active">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
