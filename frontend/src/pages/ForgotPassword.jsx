import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { KeySharp } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // handle send email button
  const handleSendEmail = async (event) => {
    event.preventDefault();

    // Disable button
    setIsLoading(true);

    const url = "http://localhost:8000/auth/forgot-password";

    try {
      const response = await axios.post(url, { email });
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
        <Typography variant="h4"> Reset Password </Typography>
        <br />
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
            width: 400,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label={"Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSendEmail}
                disabled={isLoading}
              >
                {" "}
                Send Password Reset Link{" "}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default ForgotPassword;
