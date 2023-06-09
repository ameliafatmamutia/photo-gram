import {
  Avatar,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import { FavoriteOutlined, ChatBubble } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const PostIndividual = ({ data, isLiked, handleLike, handleDislike }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        maxWidth: 600,
        marginBottom: 1,
      }}
    >
      <CardHeader
        onClick={() => navigate(`/user/${data.id_user}`)}
        avatar={<Avatar src={`http://${data.profile_picture_url}` || ""} />}
        title={data.username || ""}
        style={{ cursor: "pointer" }}
      />
      <CardMedia
        component="img"
        height="300"
        alt="titleIndividual"
        src={`http://${data.image_url}`}
        onClick={() => navigate(`/post/${data.id_post}`)}
        style={{ cursor: "pointer" }}
      />
      <CardContent>
        <Typography>{data.caption}</Typography>
      </CardContent>
      <CardContent>
        <Typography>
          {dayjs(data.createdAt).format("MMMM D, YYYY h:mm A")}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {isLiked ? (
          <IconButton
            aria-label="liked"
            onClick={() => handleDislike(data.id_post)}
          >
            <FavoriteOutlined sx={{ color: "red" }} />
          </IconButton>
        ) : (
          <IconButton
            aria-label="disliked"
            onClick={() => handleLike(data.id_post)}
          >
            <FavoriteOutlined />
          </IconButton>
        )}
        <Typography>{data.numberOfLikes}</Typography>
        <IconButton
          aria-label="share"
          onClick={() => {
            navigate(`/post/${data.id_post}`);
          }}
        >
          <ChatBubble />
        </IconButton>
        <Typography>{data.numberOfComments}</Typography>
      </CardActions>
    </Card>
  );
};

export default PostIndividual;
