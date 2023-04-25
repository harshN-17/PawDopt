import Post from '../models/posts.js';
import User from '../models/user.js';

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath, petName, petType, petAge, tags } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      userPicturePath: user.picturePath || "",
      picturePath: picturePath,
      paws: {},
      discussion: [],
      petName,
      petType,
      petAge,
      tags,
    });

    await newPost.save();
    // console.log(newPost);
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */

export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if(post) res.status(200).json([post]);
    else res.status(200).json({});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const searchPosts = async (req, res) => {
  try {
    const { tag } = req.params;
    const posts = await Post.find({ tags: { $all: [tag] }});
    res.status(200).json(posts); 
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.paws.get(userId);

    if (isLiked) {
      post.paws.delete(userId);
    } else {
      post.paws.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { paws: post.paws },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getLikedPost = async (req, res) => {
  try {
    const userId = req.params.id;
    // const posts = await Post.find({paws: paws.has(userId)});
  } catch (error) { 
    
  }
}


/* DELETE */

export const deletePost = async (req, res) => {
  try {
    const {id} = req.params;
    console.log(id);
    const post = await Post.findByIdAndDelete(id);
    console.log(post);
    if(!post) res.status(201).json({message: "nahi hua delete"});
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}