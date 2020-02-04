export const setUser = user => {
  localStorage.setItem("wallaclone_user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("wallaclone_user");
  return JSON.parse(user);
};

export const deleteUser = () => {
  localStorage.removeItem("wallaclone_user");
};
