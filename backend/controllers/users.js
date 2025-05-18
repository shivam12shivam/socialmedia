import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    console.log("friendId", friendId);
    console.log("userId", id);
    console.log("userId", id);
    const friend = await User.findById(friendId);
    console.log("friendId", friendId);5
    if (!user) {
      console.log("inside addremovefriend, user not found");
      return res.status(404).json({ message: "User not found" });
    }
    if (!friend) {
      console.log("inside addremovefriend, friend not found");
      return res.status(404).json({ message: "Friend user not found" });
    }

    if (user.friends.includes(friendId)) {
      console.log("inside addremove friend");
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    console.log("user", user);
    console.log("friend", friend);
    await user.save();
    await friend.save();
    const updatedFriends = await Promise.all(
      user.friends.map((fid) => User.findById(fid))
    );
    const formatted = updatedFriends.map((u) => ({
      _id: u._id,
      firstName: u.firstName,
      lastName: u.lastName,
      occupation: u.occupation,
      location: u.location,
      picturePath: u.picturePath,
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.log("inside addremove friend error");
    res.status(404).json({ message: err.message });
  }
};
