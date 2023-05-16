import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostDetailed from "../../component/post/PostDetailed";
import { CircularProgress, Grid, Box, IconButton } from "@mui/material";
import CommentForm from "../../component/CommentList/CommentForm";
import CommentCard from "../../component/CommentList/CommentCard";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import EditPostDialog from "../../component/post/EditPostDialog";

const id_user = localStorage.getItem("id_user");

const Post = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [commentData, setCommentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComment, setIsLoadingComment] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const getPostById = async () => {
    const idUser = localStorage.getItem("id_user");
    const username = localStorage.getItem("username");
    if (!idUser && !username) {
      window.location.href = "http://localhost:3000/login";
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/api/posts/${Number(id)}`
      );
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating post:", error);
      setIsLoading(false);
    }
  };

  const getCommentListById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/comment/${Number(id)}`
      );
      setCommentData(response.data.data);
      setIsLoadingComment(false);
    } catch (error) {
      console.error("Error creating post:", error);
      setIsLoadingComment(false);
    }
  };

  useEffect(() => {
    setIsLoadingComment(true);
    setIsLoading(true);
    getPostById();
    getCommentListById();
  }, [id]);

  const handleCommentSubmit = async (comment) => {
    try {
      const reqBody = {
        id_user: id_user, // REPLACE WITH USER_ID from storage
        id_post: Number(id),
        comment: comment,
      };
      await axios.post("http://localhost:8000/api/comment", reqBody);
      getCommentListById();
    } catch (error) {
      console.error("Error creating post:", error);
      setIsLoading(false);
    }
  };

  const handleCommentDelete = async (id_comment) => {
    try {
      await axios.delete(`http://localhost:8000/api/comment/${id_comment}`);
      getCommentListById();
    } catch (error) {
      console.error("Error creating post:", error);
      setIsLoading(false);
    }
  };

  const postLike = async (id_post) => {
    try {
      const reqBody = {
        id_user: id_user, // REPLACE WITH USER_ID from storage
      };
      await axios.post(`http://localhost:8000/api/likes/${id_post}`, reqBody);
      const updatedLikedBy = [...data.likedBy, parseInt(id_user)];
      setData({
        ...data,
        numberOfLikes: data.numberOfLikes + 1,
        likedBy: updatedLikedBy,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = (id_post) => {
    // Call like API
    postLike(id_post);
  };

  const deleteLike = async (id_post) => {
    try {
      const reqBody = {
        id_user: id_user, // REPLACE WITH USER_ID from storage
      };
      await axios.delete(`http://localhost:8000/api/likes/${id_post}`, {
        data: reqBody,
      });
      const updatedLikedBy = data.likedBy.filter(
        (id) => id !== parseInt(id_user)
      );
      setData({
        ...data,
        numberOfLikes: data.numberOfLikes - 1,
        likedBy: updatedLikedBy,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = (id_post) => {
    deleteLike(id_post);
  };

  const navigate = useNavigate();

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
        <Grid
          sx={{
            maxWidth: 600,
            width: "100%",
            padding: 2,
            border: "2px solid #ccc",
          }}
          container
          rowSpacing={4}
        >
          <Grid item xs={12}>
            <IconButton onClick={() => navigate("/home")}>
              <ArrowBack />
              <Typography> Back </Typography>
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <PostDetailed
                handleEdit={() => setOpenModal(true)}
                data={data}
                likedBy={data.likedBy}
                handleDislike={handleDislike}
                handleLike={handleLike}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <CommentForm onSubmit={handleCommentSubmit} />
          </Grid>
          <Grid item xs={12}>
            {isLoadingComment ? (
              <CircularProgress />
            ) : (
              commentData.map((data) => (
                <CommentCard data={data} onDelete={handleCommentDelete} />
              ))
            )}
          </Grid>
        </Grid>
      </Box>
      <EditPostDialog
        data={data}
        openModal={openModal}
        setOpenModal={setOpenModal}
        getPostById={getPostById}
      />
    </Grid>
  );
};

export default Post;
