// If user object is not empty, is because user logged before.
export const isUserLogged = user => {
  return user && user.token;
}
