import express from "express";
import { getFeedPosts, getUserPosts, likePost, getSinglePost, deletePost, searchPosts } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const postRouter = express.Router();


postRouter.get('/', verifyToken, getFeedPosts);
postRouter.get('/:id', getSinglePost);
postRouter.get('/:userId/posts', verifyToken, getUserPosts);
postRouter.patch("/:id/paws", verifyToken, likePost);
postRouter.delete('/delete/:id', verifyToken, deletePost);
postRouter.get('/search/:tag', verifyToken, searchPosts);

export default postRouter;