import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String, 
    description: String,
    picturePath: {
      type: String,
    },
    userPicturePath: String,
    paws: {
      type: Map,
      of: Boolean,
    },
    discussion: {
      type: Array,
      default: [],
    },
    petName: String,
    petType: String,
    petAge: Number,
    tags: {
      type: Array,
      default: []
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;