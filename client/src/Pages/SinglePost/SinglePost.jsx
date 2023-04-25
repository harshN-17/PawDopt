import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PostWidget from '../Widgets/PostWidget';
import { useParams } from 'react-router-dom';
import { setAllPosts } from '../../state';

const SinglePost = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const {id} = useParams();

    // const [post, setPost] = useState();
   

    const getPost = async () => {
        const response = await fetch(`http://localhost:5000/posts/${id}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        });

         const data = await response.json();
        // setPost(data);
        dispatch(setAllPosts({posts: data}));
    
    };

    useEffect(() => {
            getPost();
        
    }, []);

    console.log("singlepost", posts);
 
  return (
    <div
      style={{
        display: "flex",
        
      }}
    >
      {posts.map(
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
          />
        )
      )}
    </ div>
  )
}

export default SinglePost
