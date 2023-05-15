import React from 'react';
import { Button, Box, Card, CardContent, CardMedia } from '@mui/material';

const ImageUploadForm = ({ selectedImage, setSelectedImage }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <Box mt={4}>
      <Card sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        {selectedImage && (
          <CardMedia sx={{
            width: 400,
            height: 400,
            objectFit: 'contain',
          }}
            xs={12}
            component="img" src={URL.createObjectURL(selectedImage)} />
        )}
        <CardContent>
          <input
            accept="image/*"
            id="image-upload"
            type="file"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="image-upload">
            <Button variant="contained" color="primary" component="span">
              Upload Image
            </Button>
          </label>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ImageUploadForm;
