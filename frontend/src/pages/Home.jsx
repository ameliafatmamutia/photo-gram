import React from "react";
import Login from "./Login";
import { Box, Grid, Typography } from "@mui/material";

const Home = () => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 8,
            }}
          >
            {idUser && username ? (
              <Typography variant="h6">Welcome, {username}!</Typography>
            ) : (
              <>
                <Typography variant="h4">Photogram</Typography>
                <br />
                <br />
                <Typography variant="h6">Login to see what's inside</Typography>
                <Login />
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
