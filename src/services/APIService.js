import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from "../utils/axios";
import Advert from "../models/Advert";

const API_URL = "https://localhost:3000/api-v1";

// [START]: Métodos relacionados con los anuncios

/**
 * Obtiene una lista de anuncios.
 * @param {*} filters filtros aplicados en la búsqueda de anuncios
 * @param {*} paginationFilters filtros referidos a la paginación actual
 */
const listAdverts = async (
  { name, price, tag, selling, sort },
  { adsPerPage, page }
) => {
  let queryParams = "";
  let res = {};

  if (name && name.length)
    queryParams += `${getQueryParamToken(queryParams)}name=${name}`;
  if (price && price.length)
    queryParams += `${getQueryParamToken(queryParams)}price=${price}`;
  if (tag && tag.length)
    queryParams += `${getQueryParamToken(queryParams)}tag=${tag}`;
  if (selling && selling.length)
    queryParams += `${getQueryParamToken(queryParams)}for_sale=${selling}`;
  if (sort && sort.length)
    queryParams += `${getQueryParamToken(queryParams)}sort=${sort}`;

  queryParams += `${getQueryParamToken(queryParams)}page=${page}`;
  queryParams += `${getQueryParamToken(queryParams)}limit=${adsPerPage}`;
  queryParams +=
    page > 1
      ? `${getQueryParamToken(queryParams)}skip=${--page * adsPerPage}`
      : "";

  try {
    res = await getRequest(`${API_URL}/adverts${queryParams}`);
    res.results = res.results ? res.results.map(advert => new Advert(advert)) : [];
  } catch (error) {
    console.error(error);
    res = [];
  }
  console.log("listAdverts desde APIService.js", res);

  return res;
};

/**
 * Obtiene una lista de todos los anuncios de un usuario.
 * @param {*} memberId id del usuario
 * @param {*} paginationFilters filtros referidos a la paginación actual
 * @param {*} getOnlyFavAds booleano que indica si sólo queremos obtener los ads favoritos del usuario
 */
const listMemberAdverts = async (memberId, { adsPerPage, page }, favouriteAdverts) => {
  let queryParams = "";
  let res = {};

  queryParams += `${getQueryParamToken(queryParams)}page=${page}`;
  queryParams += `${getQueryParamToken(queryParams)}limit=${adsPerPage}`;
  queryParams += `${getQueryParamToken(queryParams)}favs=${favouriteAdverts}`;
  queryParams +=
    page > 1
      ? `${getQueryParamToken(queryParams)}skip=${--page * adsPerPage}`
      : "";
  
  try {
    res = await getRequest(
      `${API_URL}/adverts/member/${memberId}${queryParams}`
    );
    res.results = res.results ? res.results.map(advert => new Advert(advert)) : [];
  } catch (error) {
    console.error(error);
    res = [];
  }

  console.log("listMemberAdverts desde APIService.js", res);

  return res;
};

/**
 * Método auxiliar para saber si tenemos query params en la URL
 */
const getQueryParamToken = queryParams => queryParams.length === 0 ? "?" : "&";

/**
 * Obtiene un anuncio por su id.
 * @param {*} id id del anuncio
 */
const getAdvertById = async id => {
  let res = {};

  try {
    res = await getRequest(`${API_URL}/adverts/${id}`);
    res.result = new Advert(res.result);
  } catch (error) {
    res = error.response;
    console.error(res);
  }

  console.log("getAdvertById desde APIService.js", res);

  return res;
};

/**
 * Eliminar un anuncio de un usuario
 * @param {*} advert objeto del anuncio a eliminar
 * @param {*} token token del usuario actualmente logado
 */
const deleteAdvert = async (advert, token) => {
  let res = {};

  try {
    res = await deleteRequest(
      `${API_URL}/adverts/${advert.id}/${advert.member._id}`,
      { token }
    );
  } catch (error) {
    res = error.response;
    console.error(res);
  }
  console.debug("deleteAdvert desde APIService.js", res);

  return res;
};

/**
 * Crear un anuncio
 * @param {*} formData formulario con todos los datos del anuncio
 */
