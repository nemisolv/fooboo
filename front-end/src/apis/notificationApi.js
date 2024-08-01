import { privateRequest } from "./axiosConfig";

export default  class NotificationApi {

    static async getAll() {
        return await privateRequest.get('/notifications');
    }

    static async createNotification(data) {
        return await privateRequest.post('/notifications', data);
    }


    static async markAsSeen(id) {
        return await privateRequest.patch(`/notifications/${id}/mark_as_seen`);
    }

    static async markAllAsSeen() {
        return await privateRequest.patch('/notifications/mark_all_as_seen');
    }

    static async deleteNotification(id) {
        return await privateRequest.delete(`/notifications/${id}`);
    }


    
}