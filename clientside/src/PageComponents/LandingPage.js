import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";

import UserDetailsCard from "./UserDetailsCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [myDetails, setMyDetails] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [page, setPage] = useState(1);

  const [gender, setGender] = useState("All-Genders");
  const [domain, setDomain] = useState("All-Domains");
  const [available, setAvailable] = useState(true);

  const [usernameTosearch, setUsernameTosearch] = useState("Alex");

  const u_id = localStorage.getItem("u_id");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllusers = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/users?page=${page}`
        );
        if (response.ok) {
          const listOfUsers = await response.json();
          setAllUsers(listOfUsers);
          // console.log(listOfUsers);
        } else {
          // Handle error cases if needed
          console.error("Error fetching user details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchAllusers();
  }, [page]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/users/${u_id}`);
        if (response.ok) {
          const userData = await response.json();
          setMyDetails(userData);
          // console.log(userData);
        } else {
          // Handle error cases if needed
          console.error("Error fetching user details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    if (u_id) {
      fetchUserDetails();
    }
  }, [u_id]);

  const logOutHnadler = () => {
    // Clear user-related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("u_id");
    localStorage.removeItem("email");

    // Show alert for successful logout
    alert("Logged out successfully.");

    // Redirect user to the login page
    navigate("/login");
  };
  const prevHandler = () => {
    if (page === 1) {
      alert("You are at the starting page !");
    } else {
      setPage(page - 1);
    }
    console.log(page);
  };

  const nextHandler = () => {
    if (!allUsers || page === allUsers.totalPages) {
      alert("No more pages !");
    } else {
      setPage(page + 1);
    }
    console.log(page);
  };

  // checks for changes
  const handleDomainChange = (e) => {
    setDomain(e.target.value);
    // console.log(e.target.value)
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
    // console.log(e.target.value);
  };
  const handleAvailabilityChange = (e) => {
    setAvailable(e.target.value);
    // console.log(e.target.value);
  };
  const handleUserNameChange = (e) => {
    setUsernameTosearch(e.target.value);
    // console.log(e.target.value);
  };

  // updates by filter and names search
  const filterBy = async (e) => {
    let inclusion = "";
    if (gender === "All-Genders") {
      inclusion += ``;
    } else {
      inclusion += `gender=${gender}&`;
    }
    if (domain === "All-Domains") {
      inclusion += ``;
    } else {
      inclusion += `domain=${domain}&`;
    }
    if (!available) {
      inclusion += ``;
    } else {
      inclusion += `available=${available}`;
    }
    const response = await fetch(
      `http://localhost:5001/api/users/filter?${inclusion}`
    );
    if (response.ok) {
      const userData = await response.json();
      setAllUsers(userData);
      console.log(userData);
    } else {
      // Handle error cases if needed
      console.error("Error fetching user details:", response.statusText);
    }
  };

  const searchByName = async (e) => {
    const response = await fetch(
      `http://localhost:5001/api/users/search-by-name?name=${usernameTosearch}`
    );
    if (response.ok) {
      const userData = await response.json();
      if (userData.length === 0) {
      } else {
        setAllUsers({users : userData});
        console.log(userData);
      }
    } else {
      // Handle error cases if needed
      console.error("Error fetching user details:", response.statusText);
    }
  };

  return (
    <div className="landingPage">
      <div className="navbar">
        <h1>Application Name</h1>
        <button onClick={logOutHnadler}>LogOut</button>
      </div>
      <div className="container">
        <div className="myProfile">
          <UserDetailsCard user={myDetails} />
        </div>
        <div className="all-users">
          <div className="filter">
            <FormControl style={{ width: "22%" }} margin="normal" required>
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                name="gender"
                onChange={handleGenderChange}
              >
                <MenuItem value="All-Genders">All Genders</MenuItem>
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
            <FormControl style={{ width: "22%" }} margin="normal" required>
              <InputLabel>Domain</InputLabel>
              <Select
                value={domain}
                name="domain"
                onChange={handleDomainChange}
              >
                <MenuItem value="All-Domains">All Domains</MenuItem>
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
            <FormControl style={{ width: "22%" }} margin="normal" required>
              <InputLabel>Available</InputLabel>
              <Select
                value={available}
                name="available"
                onChange={handleAvailabilityChange}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            <button onClick={filterBy}>Filter Users</button>
          </div>
          <div className="search-by-name">
            <TextField
              style={{ width: "70%" }}
              label="Name"
              type="text"
              name="name"
              value={usernameTosearch}
              onChange={handleUserNameChange}
              margin="normal"
              required
            />
            <button onClick={searchByName}>Search By Name</button>
          </div>
          <div className="all-users-container">
            {allUsers &&
              allUsers.users.map((user) => (
                <UserDetailsCard key={user.u_id} user={user} />
              ))}
          </div>
          <div className="toggle-btns">
            <button id="prev" onClick={prevHandler}>
              Prev Page
            </button>
            <button id="next" onClick={nextHandler}>
              Next Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
