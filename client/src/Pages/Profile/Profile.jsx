import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserWidget from "../Widgets/UserWidget.jsx";
import MyPostWidget from "../Widgets/MyPostWidget.jsx";
import Navbar from "../Navbar/Navbar.jsx"
import ConnectListWidget from "../Widgets/ConnectListWidget.jsx";
import AllPostsWidget from "../Widgets/AllPostsWidget.jsx";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const curUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        top="100px"
        position="relative"
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <ConnectListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {
            curUser._id === userId &&
            <MyPostWidget picturePath={user.picturePath} />
          }
          <Box m="2rem 0" />
          <AllPostsWidget userId={userId} isProfile={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
