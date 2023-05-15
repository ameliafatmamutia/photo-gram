import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

const PreviewImage = ({ selectedImage, caption }) => {
  return (
    <Box mt={4}>
      <Card sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <CardMedia sx={{
          width: 400,
          height: 400,
          objectFit: 'contain',
        }}
          xs={12}
          component="img" src={URL.createObjectURL(selectedImage)} />
        <CardContent>
          <Typography>{caption}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PreviewImage;
