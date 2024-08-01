import { all, fork } from 'redux-saga/effects';
import authSaga from './auth/saga';
import postSaga from './posts/saga';
import commentSaga from '@/stores/comment/saga.js';
import friendSaga from './friend/saga';
import conversationSaga from './conversation/saga';
import notifySaga from './notification/saga';
import userSaga from './user/saga';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(postSaga),
    fork(commentSaga),
    fork(friendSaga),
    fork(conversationSaga),
    fork(notifySaga),
    fork(userSaga),
    // fork(userSaga),
    // fork(commentSaga),
    // fork(likeSaga),
    // fork(followSaga),
    // fork(searchSaga),
    // fork(notiSaga),
  ]);
}

export default rootSaga;