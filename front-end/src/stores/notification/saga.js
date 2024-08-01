import { takeLatest } from "redux-saga/effects";
import { addNotification, getAllNotifications, markAllAsSeen, markAsSeen } from "../slices/notificationSlice";
import { handleCreateNotification, handleGetAllNotifications, handleMarkAllAsSeen, handleMarkAsSeen } from "./handle";

export default function* notifySaga() {
    yield takeLatest(getAllNotifications.type, handleGetAllNotifications);
    yield takeLatest(addNotification.type, handleCreateNotification);
    yield takeLatest(markAsSeen.type, handleMarkAsSeen);
    yield takeLatest(markAllAsSeen.type, handleMarkAllAsSeen);
}