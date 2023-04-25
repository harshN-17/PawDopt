import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";

  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import UserImage from "../../Components/UserImage";
  import FlexBetween from "../../Components/FlexBetween";
  import WidgetWrapper from "../../Components/WidgetWrapper";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    // const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    // const dark = palette.neutral.dark;
    // const medium = palette.neutral.medium;
    // const main = palette.neutral.main;
  
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
  
    if (!user) {
      return null;
    }
  
    const {
      firstName,
      lastName,
      connects,
      gender,
      mobile, 
      age,
    } = user;
  
    return (
      <WidgetWrapper>
        {/* FIRST ROW */}
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} />
            <Box>
              <Typography
                // variant="h4"
                // color={dark}
                // fontWeight="500"
                sx={{
                  "&:hover": {
                    // color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography color={"gray"}>{connects.length} connects</Typography>
            </Box>
          </FlexBetween>
          <ManageAccountsOutlined />
        </FlexBetween>
  
        <Divider />
  
        {/* SECOND ROW */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: "yellow" }} />
            <Typography color={"darkblue"}>"location"</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: "yellow" }} />
            <Typography color={"black"}>{gender}</Typography>
          </Box>
        </Box>
  
        <Divider />
  
        {/* THIRD ROW */}
        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={"yellow"}>Age: </Typography>
            <Typography color={"yellow"} fontWeight="500">
              {age}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={"green"}>Mobile: </Typography>
            <Typography color={"green"} fontWeight="500">
              {mobile}
            </Typography>
          </FlexBetween>
        </Box>

      </WidgetWrapper>
    );
  };
  
  export default UserWidget;
  