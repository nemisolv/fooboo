import {  privateRequest } from './axiosConfig';

class UploadApi {
  static async uploadImages(data) {
    return await privateRequest.post('/upload/images/posts', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export default UploadApi;
