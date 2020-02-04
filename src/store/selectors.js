// If user object is not empty, is because user logged before.
export const isUserLogged = user =>
  user && Object.entries(user).length > 0 && user.success;
