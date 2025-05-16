// PostCard.js
import React, { useState } from 'react';
import {
  Box, Card, CardContent, Avatar, TextField, Button, IconButton, Typography,
} from '@mui/material';
import { Image, Audiotrack, AttachFile, VideoFile } from '@mui/icons-material';

const PostCard = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <Card sx={{ backgroundColor: '#1e1e1e', color: 'white', p: 2, width: 500 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src="/profile.jpg" />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="What's on your mind..."
            InputProps={{
              style: { backgroundColor: '#2e2e2e', color: 'white', borderRadius: 10 },
            }}
          />
        </Box>

        <Box
          mt={2}
          p={2}
          border="2px dashed #00bcd4"
          borderRadius={2}
          textAlign="center"
          sx={{ cursor: 'pointer' }}
          onClick={() => document.getElementById('imageInput').click()}
        >
          {image ? (
            <img src={image} alt="Uploaded" style={{ maxWidth: '100%' }} />
          ) : (
            <Typography variant="body2" color="#aaa">
              Add Image Here
            </Typography>
          )}
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Box display="flex" gap={2}>
            <IconButton color="primary"><Image /></IconButton>
            <IconButton color="primary"><VideoFile /></IconButton>
            <IconButton color="primary"><AttachFile /></IconButton>
            <IconButton color="primary"><Audiotrack /></IconButton>
          </Box>
          <Button variant="contained" sx={{ borderRadius: '20px' }}>
            POST
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
