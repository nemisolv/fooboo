import { handleAddComment, handleDeleteComment, handleFetchComments, handleFetchPreviewComments, handleFetchReplies, handleUpdateComment } from '@/stores/comment/handle.js';
import { addComment, deleteComment, fetchComments, fetchPreviewComments, fetchReplies, updateComment } from '@/stores/slices/commentSlice.js';
import { takeLatest } from 'redux-saga/effects';

function* commentSaga() {
  yield takeLatest(addComment.type, handleAddComment);
  yield takeLatest(fetchComments.type,handleFetchComments);
  yield takeLatest(fetchReplies.type,handleFetchReplies);
  yield takeLatest(updateComment.type,handleUpdateComment);
  yield takeLatest(deleteComment.type,handleDeleteComment);
  yield takeLatest(fetchPreviewComments.type, handleFetchPreviewComments)
}

export default commentSaga;