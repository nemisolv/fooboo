import { takeLatest } from "redux-saga/effects";
import { acceptFriendRequest, addFriendRequest, declineAddFriendReceived, fetchFriendRequests, fetchMyFriends, fetchSentRequests, fetchSuggestedFriends, removeSentFriendRequest } from "../slices/friendSlice";
import {   handleAcceptFriendRequest, handleAddFriendRequest, handleDeclineFriendRequest, handleFetchFriendRequests, handleFetchMyFriends, handleFetchSentFriendRequests, handleFetchSuggestedFriends, handleRemoveSentFriendRequest } from "./handle";

export default function* FriendSaga() {
    yield takeLatest(fetchMyFriends.type, handleFetchMyFriends);
    yield takeLatest(fetchFriendRequests.type, handleFetchFriendRequests);
    yield takeLatest(addFriendRequest.type, handleAddFriendRequest);
    yield takeLatest(acceptFriendRequest.type, handleAcceptFriendRequest)
    yield takeLatest(declineAddFriendReceived.type, handleDeclineFriendRequest)
    yield takeLatest(removeSentFriendRequest.type,handleRemoveSentFriendRequest)
    yield takeLatest(fetchSentRequests.type, handleFetchSentFriendRequests);
    yield takeLatest(fetchSuggestedFriends.type, handleFetchSuggestedFriends);

}