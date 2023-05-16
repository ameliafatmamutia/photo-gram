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
import {
  FavoriteOutlined,
  ChatBubble,
  Edit,
  Delete,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const id_user = localStorage.getItem("id_user");

const PostDetailed = ({
  data,
  likedBy = [],
  handleDislike,
  handleLike,
  handleEdit,
}) => {
  const navigate = useNavigate();

  const deletePost = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${data.id_post}`);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={`http://${data.profile_picture_url}` || ""} />}
        title={data.username || ""}
        subheader={data.fullname || ""}
        onClick={() => navigate(`/user/${data.id_user}`)}
      />
      <CardMedia
        component="img"
        height="300"
        alt="titleIndividual"
        src={`http://${data.image_url}`}
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
        {likedBy.includes(parseInt(id_user)) ? (
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
        <IconButton aria-label="share">
          <ChatBubble />
        </IconButton>
        <Typography>{data.numberOfComments}</Typography>
        {data.id_user == id_user && (
          <>
            <IconButton aria-label="edit" onClick={handleEdit}>
              <Edit />
            </IconButton>
            <IconButton aria-label="delete" onClick={deletePost}>
              <Delete />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default PostDetailed;
