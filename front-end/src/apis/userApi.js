import {  privateRequest, publicRequest } from "./axiosConfig";

class UserApi {
    // static async searchUser(email) {
    //     return await authAxios.get(`/users/${email}`);
    // }

    static async getUserProfile(userId) {
        return await publicRequest.get(`/users/${userId}`);
    }

    static async updateUserProfile( data) {
        return await privateRequest.patch('/users/update_info', data);
    }
    




}

export default UserApi;
