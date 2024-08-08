// src/LoginForm.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [occupation, setOccupation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // List of occupations
  const occupations = ["Farmer", "Traveler", "Event Planner"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "" || occupation === "") {
      setError("Both fields are required.");
      return;
    }

    setError(""); // Clear any previous error messages

    // Mock login logic
    if (username === "admin") {
        switch (occupation) {
          case "Farmer":
            navigate("/farmerweather"); // Navigate to farmer screen
            break;
          case "Traveler":
            navigate("/travelweather"); // Navigate to traveler screen
            break;
          case "Event Planner":
            navigate("/eventweather"); // Navigate to event planner screen
            break;
          default:
            setError("Invalid occupation.");
        }
      } else {
        setError("Invalid username.");
      }
    };

  return (
    <div className="login-container" style={containerStyle}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputContainerStyle}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="occupation">Occupation</label>
          <select
            id="occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            style={inputStyle}
          >
            <option value="" disabled>
              Select your occupation
            </option>
            {occupations.map((occupation, index) => (
              <option key={index} value={occupation}>
                {occupation}
              </option>
            ))}
          </select>
        </div>
        {error && <p style={errorStyle}>{error}</p>}
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
}

const containerStyle = {
  maxWidth: "300px",
  margin: "50px auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const inputContainerStyle = {
  marginBottom: "15px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  boxSizing: "border-box",
  borderRadius: "3px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px",
  color: "#fff",
  backgroundColor: "#007BFF",
  border: "none",
  borderRadius: "3px",
  cursor: "pointer",
  display: "flex",
};

const errorStyle = {
  color: "red",
  marginBottom: "10px",
};

export default LoginForm;
