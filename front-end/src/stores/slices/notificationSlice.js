import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    notifications: [],
    unReadCount: 0,
    open: false,
    loading: true,
    playSound: true,

}

const noficationSlice = createSlice({
    name: 'notification',    
    
    initialState,
    reducers: {
        getAllNotifications: state => {
            state.loading = true;
        },
        getAllNotificationsSuccess: (state, {payload}) => {
            state.notifications = payload;
            state.loading = false;
        },
        getAllNotificationsFailure: state => {
            state.loading = false;
        },
        addNotification: (state) => {
            // state.loading = false;
        },
        addNotificationSuccess: (state, {payload}) => {
            state.notifications.unshift(payload);
            state.unReadCount += 1;
            state.loading = false;
        },

        turnOffSound: (state) => {
            state.playSound = false;
        },
        toggleOpen: (state) => {
            state.open = !state.open;
        },

        getNumberUnread: (state) => {
            state.unReadCount = state.notifications.filter(noti => !noti.seen).length;
        },


        markAsSeen: () => {
            // state.loading = false;
        },
        markAsSeenSuccess: (state, {payload}) => {
            state.notifications = state.notifications.map(noti => {
                if(noti.id === payload) {
                    return {...noti, seen: true}
                }
                return noti;
            })
            state.unReadCount -= 1;
        },
        markAllAsSeen: () => {

        },
        markAllAsSeenSuccess: (state) => {
            state.notifications = state.notifications.map(noti => {
                return {...noti, seen: true}
            })
            state.unReadCount = 0;
        },

        deleteNotification: () => {
            // state.loading = false;
        },
        deleteNotificationSuccess: (state, {payload}) => {
            state.notifications = state.notifications.filter(noti => noti.id !== payload);
            state.loading = false
        }
    }
})

export const {getAllNotifications, getAllNotificationsSuccess, getAllNotificationsFailure, addNotification,addNotificationSuccess, markAsSeen,
    markAsSeenSuccess, markAllAsSeen, markAllAsSeenSuccess, deleteNotification, deleteNotificationSuccess, turnOffSound, toggleOpen,
    getNumberUnread
} = noficationSlice.actions;

export default noficationSlice.reducer