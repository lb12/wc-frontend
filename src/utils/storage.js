/**
 * Guarda los datos de un usuario en LS
 * @param {*} user
 */
export const setUser = user => {
  localStorage.setItem("wallaclone_user", JSON.stringify(user));
};

/**
 * Obtiene los datos de un usuario en LS
 */
export const getUser = () => {
  const user = localStorage.getItem("wallaclone_user");
  return JSON.parse(user);
};

/**
 * Elimina un usuario del LS
 */
export const deleteUser = () => {
  localStorage.removeItem("wallaclone_user");
};
