import PostApi from '@/apis/postApi';
import { fetchPostsFailure, fetchPostsSuccess, reactOnPostFailure, reactOnPostSuccess, unReactOnPostFailure, unReactOnPostSuccess } from '@/stores/slices/postSlice';
import { call, put } from 'redux-saga/effects';
import { getUserProfilePosts, getUserProfilePostsFailure, getUserProfilePostsSuccess } from '../slices/userSlice';

function* handleFetchPosts() {
  try {
    const res = yield call(PostApi.fetchPosts);
    yield put(fetchPostsSuccess(res?.metadata));
  } catch (error) {
    console.log('🚀 ~ function*handleFetchPosts ~ error:', error);
    yield put(fetchPostsFailure());
  }
}


function* handleReactionOnPost({ payload }) {
  try {
   const res =   yield call(PostApi.reactOnPost, payload);
    yield put(reactOnPostSuccess(res));
  } catch (error) {
    yield put(reactOnPostFailure());
  }
}

export function* handleUnReactOnPost({payload}) {
  try {
    yield call(PostApi.unReactOnPost, payload);
    yield put(unReactOnPostSuccess(payload));
  } catch (error) {
    yield put(unReactOnPostFailure());
  }

}

export function* handleGetPostsByUserId({payload}) {
  try {
    const res = yield call(PostApi.fetchPostsByUserId, payload);
    yield put(getUserProfilePostsSuccess(res));
  } catch (error) {
    yield put(getUserProfilePostsFailure());
  }
}

export { handleFetchPosts, handleReactionOnPost};
