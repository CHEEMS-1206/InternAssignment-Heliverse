import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    u_id: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { u_id, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password (password: 8 characters)
    const isPasswordValid = password.length === 8;

    if (!isPasswordValid) {
      // Handle validation errors
      alert("Password must be 8 characters.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { token } = await response.json();
        alert("Logged in successfully! Token:");

        // Save the token and user details in local storage for further use
        localStorage.setItem("token", token);
        localStorage.setItem("email", formData.email);
        localStorage.setItem("u_id", formData.u_id);

        // check whether user has added details already
        const dataAdded = await fetch(`http://localhost:5001/api/users/${u_id}`);
        if (dataAdded.ok) {
          navigate("/list-all-users");
        } else {
          // Redirect to a protected route or perform further actions
          navigate("/add-details");
        }
      } else {
        alert("Failed to log in.");
        // Handle other status codes or errors
      }
    } catch (error) {
      alert("Error:", error);
      // Handle network errors or exceptions
    }
  };

  const handleRegister = () => {
    navigate("/register");
    console.log("Redirecting to registration page");
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Login Page
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="User ID"
          type="number"
          name="u_id"
          value={u_id}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password (8 characters)"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          Submit
        </Button>
      </form>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRegister}
        fullWidth
        style={{ marginTop: "20px" }}
      >
        Register
      </Button>
    </Container>
  );
};

export default LoginPage;
