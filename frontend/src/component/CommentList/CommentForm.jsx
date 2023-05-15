import React, { useState } from 'react';
import { Card, CardContent, TextField, Button } from '@mui/material';

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(comment);
    setComment('');
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
          />
          <Button sx={{ mt: 3 }} variant="contained" color="primary" type="submit">
            Submit Comment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommentForm