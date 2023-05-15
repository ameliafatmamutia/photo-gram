import { CircularProgress, Typography, Divider, Avatar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { IconButton } from '@mui/material';
import { ModeEdit } from "@mui/icons-material";
import ProfileForm from "./ProfileForm";
const ProfileItemList = () => {
    const id_user = 2
    const [profileData, setProfileData] = useState({})
    const [isLoadingProfile, setIsLoadingProfile] = useState(false)
    const [isEditAccount, setIsEditAccount] = useState(false)

    const getByDetailedUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/users/${id_user}`)
            setProfileData(response.data.data)
            setIsLoadingProfile(false)
        } catch (error) {
            console.log(error)
            setIsLoadingProfile(false)
        }
    }
    useEffect(() => {
        setIsLoadingProfile(true)
        getByDetailedUser()
    }, [isEditAccount])

    return (
        <div>{isLoadingProfile ? (
            <CircularProgress />
        ) : (
            <> {
                isEditAccount ? (
                    <ProfileForm backHandler={() => setIsEditAccount(false)} bioInitial={profileData.bio} fullnameInitial={profileData.fullname} />
                ) :
                    (
                        <>
                            <IconButton sx={{ marginBottom: 2 }} onClick={() => setIsEditAccount(true)}>
                                <ModeEdit />
                                <Typography> Edit user data</Typography>
                            </IconButton>
                            <Avatar
                                src={`http://${profileData.profile_picture_url}` || ""}
                                alt="Profile Picture"
                                sx={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '8px',
                                    objectFit: 'cover',
                                    marginBottom: '16px',
                                }}
                            />
                            <Typography variant="subtitle1">Username: {profileData.username}</Typography>
                            <Divider sx={{ marginBottom: '16px', width: '50%' }} />
                            <Typography variant="subtitle1">fullname: {profileData.fullname}</Typography>
                            <Divider sx={{ marginBottom: '16px', width: '50%' }} />
                            <Typography variant="subtitle1">Email: {profileData.email}</Typography>
                            <Divider sx={{ marginBottom: '16px', width: '50%' }} />
                            <Typography variant="subtitle1">User Bio: {profileData.bio}</Typography>
                            <Divider sx={{ marginBottom: '16px', width: '50%' }} />
                            <Button variant="outlined" > resend verification </Button>
                        </>
                    )
            }
            </>
        )}
        </div>
    );
};

export default ProfileItemList;