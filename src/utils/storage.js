/**
 * Guarda los datos de un usuario en LS
 * @param {*} user
 */
export const setUser = user => {
  localStorage.setItem("depatitos_user", JSON.stringify(user));
};

/**
 * Obtiene los datos de un usuario en LS
 */
export const getUser = () => {
  const user = localStorage.getItem("depatitos_user");
  return JSON.parse(user);
};

/**
 * Elimina un usuario del LS
 */
export const deleteUser = () => {
  localStorage.removeItem("depatitos_user");
};
