import React from "react";
import { Box, Button, Grid, Link, Typography } from "@mui/material";

const SuccessVerification = () => {
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
        <Typography variant="h3">
          {" "}
          Your email has been verified successfully{" "}
        </Typography>
        <br />
        <Grid>
          {" "}
          <Button variant="contained">Login</Button>
        </Grid>
      </Box>
    </Grid>
  );
};

export default SuccessVerification;
