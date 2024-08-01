import { takeLatest } from "redux-saga/effects";
import { getUserProfile } from "../slices/userSlice";
import { handleGetUserProfile, handleUpdateUserProfile } from "./handle";
import { updateProfile } from "../slices/authSlice";

export default function* userSaga() {
    yield takeLatest(getUserProfile.type, handleGetUserProfile);
    yield takeLatest(updateProfile.type, handleUpdateUserProfile);
}