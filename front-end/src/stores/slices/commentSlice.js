import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: [],
  previewComments: null,
  previewCommentLoading: false,
  // replies: [],
  loading: false,
  loadingFetchComments: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // Action for adding a new comment
    addComment(state) {
      state.loading = true;
    },
    addCommentSuccess(state, action) {
      state.loading = false;
      const {parentId} = action.payload;
      if (parentId) {
       const parentComment = state.comments.metadata.find(comment => comment.id === parentId);
       if(!parentComment.replies) {
          parentComment.replies = [];
       }
       parentComment.replies.push(action.payload);
      } else {
        state.comments['metadata'].unshift(action.payload);
      }
      
    },
    addCommentFailure(state) {
      state.loading = false;
    },

    // Action for fetching comments
    fetchComments(state) {
      state.loadingFetchComments = true;
    },
    fetchCommentsSuccess: (state, action) => {
      state.loadingFetchComments = false;
      state.comments = action.payload;
    },
    fetchCommentsFailure(state) {
      state.loadingFetchComments = false;
    },
    // get replies of a comment
    fetchReplies(state) {
      state.loading = true;
    },
    fetchRepliesSuccess(state, action) {
      console.log('🚀 ~ fetchRepliesSuccess ~ action:', action.payload);
      state.loading = false;
      const { parentId, replies } = action.payload;
      const parentComment = state.comments.metadata.find(comment => comment.id === parentId);
      parentComment.replies = replies;
      // }
    },

    fetchRepliesFailure(state) {
      state.loading = false;
    },

    // Action for updating a comment
    updateComment(state) {
      state.loading = true;
    },
    updateCommentSuccess(state, action) {
      state.loading = false;
      const updatedComment = action.payload;
      const index = state.comments['metadata'].findIndex((comment) => comment.id === updatedComment.id);
      if (index !== -1) {
        state.comments['metadata'][index] = updatedComment;
      }
    },
    updateCommentFailure(state) {
      state.loading = false;
    },

    // Action for deleting a comment
    deleteComment(state) {
      state.loading = true;
    },
    deleteCommentSuccess(state, action) {
      state.loading = false;
      state.comments['metadata'] = state.comments['metadata'].filter(
        (comment) => comment.id !== action.payload.cmtId,
      );
    },
    deleteCommentFailure(state) {
      state.loading = false;
    },
    fetchPreviewComments : state => {
      state.previewCommentLoading = true;
    },
    fetchPreviewSuccess : (state, action) => {
      state.previewCommentLoading = false;
      state.previewComments = action.payload;
    },
    fetchPreviewFailure : state => {
      state.previewCommentLoading = false;
    },
  },
});

export const {
  addComment,
  addCommentSuccess,
  addCommentFailure,
  fetchComments,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  fetchReplies,
  fetchRepliesSuccess,
  fetchRepliesFailure,
  updateComment,
  updateCommentSuccess,
  updateCommentFailure,
  deleteComment,
  deleteCommentSuccess,
  deleteCommentFailure,
  fetchPreviewComments,
  fetchPreviewSuccess,
  fetchPreviewFailure,
} = commentsSlice.actions;

export default commentsSlice.reducer;