const createAdvert = async formData => {
  let res = {};

  try {
    res = await postRequest(`${API_URL}/adverts/`, formData);
    res.result = {};
  } catch (error) {
    res = error.response;
    console.error(res);
  }
  console.log("createAdvert desde APIService.js", res);

  return res;
};

/**
 * Editar un anuncio
 * @param {*} advertId id del anuncio que queremos editar
 * @param {*} memberId id del usuario actualmente conectado que quiere editar el anuncio
 * @param {*} formData formulario con todos los datos del anuncio
 */
const editAdvert = async (advertId, memberId, formData) => {
  let res = {};
  
  try {
    res = await putRequest(
      `${API_URL}/adverts/${advertId}/${memberId}`,
      formData
    );
    res.result = {};
  } catch (error) {
    res = error.response;
  }
  console.log("editAdvert desde APIService.js", res);

  return res;
};

/**
 * Setear todos los favs de un usuario
 * @param {*} favs favs del usuario a guardar
 * @param {*} userId id del usuario
 * @param {*} token token JWT del usuario
 */
const setUserFavs = async (favs, userId, token) => {
  let res = {};
  try {
    res = await postRequest(`${API_URL}/adverts/set-favs/${userId}`, {
      favs,
      token
    });
  } catch (error) {
    res = error.response;
    console.error(res);
  }
  console.log("setUserFavs desde APIService.js", res);

  return res;
};

/**
 * Marcar / Desmarcar un anuncio como reservado o como vendido
 * @param {*} advert anuncio a cambiar
 * @param {*} data objeto con la propiedad a cambiar
 */
const setReservedOrSoldAdvert = async (advert, data) => {
  let res = {};

  try {
    res = await putRequest(`${API_URL}/adverts/set-reserved-or-sold/${advert.id}/${advert.member._id}`, data);

    res.result = new Advert(res.result);
  } catch (error) {
    res = error.response;
    console.error(res);
  }
  console.log("setReservedOrSoldAdvert desde APIService.js", res);

  return res;
};

// [END]: Métodos relacionados con los anuncios

// [START]: Métodos relacionados con los tags

/**
 * Obtener todos los tags
 */
const getTags = async () => {
  let res = {};

  try {
    res = await getRequest(`${API_URL}/tags`);
    res.results = res.results ? res.results.map( tag => tag.value) : [];
  } catch (error) {
    console.error(error);
    res = [];
  }

  return res;
};

// [END]: Métodos relacionados con los tags

// [START]: Métodos relacionados con el usuario

/**
 * Registrar un usuario
 * @param {*} userObj objeto con los datos del usuario
 */
const signUp = async userObj => {
  let result = {};

  try {
    result = { result } = await postRequest(`${API_URL}/auth/signup`, userObj);
  } catch (error) {
    result = resolveSignErrors(error);
  }
  return result;
};

/**
 * Loguear un usuario
 * @param {*} userObj user y password en un objeto 
 */
const signIn = async userObj => {
  let result = {};

  try {
    result = await postRequest(`${API_URL}/auth/signin`, userObj);
  } catch (error) {
    result = resolveSignErrors(error);
  }
  return result;
};

/**
 * Método aux para resolver los errores del usuario
 * @param {*} error error devuelto por el API
 */
const resolveSignErrors = error => {
  let result = {
    success: false,
    errors: []
  };
  const errorAux = error.response.data;
  // Si se trata de un caso de credenciales
  if (errorAux.error && Object.keys(errorAux.error.errors).length > 0) {
    const { errors } = errorAux.error;

    for (const prop in errors) {
      result.errors = [...result.errors, errors[prop].msg];
    }
  } else if (errorAux.message) {
    result.errors = [errorAux.message];
  }

  return result;
};

/**
 * Comprobar un token de usuario y si está todo ok, devolvemos token más datos de user
 * @param {*} storedUser usuario guardado anteriormente en localStorage/redux que hay que comprobar
 */
