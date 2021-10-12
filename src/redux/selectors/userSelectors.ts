import { RootState } from '../../types/mainTypes';

export const userInfo = (state: RootState) => state.user.info;
export const login = (state: RootState) => state.user.login;
export const register = (state: RootState) => state.user.register;
export const profile = (state: RootState) => state.user.profile;
export const updateProfile = (state: RootState) => state.user.updateProfile;
export const forgotPassword = (state: RootState) => state.user.forgotPassword;
export const resetPassword = (state: RootState) => state.user.resetPassword;
