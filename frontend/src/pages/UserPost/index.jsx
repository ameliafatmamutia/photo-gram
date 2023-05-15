import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserHeader from '../../component/UserPost/UserHeader';
import { reduceLikedBy, addLikedBy } from '../../utils/arrayManipulation'
import PostIndividual from '../../component/post/PostIndividual';
import { Grid, Box, IconButton, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const pageLimit = 100
const id_user = 2

const UserPost = () => {
  const { id } = useParams();
  const [dataHeader, setDataHeader] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const currentPage = 1
  const [dataPosts, setDataPosts] = useState([])
  const navigate = useNavigate();

  const getByDetailedUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/${id}`)
      setDataHeader(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const postLike = async (id_post) => {
    try {
      const reqBody = {
        id_user: id_user // REPLACE WITH USER_ID from storage
      }
      await axios.post(`http://localhost:8000/api/likes/${id_post}`, reqBody);
      setDataPosts(data => addLikedBy(id_user, id_post, data))
    } catch (error) {
      console.log(error)
    }
  }

  const handleLike = (id_post) => {
    // Call like API 
    postLike(id_post)
  }

  const deleteLike = async (id_post) => {
    try {
      const reqBody = {
        id_user: id_user // REPLACE WITH USER_ID from storage
      }
      await axios.delete(`http://localhost:8000/api/likes/${id_post}`, { data: reqBody });
      setDataPosts(data => reduceLikedBy(id_user, id_post, data))
    } catch (error) {
      console.log(error)
    }
  }

  const handleDislike = (id_post) => {
    deleteLike(id_post)
  }

  const getAllPost = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/posts/detail', {
        params: {
          pageLimit: pageLimit * currentPage,
          page: 1,
          userId: id
        }
      });
      setDataPosts(response.data.data);
      //   setTotalPosts(response.data.totalCount)
      setIsLoading(false)
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  useEffect(() => {
    getByDetailedUser();
  }, [id])

  useEffect(() => {
    getAllPost();
  }, [currentPage,])

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
        <Grid sx={{ maxWidth: 600, width: '100%', padding: 2, border: '2px solid #ccc', }} container rowSpacing={4}>
          <Grid item xs={12}>
            <IconButton onClick={() => navigate('/')}>
              <ArrowBack />
              <Typography> Back </Typography>
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <UserHeader data={dataHeader} />
            )}
          </Grid>
          <Grid item xs={12}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              dataPosts.map((post) => (
                <PostIndividual
                  data={post}
                  isLiked={post.likedBy.includes(id_user)}
                  handleLike={handleLike}
                  handleDislike={handleDislike}
                />
              ))
            )}
          </Grid>
        </Grid>
      </Box>
    </Grid>

  )
}

export default UserPost