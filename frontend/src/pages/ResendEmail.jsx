import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Grid, Link, Typography, TextField } from "@mui/material";

const ResendEmail = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // handle resend email button
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Disable button
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/resend-verification",
        {
          email: email,
        }
      );
      if (response.data.code === 200) {
        console.log(response.data);
        alert(response.data.message);
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.log(error);
      alert("Internal server error");
    }
    // Enable button
    setIsLoading(false);
  };

  return (
    <Grid component={"main"}>
      <Box
        container
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3"> Please verify your email </Typography>
        <br />
        <br />
        <Typography variant="h6">
          {" "}
          Havent received a verification email yet?{" "}
        </Typography>
        <br />
        <Grid container spacing={2} sx={{ width: 400 }}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label={"Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
        </Grid>
        <br />
        <Grid item xs={12}>
          {" "}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Resend Email
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
};

export default ResendEmail;
