import React from "react";
import Login from "./Login";
import { Box, Grid, Typography } from "@mui/material";

const HomeFront = () => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  const is_verified = localStorage.getItem("is_verified");

  

  if (idUser && username && is_verified === "1") {
    window.location.href = "http://localhost:3000/home";
  }

  if (idUser && username && is_verified === "0") {
    window.location.href = "http://localhost:3000/resend-email";
  }

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
            <>
              <Typography variant="h4">Photogram</Typography>
              <br />
              <br />
              <Typography variant="h6">Login to see what's inside</Typography>
              <Login />
            </>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeFront;
