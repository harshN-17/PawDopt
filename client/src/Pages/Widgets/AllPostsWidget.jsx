import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts, setIsLoading } from "../../state/index";
import PostWidget from "./PostWidget";
import { circularProgressClasses } from "@mui/material";
import {MutatingDots} from 'react-loader-spinner';

const AllPostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const curUser = useSelector((state) => state.user);
  const searchVal = useSelector((state) => state.searchVal);
  const isLoading = useSelector((state) => state.isLoading);

  const getPosts = async () => {
    dispatch(setIsLoading({isLoading: true}));
    const response = await fetch("http://localhost:5000/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    data.reverse();
    // console.log(data);
    dispatch(setAllPosts({ posts: data }));
    dispatch(setIsLoading({isLoading: false}));
  };

  const getUserPosts = async () => {
    dispatch(setIsLoading({isLoading: true}));
    const response = await fetch(
      `http://localhost:5000/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    data.reverse();
    // console.log(data);
    dispatch(setAllPosts({ posts: data }));
    dispatch(setIsLoading({isLoading: false}));
  };

  const getSearch = async () => {
    dispatch(setIsLoading({ isLoading: true }));
    const response = await fetch(`http://localhost:5000/posts/search/${searchVal}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`},
    });

    const data = await response.json();
    data.reverse();
    dispatch(setAllPosts({posts: data}));
    dispatch(setIsLoading({isLoading: false}));
  }
  
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else if(searchVal) {
      console.log(searchVal)
      getSearch();
    } else {
      getPosts();
    }
  }, [searchVal]); // eslint-disable-line react-hooks/exhaustive-deps
  
  
  console.log(isLoading)

  return (
    <div className="post--container">
      { isLoading ? 
      <MutatingDots 
        height="100"
        width="100"
        color="#4fa94d"
        secondaryColor= '#4fa94d'
        radius='10.5'
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      /> :
      posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          picturePath,
          userPicturePath,
          paws,
          discussion,
          petName,
          petType,
          petAge,
          tags,
          mobile
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            paws={paws}
            discussion={discussion}
            petName = {petName}
            petType = {petType}
            petAge = {petAge}
            tags={tags}
            mobile={mobile}
            canDelete = {curUser._id === userId}
          />
        ))
      }
    </ div>
  );
};

export default AllPostsWidget;
