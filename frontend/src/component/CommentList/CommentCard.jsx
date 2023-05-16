import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Button,
  CardActions,
  Avatar,
} from "@mui/material";

const id_user = localStorage.getItem("id_user");

const CommentCard = ({ data, onDelete }) => {
  return (
    <Card sx={{ marginBottom: 1 }}>
      <CardContent>
        <CardHeader
          avatar={<Avatar src={`http://${data.profile_picture_url}` || ""} />}
          title={data.username || ""}
        />
        <CardContent>
          <Typography variant="body1">{data.comment}</Typography>
        </CardContent>
        {data.id_user == id_user && (
          <CardActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onDelete(data.id)}
            >
              Delete Comment
            </Button>
          </CardActions>
        )}
      </CardContent>
    </Card>
  );
};

export default CommentCard;
