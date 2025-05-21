import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  Divider,
  IconButton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
function ProfilePage() {
  const user = useSelector((state) => state.auth.user);
  const friends = useSelector((state) => state.auth.user?.friends || []);
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(
        `https://socialmedia-q2vx.onrender.com/posts/${userId}/posts`,
        {
          withCredentials: true,
        }
      );
      setPosts(res.data);
      console.log("profile page posts data", res.data);
    };

    fetchdata();
  }, []);

  return (
    <div className=" flex flex-row md:gap-x-48 px-1 md:p-4 pt-6">
      <div className="justify-start">
        <Card
          sx={{
            width: {
              xs: "70%",
              sm: 100,
              md: 300,
              lg: 400,
            },
            borderRadius: 4,
          }}
        >
          <CardContent>
            {/* Avatar and Name */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                mb: 2,
              }}
            >
              <Avatar
                src={`${user.picturePath}`} // picture add in folder is left
                sx={{ width: 80, height: 80, mb: 1 }}
              />
              <Typography variant="h6">{user.firstName}</Typography>
              <Typography variant="body2" color="text.secondary">
                Friends: {friends.length}
              </Typography>
            </Box>

            {/* Location and Title */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">{user.location}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <WorkIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">{user.occupation}</Typography>
            </Box>

            {/* Stats */}
            <Divider />
            <Box sx={{ my: 2 }}>
              <Typography variant="body2">Who's viewed your profile</Typography>
              <Typography fontWeight="bold">{user.viewedProfile}</Typography>
              <Typography variant="body2">Impressions of your post</Typography>
              <Typography fontWeight="bold">{user.impressions}</Typography>
            </Box>
            <Divider />

            {/* Social Profiles */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Social Profiles
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TwitterIcon sx={{ mr: 1 }} />
                  <Box>
                    <Typography>Twitter</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Social Network
                    </Typography>
                  </Box>
                </Box>
                <IconButton size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LinkedInIcon sx={{ mr: 1 }} />
                  <Box>
                    <Typography>Linkedin</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Network Platform
                    </Typography>
                  </Box>
                </Box>
                <IconButton size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>
      <div className=" justify-start md:justify-center">
        <Box
          sx={{
            mt: 4,
            width: {
              xs: "100%",
              sm: 400,
              md: 400,
              lg: 600,
            },
          }}
        >
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
                  </Box>

                  {/* Post Description */}
                  <Typography variant="body1" mb={2}>
                    {post.description}
                  </Typography>

                  {/* Post Image */}
                  {post.picturePath && (
                    <img
                      src={`https://socialmedia-q2vx.onrender.com${imageUrl}`}
                      alt="Post content"
                      style={{
                        width: "100%",
                        borderRadius: 8,
                        marginBottom: 16,
                      }}
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
      </div>
    </div>
  );
}

export default ProfilePage;
