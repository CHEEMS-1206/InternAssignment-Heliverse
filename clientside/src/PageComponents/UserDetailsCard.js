import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
} from "@mui/material";

const UserDetailsCard = ({user}) => {
  return (
    <Card style={{ marginBottom: "30px", color: "#3f51b5" }}>
      {user && (
        <>
          <CardHeader
            titleTypographyProps={{ variant: "h6" }}
            title={`User ID: ${user.u_id}`}
            style={{ textAlign: "left" }}
          />
          <Avatar
            src={user.avatar}
            alt="User Avatar"
            style={{
              margin: "auto",
              marginTop: "20px",
              width: 100,
              height: 100,
            }}
          />
          <CardContent style={{ textAlign: "left" }}>
            <Typography variant="subtitle1" gutterBottom>
              {`User Name: ${user.first_name} ${user.last_name}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {`Gender: ${user.gender}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {`Email: ${user.email}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {`Domain: ${user.domain}`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {`Availability: ${
                user.available ? "Available" : "Not Available"
              }`}
            </Typography>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default UserDetailsCard;