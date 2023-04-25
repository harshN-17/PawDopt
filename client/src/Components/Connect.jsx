import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setConnects } from "../state/index.js";
import FlexBetween from "./FlexBetween.jsx";
import UserImage from "./UserImage.jsx";

const Connect = ({ connectId, name, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const connects = useSelector((state) => state.user.connects);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  // const main = palette.neutral.main;
  // const medium = palette.neutral.medium;
  // console.log("initial", connects)
  const isconnect = connects.find((connect) => connect._id === connectId);

  const patchconnect = async () => {
    const response = await fetch(
      `http://localhost:5000/users/${_id}/${connectId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setConnects({ connects: data }));
  };

  return (
    <FlexBetween
      sx={{
        backgroundColor: "white",
        backgroundColor: "white",
        padding: "5px 10px",
        opacity: "50%",
        borderRadius: "10px",
      }}
    >
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${connectId}`);
            navigate(0);
          }}
        >
          <Typography
            // color={palette.neutral.main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchconnect()}
        // sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isconnect ? (
          <PersonRemoveOutlined sx={{ color: "green" }} />
        ) : (
          <PersonAddOutlined sx={{ color: "red" }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Connect;
