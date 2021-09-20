export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const getAccessToken = () => localStorage.getItem('accessToken');

export const setRefreshToken = (resp) => localStorage.setItem('refreshToken', resp.refreshToken);
export const setAccessToken = (resp) =>
  localStorage.setItem('accessToken', resp.accessToken.split(' ')[1]);

export const removeRefreshToken = () => localStorage.removeItem('refreshToken');
export const removeAccessToken = () => localStorage.removeItem('accessToken');
