import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
import { KeySharp } from '@mui/icons-material'
import { useState } from 'react'
import axios from 'axios'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [isEmailSend, setIsEmailSend] = useState(false);

    const postSendEmail = async () => {
        const url = 'http://localhost:8000/api/users/forgot-password';
        try {
            const response = await axios.post(url, { email });
            console.log(response.data); // Handle the response data as needed
        } catch (error) {
            console.error(error); // Handle any error that occurred during the request
        }
    }

    const handleSendEmail = () => {
        postSendEmail()
        setIsEmailSend(true)
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
                    <KeySharp />
                </Avatar>
                <Typography> Forgot Password </Typography>
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
                    {isEmailSend ? (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography>{`Please check ${email} inbox to continue reset password process`}</Typography>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label={"Email/Password"}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth variant='contained' onClick={handleSendEmail}> Send Email </Button>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Box>
        </Grid>

    )
}

export default ForgotPassword