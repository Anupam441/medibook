import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Doctors() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const doctors = [
    {
      id: 1,
      name: "Dr. Rahul Sharma",
      specialty: "Cardiologist",
      location: "Kanpur",
      rating: 5,
      fee: "₹500",
      exp: "12 Years",
      emoji: "❤️",
    },
    {
      id: 2,
      name: "Dr. Priya Singh",
      specialty: "Dermatologist",
      location: "Kanpur",
      rating: 4,
      fee: "₹400",
      exp: "8 Years",
      emoji: "✨",
    },
    {
      id: 3,
      name: "Dr. Amit Verma",
      specialty: "Orthopedic",
      location: "Kanpur",
      rating: 5,
      fee: "₹600",
      exp: "15 Years",
      emoji: "🦴",
    },
    {
      id: 4,
      name: "Dr. Sunita Gupta",
      specialty: "Gynecologist",
      location: "Kanpur",
      rating: 4,
      fee: "₹450",
      exp: "10 Years",
      emoji: "🌸",
    },
    {
      id: 5,
      name: "Dr. Vikram Yadav",
      specialty: "Neurologist",
      location: "Kanpur",
      rating: 5,
      fee: "₹700",
      exp: "18 Years",
      emoji: "🧠",
    },
    {
      id: 6,
      name: "Dr. Neha Mishra",
      specialty: "Pediatrician",
      location: "Kanpur",
      rating: 4,
      fee: "₹350",
      exp: "6 Years",
      emoji: "👶",
    },
  ];

  const specialties = [
    "All",
    "Cardiologist",
    "Dermatologist",
    "Orthopedic",
    "Gynecologist",
    "Neurologist",
    "Pediatrician",
  ];

  const filtered = doctors.filter(
    (doc) =>
      (filter === "All" || doc.specialty === filter) &&
      (doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        background:
          "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%)",
        minHeight: "100vh",
        padding: "40px 20px",
        color: "white",
      }}
    >
      {/* Grid Background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `
          linear-gradient(rgba(0,200,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,200,255,0.03) 1px, transparent 1px)
        `,
          backgroundSize: "50px 50px",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "50px",
              fontWeight: "900",
              background: "linear-gradient(135deg, #ffffff, #00c8ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: "0 0 10px",
            }}
          >
            👨‍⚕️ Find Your Doctor
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "16px" }}>
            Kanpur's Best Doctors — Book Instantly
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <input
            type="text"
            placeholder="🔍  Search doctor or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "15px 25px",
              width: "400px",
              maxWidth: "90%",
              borderRadius: "50px",
              border: "1px solid rgba(0,200,255,0.3)",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              fontSize: "16px",
              outline: "none",
              backdropFilter: "blur(10px)",
            }}
          />
        </div>

        {/* Filter Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: "8px 18px",
                borderRadius: "50px",
                border: "1px solid rgba(0,200,255,0.3)",
                background:
                  filter === s
                    ? "linear-gradient(135deg, #00c8ff, #0080ff)"
                    : "rgba(255,255,255,0.05)",
                color: "white",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: filter === s ? "bold" : "normal",
                transition: "all 0.3s ease",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Doctor Cards */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "25px",
            justifyContent: "center",
          }}
        >
          {filtered.map((doc) => (
            <div
              key={doc.id}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.borderColor = "rgba(0,200,255,0.5)";
                e.currentTarget.style.boxShadow =
                  "0 25px 50px rgba(0,200,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px",
                padding: "30px",
                width: "260px",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                textAlign: "center",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #00c8ff22, #7b2ff722)",
                  border: "2px solid rgba(0,200,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "35px",
                  margin: "0 auto 15px",
                }}
              >
                {doc.emoji}
              </div>

              <h3
                style={{ margin: "0 0 5px", fontSize: "18px", color: "white" }}
              >
                {doc.name}
              </h3>
              <p
                style={{
                  color: "#00c8ff",
                  margin: "0 0 10px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {doc.specialty}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                  marginBottom: "15px",
                }}
              >
                <span
                  style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}
                >
                  📍 {doc.location}
                </span>
                <span
                  style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}
                >
                  🏆 {doc.exp}
                </span>
              </div>

              <div style={{ marginBottom: "5px", fontSize: "16px" }}>
                {"⭐".repeat(doc.rating)}
              </div>

              <p
                style={{
                  color: "#00ff88",
                  fontWeight: "bold",
                  fontSize: "18px",
                  margin: "10px 0 15px",
                }}
              >
                {doc.fee} / Visit
              </p>

              <button
                onClick={() => navigate("/booking")}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
                style={{
                  background: "linear-gradient(135deg, #00c8ff, #0080ff)",
                  color: "white",
                  padding: "12px 0",
                  border: "none",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: "bold",
                  width: "100%",
                  transition: "all 0.3s ease",
                }}
              >
                Book Now 📅
              </button>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "transparent",
              color: "#00c8ff",
              padding: "12px 30px",
              border: "1px solid rgba(0,200,255,0.3)",
              borderRadius: "50px",
              cursor: "pointer",
              fontSize: "15px",
              transition: "all 0.3s ease",
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Doctors;
