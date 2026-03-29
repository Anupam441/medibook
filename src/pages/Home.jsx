import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const pts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticles(pts);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        background:
          "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%)",
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
        color: "white",
      }}
    >
      {/* Animated Background Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: `rgba(0, 200, 255, ${p.opacity})`,
            boxShadow: `0 0 ${p.size * 3}px rgba(0, 200, 255, 0.8)`,
            animation: `float ${p.speed}s ease-in-out infinite alternate`,
            zIndex: 0,
          }}
        />
      ))}

      {/* Cursor Glow */}
      <div
        style={{
          position: "fixed",
          left: mousePos.x - 150,
          top: mousePos.y - 150,
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
          transition: "all 0.1s ease",
        }}
      />

      {/* Grid Lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
          linear-gradient(rgba(0,200,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,200,255,0.03) 1px, transparent 1px)
        `,
          backgroundSize: "50px 50px",
          zIndex: 0,
        }}
      />

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          paddingTop: "80px",
          paddingBottom: "60px",
          padding: "80px 20px 60px",
        }}
      >
        {/* Logo Badge */}
        <div
          style={{
            display: "inline-block",
            background: "rgba(0,200,255,0.1)",
            border: "1px solid rgba(0,200,255,0.3)",
            borderRadius: "50px",
            padding: "8px 20px",
            marginBottom: "30px",
            fontSize: "13px",
            color: "#00c8ff",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          ⚕️ Next Gen Healthcare 2026
        </div>

        {/* Main Title */}
        <h1
          style={{
            fontSize: "80px",
            fontWeight: "900",
            margin: "0 0 10px",
            background:
              "linear-gradient(135deg, #ffffff 0%, #00c8ff 50%, #7b2ff7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-2px",
            lineHeight: 1,
            animation: "glow 3s ease-in-out infinite alternate",
          }}
        >
          MediBook
        </h1>

        <p
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "50px",
            letterSpacing: "1px",
          }}
        >
          Book Doctor Appointments in{" "}
          <span style={{ color: "#00c8ff" }}>Seconds</span> ✨
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "80px",
          }}
        >
          <button
            onClick={() => navigate("/doctors")}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-5px) scale(1.05)";
              e.target.style.boxShadow = "0 20px 40px rgba(0,200,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.boxShadow = "0 10px 30px rgba(0,200,255,0.2)";
            }}
            style={{
              background: "linear-gradient(135deg, #00c8ff, #0080ff)",
              color: "white",
              padding: "18px 45px",
              fontSize: "18px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              boxShadow: "0 10px 30px rgba(0,200,255,0.2)",
              transition: "all 0.3s ease",
              letterSpacing: "1px",
            }}
          >
            Find Doctors 👨‍⚕️
          </button>

          <button
            onClick={() => navigate("/booking")}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-5px) scale(1.05)";
              e.target.style.boxShadow = "0 20px 40px rgba(123,47,247,0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.boxShadow = "0 10px 30px rgba(123,47,247,0.2)";
            }}
            style={{
              background: "linear-gradient(135deg, #7b2ff7, #f107a3)",
              color: "white",
              padding: "18px 45px",
              fontSize: "18px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              boxShadow: "0 10px 30px rgba(123,47,247,0.2)",
              transition: "all 0.3s ease",
              letterSpacing: "1px",
            }}
          >
            Book Now 📅
          </button>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            marginBottom: "80px",
            flexWrap: "wrap",
          }}
        >
          {[
            { number: "500+", label: "Doctors" },
            { number: "10K+", label: "Patients" },
            { number: "99%", label: "Satisfaction" },
            { number: "24/7", label: "Available" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "25px 35px",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "900",
                  background: "linear-gradient(135deg, #00c8ff, #7b2ff7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "14px",
                  marginTop: "5px",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          {[
            {
              icon: "🔍",
              title: "Smart Search",
              desc: "Find doctors by specialty, rating & location instantly",
              color: "#00c8ff",
            },
            {
              icon: "📅",
              title: "Instant Booking",
              desc: "Book appointments in seconds — no waiting, no calls",
              color: "#7b2ff7",
            },
            {
              icon: "🔔",
              title: "Live Alerts",
              desc: "Real-time confirmation & reminders on your device",
              color: "#f107a3",
            },
            {
              icon: "🛡️",
              title: "Secure & Safe",
              desc: "Your health data is encrypted & 100% private",
              color: "#00ff88",
            },
          ].map((card, i) => (
            <div
              key={i}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.borderColor = card.color;
                e.currentTarget.style.boxShadow = `0 20px 40px ${card.color}22`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px",
                padding: "35px 25px",
                width: "220px",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                cursor: "default",
              }}
            >
              <div style={{ fontSize: "45px", marginBottom: "15px" }}>
                {card.icon}
              </div>
              <h3
                style={{
                  color: card.color,
                  margin: "0 0 10px",
                  fontSize: "18px",
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p
          style={{
            marginTop: "80px",
            color: "rgba(255,255,255,0.2)",
            fontSize: "13px",
            letterSpacing: "2px",
          }}
        >
          MADE WITH ❤️ BY CS STUDENTS FROM KANPUR • 2026
        </p>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-20px) scale(1.2); }
        }
        @keyframes glow {
          0% { filter: drop-shadow(0 0 20px rgba(0,200,255,0.3)); }
          100% { filter: drop-shadow(0 0 40px rgba(123,47,247,0.6)); }
        }
      `}</style>
    </div>
  );
}

export default Home;
