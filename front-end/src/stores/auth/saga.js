import { takeLatest } from 'redux-saga/effects';
import { forgotPassword, login, register, verifyConfirmationEmail } from '@/stores/slices/authSlice';
import { handleForgotPassword, handleLogin, handleRegister, handleSendEmailConfirmation } from './handle';

function* authSaga() {
  yield takeLatest(register.type, handleRegister);
  yield takeLatest(login.type, handleLogin);
  yield takeLatest(verifyConfirmationEmail.type, handleSendEmailConfirmation);
  yield takeLatest(forgotPassword.type, handleForgotPassword);
}

export default authSaga;
