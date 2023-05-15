import { Card, CardContent, Typography, CardHeader, Avatar } from '@mui/material';

const UserHeader = ({ data }) => {
    return (
        <Card>
            <CardContent>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'royalblue' }} src={`http://${data.profile_picture_url}` || ""}>
                        </Avatar>
                    }
                    title={data.username || "user name"}
                    subheader={data.fullname || "full name"}
                />
                <CardContent>
                    <Typography variant="body1">{data.bio || "room for bio location"}</Typography>
                </CardContent>
            </CardContent>
        </Card>
    );
};

export default UserHeader