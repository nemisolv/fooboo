import UserApi from "@/apis/userApi";
import { call, put } from "redux-saga/effects";
import { getUserProfileFailure, getUserProfileSuccess, updateUserProfileSuccess } from "../slices/userSlice";
import { updateProfile, updateProfileFailure, updateProfileSuccess } from "../slices/authSlice";
import { toast } from "react-toastify";

export function* handleGetUserProfile({payload}) {
    try {
        const response = yield call(UserApi.getUserProfile, payload);
        yield put(getUserProfileSuccess(response));
    } catch (error) {
        yield put(getUserProfileFailure());
    }
}
export function* handleUpdateUserProfile({payload}) {
    try {
        yield call(UserApi.updateUserProfile, payload);
        yield put(updateProfileSuccess(payload));
        yield put(updateUserProfileSuccess(payload));
        toast.success("Profile updated successfully");
    } catch (error) {
        yield put(updateProfileFailure());
    }
}

