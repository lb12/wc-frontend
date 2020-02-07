import axios from "axios";

const API_URL = "https://localhost:3000/api-v1";

const getRequest = url => {
  return axios
    .get(url)
    .then(res => res.data)
    .catch(error => {
      if (!error.response) {
        // Network error
        return {
          success: false,
          errors: ["Network error"]
        };
      }
      throw error;
    });
};

const postRequest = (url, data) => {
  return axios
    .post(url, data)
    .then(res => res.data)
    .catch(error => {
      if (!error.response) {
        // Network error
        return {
          success: false,
          errors: ["Network error"]
        };
      }
      throw error;
    });
};

const putRequest = (url, data) => {
  return axios
    .put(url, data)
    .then(res => res.data)
    .catch(error => {
      if (!error.response) {
        // Network error
        return {
          success: false,
          errors: ["Network error"]
        };
      }
      throw error;
    });
};

const signUp = async userObj => {
  let result = {
    success: false,
    errors: []
  };

  try {
    result = { result } = await postRequest(`${API_URL}/auth/signup`, userObj);
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

export { signUp, getUserLogged };
