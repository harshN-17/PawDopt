import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  Opacity,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../Components/FlexBetween";
import Connect from "../../Components/Connect";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state/index.js";
import { Navigate, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

// import FaPaw from 'react-icons'

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  picturePath,
  userPicturePath,
  paws,
  discussion,
  petName,
  petType,
  petAge,
  tags,
  mobile,
  canDelete,
}) => {
  const [isdiscussion, setIsdiscussion] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const ispawd = Boolean(paws[loggedInUserId]);
  const pawCount = Object.keys(paws).length;
  const navigate = useNavigate();

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchpaw = async () => {
    const response = await fetch(`http://localhost:5000/posts/${postId}/paws`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const deletePost = async () => {
    const response = await fetch(`http://localhost:5000/posts/delete/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: null
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  console.log(picturePath)

  return (
    <div
      className="post--card"
      style={{ backgroundColor: main }}
    >
      <Connect
        connectId={postUserId}
        name={name}
        userPicturePath={userPicturePath}
      />

      <Typography
        color={primary}
        sx={{
          mt: "1rem",
          // border: "2px solid red",
        }}
        style={{
          fontSize: "1.3em",
          backgroundColor: "white",
          padding: "3px 10px",
          opacity: "50%",
          borderRadius: "10px",
          margin: "10px 0px",
        }}
      >
        {description}
      </Typography>

      <div className="post--pic--container">
        {picturePath ? (
          <img
            alt="post"
            src={`http://localhost:5000/assets/${picturePath}`}
            className="post--pic"
          />
        ) : 
          <img 
            alt="post"
            src={`http://localhost:5000/assets/husky.jpg`}
            className="post--pic"
          /> 
        }

        <Typography
          style={{
            fontSize: "1.3em",
            backgroundColor: "white",
            padding: "3px 10px",
            opacity: "80%",
            borderRadius: "0 0 0.75rem 0.75rem",
            bottom: "0px",
            position: "absolute",
            width: "100%"
          }}
        >
          {petName}, {petAge}, {petType}
        </Typography>
      </div>
      <span
        style={{
          fontSize: "1.2em",
          marginRight: "5px"
        }}
      >
        Tags:
      </span >

      {
        tags.map((tag) => (
          <Typography
            style={{
              // border:"2px solid red",
              display: "inline-block",
              width: "auto",
              marginRight: "1em",
              padding: "3px 5px",
              borderRadius: "7px",
              backgroundColor: "white",
              marginTop: "5px",
            }}
          >
            {tag}
          </Typography>
        ))
      }


      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchpaw}>
              {ispawd ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{pawCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsdiscussion(!isdiscussion)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{discussion.length}</Typography>
          </FlexBetween>

          {canDelete &&
            <IconButton onClick={() => deletePost()}>
              <DeleteIcon />
            </IconButton>
          }
        </FlexBetween>

        <IconButton onClick={() => navigate(`/post/${postId}`)}>
          <ShareOutlined />
        </IconButton>

      </FlexBetween>
      {isdiscussion && (
        <Box mt="0.5rem">
          {discussion.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}

    </div>
  );
};

export default PostWidget;
