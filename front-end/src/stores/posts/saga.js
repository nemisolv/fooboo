import { takeLatest } from 'redux-saga/effects';
import { handleFetchPosts, handleGetPostsByUserId, handleReactionOnPost, handleUnReactOnPost } from './handle';
import { fetchPosts, reactOnPost, unReactOnPost } from '../slices/postSlice';
import { getUserProfilePosts } from '../slices/userSlice';

function* postSaga() {
  // fetch posts only once
  
  yield takeLatest(fetchPosts.type, handleFetchPosts);
  yield takeLatest(reactOnPost.type, handleReactionOnPost);
  yield takeLatest(unReactOnPost.type, handleUnReactOnPost);
  yield takeLatest(getUserProfilePosts.type, handleGetPostsByUserId);
}

export default postSaga;
