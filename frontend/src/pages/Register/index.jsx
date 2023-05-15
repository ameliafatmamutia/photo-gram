import { Avatar, Box, Button, Grid, Link, TextField, Typography, IconButton, FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText } from '@mui/material'
import { MailLock, Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'
const Register = () => {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordConfirmError, setPasswordConfirmError] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChangeEmail = () => {
        // Email format detection
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);
        if (isValidEmail) {
            setEmailError('')
        } else {
            setEmailError('Please enter email format')
        }

    };

    const handleStrongPassword = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        const isPasswordStrong = passwordRegex.test(password)
        if (isPasswordStrong) {
            setPasswordError('')
        } else {
            setPasswordError('Please enter strong password')
        }
    }

    const handleCheckPassword = () => {
        const isPasswordSame = password === passwordConfirm
        if (isPasswordSame) {
            setPasswordConfirmError('')
        } else {
            setPasswordConfirmError('Please confirm password with same value')
        }
    }

    return (
        <Grid component={"main"}>
            <Box
                container
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'teal' }}>
                    <MailLock />
                </Avatar>
                <Typography> Sign Up </Typography>
                <Box
                    sx={{
                        mt: 5,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyItems: 'center',
                        width: 400
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                error={emailError !== ''}
                                fullWidth
                                label={"Email"}
                                value={email}
                                helperText={emailError}
                                onChange={e => setEmail(e.target.value)}
                                onBlur={handleChangeEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label={"Username"}
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl error={passwordError !== ''} variant="outlined" fullWidth onChange={e => setPassword(e.target.value)} onBlur={handleStrongPassword}>
                                <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
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
                            <FormControl error={passwordConfirmError !== ''} variant="outlined" fullWidth onChange={e => setPasswordConfirm(e.target.value)} onBlur={handleCheckPassword}>
                                <InputLabel htmlFor="outlined-adornment-password">Password Confirm</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
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
                            <Button fullWidth variant='contained'> Sign In </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Link href="/register" variant="body2">
                                Don't have an account? Sign up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Grid>

    )
}

export default Register