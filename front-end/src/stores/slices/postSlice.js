import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: undefined,
    reactions: null,
    loading: false,
  },
  reducers: {
    fetchPosts: (state) => {
      state.loading = true;
    },
    fetchPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure: (state) => {
      // state.loading = false;
    },
    createPost: (state) => {
      state.loading = true;
    },
    createPostSuccess: (state, action) => {
      state.loading = false;
      state.posts = [action.payload, ...state.posts];
    },
    createPostFailure: (state) => {
      state.loading = false;
    },
    updatePost: (state) => {
      state.loading = true;
    },
    updatePostSuccess: (state, action) => {
      state.loading = false;
      state.posts = state.posts.map((post) => (post.id === action.payload.id ? action.payload : post));
      state.error = null;
    },
    updatePostFailure: (state) => {
      state.loading = false;
    },
    deletePost: (state) => {
      state.loading = true;
    },
    deletePostSuccess: (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    deletePostFailure: (state) => {
      state.loading = false;
    },


    // handle reaction
    reactOnPost: (state) => {
      state.loading = true;
    },
    reactOnPostSuccess: (state, action) => {
      state.loading = false;
      const {id, postId, type, user} = action.payload;
      // const {postId,reactionType, userId, isReacted, id} = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      const reaction = post.reactions?.find((reaction) => reaction.user.id === user.id);
      if (reaction) {
        reaction.type = type.toLowerCase();
        // reaction.user = user;
        reaction.id = id;
        // if(!isReacted) {
        //   post.reactionsCount = post.reactionsCount + 1;
        // }
        
      }else if(post.reactionsCount ===0) {
        // no reaction found, add new reaction
        post.reactions = [ {id, 
          type: type.toLowerCase()
          
          , user}];
        post.reactionsCount = 1;
      }else {
        post.reactions = [...post.reactions, {id, type: type.toLowerCase(), user}];
        post.reactionsCount = post.reactionsCount + 1;
      }
    },
    reactOnPostFailure: (state) => {
      state.loading = false;
    },
    unReactOnPost: (state) => {
      state.loading = true;
    },
    unReactOnPostSuccess: (state, action) => {
      state.loading = false;
      const {postId, userId} = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      const reaction = post.reactions?.find((reaction) => reaction.user.id === userId);
      if (reaction) {
        post.reactions = post.reactions.filter((reaction) => reaction.user.id !== userId);
        post.reactionsCount = post.reactionsCount - 1;
      }
    },
    unReactOnPostFailure: (state) => {
      state.loading = false;
    },

    adjustCommentCountByPost: (state, action) => {

      const {type, postId} = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if(type === 'increment') {
        post.commentsCount = post.commentsCount + 1;
      }else if(type === 'decrement') {
        post.commentsCount = post.commentsCount -1;
      }
    }


  },
});

export const {
  fetchPosts,
  fetchPostsSuccess,
  fetchPostsFailure,
  createPost,
  createPostSuccess,
  createPostFailure,
  updatePost,
  updatePostSuccess,
  updatePostFailure,
  deletePost,
  deletePostSuccess,
  deletePostFailure,
  reactOnPost,
  reactOnPostSuccess,
  reactOnPostFailure,
  unReactOnPost,
  unReactOnPostSuccess,
  unReactOnPostFailure,
  adjustCommentCountByPost
} = postSlice.actions;

export default postSlice.reducer;
