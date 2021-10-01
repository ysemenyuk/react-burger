export const isCheckAuth = (state) => state.user.userInfo.isCheckAuth;
export const isAuth = (state) => state.user.userInfo.isAuth;
export const userInfo = (state) => state.user.userInfo.userInfo;

export const login = (state) => state.user.userLogin;
export const register = (state) => state.user.userRegister;
export const profile = (state) => state.user.userProfile;
export const updateProfile = (state) => state.user.userUpdateProfile;
export const forgotPassword = (state) => state.user.userForgotPassword;
export const resetPassword = (state) => state.user.userResetPassword;

const userSelectors = {
  isCheckAuth,
  isAuth,
  userInfo,
  login,
  register,
  profile,
  updateProfile,
  forgotPassword,
  resetPassword,
};

export default userSelectors;
