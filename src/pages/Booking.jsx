import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Booking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    doctorName: "",
    specialty: "",
    date: "",
    time: "",
    reason: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const pts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 4 + 2,
    }));
    setParticles(pts);
  }, []);

  const doctors = [
    {
      name: "Dr. Rahul Sharma",
      specialty: "Cardiologist",
      fee: "₹500",
      emoji: "❤️",
    },
    {
      name: "Dr. Priya Singh",
      specialty: "Dermatologist",
      fee: "₹400",
      emoji: "✨",
    },
    {
      name: "Dr. Amit Verma",
      specialty: "Orthopedic",
      fee: "₹600",
      emoji: "🦴",
    },
    {
      name: "Dr. Sunita Gupta",
      specialty: "Gynecologist",
      fee: "₹450",
      emoji: "🌸",
    },
    {
      name: "Dr. Vikram Yadav",
      specialty: "Neurologist",
      fee: "₹700",
      emoji: "🧠",
    },
    {
      name: "Dr. Neha Mishra",
      specialty: "Pediatrician",
      fee: "₹350",
      emoji: "👶",
    },
  ];

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectDoctor = (doc) => {
    setFormData({
      ...formData,
      doctorName: doc.name,
      specialty: doc.specialty,
    });
    setStep(2);
  };

  const selectTime = (time) => {
    setFormData({ ...formData, time });
  };

  const handleSubmit = async () => {
    if (
      !formData.patientName ||
      !formData.patientEmail ||
      !formData.date ||
      !formData.time
    ) {
      setMessage("⚠️ Please fill all fields!");
      return;
    }
    setLoading(true);
    try {
      // ✅ FIXED: Railway backend URL (localhost:5000 se replace kiya)
      await axios.post(
        "https://medibook-production-f211.up.railway.app/api/appointments",
        formData,
      );
      setLoading(false);
      setBooked(true);
    } catch (error) {
      setLoading(false);
      setMessage("❌ Error! Please try again.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "1px solid rgba(0,200,255,0.2)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        background:
          "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%)",
        minHeight: "100vh",
        padding: "40px 20px",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "fixed",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: "rgba(0,200,255,0.4)",
            boxShadow: `0 0 ${p.size * 3}px rgba(0,200,255,0.6)`,
            animation: `float ${p.speed}s ease-in-out infinite alternate`,
            zIndex: 0,
          }}
        />
      ))}

      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(0,200,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "45px",
              fontWeight: "900",
              background: "linear-gradient(135deg, #ffffff, #00c8ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: "0 0 8px",
            }}
          >
            📅 Book Appointment
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>
            3 Simple Steps — Done in Seconds!
          </p>
        </div>

        {!booked && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0",
              marginBottom: "40px",
            }}
          >
            {[
              { num: 1, label: "Choose Doctor" },
              { num: 2, label: "Pick Date" },
              { num: 3, label: "Your Details" },
            ].map((s, i) => (
              <React.Fragment key={s.num}>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      background:
                        step >= s.num
                          ? "linear-gradient(135deg, #00c8ff, #0080ff)"
                          : "rgba(255,255,255,0.05)",
                      border:
                        step >= s.num
                          ? "none"
                          : "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                      margin: "0 auto 8px",
                      boxShadow:
                        step >= s.num ? "0 0 20px rgba(0,200,255,0.4)" : "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {step > s.num ? "✓" : s.num}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color:
                        step >= s.num ? "#00c8ff" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
                {i < 2 && (
                  <div
                    style={{
                      width: "80px",
                      height: "2px",
                      background:
                        step > s.num
                          ? "linear-gradient(90deg, #00c8ff, #0080ff)"
                          : "rgba(255,255,255,0.1)",
                      margin: "0 5px 25px",
                      transition: "all 0.3s ease",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* STEP 1 */}
        {!booked && step === 1 && (
          <div>
            <h2
              style={{
                textAlign: "center",
                color: "rgba(255,255,255,0.7)",
                marginBottom: "25px",
                fontSize: "20px",
              }}
            >
              👨‍⚕️ Select Your Doctor
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
                justifyContent: "center",
              }}
            >
              {doctors.map((doc, i) => (
                <div
                  key={i}
                  onClick={() => selectDoctor(doc)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,200,255,0.5)";
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 15px 30px rgba(0,200,255,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "20px",
                    padding: "20px",
                    width: "190px",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                    {doc.emoji}
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      marginBottom: "5px",
                    }}
                  >
                    {doc.name}
                  </div>
                  <div
                    style={{
                      color: "#00c8ff",
                      fontSize: "13px",
                      marginBottom: "8px",
                    }}
                  >
                    {doc.specialty}
                  </div>
                  <div
                    style={{
                      background: "rgba(0,255,136,0.1)",
                      border: "1px solid rgba(0,255,136,0.2)",
                      borderRadius: "20px",
                      padding: "4px 12px",
                      color: "#00ff88",
                      fontSize: "13px",
                      fontWeight: "bold",
                      display: "inline-block",
                    }}
                  >
                    {doc.fee}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {!booked && step === 2 && (
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(0,200,255,0.2)",
              borderRadius: "24px",
              padding: "35px",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                background: "rgba(0,200,255,0.05)",
                border: "1px solid rgba(0,200,255,0.15)",
                borderRadius: "15px",
                padding: "15px 20px",
                marginBottom: "25px",
              }}
            >
              <div style={{ fontSize: "30px" }}>
                {doctors.find((d) => d.name === formData.doctorName)?.emoji}
              </div>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {formData.doctorName}
                </div>
                <div style={{ color: "#00c8ff", fontSize: "13px" }}>
                  {formData.specialty}
                </div>
              </div>
              <button
                onClick={() => setStep(1)}
                style={{
                  marginLeft: "auto",
                  background: "transparent",
                  color: "rgba(255,255,255,0.4)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "20px",
                  padding: "5px 12px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Change
              </button>
            </div>

            <label
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "13px",
                display: "block",
                marginBottom: "8px",
              }}
            >
              📆 Select Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              style={{ ...inputStyle, marginBottom: "25px" }}
            />

            <label
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "13px",
                display: "block",
                marginBottom: "12px",
              }}
            >
              ⏰ Select Time Slot
            </label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "25px",
              }}
            >
              {timeSlots.map((time, i) => (
                <button
                  key={i}
                  onClick={() => selectTime(time)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    border: "1px solid rgba(0,200,255,0.2)",
                    background:
                      formData.time === time
                        ? "linear-gradient(135deg, #00c8ff, #0080ff)"
                        : "rgba(255,255,255,0.05)",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: formData.time === time ? "bold" : "normal",
                    transition: "all 0.3s ease",
                  }}
                >
                  {time}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                if (!formData.date || !formData.time) {
                  setMessage("⚠️ Please select date and time!");
                  return;
                }
                setMessage("");
                setStep(3);
              }}
              style={{
                background: "linear-gradient(135deg, #00c8ff, #0080ff)",
                color: "white",
                padding: "15px",
                border: "none",
                borderRadius: "50px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                width: "100%",
                boxShadow: "0 10px 25px rgba(0,200,255,0.2)",
              }}
            >
              Continue →
            </button>
            {message && (
              <p
                style={{
                  color: "#ffcc00",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                {message}
              </p>
            )}
          </div>
        )}

        {/* STEP 3 */}
        {!booked && step === 3 && (
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(0,200,255,0.2)",
              borderRadius: "24px",
              padding: "35px",
              backdropFilter: "blur(10px)",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                marginBottom: "25px",
                fontSize: "20px",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              👤 Your Details
            </h2>

            <input
              type="text"
              name="patientName"
              placeholder="👤  Full Name"
              value={formData.patientName}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="email"
              name="patientEmail"
              placeholder="📧  Email Address"
              value={formData.patientEmail}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="tel"
              name="patientPhone"
              placeholder="📱  Phone Number"
              value={formData.patientPhone}
              onChange={handleChange}
              style={inputStyle}
            />
            <textarea
              name="reason"
              placeholder="💬  Reason for visit (optional)"
              value={formData.reason}
              onChange={handleChange}
              rows={3}
              style={{ ...inputStyle, resize: "none" }}
            />

            <div
              style={{
                background: "rgba(0,200,255,0.05)",
                border: "1px solid rgba(0,200,255,0.15)",
                borderRadius: "15px",
                padding: "20px",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              <div
                style={{
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "12px",
                  fontSize: "12px",
                  letterSpacing: "2px",
                }}
              >
                APPOINTMENT SUMMARY
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.4)" }}>Doctor</span>
                <span style={{ color: "white", fontWeight: "bold" }}>
                  {formData.doctorName}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.4)" }}>Date</span>
                <span style={{ color: "white", fontWeight: "bold" }}>
                  {formData.date}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>Time</span>
                <span style={{ color: "#00c8ff", fontWeight: "bold" }}>
                  {formData.time}
                </span>
              </div>
            </div>

            {message && (
              <p
                style={{
                  color: "#ffcc00",
                  textAlign: "center",
                  marginBottom: "15px",
                }}
              >
                {message}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                background: loading
                  ? "rgba(255,255,255,0.1)"
                  : "linear-gradient(135deg, #7b2ff7, #f107a3)",
                color: "white",
                padding: "16px",
                border: "none",
                borderRadius: "50px",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                width: "100%",
                boxShadow: loading
                  ? "none"
                  : "0 10px 30px rgba(123,47,247,0.3)",
                transition: "all 0.3s ease",
              }}
            >
              {loading ? "⏳ Booking..." : "🚀 Confirm Appointment"}
            </button>

            <button
              onClick={() => setStep(2)}
              style={{
                background: "transparent",
                color: "rgba(255,255,255,0.3)",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                width: "100%",
                marginTop: "12px",
                padding: "8px",
              }}
            >
              ← Go Back
            </button>
          </div>
        )}

        {/* SUCCESS */}
        {booked && (
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(0,255,136,0.3)",
              borderRadius: "30px",
              padding: "60px 40px",
              backdropFilter: "blur(20px)",
              textAlign: "center",
              boxShadow: "0 30px 60px rgba(0,255,136,0.1)",
            }}
          >
            <div
              style={{
                fontSize: "80px",
                marginBottom: "20px",
                animation: "bounce 1s ease infinite alternate",
              }}
            >
              🎉
            </div>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "900",
                background: "linear-gradient(135deg, #00ff88, #00c8ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "10px",
              }}
            >
              Booking Confirmed!
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                marginBottom: "30px",
                fontSize: "16px",
              }}
            >
              Your appointment with{" "}
              <strong style={{ color: "white" }}>{formData.doctorName}</strong>{" "}
              is confirmed for{" "}
              <strong style={{ color: "#00c8ff" }}>{formData.date}</strong> at{" "}
              <strong style={{ color: "#00c8ff" }}>{formData.time}</strong>
            </p>
            <div
              style={{
                background: "rgba(0,255,136,0.05)",
                border: "1px solid rgba(0,255,136,0.15)",
                borderRadius: "15px",
                padding: "20px",
                marginBottom: "30px",
                fontSize: "14px",
              }}
            >
              <div style={{ color: "#00ff88", marginBottom: "5px" }}>
                ✅ Confirmation sent to
              </div>
              <div style={{ color: "white", fontWeight: "bold" }}>
                {formData.patientEmail}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "15px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => {
                  setBooked(false);
                  setStep(1);
                  setFormData({
                    patientName: "",
                    patientEmail: "",
                    patientPhone: "",
                    doctorName: "",
                    specialty: "",
                    date: "",
                    time: "",
                    reason: "",
                  });
                  setMessage("");
                }}
                style={{
                  background: "linear-gradient(135deg, #00c8ff, #0080ff)",
                  color: "white",
                  padding: "14px 30px",
                  border: "none",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Book Another 📅
              </button>
              <button
                onClick={() => navigate("/")}
                style={{
                  background: "transparent",
                  color: "rgba(255,255,255,0.5)",
                  padding: "14px 30px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                Go Home 🏠
              </button>
            </div>
          </div>
        )}

        {!booked && (
          <div style={{ textAlign: "center", marginTop: "25px" }}>
            <button
              onClick={() => navigate("/")}
              style={{
                background: "transparent",
                color: "rgba(255,255,255,0.3)",
                padding: "10px 25px",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "50px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              ← Back to Home
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float { 0% { transform: translateY(0px); } 100% { transform: translateY(-20px); } }
        @keyframes bounce { 0% { transform: scale(1); } 100% { transform: scale(1.1); } }
        input::placeholder { color: rgba(255,255,255,0.3); }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); }
      `}</style>
    </div>
  );
}

export default Booking;
g;
