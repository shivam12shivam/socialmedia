// PostsFeed.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const PostsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts', { // to post and get we have same routes but just get and post is different
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [token]);

  if (loading) {
    return <Typography>Loading posts...</Typography>;
  }

  return (
    <Box sx={{ mt: 4, width: 500 }}>
      {posts.map((post) => (
        <Card key={post._id} sx={{ mb: 3, backgroundColor: '#1e1e1e', color: 'white' }}>
          <CardContent>
            {/* Post Header */}
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar src={post.userPicturePath} />
              <Box ml={2}>
                <Typography variant="subtitle1">
                  {post.firstName} {post.lastName}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {post.location}
                </Typography>
              </Box>
            </Box>

            {/* Post Description */}
            <Typography variant="body1" mb={2}>
              {post.description}
            </Typography>

            {/* Post Image */}
            {post.picturePath && (
              <img
                src={`http://localhost:3000${post.picturePath}`}
                alt="Post content"
                style={{ width: '100%', borderRadius: 8, marginBottom: 16 }}
              />
            )}

            {/* Post Actions */}
            <Box display="flex" alignItems="center">
              <IconButton>
                <FavoriteBorderIcon sx={{ color: 'white' }} />
                <Typography ml={1} color="white">
                  {Object.keys(post.likes).length}
                </Typography>
              </IconButton>
              
              <IconButton sx={{ ml: 2 }}>
                <ChatBubbleOutlineIcon sx={{ color: 'white' }} />
                <Typography ml={1} color="white">
                  {post.comments.length}
                </Typography>
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PostsFeed;