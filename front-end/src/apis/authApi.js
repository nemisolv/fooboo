import { publicRequest } from './axiosConfig';

class AuthApi {
  static async login(data) {
    return await publicRequest.post('/auth/login', data);
  }

  static async register(data) {
    return await publicRequest.post('/auth/register', data);
  }

  static async verifyEmail(data) {
    return await publicRequest.post('/auth/verify_email', data);
  }

  // recover password
  static async getUserSummary(data) {
    console.log('🚀 ~ AuthApi ~ getUserSummary ~ data:', data);
    return await publicRequest.post('/auth/recover/initiate', data);
  }

  static async sendCode(data) {
    return await publicRequest.post('/auth/recover/code', data);
  }

  static async verifyCode(data) {
    return await publicRequest.post('/auth/recover/password', data);
  }

  static async resendRegistrationEmail(data) {
    return await publicRequest.post('/auth/recover/resend_verification_register_email', data);
  }
}

export default AuthApi;
