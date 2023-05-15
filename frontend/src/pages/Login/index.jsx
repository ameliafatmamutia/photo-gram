import { Avatar, Box, Button, Grid, Link, TextField, Typography, IconButton, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material'
import { Person, Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'
const Login = () => {
    const [user, setUser] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

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
                    <Person />
                </Avatar>
                <Typography> Login </Typography>
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
                                fullWidth
                                label={"Email/Password"}
                                value={user}
                                onChange={e => setUser(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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

export default Login