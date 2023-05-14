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
  FormHelperText,
} from "@mui/material";
import { MailLock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChangeEmail = () => {
    // Email format detection
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    if (isValidEmail) {
      setEmailError("");
    } else {
      setEmailError("Please enter email format");
    }
  };

  // To check password criteria
  const handleStrongPassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isPasswordStrong = passwordRegex.test(password);
    console.log(isPasswordStrong, "strong password");
    if (isPasswordStrong) {
      setPasswordError("");
    } else {
      setPasswordError(
        "Password must contain at least 8 characters including an uppercase letter, a symbol, and a number"
      );
    }
  };

  // To check whether confirm password match password
  const handleCheckPassword = () => {
    const isPasswordSame = password === passwordConfirm;
    if (isPasswordSame) {
      setPasswordConfirmError("");
    } else {
      setPasswordConfirmError("Please confirm password with same value");
    }
  };

  // handle register button
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        fullname: fullname,
        email: email,
        username: username,
        password: password,
        repeat_password: passwordConfirm,
      });
      if (response.data.code === 200) {
        console.log(response.data);
        alert("Register success");
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.log(error);
      alert("Internal server error");
    }
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
          <MailLock />
        </Avatar>
        <Typography> Register </Typography>
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
                label={"Fullname"}
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                error={emailError !== ""}
                fullWidth
                label={"Email"}
                value={email}
                helperText={emailError}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleChangeEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label={"Username"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
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
              <Button fullWidth variant="contained" onClick={handleSubmit}>
                {" "}
                Register{" "}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link href="" variant="body2">
                Already have an account? Login here
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default Register;
