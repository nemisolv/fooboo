import { privateRequest } from "./axiosConfig";

export default class FriendApi {
    static async getAllMyFriends() {
        return await privateRequest.get('/friends/all');
    }

    static async getFriendRequests() {
        return await privateRequest.get('/friends/requests');
    }

    static async addFriendRequest(receiverId) {
        return await privateRequest.post('/friends/add-friend',  receiverId );
    }
    static async acceptFriendRequest(senderId) {
        console.log('senderId::' , senderId)
        return await privateRequest.post('/friends/accept-friend',  senderId );
    }
    static async declineAddFriendReceived(senderId) {
        return await privateRequest.delete(`/friends/decline-friend/${senderId}`);
    }

    static async getSentFriendRequests() {
        return await privateRequest.get('/friends/sent-requests');
    }
    static async removeSentFriendRequest(receiverId) {
        return await privateRequest.delete(`/friends/sent-requests/${receiverId}` );
    }

    static async getSuggestedFriends() {
        return await privateRequest.get('/friends/suggested');
    }
}