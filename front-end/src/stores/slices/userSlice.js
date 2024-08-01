import { createSlice } from "@reduxjs/toolkit"
const userSlice = createSlice( {
    name: 'user',
   initialState: {
    currentUser: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    userProfile: null,
    userProfilePosts: [],
    onlineUsers: [],
    loading: false,
    userProfilePostsLoading: false,
   },
    reducers: {
        getCurrentUserStart(state) {
            state.loading = true
        },
        getCurrentUserSuccess(state, action) {
            state.currentUser = action.payload
            state.loading = false
        },
        getCurrentUserFailure(state) {
            state.loading = false
        },
        getOnlineUsersStart(state) {
            state.loading = true
        },
        getOnlineUsersSuccess(state, action) {
            state.onlineUsers = action.payload
            state.loading = false
        },
        getOnlineUsersFailure(state) {
            state.loading = false
        },
        getUserProfile: state => {
            state.loading = true;
        },
        getUserProfileSuccess: (state, action) => {
            state.userProfile = action.payload;
            state.loading = false;
        },
        getUserProfileFailure: state => {
            state.loading = false;
        },
        getUserProfilePosts: state => {
            state.userProfilePostsLoading = true;
        },
        getUserProfilePostsSuccess: (state, action) => {
            state.userProfilePosts = action.payload;
            state.userProfilePostsLoading = false;
        },
        getUserProfilePostsFailure: state => {
            state.userProfilePostsLoading = false;
        },
        
        updateUserProfileSuccess: (state, {payload}) => {
            state.userProfile.firstName = payload.firstName;
            state.userProfile.lastName = payload.lastName;
            state.userProfile.details = {...state.userProfile.details,...payload}
        },


     
    }
})


export const { getCurrentUserStart, getCurrentUserSuccess, getCurrentUserFailure,
    getOnlineUsersStart, getOnlineUsersSuccess, getOnlineUsersFailure, getUserProfile, getUserProfileSuccess, getUserProfileFailure,
    getUserProfilePosts, getUserProfilePostsSuccess, getUserProfilePostsFailure,updateUserProfileSuccess
 } = userSlice.actions

export default userSlice.reducer