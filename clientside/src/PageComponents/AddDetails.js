import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  TextField,
  Button,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Navigate } from "react-router-dom";

const AddDetails = () => {
  const storedEmail = localStorage.getItem("email");
  const storedUId = localStorage.getItem("u_id");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    u_id: storedUId || "",
    first_name: "",
    last_name: "",
    email: storedEmail || "",
    gender: "",
    avatar: "",
    domain: "",
    available: true,
  });

  const {
    u_id,
    first_name,
    last_name,
    email,
    gender,
    avatar,
    domain,
    available,
  } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      // Handle if token is not available
      console.error("Token not found.");
      return;
    }

    const response = await fetch("http://localhost:5001/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Perform actions after successful save (e.g., show alert, navigate to '/list-all-users')
      alert("User details have been saved.");
      // Navigate to '/list-all-users'
      navigate("/list-all-users");
    } else {
      // Handle error cases if needed
      alert("Error saving user details:", response.statusText);
    }
  } catch (error) {
    alert("Error saving user details:", error);
  }
};

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Add Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="User ID"
          type="text"
          name="u_id"
          value={u_id}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="First Name"
          type="text"
          name="first_name"
          value={first_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Last Name"
          type="text"
          name="last_name"
          value={last_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Gender</InputLabel>
          <Select value={gender} name="gender" onChange={handleChange}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Agender">Agender</MenuItem>
            <MenuItem value="Bigender">Bigender</MenuItem>
            <MenuItem value="Polygender">Polygender</MenuItem>
            <MenuItem value="Non-Binary">Non-Binary</MenuItem>
            <MenuItem value="Gender-Fluid">Gender-Fluid</MenuItem>
            {/* Add other gender options */}
          </Select>
        </FormControl>
        <TextField
          label="Avatar URL"
          type="text"
          name="avatar"
          value={avatar}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Domain</InputLabel>
          <Select value={domain} name="domain" onChange={handleChange}>
            <MenuItem value="Sales">Sales</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
            <MenuItem value="UI Designing">UI Designing</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Management">Management</MenuItem>
            <MenuItem value="Business Developement">
              Business Developement
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Available</InputLabel>
          <Select value={available} name="available" onChange={handleChange}>
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          Save Details
        </Button>
      </form>
    </Container>
  );
};

export default AddDetails;