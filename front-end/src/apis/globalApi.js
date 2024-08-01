import { publicRequest } from "./axiosConfig";

export default class GlobalApi {
    static async globalSearch(params) {
        return await publicRequest.get('/global/search/top', {params})
    }
}