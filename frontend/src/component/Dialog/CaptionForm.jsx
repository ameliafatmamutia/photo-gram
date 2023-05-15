import React from 'react';
import { Box, Card, CardContent, TextField } from '@mui/material';

const CaptionForm = ({ caption, setCaption }) => {
  const handleCaptionChange = (e) => {
    const file = e.target.value;
    setCaption(file);
  };

  return (
    <Box mt={4}>
      <Card>
        <CardContent>
          <TextField fullWidth value={caption} onChange={e => handleCaptionChange(e)} label={"Caption"} multiline rows={3} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default CaptionForm;
