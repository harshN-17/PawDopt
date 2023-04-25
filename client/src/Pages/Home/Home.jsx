import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import AllPostsWidget from "../Widgets/AllPostsWidget";
import SearchWidget from "../Widgets/SearchWidget";
import { MutatingDots } from "react-loader-spinner";

const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  const searchVal = useSelector((state) => state.searchVal);
  return (
    <Box>
      <Navbar />
      <Box
        top="100px"
        position="relative"
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >

        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Box m="2rem 0" />
            <SearchWidget />
          </Box>
        )}

        <Box
          flexBasis={isNonMobileScreens ? "62%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <AllPostsWidget userId={_id} />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
