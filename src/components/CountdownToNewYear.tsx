// src/CountdownPage.tsx
import React, { useEffect, useState } from "react";
import Logo1 from '../assets/img_2.png';
import Logo2 from '../assets/img_3.png';

const CountdownPage: React.FC = () => {
  const eventDate = new Date("2025-09-17T00:00:00");
  const [daysLeft, setDaysLeft] = useState<number>(0);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const timeDiff = eventDate.getTime() - now.getTime();
      setDaysLeft(Math.max(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)), 0));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
  minHeight: "100vh",
  width: "100vw",
  margin: 0,
  padding: "20px",
  background: "linear-gradient(135deg, #a82d2a 0%, #7a1f1d 100%)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontFamily: "DM Serif Text, serif",
}}

    >
      {/* Logos Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "600px",
          marginBottom: "10px",
        }}
      >
        <img src={Logo2} alt="Logo 2" style={{ height: "60px" }} />
        <img src={Logo1} alt="Logo 1" style={{ height: "60px" }} />
      </div>

      {/* Organization Name */}
      <p
        style={{
          fontWeight: "200px",
          textAlign: "center",
          maxWidth: "600px",
        }}
      >
        The Association of Sacred Heart of Jesus and Immaculate Heart of Mary
      </p>
      <p
        style={{
          fontWeight: "200px",
          textAlign: "center",
          maxWidth: "600px",
        }}
      >
        NATIONAL CONVENTION
      </p>

      {/* Venue & Date */}
      <p style={{ textAlign: "center", marginTop: "5px" }}>
        📍 DRACC Lugbe, Abuja <br />
        📅 Starting on the 17th September 2025
      </p>

      {/* Countdown Calendar */}
      <div
        style={{
          marginTop: "40px",
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          width: "300px",
        }}
      >
        {/* Calendar Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "100px",
            marginTop: "-15px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              background: "black",
              width: "20px",
              height: "20px",
              borderRadius: "4px",
            }}
          />
          <div
            style={{
              background: "black",
              width: "20px",
              height: "20px",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Green Header */}
        <div
          style={{
            background: "linear-gradient(to right, #cf392a)",
            color: "white",
            padding: "10px 0",
            textAlign: "center",
            fontWeight: "200px",
            fontSize: "18px",
          }}
        >
          National Convention
        </div>

        {/* Days Number */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            textAlign: "center",
            padding: "20px 0",
            color: "#cf392a",
          }}
        >
          {daysLeft}
        </div>

        {/* Footer */}
        <div
          style={{
            background: "linear-gradient(to right, #cf392a)",
            color: "white",
            padding: "10px 0",
            textAlign: "center",
            fontWeight: "200px",
          }}
        >
          DAYS TO GO
        </div>
      </div>
    </div>
  );
};

export default CountdownPage;
