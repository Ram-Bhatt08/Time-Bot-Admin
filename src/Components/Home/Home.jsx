
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);

  // ----- Constants -----
  const features = [
    {
      title: "Manage Clients",
      desc: "View, add, and organize client details with ease.",
      icon: "👥",
      color: "#4CAF50",
      action: () => navigate("/client"),
    },
    {
      title: "Track Schedule",
      desc: "Monitor and adjust upcoming appointments in one place.",
      icon: "📊",
      color: "#2196F3",
      action: () => navigate("/appointment"),
    },
    {
      title: "AI Assistant Help",
      desc: "Let the AI bot help you with reminders, follow-ups, and smart suggestions.",
      icon: "🤖",
      color: "#9C27B0",
      action: () => navigate("/bot"),
    },
  ];

  const stats = [
    { value: "1200+", label: "Appointments Managed" },
    { value: "95%", label: "Efficiency Boost" },
    { value: "24/7", label: "AI Support" },
  ];

  // ----- Auto-rotate features -----
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  // ----- Components -----
  const Hero = () => (
    <header className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          Welcome Admin 👋 <br />
          <span className="brand">Appointment Manager Dashboard</span>
        </h1>
        <p className="hero-desc">
          Manage clients, track schedules, and let AI make your work easier.
        </p>
        <div className="hero-actions">
          <button
            className="secondary-btn"
            onClick={() => navigate("/appointment")}
          >
            View Appointments
          </button>
          <button
            className="secondary-btn"
            onClick={() => navigate("/bot")}
          >
            Ask AI Assistant
          </button>
        </div>
      </div>

      <div className="hero-visual">
        <div
          className="ai-bot"
          role="button"
          tabIndex={0}
          onClick={() => navigate("/bot")}
          onKeyDown={(e) => e.key === "Enter" && navigate("/bot")}
        >
          <div className="bot-icon">🤖</div>
          <div className="bot-message">
            <p>Hi Admin! I can help you manage appointments 📅</p>
          </div>
        </div>
      </div>
    </header>
  );

  const Features = () => (
    <section className="features-section">
      <h2>Admin Tools at Your Fingertips</h2>
      <div className="features-container">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`feature-card ${index === currentFeature ? "active" : ""}`}
            style={{ "--accent-color": feature.color }}
            onMouseEnter={() => setCurrentFeature(index)}
          >
            <div className="feature-icon" style={{ backgroundColor: feature.color }}>
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
            <button className="btn-try" onClick={feature.action}>
              Go →
            </button>
          </div>
        ))}
      </div>
    </section>
  );

  const Stats = () => (
    <section className="stats-section">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-item">
          <h3>{stat.value}</h3>
          <p>{stat.label}</p>
        </div>
      ))}
    </section>
  );

  const CTA = () => (
    <section className="cta-section">
      <h2>Boost Your Productivity</h2>
      <p>AI-powered appointment management for admins</p>
      <button
        className="primary-btn large"
        onClick={() => navigate("/bot")}
      >
        Start Using AI Assistant
      </button>
    </section>
  );

  // ----- Main Return -----
  return (
    <>
      <main className="home-container">
        <Hero />
        <Features />
        <Stats />
        <CTA />
      </main>
    </>
  );
}

export default Home;

