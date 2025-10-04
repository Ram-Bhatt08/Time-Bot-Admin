import React, { useState, useEffect } from "react";
import "./My_appointment.css";

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_BASE = "https://time-bot-backend-2.onrender.com/api/appointments";

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const adminId = localStorage.getItem("adminId");
        if (!adminId) {
          setError("Admin ID not found. Please log in.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE}/byAdmin?adminId=${adminId}`);
        const data = await res.json();

        if (res.ok) {
          setAppointments(data.appointments || []);
        } else {
          setError(data.message || "Failed to fetch appointments");
        }
      } catch (err) {
        setError("Error fetching appointments: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "status-badge upcoming";
      case "completed":
        return "status-badge completed";
      case "cancelled":
        return "status-badge cancelled";
      case "rescheduled":
        return "status-badge rescheduled";
      default:
        return "status-badge pending";
    }
  };

  const formatDateTime = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : null;
    const date = start.toLocaleDateString();
    const time = end
      ? `${start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
      : start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return { date, time };
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      const res = await fetch(`${API_BASE}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId: id, reason: "Admin cancelled" }),
      });
      const data = await res.json();
      if (res.ok) {
        setAppointments(prev => prev.map(a => a._id === id ? { ...a, status: "Cancelled" } : a));
        closeModal();
      } else alert("Error cancelling appointment: " + data.message);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleReschedule = async (id) => {
    const newDate = prompt("Enter new date (YYYY-MM-DD):");
    const newTime = prompt("Enter new time (HH:MM, 24-hour format):");
    if (!newDate || !newTime) return;

    try {
      const res = await fetch(`${API_BASE}/reschedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId: id, date: newDate, time: newTime }),
      });
      const data = await res.json();
      if (res.ok) {
        setAppointments(prev =>
          prev.map(a => a._id === id ? { ...a, startTime: new Date(`${newDate}T${newTime}`), status: "Rescheduled" } : a)
        );
        closeModal();
      } else alert("Error rescheduling appointment: " + data.message);
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) return <p className="loading-text">Loading appointments...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="appointments-container">
      <h2>Admin Appointments</h2>

      {appointments.length === 0 ? (
        <p className="no-appointments">No appointments available.</p>
      ) : (
        <div className="appointments-grid">
          {appointments.map((apt) => {
            const { date, time } = formatDateTime(apt.startTime, apt.endTime);
            return (
              <div key={apt._id} className="appointment-card">
                <div className="card-header">
                  <span className={getStatusClass(apt.status)}>{apt.status}</span>
                  <h3>{apt.user.name}</h3>
                  <p className="client-id">ID: {apt.user.clientId}</p>
                  <p className="appointment-id">Appointment ID: {apt.appointmentId || apt._id}</p>
                </div>
                <div className="card-body">
                  <p><strong>Email:</strong> {apt.user.email}</p>
                  <p><strong>Phone:</strong> {apt.user.phone}</p>
                  <p><strong>Date:</strong> {date}</p>
                  <p><strong>Time:</strong> {time}</p>
                  <p><strong>Purpose:</strong> {apt.purpose}</p>
                  <p><strong>Payment ID:</strong> {apt.paymentId || "-"}</p>
                </div>
                <div className="card-actions">
                  {apt.status.toLowerCase() !== "cancelled" && (
                    <>
                      <button className="btn-cancel" onClick={() => handleCancel(apt._id)}>Cancel</button>
                      <button className="btn-reschedule" onClick={() => handleReschedule(apt._id)}>Reschedule</button>
                    </>
                  )}
                  <button className="btn-view" onClick={() => openModal(apt)}>View</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && selectedAppointment && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Appointment Details</h3>
            <div className="modal-body">
              {Object.entries(selectedAppointment.user).map(([key, value]) => (
                <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</p>
              ))}
              <p><strong>Appointment ID:</strong> {selectedAppointment.appointmentId || selectedAppointment._id}</p>
              <p><strong>Date:</strong> {formatDateTime(selectedAppointment.startTime, selectedAppointment.endTime).date}</p>
              <p><strong>Time:</strong> {formatDateTime(selectedAppointment.startTime, selectedAppointment.endTime).time}</p>
              <p><strong>Status:</strong> {selectedAppointment.status}</p>
              <p><strong>Purpose:</strong> {selectedAppointment.purpose}</p>
              <p><strong>Payment ID:</strong> {selectedAppointment.paymentId || "-"}</p>
            </div>
            <div className="modal-actions">
              {selectedAppointment.status.toLowerCase() !== "cancelled" && (
                <>
                  <button className="btn-cancel" onClick={() => handleCancel(selectedAppointment._id)}>Cancel</button>
                  <button className="btn-reschedule" onClick={() => handleReschedule(selectedAppointment._id)}>Reschedule</button>
                </>
              )}
              <button className="btn-close" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointment;
