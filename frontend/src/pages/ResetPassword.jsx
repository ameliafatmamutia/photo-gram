import { useLocation, useNavigate } from "react-router-dom";
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
  FormHelperText,
} from "@mui/material";
import { MailLock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleStrongPassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isPasswordStrong = passwordRegex.test(password);
    if (isPasswordStrong) {
      setPasswordError("");
    } else {
      setPasswordError("Please enter strong password");
    }
  };

  const handleCheckPassword = () => {
    const isPasswordSame = password === passwordConfirm;
    if (isPasswordSame) {
      setPasswordConfirmError("");
    } else {
      setPasswordConfirmError("Please confirm password with same value");
    }
  };

  const resetPassword = async (event) => {
    event.preventDefault();

    // Disable button
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/reset-password",
        { token, password }
      );
      if (response.data.code === 200) {
        console.log(response.data);
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
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
        <Typography variant="h3"> Reset Password </Typography>
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
              <FormControl
                error={passwordError !== ""}
                variant="outlined"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handleStrongPassword}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
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
                <FormHelperText>{passwordError}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                error={passwordConfirmError !== ""}
                variant="outlined"
                fullWidth
                onChange={(e) => setPasswordConfirm(e.target.value)}
                onBlur={handleCheckPassword}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password Confirm
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
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
                  label="Password Confirm"
                />
                <FormHelperText>{passwordConfirmError}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={resetPassword}
                fullWidth
                variant="contained"
                disabled={isLoading}
              >
                {" "}
                Reset Password{" "}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}

export default ResetPassword;
