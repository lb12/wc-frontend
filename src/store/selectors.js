// If user object is not empty, is because user logged before.
export const isUserLogged = user => {
  return user && user.token;
};

// Returns if the  pagination next button has to be disabled or not
export const hasToDisableNextPageButton = (
  { page, adsPerPage },
  totalAdverts
) => page * adsPerPage >= totalAdverts;
