export const isCheckAuth = (state) => state.user.info.isCheckAuth;
export const isAuth = (state) => state.user.info.isAuth;
export const userInfo = (state) => state.user.info.userInfo;

export const login = (state) => state.user.login;
export const register = (state) => state.user.register;
export const profile = (state) => state.user.profile;
export const updateProfile = (state) => state.user.updateProfile;
export const forgotPassword = (state) => state.user.forgotPassword;
export const resetPassword = (state) => state.user.resetPassword;
