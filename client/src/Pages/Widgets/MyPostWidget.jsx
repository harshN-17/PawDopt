import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
  } from "@mui/material";
  import FlexBetween from "../../Components/FlexBetween";
  import UserImage from "../../Components/UserImage";
  import WidgetWrapper from "../../Components/WidgetWrapper";
  import { setAllPosts } from "../../state/index";
  import Dropzone from "react-dropzone";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  
  const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const [petName, setPetName] = useState("");
    const [petAge, setPetAge] = useState();
    const [petType, setPetType] = useState();
    const [tag, setTag] = useState([]);

    const { palette } = useTheme();
    const user = useSelector((state) => state.user);
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = "red"//palette.neutral.mediumMain;
    const medium = "yellow" // palette.neutral.medium;
  
    const handlePost = async () => {
      console.log("tag" , tag);
      const tags = tag.split(/(\s+)/).filter( e => e.trim().length > 0);
      console.log(tags);
      const formData = new FormData();
      formData.append('userId', _id);
      formData.append("description", post);
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }
      formData.append("petName", petName);
      formData.append("petType", petType);
      formData.append("petAge", petAge);
      for (var i = 0; i < tags.length; i++) {
        formData.append('tags[]', tags[i]);
      }
 
      for(let obj of formData) console.log(obj)

      const response = await fetch(`http://localhost:5000/post`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const posts = await response.json();
      console.log(posts);

      dispatch(setAllPosts({ posts }));
      setImage(null);
      setPost("");
      setPetAge();
      setPetName("");
      setTag([]);
      setPetType();
    };
  
    return (
      <WidgetWrapper>
        <FlexBetween gap={"2rem"}>
          <UserImage image={picturePath} />
          <Typography>{user.firstName} {user.lastName}</Typography>
        </FlexBetween>

        <InputBase
          placeholder="Pet Name"
          onChange={(e) => setPetName(e.target.value)}
          value={petName}
          sx={{
            width: "100%",
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}  
        />
        
        <InputBase
          placeholder="Pet Age"
          onChange={(e) => setPetAge(e.target.value)}
          value={petAge}
          sx={{
            width: "100%",
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}  
        />
        
        <InputBase
          placeholder="Pet Type"
          onChange={(e) => setPetType(e.target.value)}
          value={petType}
          sx={{
            width: "100%",
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}  
        />

        <InputBase
          placeholder="Describe your pet..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
          //   backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />

        <InputBase
          placeholder="Add tags seperated with spaces"
          onChange={(e) => setTag(e.target.value)}
          value={tag}
          sx={{
            width: "100%",
          //   backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />



        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}
  
        <Divider sx={{ margin: "1.25rem 0" }} />
  
        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>
           
          <Button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default MyPostWidget;
  