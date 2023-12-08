import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
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

    // Validate u_id as an integer and password as 8 characters
    const isUIdValid = /^\d+$/.test(u_id);
    const isPasswordValid = password.length === 8;

    if (!isUIdValid) {
      alert("Validation failed. Chose a valid u_id");
      return;
    } else if (!isPasswordValid) {
      console.log("Validation failed. Password must be strictly 8 chars long.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Display a notification to the user
        alert("User created successfully!");

        // Redirect to the login page after 300ms
        setTimeout(() => {
          navigate("/login")
        }, 300);
      } else {
        alert("Failed to create user.");
        // Handle other status codes or errors
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network errors or exceptions
    }
  };

  const handleLogin = () => {
    navigate("/login");
    console.log("Redirecting to login page");
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Register Page
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="User ID (Integer)"
          type="text"
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
        onClick={handleLogin}
        fullWidth
        style={{ marginTop: "20px" }}
      >
        Login
      </Button>
    </Container>
  );
};

export default RegisterPage;
