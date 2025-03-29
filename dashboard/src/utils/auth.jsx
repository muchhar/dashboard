// utils/auth.js
export const isAuthenticated = () => {
  const username = localStorage.getItem('mt4_username');
  const password = localStorage.getItem('mt4_password');
  const token = localStorage.getItem('mt4_token');
  
  // Check if all required auth items exist
  return !!username && !!password && !!token;
};

export const logout = () => {
  localStorage.removeItem('mt4_username');
  localStorage.removeItem('mt4_password');
  localStorage.removeItem('mt4_token');
  window.location.href = '/login-signup'; // Redirect to login page
};