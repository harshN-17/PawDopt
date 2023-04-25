import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    onePost: [],
    searchVal: [],
    isLoading: false,
}

export const authSlice = createSlice({
    name: "auth", 
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },  
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setAllPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.post._id) return action.payload.post;
                else return post;
            });
            state.posts = updatedPosts;
        },
        setConnects: (state, action) => {
            if(state.user) {
                state.user.connects = action.payload.connects;
            }
            else {
                console.error("user friends dont exist");
            }
        },
        setOnePost: (state, action) => {
            if(state.user) {
                state.user.onePost = action.payload.onePost;
            }
            else console.error("post doesnt exist");
        },
        setSearchVal: (state, action) => {
            state.searchVal = action.payload.searchVal;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload.isLoading;
        }
    }
})

export const { setMode, setLogin, setLogout, setAllPosts, setPost, setConnects, setOnePost, setSearchVal, setIsLoading } = authSlice.actions;

export default authSlice.reducer;