import FriendApi from "@/apis/FriendApi";
import { call, put } from "redux-saga/effects";
import { acceptFriendRequestFailure, acceptFriendRequestSuccess, addFriendRequestFailure, addFriendRequestSuccess, declineAddFriendReceivedFailure, declineAddFriendReceivedSuccess, fetchFriendRequestsFailure, fetchFriendRequestsSuccess, fetchMyFriendsFailure, fetchMyFriendsSuccess, fetchSentRequestsFailure, fetchSentRequestsSuccess, fetchSuggestedFriendsFailure, fetchSuggestedFriendsSuccess, removeSentFriendRequestFailure, removeSentFriendRequestSuccess } from "../slices/friendSlice";

export function* handleFetchMyFriends() {
  try {
    const data  = yield call(FriendApi.getAllMyFriends);
    yield put(fetchMyFriendsSuccess(data));
  } catch (error) {
    console.log("🚀 ~ function*handleFetchMyFriends ~ error:", error)
    yield put(fetchMyFriendsFailure());
  }
}

export function* handleFetchFriendRequests() {
    try {
        const data  = yield call(FriendApi.getFriendRequests);
        yield put(fetchFriendRequestsSuccess(data));
    } catch (error) {
        console.log("🚀 ~ function*handleFetchFriendRequests ~ error:", error)
        yield put(fetchFriendRequestsFailure());
    }
}

export function* handleAddFriendRequest({payload}) {
    try {
     yield call(FriendApi.addFriendRequest, payload.id);
        yield put(addFriendRequestSuccess(payload));
    } catch (error) {
        console.log("🚀 ~ function*addFriendRequest ~ error:", error)
        yield put(addFriendRequestFailure());
    }
}

export function* handleAcceptFriendRequest({payload}) {
    try {
        const response = yield call(FriendApi.acceptFriendRequest, payload);
        yield put(acceptFriendRequestSuccess(response));
    } catch (error) {
        console.log("🚀 ~ function*acceptFriendRequest ~ error:", error)
        yield put(acceptFriendRequestFailure());
    }
}


export function* handleDeclineFriendRequest({payload}) {
    try {
         yield call(FriendApi.declineAddFriendReceived, payload);
        yield put(declineAddFriendReceivedSuccess(payload));
    } catch (error) {
        console.log("🚀 ~ function*acceptFriendRequest ~ error:", error)
        yield put(declineAddFriendReceivedFailure());
    }
}





export function* handleFetchSentFriendRequests() {
    try {
        const data  = yield call(FriendApi.getSentFriendRequests);
        yield put(fetchSentRequestsSuccess(data));
    } catch (error) {
        console.log("🚀 ~ function*handleFetchFriendRequests ~ error:", error)
        yield put(fetchSentRequestsFailure());
    }
}

export function* handleRemoveSentFriendRequest({payload}) {
    try {
      yield call(FriendApi.removeSentFriendRequest, payload);
        yield put(removeSentFriendRequestSuccess(payload));
    } catch (error) {
        console.log("🚀 ~ function*handleRemoveSentFriendRequest ~ error:", error)
        yield put(removeSentFriendRequestFailure());
    }
}

export function* handleFetchSuggestedFriends() {
    try {
        const data  = yield call(FriendApi.getSuggestedFriends);
        yield put(fetchSuggestedFriendsSuccess(data));
    } catch (error) {
        console.log("🚀 ~ function*handleFetchSuggestedFriends ~ error:", error)
        yield put(fetchSuggestedFriendsFailure());
    }
}