// ProfileCard.jsx
import React from "react";
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

const ProfileCard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Card sx={{ width: 300, borderRadius: 4 }}>
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
            {user.friends.length}
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
  );
};

export default ProfileCard;
