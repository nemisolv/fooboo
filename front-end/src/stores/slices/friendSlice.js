import {createSlice} from '@reduxjs/toolkit';

const friendSlice = createSlice({
    name: 'friend',
    initialState: {
        myFriends: [],
        friendRequests: [],
        // define state friend who are online
        friendsOnline: [],
        sentRequests: [],
        searchResults: [],
        loading: false,

    },
    reducers: {
        fetchMyFriends: state => {
            state.loading = true;
        },
        fetchMyFriendsSuccess: (state, {payload}) => {
            state.myFriends = payload;
            state.loading = false;
        },
        fetchMyFriendsFailure: state => {
            state.loading = false;
        },
        fetchFriendRequests: state => {
            state.loading = true;
        },
        fetchFriendRequestsSuccess: (state, {payload}) => {
            state.friendRequests = payload;
            state.loading = false;
        },
        fetchFriendRequestsFailure: state => {
            state.loading = false;
        },

        fetchSentRequests: state => {
            state.loading = true;
        },
        fetchSentRequestsSuccess: (state, {payload}) => {
            state.sentRequests = payload;
            state.loading = false;
        },
        fetchSentRequestsFailure: state => {
            state.loading = false;
        },
        addFriendRequest: (state) => {
            state.loading = true
        },
        addFriendRequestSuccess: (state, {payload}) => {
            state.sentRequests.push(payload);
            state.loading = false
        },
        addFriendRequestFailure: (state) => {
            state.loading = false
        },
        removeSentFriendRequest: (state) => {
            state.loading = true
        },
        removeSentFriendRequestSuccess: (state, {payload}) => {
            state.sentRequests = state.sentRequests.filter(request => request.id !== payload);
            state.loading = false
        }
        ,
        removeSentFriendRequestFailure: (state) => {
            state.loading = false
        },



        acceptFriendRequest: (state) => {
           state.loading = true
        },
        acceptFriendRequestSuccess: (state, {payload}) => {
            state.myFriends.push(payload);
            state.friendRequests = state.friendRequests.filter(request => request.id !== payload.id);
            state.loading = false
        },
        acceptFriendRequestFailure: (state) => {
            state.loading = false
        },

        declineAddFriendReceived: (state) => {
            state.loading = true
        },
        declineAddFriendReceivedSuccess: (state, {payload}) => {
            console.log("🚀 ~ payload:", payload)
            state.friendRequests = state.friendRequests.filter(request => request.id !== payload);
            state.loading = false
        },
        declineAddFriendReceivedFailure: (state) => {
            state.loading = false
        },

        updateFriendOnline: (state, {payload}) => {
            state.friendsOnline.push(payload);
            // update state of friends list
            state.myFriends = state.myFriends.map(friend => {
                if(friend.id === payload.id) {
                    return {
                        ...friend,
                        status: 'ONLINE'
                    }
                }
                return friend;
            })
        },
        removeFriendOnline: (state, {payload}) => {
            // state.friendsOnline = state.friendsOnline.filter(friend => friend.id !== payload.id);
            // update state of friends list
            state.myFriends = state.myFriends.map(friend => {
                if(friend.id === payload.id) {
                    return {
                        ...friend,
                        status: 'OFFLINE'
                    }
                }
                return friend;
            })
        },

    }
})

export const {
    fetchMyFriends,
    fetchMyFriendsSuccess,
    fetchMyFriendsFailure,
    fetchFriendRequests,
    fetchFriendRequestsSuccess,
    fetchFriendRequestsFailure,
    fetchSentRequests,
    fetchSentRequestsSuccess,
    fetchSentRequestsFailure,
    addFriendRequest,
    addFriendRequestSuccess,
    addFriendRequestFailure,
    acceptFriendRequest,
    acceptFriendRequestSuccess,
    acceptFriendRequestFailure,
    updateFriendOnline,
    removeFriendOnline, removeSentFriendRequest, removeSentFriendRequestSuccess, removeSentFriendRequestFailure,
    declineAddFriendReceived, declineAddFriendReceivedSuccess, declineAddFriendReceivedFailure
} = friendSlice.actions;

export default friendSlice.reducer;