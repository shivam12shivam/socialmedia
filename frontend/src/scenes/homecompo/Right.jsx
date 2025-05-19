// FriendsList.jsx

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import axios from "axios";
import { useSelector } from "react-redux";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const friend = useSelector((state) => state.auth.user?.firends);
  const fetchFriends = async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/users/${user._id}/friends`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setFriends(res.data);
    } catch (err) {
      console.error("Failed to load friends", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFriend = async (friendId) => {
    try {
      await axios.patch(
        `http://localhost:3000/users/${user._id}/friends/${friendId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      fetchFriends();
    } catch (err) {
      console.error("Failed to add/remove friend", err);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, [user?._id,friend]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={2}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <Box p={2} sx={{ backgroundColor: "#121212", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom color="white">
        Friend List
      </Typography>
      <Divider sx={{ mb: 1, backgroundColor: "#333" }} />
      <List>
        {friends.map((f) => (
          <ListItem
            key={f._id}
            secondaryAction={
              <IconButton edge="end" onClick={() => toggleFriend(f._id)}>
                {/* assume if they are in list then “remove” */}
                <PersonRemoveIcon sx={{ color: "#Ff0000" }} />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar src={`http://localhost:3000${f.picturePath}`} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography color="white">{`${f.firstName} ${f.lastName}`}</Typography>
              }
              secondary={
                <Typography variant="body2" color="gray">
                  {f.occupation}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FriendsList;
