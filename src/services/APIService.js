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
    result = { result } = await postRequest(`${API_URL}/user`, userObj);
  } catch (error) {
    const errorAux = error.response.data;

    // Si se trata de un caso de credenciales
    if (errorAux.error && Object.keys(errorAux.error.errors).length > 0) {
      const { errors } = errorAux.error;

      for (const prop in errors) {
        result.errors = [...result.errors, errors[prop].msg];
      }
    } else if (errorAux.message) {
      // Si ya existe el email o usuario
      result.errors = ["Email or username currently used"];
    }
  }
  return result;
};

export { signUp };
