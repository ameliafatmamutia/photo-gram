import { Box, Button, Grid, IconButton, FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useEffect, useState } from 'react'

const ChangeNewPassword = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
    const [newPasswordError, setNewPasswordError] = useState('')
    const [newPasswordConfirmError, setNewPasswordConfirmError] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword((show) => !show);
    const [disabled, setDisabled] = useState(false);

    const handleStrongNewPassword = () => {
        const newPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        const isNewPasswordStrong = newPasswordRegex.test(newPassword)
        if (isNewPasswordStrong) {
            setNewPasswordError('')
        } else {
            setNewPasswordError('Please enter strong newPassword')
        }
    }

    const handleCheckNewPassword = () => {
        const isNewPasswordSame = newPassword === newPasswordConfirm
        if (isNewPasswordSame) {
            setNewPasswordConfirmError('')
        } else {
            setNewPasswordConfirmError('Please confirm newPassword with same value')
        }
    }

    const handleChangeNewPassword = () => {
        alert(`${oldPassword}---${newPassword}---${newPasswordConfirm}`)
    }

    const checkDisabled = () => {
        const isNewPasswordError = newPasswordError !== ''
        const isNewPasswordConfirmError = newPasswordConfirmError !== ''
        const isNewPasswordFilled = newPassword === ''
        const isNewPasswordConfirmFilled = newPasswordConfirm === ''
        const isOldPasswordFilled = oldPassword === ''
        return isOldPasswordFilled || isNewPasswordError || isNewPasswordConfirmError || isNewPasswordFilled || isNewPasswordConfirmFilled
    }

    useEffect(() => {
        setDisabled(checkDisabled())
    }, [newPasswordError, newPasswordConfirmError, newPassword, newPasswordConfirm, oldPassword])
    return (
        <Grid component={"main"}>
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
                        <FormControl variant="outlined" fullWidth onChange={e => setOldPassword(e.target.value)}>
                            <InputLabel htmlFor="outlined-adornment-oldPassword" >Old Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-oldPassword"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle oldpassword visibility"
                                            onClick={handleShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Old Password"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl error={newPasswordError !== ''} variant="outlined" fullWidth onChange={e => {
                            setNewPassword(e.target.value)
                            handleStrongNewPassword()
                        }} onBlur={handleStrongNewPassword}>
                            <InputLabel htmlFor="outlined-adornment-newPassword" >New Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-newPassword"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle newPassword visibility"
                                            onClick={handleShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="New Password"
                            />
                            <FormHelperText>{newPasswordError}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl error={newPasswordConfirmError !== ''} variant="outlined" fullWidth onChange={e => {
                            setNewPasswordConfirm(e.target.value)
                            handleCheckNewPassword()
                        }} onBlur={handleCheckNewPassword} >
                            <InputLabel htmlFor="outlined-adornment-newPasswordConfirm">New Password Confirm</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-newPasswordConfirm"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle newPasswordConfirm visibility"
                                            onClick={handleShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="New Password Confirm"
                            />
                            <FormHelperText>{newPasswordConfirmError}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} >
                        <Button disabled={disabled} onClick={handleChangeNewPassword} fullWidth variant='contained'>Change NewPassword</Button>
                    </Grid>
                </Grid>
            </Box>
        </Grid>

    )
}

export default ChangeNewPassword