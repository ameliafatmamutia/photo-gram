import ResponsiveAppBar from "../../component/AppBar/AppBar";
import PostIndividual from "../../component/post/PostIndividual";
import PostModal from "../../component/Dialog/PostModal";
import { Grid, Fab, Box, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { reduceLikedBy, addLikedBy } from "../../utils/arrayManipulation";

const pageLimit = 3;
const id_user = localStorage.getItem("id_user");

console.log(id_user);
console.log(typeof id_user);

const Home = () => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  if (!idUser && !username) {
    window.location.href = "http://localhost:3000/login";
  }

  const containerRef = useRef(null);
  const isScrolledToBottom = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPosts, setDataPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);

  console.log(dataPosts);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      // User has scrolled to the bottom
      if (pageLimit * currentPage >= totalPosts) {
        isScrolledToBottom.current = true;
      }

      if (isScrolledToBottom.current !== true) {
        setCurrentPage((currentPage) => currentPage + 1);
      }
    }
  };

  const postLike = async (id_post) => {
    try {
      const reqBody = {
        id_user: id_user, // REPLACE WITH USER_ID from storage
      };
      await axios.post(`http://localhost:8000/api/likes/${id_post}`, reqBody);
      setDataPosts((data) => addLikedBy(parseInt(id_user), id_post, data));
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
      setDataPosts((data) => reduceLikedBy(parseInt(id_user), id_post, data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = (id_post) => {
    // Call like API
    deleteLike(id_post);
  };

  const getAllPost = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/posts/detail",
        {
          params: {
            pageLimit: pageLimit * currentPage,
            page: 1,
          },
        }
      );
      setDataPosts(response.data.data);
      setTotalPosts(response.data.totalCount);
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      // Clean up scroll event listener when component unmounts
      container.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, totalPosts, currentPage]);

  useEffect(() => {
    getAllPost();
  }, [currentPage]);

  return (
    <>
      <ResponsiveAppBar />
      <Grid
        component={"main"}
        sx={{
          overflow: "auto",
          maxHeight: "calc(100vh - 64px)",
          marginTop: 2,
        }}
        ref={containerRef}
      >
        <Box
          container
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
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
              {dataPosts.map((post) => {
                return (
                  <Grid item xs={12}>
                    <PostIndividual
                      data={post}
                      isLiked={post.likedBy.includes(parseInt(id_user))}
                      handleLike={handleLike}
                      handleDislike={handleDislike}
                    />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      </Grid>
      <Fab
        onClick={() => setOpenModal(true)}
        sx={{
          position: "fixed",
          bottom: 100,
          right: 100,
        }}
        color="primary"
        variant="extended"
        aria-label="add"
      >
        <Add />
        Create Post
      </Fab>
      <PostModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        getAllPost={getAllPost}
      />
    </>
  );
};

export default Home;
