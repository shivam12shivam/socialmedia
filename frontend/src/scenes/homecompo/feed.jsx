// PostCard.js
import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  TextField,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { Image, Audiotrack, AttachFile, VideoFile } from "@mui/icons-material";
import { useSelector } from "react-redux";
import PostsFeed from "./AllPosts";
import axios from "axios";

const PostCard = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const user = useSelector((state) => state.auth.user);
  const [file, setFile] = useState(null);
  console.log("insid feed.jsx", user);
  const token = useSelector((state) => state.auth.token);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const handleclick = async () => {
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("description", description);
    if (file) {
      formData.append("picture", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/posts",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("response from backend", response);
      if (response.status === 201) {
        // Clear form
        setDescription("");
        setImage(null);
        setFile(null);
        alert("Post created successfully!");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
    }
  };

  return (
    <div className="">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          px: 2,
          justifyContent: { xs: "center", md: "flex-start" },
           // Shift left on desktop
        }}
      >
        <Card
          sx={{
            backgroundColor: "#1e1e1e",
            color: "white",
            p: 2,
            width: {
              xs: "100%",
              sm: "90%",
              md: "70%",
              lg: "77%",
              xl: "40%",
            },
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar src="/profile.jpg" />
              <TextField
                fullWidth
                variant="outlined"
                value={description}
                placeholder="What's on your mind..."
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                InputProps={{
                  style: {
                    backgroundColor: "#2e2e2e",
                    color: "white",
                    borderRadius: 10,
                  },
                }}
              />
            </Box>

            <Box
              mt={2}
              p={2}
              border="2px dashed #00bcd4"
              borderRadius={2}
              textAlign="center"
              sx={{ cursor: "pointer" }}
              onClick={() => document.getElementById("imageInput").click()}
            >
              {image ? (
                <img src={image} alt="Uploaded" style={{ maxWidth: "100%" }} />
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

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
              flexDirection={{ xs: "column", md: "row" }}
              gap={2}
            >
              <Box
                display="flex"
                gap={1}
                flexWrap="wrap"
                justifyContent={{ xs: "center", sm: "flex-start" }}
              >
                <IconButton color="primary">
                  <Image fontSize="small" />
                </IconButton>
                <IconButton color="primary">
                  <VideoFile fontSize="small" />
                </IconButton>
                <IconButton color="primary">
                  <AttachFile fontSize="small" />
                </IconButton>
                <IconButton color="primary">
                  <Audiotrack fontSize="small" />
                </IconButton>
              </Box>
              <Button
                onClick={handleclick}
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                POST
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <PostsFeed />
    </div>
  );
};

export default PostCard;
