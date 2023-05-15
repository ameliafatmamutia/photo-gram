import React from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // handle login button
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Disable button
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        usernameOrEmail: user,
        password: password,
      });
      if (response.data.code === 200) {
        console.log(response.data);
        alert(response.data.message);
        const username = response.data.data.username;
        const id_user = response.data.data.id;
        localStorage.setItem("username", username);
        localStorage.setItem("id_user", id_user);
        navigate("/");
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
        <Avatar sx={{ m: 1, bgcolor: "teal" }}>
          <Person />
        </Avatar>
        <Typography> Login </Typography>
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
                label={"Username or Email"}
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {" "}
                Login{" "}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link href="/register" variant="body2">
                Don't have an account? Register here
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href="" variant="body2">
                Forgot Password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default Login;
