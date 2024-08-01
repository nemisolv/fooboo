import { call, put } from 'redux-saga/effects';
import CommentApi from '@/apis/commentApi';
import {
  addCommentFailure,
  addCommentSuccess,
  deleteCommentFailure,
  deleteCommentSuccess,
  fetchCommentsFailure,
  fetchCommentsSuccess,
  fetchPreviewFailure,
  fetchPreviewSuccess,
  fetchRepliesFailure,
  fetchRepliesSuccess,
  updateCommentFailure,
  updateCommentSuccess,
} from '@/stores/slices/commentSlice.js';
import { adjustCommentCountByPost } from '@/stores/slices/postSlice';

function* handleFetchComments({ payload }) {
  try {
    const res = yield call(CommentApi.getComments, payload);
    yield put(fetchCommentsSuccess(res));
  } catch (error) {
    yield put(fetchCommentsFailure());
  }
}

function* handleFetchReplies({ payload }) {
  try {
    const res = yield call(CommentApi.getReplies, payload);
    const data = { replies: res.metadata, parentId: payload };
    yield put(fetchRepliesSuccess(data));
  } catch (error) {
    yield put(fetchRepliesFailure(error));
  }
}

function* handleAddComment({ payload }) {
  try {
    const { setIsReplying,postId } = payload;
    const res = yield call(CommentApi.addComment, payload);
    yield put(addCommentSuccess(res));
    yield put(adjustCommentCountByPost({ type: 'increment', postId }));
    if(setIsReplying) {
      setIsReplying(false);

    }
  } catch (error) {
    console.log("🚀 ~ function*handleAddComment ~ error:", error)
    yield put(addCommentFailure());
  }
}

function* handleUpdateComment({ payload }) {
  const { setIsUpdating } = payload;
  try {
    const res = yield call(CommentApi.updateComment, payload);
    yield put(updateCommentSuccess(res));
    setIsUpdating(false);
  } catch (error) {
    yield put(updateCommentFailure(error));
  }
}

function* handleDeleteComment({ payload }) {
  try {
    yield call(CommentApi.deleteComment, payload.cmtId);
    yield put(deleteCommentSuccess(payload));
    yield put(adjustCommentCountByPost({ type: 'decrement', postId: payload.postId }));
  } catch (error) {
    yield put(deleteCommentFailure(error));
  }
}

export function* handleFetchPreviewComments({payload}) {
  try {
   const response =  yield call(CommentApi.fetchPreviewComments, payload);
    yield put(fetchPreviewSuccess(response));
  }catch(error) {
    console.log("🚀 ~ file: handle.js ~ line 79 ~ function*handleFetchPreviewComments ~ error", error)
    yield put(fetchPreviewFailure());
}
}

export { handleAddComment, handleFetchComments, handleFetchReplies, handleUpdateComment, handleDeleteComment };
