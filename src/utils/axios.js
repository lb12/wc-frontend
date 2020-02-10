import axios from "axios";

const networkError = {
  success: false,
  errors: ["Network error"]
};

const getRequest = async url => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    if (!error.response) {
      return networkError;
    }
    throw error;
  }
};

const postRequest = async (url, data) => {
  try {
    const res = await axios.post(url, data);
    return res.data;
  } catch (error) {
    if (!error.response) {
      return networkError;
    }
    throw error;
  }
};

const putRequest = async (url, data) => {
  try {
    const res = await axios.put(url, data);
    return res.data;
  } catch (error) {
    if (!error.response) {
      return networkError;
    }
    throw error;
  }
};

export { getRequest, postRequest, putRequest };