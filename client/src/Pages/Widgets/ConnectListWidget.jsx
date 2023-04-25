import { Box, Typography, useTheme } from "@mui/material";
import Connect from "../../Components/Connect";
import WidgetWrapper from "../../Components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConnects } from "../../state/index";

const ConnectListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  // const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const connects = useSelector((state) => state.user.connects);

  const getConnects = async () => {
    const response = await fetch(
      `http://localhost:5000/users/${userId}/connects`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setConnects({ connects: data }));
    // console.log(data);
    console.log(connects);
  };


  useEffect(() => {
    getConnects();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(connects);

  return (
    <WidgetWrapper>
      <Typography
        // color={palette.neutral.dark}
        // variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Connect List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {connects.map(
          ({
            _id,
            firstName,
            lastName,
            picturePath
          }) => (
          <Connect
            key={_id}
            connectId={_id}
            name={`${firstName} ${lastName}`}
            userPicturePath={picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default ConnectListWidget;
