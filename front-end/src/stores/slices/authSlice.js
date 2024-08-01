import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
    loading: false,
    isLoggedIn: false,
  },
  reducers: {
    login: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
    register: (state) => {
      state.loading = true;
    },
    registerDone: (state) => {
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    verifyConfirmationEmail: (state) => {
      state.loading = true;
    },
    verifyConfirmationEmailSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    verifyConfirmationEmailFailure: (state) => {
      state.loading = false;
    },

    //  forgotten password
    forgotPassword: (state) => {
      state.loading = true;
    },
    forgotPasswordSuccess: (state) => {
      state.loading = false;
    },
    forgotPasswordFailure: (state) => {
      state.loading = false;
    },

    updateProfile: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = { ...state.currentUser, ...action.payload };
      Cookies.set('user', JSON.stringify(state.currentUser));
    },
    updateProfileFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  login,
  loginSuccess,
  loginFailure,
  logout,
  register,
  registerDone,
  verifyConfirmationEmail,
  verifyConfirmationEmailSuccess,
  verifyConfirmationEmailFailure,
  forgotPassword,
  forgotPasswordSuccess,
  forgotPasswordFailure, updateProfile, updateProfileSuccess, updateProfileFailure,
} = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.currentUser;

export default authSlice.reducer;