const getUserLogged = async storedUser => {
  let user = {};

  if (
    !storedUser ||
    Object.entries(storedUser).length === 0 ||
    !storedUser.token
  ) {
    return user;
  }

  try {
    const result = await postRequest(`${API_URL}/auth/checkToken`, {
      token: storedUser.token
    });

    // Si hay propiedad 'message' es porque ha habido un error, por lo que retornamos un objeto vacío.
    if (result.message) {
      return user;
    }

    user = {
      user: result.result,
      token: storedUser.token
    };
  } catch (error) {
    console.log("The token expired, you have been logged out");
  }

  return user;
};

/**
 * Actualizar los datos de un usuario
 * @param {*} userId id del usuario
 * @param {*} param1 objeto con el usuario y el email a actualizar
 * @param {*} token token del user logado actualmente
 */
const updateUserData = async (userId, { username, email }, token) => {
  let result = {};
  try {
    result = { result } = await putRequest(`${API_URL}/user/${userId}`, {
      username,
      email,
      token
    });
  } catch (error) {
    const res = error.response.data;
    const message = res.error ? res.error : res.message;

    result = {
      success: false,
      errors: [message]
    };
  }
  return result;
};

/**
 * Cambiar la contraseña desde 'Mi zona'
 * @param {*} userId id del usuario
 * @param {*} password  contraseña en plano a cambiar
 * @param {*} token token del usuario logado actualmente
 */
const changeUserPassword = async (userId, password, token) => {
  let result = {};

  try {
    result = { result } = await putRequest(
      `${API_URL}/user/change-password/${userId}`,
      {
        password,
        token
      }
    );
  } catch (error) {
    const res = error.response.data;
    const message = res.error ? res.error : res.message;

    result = {
      success: false,
      errors: [message]
    };
  }
  return result;
};

/**
 * Dar de baja a un usuario
 * @param {*} userId id del usuario a dar de baja
 * @param {*} token token del usuario actualmente logado
 */
const unsubscribeUser = async (userId, token) => {
  let result = {};

  try {
    result = await deleteRequest(`${API_URL}/user/unsubscribe/${userId}`, {
      token
    });
  } catch (error) {
    const res = error.response.data;
    const message = res.error ? res.error : res.message;

    result = {
      success: false,
      errors: [message]
    };
  }
  return result;
};

// [END]: Métodos relacionados con el usuario

// [START]: Métodos relacionados con la recuperación de contraseña

/**
 * Pide al servidor que envíe un email a la dirección de correo con el link de recuperación
 * @param {*} email 
 */
const sendPasswordRecoverEmail = async email => {
  let res = {};
  try {
    res = await postRequest(`${API_URL}/auth/forgot-password`, { email });
  } catch (error) {
    res = error.response;
    console.error(res);
  }
  return res;
}

/**
 * Pide al servidor el email a partir del token y comprobar así el token
 * @param {*} token Token para recupera el email
 */
const getEmailFromRecoveryToken = async token => {
  let res = {};
  try {
    res = await getRequest(`${API_URL}/auth/reset-password?token=${token}`);
  } catch (error) {
    res = error.response;
    console.error(res);
  }
  return res;
}

/**
 * Envía la nueva contraseña junto con el email asociado y el token
 * @param {*} param0 objeto con el email, contraseña y token
 */
const changePasswordFromRecoveryToken = async ({ email, password, token }) => {
  let res = {};
  try {
    res = await putRequest(`${API_URL}/auth/update-password`, {
      email,
      password,
      token
    });
  } catch (error) {
    res = error.response;
    console.error(res);
  }
  return res;
}

// [END]: Métodos relacionados con la recuperación de contraseña

export {
  signUp,
  signIn,
  getUserLogged,
  listAdverts,
  getTags,
  listMemberAdverts,
  getAdvertById,
  unsubscribeUser,
  updateUserData,
  changeUserPassword,
  deleteAdvert,
  createAdvert,
  editAdvert,
  setUserFavs,
  setReservedOrSoldAdvert,
  sendPasswordRecoverEmail,
  getEmailFromRecoveryToken,
  changePasswordFromRecoveryToken
};
