import AuthApi from '@/apis/authApi';
import { call, put } from 'redux-saga/effects';

import {
  loginFailure,
  verifyConfirmationEmailSuccess,
  verifyConfirmationEmailFailure,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  registerDone,
  loginSuccess,
} from '@/stores/slices/authSlice';
import { saveToken } from '@/utils/authUtils';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { registerUser } from '@/socket/initializer';

// Register
function* handleRegister({ payload }) {
  const { navigate, data, setShowRegister } = payload;
  try {
    yield call(AuthApi.register, data);
    yield put(registerDone());
    // passing  email to the next page
    navigate('/confirm-email', { state: { email: data.email } });
    setShowRegister(false);
  } catch (error) {
    console.log('🚀 ~ function*handleRegister ~ error:', error);
    toast.error(error.response.data.message);
    yield put(registerDone());
  }
}

// Send email confirmation
function* handleVerifyEmailConfirmation({ payload }) {
  const { navigate, data } = payload;
  try {
    const res = yield call(AuthApi.verifyEmail, data);
    const { token, refreshToken, userData } = res.data;
    if (token && refreshToken && userData) {
      saveToken(token, refreshToken);
      yield put(verifyConfirmationEmailSuccess(userData));
      // yield put(getCurrentUserSuccess(res.data));
      Cookies.set('user', JSON.stringify(userData), { expires: 7 });
      navigate('/', { replace: true });
    } else {
      toast.error('Something went wrong');
    }
  } catch (error) {
    const message = error.response ? error.response.data.message : error.message;
    console.log('🚀 ~ function*handleSendEmailConfirmation ~ error:', error);
    toast.error(error.response.data.errors[0])
    yield put(verifyConfirmationEmailFailure(message));
  }
}

// Login
function* handleLogin({ payload }) {
  const { navigate, data } = payload;
  try {
    const res = yield call(AuthApi.login, data);
    const { token, refreshToken, userData } = res;
    if (refreshToken && token) {
      saveToken(token, refreshToken);
      yield put(loginSuccess(userData));
      Cookies.set('user', JSON.stringify(userData), { expires: 7 });
      navigate('/', { replace: true });
      registerUser(userData.id);
    }else {
      toast.error('Invalid email or password');
    }
  } catch (error) {
    yield put(loginFailure());
    toast.error('Invalid email or password');
  }
}

// forgotten password
function* handleForgotPassword({ payload }) {
  const { navigate, data } = payload;
  // yield put(forgotPasswordStart());
  try {
    yield call(AuthApi.verifyCode, data);
    yield put(forgotPasswordSuccess());
    toast.success('Password reset successfully. Please login again!');
    navigate('/auth/login');
  } catch (error) {
    toast.error('Invalid code');
    yield put(forgotPasswordFailure());
  }
}

export { handleRegister, handleVerifyEmailConfirmation as handleSendEmailConfirmation, handleLogin, handleForgotPassword };
