// PostsFeed.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { setFriends } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const PostsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const friends = currentUser?.friends || [];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [token]);

  if (loading) {
    return <Typography>Loading posts...</Typography>;
  }

  const toggleFriend = async (authorId) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/users/${currentUser._id}/friends/${authorId}`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // res.data should be the updated friends array:
      dispatch(setFriends(res.data));
    } catch (err) {
      console.error("Could not update friends:", err);
    }
  };

  return (
    <Box sx={{ mt: 4, width: 500 }}>
      {posts.map((post) => {
        // ← compute the correct asset path here:
        const imageUrl = post.picturePath.startsWith("/assets/")
          ? post.picturePath
          : `/assets/${post.picturePath}`;

        return (
          <Card
            key={post._id}
            sx={{ mb: 3, backgroundColor: "#1e1e1e", color: "white" }}
          >
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
                <IconButton
                  onClick={() => toggleFriend(post.userId)}
                  sx={{ ml: "auto" }}
                >
                  {friends.includes(post.userId) ? (
                    <PersonRemoveIcon sx={{ color: "#f44336" }} />
                  ) : (
                    <PersonAddIcon sx={{ color: "#4caf50" }} />
                  )}
                </IconButton>
              </Box>

              {/* Post Description */}
              <Typography variant="body1" mb={2}>
                {post.description}
              </Typography>

              {/* Post Image */}
              {post.picturePath && (
                <img
                  src={`http://localhost:3000${imageUrl}`}
                  alt="Post content"
                  style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
                />
              )}

              {/* Post Actions */}
              <Box display="flex" alignItems="center">
                <IconButton>
                  <FavoriteBorderIcon sx={{ color: "white" }} />
                  <Typography ml={1} color="white">
                    {Object.keys(post.likes).length}
                  </Typography>
                </IconButton>

                <IconButton sx={{ ml: 2 }}>
                  <ChatBubbleOutlineIcon sx={{ color: "white" }} />
                  <Typography ml={1} color="white">
                    {post.comments.length}
                  </Typography>
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default PostsFeed;
