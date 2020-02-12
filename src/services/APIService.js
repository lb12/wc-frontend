import { getRequest, postRequest, putRequest } from "../utils/axios";
import Advert from "../models/Advert";

const API_URL = "https://localhost:3000/api-v1";

// API Adverts methods

const listAdverts = async (
  { name, price, tag, selling, sort },
  { adsPerPage, page }
) => {
  let queryParams = "";

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

  const res = await getRequest(`${API_URL}/adverts${queryParams}`);

  console.log("listAdverts desde APIService.js", res);

  if (!res) return [];

  res.results = res.results.map(advert => new Advert(advert));

  return res;
};

const listMemberAdverts = async (memberId, { adsPerPage, page }) => {
  let queryParams = "";

  queryParams += `${getQueryParamToken(queryParams)}page=${page}`;
  queryParams += `${getQueryParamToken(queryParams)}limit=${adsPerPage}`;
  queryParams +=
    page > 1
      ? `${getQueryParamToken(queryParams)}skip=${--page * adsPerPage}`
      : "";

  const res = await getRequest(
    `${API_URL}/adverts/member/${memberId}${queryParams}`
  );

  console.log("listMemberAdverts desde APIService.js", res);

  if (!res) return [];

  res.results = res.results.map(advert => new Advert(advert));

  return res;
};

const getQueryParamToken = queryParams =>
  queryParams.length === 0 ? "?" : "&";

const getAdvertById = async id => {
  const res = await getRequest(`${API_URL}/adverts/${id}`);
  console.log("getAdvertById desde APIService.js", res);

  return res;
};

// API Tags methods

/**
 * GET all possible tags
 */
const getTags = async () => {
  const res = await getRequest(`${API_URL}/tags`);

  return res ? res : [];
};

// API Users methods

const signUp = async userObj => {
  let result = {};

  try {
    result = { result } = await postRequest(`${API_URL}/auth/signup`, userObj);
  } catch (error) {
    result = resolveSignErrors(error);
  }
  return result;
};

const signIn = async userObj => {
  let result = {};

  try {
    result = await postRequest(`${API_URL}/auth/signin`, userObj);
  } catch (error) {
    result = resolveSignErrors(error);
  }
  return result;
};

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

export {
  signUp,
  signIn,
  getUserLogged,
  listAdverts,
  getTags,
  listMemberAdverts,
  getAdvertById
};
