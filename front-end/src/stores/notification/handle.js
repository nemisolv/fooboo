import NotificationApi from "@/apis/notificationApi";
import { call, put } from "redux-saga/effects";
import {  addNotificationSuccess, deleteNotificationSuccess, getAllNotificationsFailure, getAllNotificationsSuccess, markAllAsSeenSuccess, markAsSeenSuccess } from "../slices/notificationSlice";

export function* handleGetAllNotifications() {
  try {
    const response = yield call(NotificationApi.getAll);
    yield put(getAllNotificationsSuccess(response));
  } catch (error) {
    console.log("🚀 ~ function*handleGetAllNotifications ~ error:", error)
    yield put(getAllNotificationsFailure());
  }
}

export function* handleCreateNotification({payload}) {
  try {
   const response =  yield call(NotificationApi.createNotification, payload);
    yield call(addNotificationSuccess(response));
  } catch (error) {
    console.log("🚀 ~ function*handleCreateNotification ~ error:", error)
  }
}

export function* handleMarkAsSeen({payload}) {
  try {
    yield call(NotificationApi.markAsSeen, payload);
    yield put(markAsSeenSuccess(payload));
  } catch (error) {
    console.log("🚀 ~ function*handleMarkAsSeen ~ error:", error)
  }
}

export function* handleMarkAllAsSeen() {
  try {
    yield call(NotificationApi.markAllAsSeen);
    yield put(markAllAsSeenSuccess());
  } catch (error) {
    console.log("🚀 ~ function*handleMarkAllAsSeen ~ error:", error)
  }
}

export function* handleDeleteNotification({payload}) {
  try {
    yield call(NotificationApi.deleteNotification, payload);
    yield put(deleteNotificationSuccess(payload));
  } catch (error) {
    console.log("🚀 ~ function*handleDeleteNotification ~ error:", error)
  }
}